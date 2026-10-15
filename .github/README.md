# CI/CD — preipo.ptfin.kz

Workflow: [`.github/workflows/deploy.yml`](./workflows/deploy.yml).

## Что делает

1. **SBOM** — CycloneDX + Trivy, Critical → fail.  
2. **Build** — `npm ci` + `npm run build` (Node 22).  
3. **Deploy** — `rsync` содержимого `dist/` на сервер.

Триггер: только `push` на любую ветку (без `workflow_dispatch` и без `pull_request`).  
Если SBOM или Build красные — Deploy не стартует.

## Secret (GitHub → Settings)

| Имя | Назначение |
|-----|------------|
| `PROD_DEPLOY_SSH_KEY_B64` | Приватный SSH-ключ в base64 (как в suite / back.ptfin) |

Хост, пользователь и путь — в `env` джоба Deploy внутри `deploy.yml` (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`).

Ключ в base64 (пример локально):

```sh
base64 -w0 id_ed25519 > id_ed25519.b64
```

Пайплайн сам по себе DNS и nginx не настраивает — только заливает статику в `DEPLOY_PATH`.
