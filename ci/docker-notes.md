### 一键部署（需要一台装好 Docker 的服务器或电脑）

```bash
mkdir {{SLUG}} && cd {{SLUG}}
# 下载本页附件 docker-compose.yml（以及 .env.example，改名为 .env 并按说明填写）
docker compose up -d
```

镜像：`ghcr.io/campfire-code/{{SLUG}}:{{VERSION}}`（同时提供 `latest`），支持 x86 与 ARM 服务器。

完整的中文部署教程、需要准备的账号与配置见仓库首页 README。

---

篝火出品 · 收录于篝火 App 应用区。本工具基于上游开源项目，版权归原作者所有，按上游许可证分发。全部工具见 https://github.com/campfire-code/toolkit-hub
