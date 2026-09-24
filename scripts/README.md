# Scripts

Esse diretório reúne scripts utilitários do projeto. Cada um resolve um problema específico que aparece ao configurar ou manter a aplicação.

## remove-integrations.sh

Ao iniciar um projeto a partir desse template, nem todas as integrações são necessárias. Remover pacotes, arquivos e referências manualmente é chato e dá erro fácil.

O `remove-integrations.sh` faz isso de uma vez. Ele suporta dois modos: um dialog interativo e outro via linha de comando.

### Modo interativo (dialog)

```bash
./remove-integrations.sh
```

Abre uma checklist para escolher o que remover. Também dá para marcar a opção de rodar as verificações depois.

### Modo CLI

```bash
./remove-integrations.sh [opções]
```

### Opções

- `--resend` - Remove a integração com Resend
- `--sentry` - Remove a integração com Sentry
- `--playwright` - Remove a integração com Playwright
- `--k6` - Remove a integração com K6
- `--knip` - Remove a integração com Knip
- `--github-actions` - Remove a integração com GitHub Actions
- `--google-analytics` - Remove a integração com Google Analytics
- `--cookiebot` - Remove a integração com Cookiebot
- `--example-page` - Remove a página de exemplo
- `--upstash` - Remove a integração com Upstash
- `--vercel-analytics` - Remove a integração com Vercel Analytics
- `--configcat` - Remove a integração com ConfigCat
- `--check` - Roda format, lint, typecheck e build depois da remoção (somente no modo CLI)
- `--help, -h` - Mostra a mensagem de ajuda

### Exemplos

**Remover integrações e rodar verificações:**

```bash
./remove-integrations.sh --resend --sentry --check
```

**Remover sem verificações:**

```bash
./remove-integrations.sh --playwright --k6
```

**Modo interativo:**

```bash
./remove-integrations.sh
```

### Requisitos

- **Modo dialog**: precisa do comando `dialog`. No macOS, instale com `brew install dialog`. No Linux, use o gerenciador de pacotes da distribuição utilizada.

### Verificações

Com `--check` marcado, depois da remoção ele roda:

- `pnpm format`
- `pnpm lint:fix`
- `pnpm typecheck`
- `pnpm build`

## bump-sw.sh

Durante o deploy, o navegador às vezes continua servindo o service worker antigo. Isso acontece porque o cache do `sw.js` ainda usa a mesma chave, então o browser não enxerga motivo para atualizar.

Para forçar a invalidação, o `bump-sw.sh` pega o hash curto do commit atual e substitui o placeholder `_HASH_` dentro de `public/sw.js`. Assim, cada deploy gera um `CACHE_NAME` diferente e o service worker é atualizado no próximo acesso.

### Uso

```bash
./scripts/bump-sw.sh
```

O script espera que `public/sw.js` exista e contenha `_HASH_` no `CACHE_NAME`. Se o arquivo não for encontrado, ele aborta com uma mensagem clara.

Não é necessário rodar o script manualmente. Ele já está ligado ao `prebuild` do [`package.json`](../package.json) e roda automaticamente antes do `pnpm build`.

### Requisitos

- Arquivo `public/sw.js` com o placeholder `_HASH_`

## Dicas gerais

- Sempre rode os scripts a partir da raiz do projeto
- Revise as alterações antes de commitar
