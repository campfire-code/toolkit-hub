// 把资料包（delivery 为 docs）里 handbook/*.md 合并成一个 PDF
// 用法：node scripts/build-handbook-pdf.mjs <slug> [<slug> ...]
// 例：  node scripts/build-handbook-pdf.mjs ai-adoption-handbook waimai-ops-handbook
// 产物：tools/<slug>/<名称>.pdf；中间的合并 HTML 写到系统临时目录，不留在仓库里。
// 依赖：本机 Google Chrome（macOS 默认路径，可用环境变量 CHROME 指定）；不需要任何 npm 包。
import { readFileSync, readdirSync, writeFileSync, mkdtempSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const slugs = process.argv.slice(2);
if (!slugs.length) { console.error('用法：node scripts/build-handbook-pdf.mjs <slug> [<slug> ...]'); process.exit(1); }
if (!existsSync(chrome)) { console.error(`找不到 Chrome：${chrome}（可用环境变量 CHROME 指定）`); process.exit(1); }

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// 行内：代码、粗体；先转义再套标签
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// 极简 Markdown：标题、段落、有序/无序列表（含 [ ] 复选）、表格、围栏代码、引用、分隔线
function md2html(src) {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`);
      continue;
    }
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(line); i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push('<table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>'
        + rows.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
      continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const buf = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/.test(lines[i]) : /^\s*[-*]\s+/.test(lines[i]))) {
        buf.push(lines[i++].replace(/^\s*(?:[-*]|\d+\.)\s+/, ''));
      }
      const li = buf.map((t) => {
        const c = t.match(/^\[( |x)\]\s+(.*)$/);
        return c ? `<li class="chk">${c[1] === 'x' ? '☑' : '☐'} ${inline(c[2])}</li>` : `<li>${inline(t)}</li>`;
      });
      out.push(`<${ordered ? 'ol' : 'ul'}>${li.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    if (!line.trim()) { i++; continue; }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\||\s*[-*]\s+|\s*\d+\.\s+|---)/.test(lines[i])) buf.push(lines[i++]);
    if (!buf.length) { buf.push(lines[i++]); }
    out.push(`<p>${inline(buf.join(''))}</p>`);
  }
  return out.join('\n');
}

const CSS = `
@page { size: A4; margin: 18mm 16mm; }
body { font-family: "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif; font-size: 11pt; line-height: 1.75; color: #222; }
h1 { font-size: 22pt; margin: 0 0 12pt; padding-bottom: 6pt; border-bottom: 2px solid #c8501e; }
h2 { font-size: 15pt; margin: 18pt 0 6pt; color: #8a3410; }
h3 { font-size: 12.5pt; margin: 12pt 0 4pt; }
p { margin: 6pt 0; }
ul, ol { margin: 6pt 0; padding-left: 20pt; }
li.chk { list-style: none; margin-left: -14pt; }
table { border-collapse: collapse; width: 100%; margin: 8pt 0; font-size: 10pt; page-break-inside: avoid; }
th, td { border: 1px solid #c9c2b8; padding: 4pt 7pt; text-align: left; vertical-align: top; }
th { background: #f3ece2; }
blockquote { margin: 8pt 0; padding: 6pt 12pt; background: #faf5ec; border-left: 4px solid #d9b98f; color: #444; }
pre { background: #f5f3ef; padding: 8pt 10pt; border-radius: 4pt; font-size: 9.5pt; white-space: pre-wrap; page-break-inside: avoid; }
code { font-family: "SF Mono",Menlo,Consolas,monospace; font-size: 0.92em; background: #f5f3ef; padding: 0 2pt; }
pre code { background: none; padding: 0; }
.chapter { page-break-before: always; }
.cover { height: 235mm; display: flex; flex-direction: column; justify-content: center; text-align: left; }
.cover .title { font-size: 34pt; font-weight: 700; line-height: 1.3; border-left: 8px solid #c8501e; padding-left: 14pt; }
.cover .sub { margin: 18pt 0 0 22pt; font-size: 13pt; color: #555; }
.cover .meta { margin: 40pt 0 0 22pt; font-size: 11pt; color: #777; line-height: 2; }
.toc h1 { border: none; }
.toc ol { list-style: none; padding-left: 0; }
.toc li { padding: 3pt 0; border-bottom: 1px dotted #ccc; }
`;

for (const slug of slugs) {
  const dir = join(root, 'tools', slug);
  const meta = JSON.parse(readFileSync(join(dir, 'tool.json'), 'utf8'));
  const hdir = join(dir, 'handbook');
  const files = readdirSync(hdir).filter((f) => f.endsWith('.md')).sort();
  const readme = readFileSync(join(dir, 'README.md'), 'utf8');
  const desc = ((readme.match(/^>\s*(.+)$/m) || [])[1] || '').split('。')[0];
  const chapters = files.map((f) => {
    const src = readFileSync(join(hdir, f), 'utf8');
    return { title: (src.match(/^#\s+(.+)$/m) || [, f])[1], html: md2html(src) };
  });
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${esc(meta.name)}</title><style>${CSS}</style></head><body>
<section class="cover"><div class="title">${esc(meta.name)}</div><div class="sub">${esc(desc)}</div>
<div class="meta">篝火出品<br>版本 ${esc(meta.version)}<br>许可证：CC BY 4.0<br>已脱敏：不含任何客户、门店或个人信息</div></section>
<section class="chapter toc"><h1>目录</h1><ol>${chapters.map((c, n) => `<li>${n + 1}. ${inline(c.title)}</li>`).join('')}</ol></section>
${chapters.map((c) => `<section class="chapter">${c.html}</section>`).join('\n')}
</body></html>`;
  const tmp = mkdtempSync(join(tmpdir(), 'handbook-'));
  const htmlPath = join(tmp, 'index.html');
  writeFileSync(htmlPath, html);
  const pdf = join(dir, `${meta.name}.pdf`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, `file://${htmlPath}`], { stdio: 'ignore' });
  console.log(`${slug}：${pdf}（${Math.round(statSync(pdf).size / 1024)} KB，${chapters.length} 章）`);
}
