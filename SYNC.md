# 🔄 SYNC.md — Sincronização Radar ↔ Site Conta Certa

**Guia oficial para manter os repositórios `radar-clone` e `Site-conta-certa` sincronizados e integrados.**

> ⚠️ Este arquivo DEVE existir idêntico em ambos os repositórios.
> Última sincronização: 11/09/2026

---

## 📊 Visão Geral do Ecossistema

┌─────────────────────────────────────────────────────────────────────┐
│ ECOSSISTEMA CONTA CERTA │
│ │
│ ┌──────────────────────┐ ┌──────────────────────┐ │
│ │ 🌐 SITE CONTA CERTA │ │ 📊 RADAR │ │
│ │ (Público) │◄─────►│ (Interno) │ │
│ │ │ SSO │ │ │
│ │ • Landing page │ JWT │ • Gestão escritório │ │
│ │ • Captação de leads │ API │ • Operação mensal │ │
│ │ • Portal do cliente │ │ • Extrator bancário │ │
│ │ • Blog │ │ • Envio c/ tracking │ │
│ │ │ │ • BI / DRE / PDFs │ │
│ │ FE: Vite :5173 │ │ FE: Next.js :3002 │ │
│ │ BE: Express :4000 │ │ BE: NestJS :3001 │ │
│ │ DB: Postgres :5432 │ │ DB: Postgres :5433 │ │
│ └──────────────────────┘ └──────────┬───────────┘ │
│ │ │
│ ┌──────────▼───────────┐ │
│ │ 🏦 EXTRATOR BANCÁRIO │ │
│ │ (App Irmã - Python) │ │
│ │ │ │
│ │ • OCR de PDFs │ │
│ │ • Parsing de extratos│ │
│ │ • Geração de CSV │ │
│ │ │ │
│ │ FE: Vite :5174 │ │
│ │ BE: FastAPI :8000 │ │
│ └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

---

## 📋 Repositórios

| Repositório | URL | Descrição |
|-------------|-----|-----------|
| **Site Conta Certa** | https://github.com/Mtoledo50/Site-conta-certa | Portal público, landing page, portal do cliente |
| **Radar** | https://github.com/Mtoledo50/radar-clone | Sistema interno de gestão e automação contábil |

---

## 🔗 Pontos de Integração (Contratos)

### **1. Autenticação Unificada (SSO via JWT)**

┌──────────┐ POST /auth/login ┌──────────┐
│ SITE │ ──────────────────────► │ SITE │
│ Frontend│ │ Backend │
│ :5173 │ ◄────────────────────── │ :4000 │
│ │ { token: "jwt..." } │ │
└────┬─────┘ └──────────┘
│
│ Redirect com JWT no header
▼
┌──────────┐ GET /auth/validate ┌──────────┐
│ RADAR │ ──────────────────────► │ RADAR │
│ Frontend│ │ Backend │
│ :3002 │ ◄────────────────────── │ :3001 │
│ │ { user: {...} } │ │
└──────────┘ └──────────┘

**Contrato obrigatório:**
env
MESMA chave em ambos os .env
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_ISSUER=contacerta.com.br
JWT_EXPIRATION=24h

**Payload do JWT (formato obrigatório):**
```json
{
  "sub": "uuid-do-usuario",
  "email": "cliente@empresa.com.br",
  "name": "Nome do Cliente",
  "role": "client",
  "companyId": "uuid-da-empresa",
  "iat": 1726012800,
  "exp": 1726099200,
  "iss": "contacerta.com.br"
}

⚠️ REGRA: Se o payload do JWT mudar em um repositório, DEVE mudar no outro.
Responsável: quem alterar deve commitar em AMBOS os repos.

2. Banco de Dados (Isolamento)

┌─────────────────────────────────────────────────┐
│  PostgreSQL :5432 (NATIVO — DADOS REAIS)        │
│  ┌────────────────────────────────────────────┐  │
│  │  schema: public                            │  │
│  │  • clientes (cadastro público)             │  │
│  │  • leads (formulários de contato)          │  │
│  │  • usuarios_portal (login do cliente)      │  │
│  │  • documentos_publicos (links temp.)       │  │
│  └────────────────────────────────────────────┘  │
│  ⛔ NUNCA USAR PARA DESENVOLVIMENTO              │
│  ⛔ NUNCA RODAR MIGRATIONS AQUI SEM BACKUP       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PostgreSQL :5433 (DOCKER — DESENVOLVIMENTO)    │
│  ┌────────────────────────────────────────────┐  │
│  │  schema: public                            │  │
│  │  • companies (multi-tenant)                │  │
│  │  • users (usuários do escritório)          │  │
│  │  • clientes (clientes do escritório)       │  │
│  │  • contratos, honorarios, lancamentos...   │  │
│  │  • email_envios (🆕 tracking)              │  │
│  │  • email_trackings (🆕 eventos)            │  │
│  │  • email_templates (🆕 templates)          │  │
│  └────────────────────────────────────────────┘  │
│  ✅ Pode resetar, migrar, testar livremente      │
└─────────────────────────────────────────────────┘
Tabelas compartilhadas (via API, NÃO via acesso direto):
Tabela (Site :5432)
Tabela (Radar :5433)
Sincronização
clientes
clientes
Site → Radar via API /api/sync/clientes
leads
prospects
Site → Radar via webhook
usuarios_portal
users (role: client)
JWT compartilhado (sem sync de tabela)
⚠️ REGRA: Nenhum repositório acessa o banco do outro diretamente.
Toda comunicação é via API REST ou webhooks.

3. Captação de Leads (Site → Radar)

┌──────────┐     POST /api/contato    ┌──────────┐
│  SITE    │ ──────────────────────►  │  SITE    │
│  Frontend│                          │  Backend │
│  :5173   │                          │  :4000   │
└──────────┘                          └────┬─────┘
                                           │
                                           │  Webhook POST /api/webhooks/novo-lead
                                           ▼
                                      ┌──────────┐
                                      │  RADAR   │
                                      │  Backend │
                                      │  :3001   │
                                      └──────────┘

Payload do webhook (formato obrigatório):

{
  "event": "lead.created",
  "timestamp": "2026-09-11T10:30:00Z",
  "data": {
    "nome": "João Silva",
    "email": "joao@empresa.com.br",
    "telefone": "(51) 99999-9999",
    "cnpj": "12.345.678/0001-95",
    "mensagem": "Gostaria de saber sobre os serviços",
    "origem": "formulario_contato",
    "utm_source": "google",
    "utm_medium": "cpc"
  },
  "signature": "hmac-sha256-do-payload"
}

⚠️ REGRA: O webhook DEVE ser assinado com HMAC-SHA256.
Chave compartilhada: WEBHOOK_SECRET no .env de ambos.

4. Portal do Cliente (Documentos)

┌──────────┐                          ┌──────────┐
│  SITE    │  GET /api/docs/:token    │  RADAR   │
│  Frontend│ ──────────────────────►  │  Backend │
│  :5173   │                          │  :3001   │
│          │  ◄────────────────────── │          │
│          │  { url: "...", meta: {} } │          │
└──────────┘                          └──────────┘

Links de documentos (formato obrigatório):

https://radar-api.contacerta.com.br/api/docs/download/{token}

Token: JWT assinado com:
{
  "sub": "uuid-do-documento",
  "clienteId": "uuid-do-cliente",
  "tipo": "DAS",
  "competencia": "2026-01",
  "exp": 1726617600  // expira em 7 dias
}

⚠️ REGRA: Links SEMPRE expiram. Nunca gerar links permanentes para documentos.
TTL padrão: 7 dias (configurável via DOC_LINK_TTL_DAYS no .env do Radar).

5. 🆕 Sistema de Envio com Tracking

┌──────────┐                          ┌──────────┐
│  SITE    │  Recebe email c/ link    │  RADAR   │
│  Cliente │ ──────────────────────►  │  Backend │
│  (email) │  GET /track/open/:id     │  :3001   │
│          │  GET /track/download/:id │          │
│          │                          │          │
│          │  ◄────────────────────── │          │
│          │  pixel.gif / arquivo.pdf │          │
└──────────┘                          └──────────┘

Endpoints de tracking (públicos, sem auth):

Endpoint
Método
Descrição
Retorno
/track/open/:envioId
GET
Registra abertura de email
GIF 1x1 transparente
/track/download/:envioId/:token
GET
Registra download + serve arquivo
Arquivo PDF/ZIP
/track/status/:envioId
GET
Status do envio (autenticado)
JSON com eventos

Fluxo de tracking:

1. Radar envia email com:
   - <img src="https://radar-api.contacerta.com.br/track/open/{envioId}" width="1" height="1">
   - <a href="https://radar-api.contacerta.com.br/track/download/{envioId}/{token}">Baixar</a>

2. Cliente abre email → browser carrega pixel → Radar registra "aberto"
3. Cliente clica no link → Radar registra "baixado" → serve o arquivo
4. Painel do Radar mostra timeline completa de eventos

⚠️ REGRA: Tracking pixel depende de domínio público (Cloudflare Tunnel).
Sem domínio público, apenas tracking de download funciona (via link proxy local).

🚀 Boot Unificado
O script Iniciar-Tudo.ps1 (vive no repositório Site-conta-certa) inicia TODO o ecossistema:

# Inicia tudo
.\Iniciar-Tudo.ps1

Ordem de inicialização:

1. ✅ Docker (PostgreSQL :5432 e :5433)
2. ✅ Backend do Site (Express :4000)
3. ✅ Frontend do Site (Vite :5173)
4. ✅ Backend do Radar (NestJS :3001)
5. ✅ Frontend do Radar (Next.js :3002)
6. ✅ Backend do Extrator (FastAPI :8000)
7. ✅ Frontend do Extrator (Vite :5174)

Healthchecks:

http://localhost:4000/health  → Site Backend
http://localhost:3001/health  → Radar Backend
http://localhost:8000/health  → Extrator Backend
http://localhost:5173         → Site Frontend
http://localhost:3002         → Radar Frontend
http://localhost:5174         → Extrator Frontend

Kill cirúrgico (ADR-103):

# Matar processo em porta específica
.\Iniciar-Tudo.ps1 -Kill 3001

# Matar todos
.\Iniciar-Tudo.ps1 -Stop

📋 Variáveis de Ambiente Compartilhadas
Estas variáveis DEVEM ser idênticas em ambos os repositórios:
Variável
Onde vive
Descrição
JWT_SECRET
Site .env + Radar .env
Chave de assinatura JWT
JWT_ISSUER
Site .env + Radar .env
Emissor do token (contacerta.com.br)
JWT_EXPIRATION
Site .env + Radar .env
Tempo de expiração (24h)
WEBHOOK_SECRET
Site .env + Radar .env
Chave HMAC para webhooks
CORS_ORIGIN
Radar .env
Deve incluir http://localhost:5173


Variáveis exclusivas do Radar:

Variável
Descrição
SENDGRID_API_KEY
Chave da API SendGrid (envio de emails)
SENDGRID_FROM_EMAIL
Email remetente (noreply@contacerta.com.br)
MISTRAL_API_KEY
Chave da API Mistral (OCR)
DOC_LINK_TTL_DAYS
Dias para expiração de links de documentos (default: 7)
WATCH_FOLDER_PATH
Caminho da pasta monitorada (Watch Folder)

Variáveis exclusivas do Site:
Variável
Descrição
SMTP_HOST
Host SMTP (formulário de contato)
SMTP_PORT
Porta SMTP
SMTP_USER
Usuário SMTP
SMTP_PASS
Senha SMTP
CLOUDFLARE_TUNNEL_TOKEN
Token do Cloudflare Tunnel

⚠️ REGRA: Arquivos .env NUNCA são commitados (ADR-032/059).
Cada desenvolvedor cria o seu a partir do .env.example.


🔄 Fluxo de Desenvolvimento Sincronizado
Cenário 1: Mudança SOMENTE no Site

# No repositório Site-conta-certa
git checkout -b feature/nova-pagina
# ... desenvolve ...
git add .
git commit -m "feat(site): adiciona página de serviços"
git push origin feature/nova-pagina
# Abre PR → merge → pronto

Cenário 2: Mudança SOMENTE no Rad

# No repositório radar-clone
git checkout -b feature/novo-relatorio
# ... desenvolve ...
git add .
git commit -m "feat(bi): adiciona relatório de rentabilidade"
git push origin feature/novo-relatorio
# Abre PR → merge → pronto


Cenário 3: Mudança que AFETA AMBOS ⚠️

# 1. Crie branch com MESMO NOME em ambos
# No Site-conta-certa:
git checkout -b feature/sso-v2

# No radar-clone:
git checkout -b feature/sso-v2

# 2. Desenvolva no Site primeiro (provider do SSO)
cd Site-conta-certa
# ... altera formato do JWT ...
git add .
git commit -m "feat(auth): atualiza payload JWT v2 [SYNC]"
git push origin feature/sso-v2

# 3. Depois adapte no Radar (consumer do SSO)
cd radar-clone
# ... adapta validação do JWT ...
git add .
git commit -m "feat(auth): adapta validação para JWT v2 [SYNC]"
git push origin feature/sso-v2

# 4. Merge AMBOS juntos (na mesma janela de tempo)
# ⚠️ NUNCA faça merge de um sem o outro!

⚠️ REGRA: Commits que afetam integração DEVEM ter [SYNC] no final.
Isso facilita buscar mudanças que precisam de sincronização.

Cenário 4: Hotfix de Produção 🚨

# 1. Identifique qual repositório tem o bug
# 2. Crie branch hotfix
git checkout -b hotfix/corrige-login

# 3. Corrija e teste localmente (com AMBOS os serviços rodando)
.\Iniciar-Tudo.ps1

# 4. Commit e push
git add .
git commit -m "fix(auth): corrige validação JWT expirado [HOTFIX]"
git push origin hotfix/corrige-login

# 5. Se afetou o outro repositório, repita lá
# 6. Merge direto na main (hotfix não espera PR review)

📊 Checklist de Sincronização
Antes de Cada Sprint
Ambos os repositórios estão na main atualizada
Variáveis de ambiente estão sincronizadas
Iniciar-Tudo.ps1 funciona sem erros
Todos os healthchecks passam
Este arquivo SYNC.md está idêntico em ambos os repos
Antes de Cada Commit
Testar localmente (todos os serviços rodando)
Verificar se a mudança afeta o outro repositório
Se afeta, criar branch com mesmo nome em ambos
Adicionar [SYNC] no commit se necessário
Antes de Cada Merge
Verificar se existe branch correspondente no outro repo
Se sim, mergear AMBOS na mesma janela de tempo
Rodar Iniciar-Tudo.ps1 e verificar healthchecks
Atualizar CHANGELOG.md em ambos (se aplicável)
Mensal (Manutenção)
Verificar se SYNC.md está idêntico em ambos
Limpar branches mergeadas em ambos os repos
Verificar se .env.example está atualizado em ambos
Verificar se ADRs estão sincronizadas
Backup dos bancos de dados
🧪 Testes de Integração
Teste 1: SSO (Login Unificado)

# 1. Faça login no Site (http://localhost:5173/login)
# 2. Copie o JWT do localStorage
# 3. Cole no Radar (http://localhost:3002) como Bearer token
# 4. Deve autenticar sem pedir login novamente
# ✅ PASS se o Radar reconhece o usuário
# ❌ FAIL se dá 401 Unauthorized

Teste 2: Webhook de Lead
# 1. Preencha o formulário de contato no Site
# 2. Verifique no Radar se o lead apareceu
curl http://localhost:3001/api/prospects?latest=true
# ✅ PASS se o lead aparece no Radar
# ❌ FAIL se não aparece ou aparece com dados errados

Teste 3: Link de Documento

# 1. No Radar, gere um link temporário para um documento
curl -H "Authorization: Bearer {jwt}" \
     http://localhost:3001/api/docs/generate-link/{docId}

# 2. Abra o link no Site (simulando o cliente)
# ✅ PASS se o documento é baixado
# ❌ FAIL se dá 403 ou 404
# ✅ PASS se link expira após 7 dias

Teste 4: Tracking de Email
# 1. No Radar, envie um email de teste (MODO LOG)
curl -X POST http://localhost:3001/api/email-envios \
     -H "Authorization: Bearer {jwt}" \
     -d '{"clienteId": "...", "templateId": "..."}'

# 2. Simule abertura (acesse o tracking pixel)
curl http://localhost:3001/track/open/{envioId}
# ✅ PASS se retorna GIF 1x1 e registra evento "aberto"

# 3. Simule download (acesse o link proxy)
curl http://localhost:3001/track/download/{envioId}/{token}
# ✅ PASS se retorna arquivo e registra evento "baixado"

# 4. Verifique o painel
curl http://localhost:3001/api/email-envios/{envioId}/tracking
# ✅ PASS se mostra timeline: enviado → aberto → baixado


🐛 Problemas Comuns de Sincronização
Problema: JWT inválido entre Site e Radar
Sintoma: Login no Site funciona, mas Radar rejeita o token
Causa: JWT_SECRET diferente nos .env
Solução: Sincronizar a mesma chave em ambos

Problema: CORS error ao chamar API do Radar

Sintoma: Frontend do Site não consegue chamar API do Radar
Causa: CORS_ORIGIN do Radar não inclui http://localhost:5173
Solução: Adicionar no .env do Radar:
CORS_ORIGIN=http://localhost:3002,http://localhost:5173,http://localhost:5174

Problema: Webhook não chega no Radar
Sintoma: Lead criado no Site não aparece no Radar
Causa: Radar não está rodando OU webhook URL errada
Solução:
1. Verificar se Radar backend está rodando (http://localhost:3001/health)
2. Verificar WEBHOOK_URL no .env do Site
3. Verificar logs do Site para ver se webhook foi disparado

Problema: Iniciar-Tudo.ps1 trava

Sintoma: Script não termina de iniciar todos os serviços
Causa: Porta ocupada por processo anterior (ADR-103)
Solução:
.\Iniciar-Tudo.ps1 -Stop
.\Iniciar-Tudo.ps1

Problema: Banco de dados em porta errada

Sintoma: Site conecta no banco do Radar ou vice-versa
Causa: DATABASE_URL apontando para porta errada
Solução:
- Site DEVE usar :5432 (PostgreSQL nativo)
- Radar DEVE usar :5433 (PostgreSQL Docker)
NUNCA misturar!

📚 Documentação Relacionada
No repositório Site-conta-certa:
README.md — Documentação do Site
CONTRIBUTING.md — Guia de contribuição do Site
No repositório radar-clone:
README.md — Documentação do Radar
CONTRIBUTING.md — Guia de contribuição do Radar
CONTEXTO_PROJETO.md — Contexto completo + ADRs
CHANGELOG.md — Histórico de sprints
PRODUCTION.md — Guia de deploy
🧠 Continuidade (Sistema de Memória para IA)
Para qualquer IA ou desenvolvedor que assumir este projeto:
Leia este arquivo PRIMEIRO para entender como os repositórios se conectam
Depois leia o README.md do repositório em que vai trabalhar
Depois leia o CONTEXTO_PROJETO.md do Radar (é o documento mais completo)
Regra de Ouro (ADR-030): Ações com risco legal ou contábil NUNCA são automáticas
Regra de Sincronização: Mudanças que afetam integração DEVEM ter [SYNC] no commit
Regra de Boot: Sempre use Iniciar-Tudo.ps1 para iniciar todo o ecossistema
Regra de Banco: Site usa :5432 (real), Radar usa :5433 (Docker). NUNCA misturar.
📞 Suporte
Desenvolvedor: Marcos Toledo
Email: dev@contacerta.com.br
GitHub: @Mtoledo50
📄 Licença
Este projeto é proprietário da Conta Certa Soluções Empresariais. Todos os direitos reservados.
Última atualização: 11/09/2026
Versão do SYNC.md: 1.0.0


---

## 📋 **INSTRUÇÕES PARA COMMITAR O SYNC.md**

```bash
# 1. No repositório Site-conta-certa
cd Site-conta-certa
# Crie o arquivo SYNC.md com o conteúdo acima
git add SYNC.md
git commit -m "docs: adiciona SYNC.md para sincronização com Radar [SYNC]"
git push origin main

# 2. No repositório radar-clone
cd radar-clone
# Crie o MESMO arquivo SYNC.md (conteúdo idêntico)
git add SYNC.md
git commit -m "docs: adiciona SYNC.md para sincronização com Site [SYNC]"
git push origin main

✅ RESUMO DO QUE FOI ENTREGUE HOJE
#
Arquivo
Repositório
Status
1
README.md
Site-conta-certa
✅ Pronto para commitar
2
CONTRIBUTING.md
Site-conta-certa
✅ Pronto para commitar
3
README.md
radar-clone
✅ Pronto para commitar
4
CONTRIBUTING.md
radar-clone
✅ Pronto para commitar
5
SYNC.md
AMBOS (idêntico)
✅ Pronto para commitar

