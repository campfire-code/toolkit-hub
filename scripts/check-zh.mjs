// 检查界面与上架文案里有没有中文以外的词：node scripts/check-zh.mjs [编号...] [--list]
// 扫描自研工具 src/ 下给用户看的文字（JSX 文本、含中文的字符串）和 catalog/copy/<编号>.json，
// 出现术语表（docs/术语表.md 里「保留原文」一节）以外的英文单词就记一处。
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import ts from 'typescript';

const root = new URL('..', import.meta.url).pathname;
const tools = JSON.parse(readFileSync(root + 'catalog/tools.json', 'utf8')).tools;
const args = process.argv.slice(2);
const list = args.includes('--list');
const want = args.filter((a) => !a.startsWith('--'));

// 术语表「保留原文」一节里反引号括起来的词
const glossary = readFileSync(root + 'docs/术语表.md', 'utf8');
const keepSection = glossary.split('## 保留原文')[1]?.split('\n## ')[0] ?? '';
const KEEP = new Set([...keepSection.matchAll(/`([^`]+)`/g)].map((m) => m[1].toLowerCase()));

const CJK = /[一-鿿]/;
const WORD = /[A-Za-z][A-Za-z0-9_.+-]*[A-Za-z0-9]|[A-Za-z]{2,}/g;

/** 一段给用户看的文字里，术语表以外的英文词 */
function badWords(text) {
  const out = [];
  for (const m of text.matchAll(WORD)) {
    const w = m[0].replace(/[.+-]+$/, '');
    if (w.length < 2) continue;
    if (KEEP.has(w.toLowerCase())) continue;
    if (/^\d/.test(w)) continue;
    out.push(w);
  }
  return out;
}

/** 从源码里取给用户看的文字（用 TypeScript 语法树）：JSX 文本、JSX 的 title / placeholder / aria-label / label / alt 属性、含中文的字符串 */
function userTexts(src, file) {
  // 文件开头写了「check-zh: 整个文件忽略」的跳过（例如平台消息格式说明，字段名必须照抄平台文档）
  if (/check-zh: 整个文件忽略/.test(src.slice(0, 400))) return [];
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const out = [];
  // 上一行写了「check-zh: 忽略」注释的语句跳过（只用于匹配数据、不显示给用户的字符串，例如导入表头的英文别名）
  const ignored = new Set();
  src.split('\n').forEach((l, i) => { if (l.includes('check-zh: 忽略')) ignored.add(i + 1); });
  const visit = (n) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return;
    if (ignored.size && ignored.has(sf.getLineAndCharacterOfPosition(n.getStart(sf)).line)) return;
    // 控制台输出用户看不到
    if (ts.isCallExpression(n) && /^console\./.test(n.expression.getText(sf))) return;
    if (ts.isJsxText(n)) {
      const t = n.text.trim();
      if (t) out.push(t);
    } else if (ts.isJsxAttribute(n) && n.initializer && ts.isStringLiteral(n.initializer) && /^(title|placeholder|aria-label|label|alt)$/.test(n.name.getText(sf))) {
      // 不含中文、没有空格的占位示例（网址、模型名、密钥格式）是数据，不算界面文字
      const v = n.initializer.text;
      if (CJK.test(v) || /\s/.test(v)) out.push(v);
      return;
    } else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      if (CJK.test(n.text) && !looksLikeCode(n.text)) out.push(n.text);
    } else if (ts.isTemplateExpression(n)) {
      const t = [n.head.text, ...n.templateSpans.map((x) => x.literal.text)].join(' ');
      if (CJK.test(t) && !looksLikeCode(t)) out.push(t);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

/** CSS 选择器、样式、HTML 片段这类字符串不是界面文字 */
const looksLikeCode = (t) => /\w\[[\w-]+[*^$]?=|[{};]\s*$|^\s*[.#]?[\w-]+\s*\{|<\/?[a-z][\w-]*[\s>]/.test(t);

function walk(dir, files = []) {
  for (const f of readdirSync(dir)) {
    const p = `${dir}/${f}`;
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) && !/\.d\.ts$/.test(f)) files.push(p);
  }
  return files;
}

let total = 0;
const rows = [];
for (const t of tools) {
  if (want.length && !want.includes(t.id)) continue;
  const hits = [];
  // fork 工具的源码是上游的，界面中文化另行检查，这里只看自研工具
  const src = `${root}tools/${t.slug}/src`;
  if (t.track !== 'fork' && existsSync(src)) {
    for (const f of walk(src)) {
      for (const s of userTexts(readFileSync(f, 'utf8'), f)) {
        const b = badWords(s);
        if (b.length) hits.push(`${f.replace(root, '')}：${b.join(' ')}　｜${s.slice(0, 60)}`);
      }
    }
  }
  const copy = `${root}catalog/copy/${t.id}.json`;
  if (existsSync(copy)) {
    const walkJson = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(walkJson) : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => k !== 'id').flatMap(([, x]) => walkJson(x)) : []);
    for (const s of walkJson(JSON.parse(readFileSync(copy, 'utf8')))) {
      const b = badWords(s);
      if (b.length) hits.push(`catalog/copy/${t.id}.json：${b.join(' ')}　｜${s.slice(0, 60)}`);
    }
  }
  if (!hits.length) continue;
  total += hits.length;
  rows.push([t.id, hits]);
}
rows.sort((a, b) => b[1].length - a[1].length);
for (const [id, hits] of rows) {
  console.log(`${id}  ${hits.length} 处`);
  if (list) for (const h of hits) console.log('   ' + h);
}
console.log(`共 ${total} 处`);
process.exit(total ? 1 : 0);
