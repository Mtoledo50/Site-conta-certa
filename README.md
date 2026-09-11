# 🌐 Site Conta Certa — Landing Page e Portal Público

**Portal público da Conta Certa Soluções Empresariais — apresentação de serviços, captação de leads e acesso ao portal do cliente.**

---

## 📖 Sobre o Projeto

O **Site Conta Certa** é o portal público da empresa, responsável por:
- Apresentar os serviços contábeis
- Captar novos clientes (lead generation)
- Fornecer acesso ao Portal do Cliente (Área VIP)
- Integrar com o Radar (sistema interno)

---

## 🏗️ Arquitetura

### **Stack Tecnológica**
- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Banco de Dados**: PostgreSQL 15+ (compartilhado com o Site)
- **Deploy**: Docker + Cloudflare Tunnel

### **Portas de Desenvolvimento**
| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Frontend (Vite) | 5173 | Interface do site público |
| Backend (Express) | 4000 | API do site |
| PostgreSQL | 5432 | Banco de dados (DADOS REAIS) |

---

## 📂 Estrutura de Pastas
site-conta-certa/
├── frontend/ # Frontend Vite + React
│ ├── src/
│ │ ├── components/ # Componentes reutilizáveis
│ │ ├── pages/ # Páginas do site
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # Chamadas à API
│ │ └── App.jsx
│ └── vite.config.js
├── backend/ # Backend Express
│ ├── src/
│ │ ├── controllers/ # Controllers das rotas
│ │ ├── services/ # Lógica de negócio
│ │ ├── models/ # Modelos de dados
│ │ ├── routes/ # Rotas da API
│ │ └── app.js
│ └── package.json
├── cloudflared/ # Configuração do Cloudflare Tunnel
├── nginx/ # Configuração do Nginx (produção)
├── postgres/ # Scripts SQL e backups
├── logs/ # Logs da aplicação
├── docker-compose.yml # Orquestração Docker
└── Iniciar-Tudo.ps1 # Script de boot unificado

---

## 🚀 Como Rodar Localmente

### **Pré-requisitos**
- Node.js 18+
- PostgreSQL 15+
- Docker (opcional)

### **Passo a Passo**

1. **Clone o repositório**
```bash
git clone https://github.com/Mtoledo50/Site-conta-certa.git
cd Site-conta-certa

Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

Inicie os serviços

# PowerShell
.\Iniciar-Tudo.ps1

Ou manualmente:

# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev

Acesse
Frontend: http://localhost:5173
Backend: http://localhost:4000

🔗 Integração com o Radar

sequenceDiagram
    Cliente->>Site: Login (email + senha)
    Site->>Backend: POST /auth/login
    Backend->>PostgreSQL: Valida credenciais
    PostgreSQL-->>Backend: Dados do cliente
    Backend-->>Site: JWT token
    Site->>Radar: Redirect com JWT
    Radar->>Backend: Valida JWT
    Backend-->>Radar: Dados do cliente
    Radar-->>Cliente: Dashboard do cliente

O Site Conta Certa se integra com o Radar (sistema interno) via:
1. Portal do Cliente
Login unificado (SSO)
Compartilhamento de sessão JWT
Redirecionamento para o Radar após autenticação
2. Captação de Leads
Formulários de contato salvam no banco do Radar
Notificação automática para a equipe comercial
Criação de prospect no CRM do Radar
3. Área Pública de Documentos
Links temporários para documentos do Radar
Validação de token via API do Radar
Expiração automática (7 dias)

📊 Funcionalidades
Páginas Públicas
Home (apresentação da empresa)
Sobre Nós (história e valores)
Serviços (lista de serviços contábeis)
Blog (artigos e novidades)
Contato (formulário + mapa)
FAQ (perguntas frequentes)
Área do Cliente
Login/Logout
Recuperação de senha
Dashboard do cliente
Visualização de documentos
Download de guias (DAS, DARF, etc.)
Upload de documentos
Chat com contador
Notificações
Funcionalidades do Backend
API RESTful
Autenticação JWT
Validação de formulários
Envio de e-mails (contato, recuperação de senha)
Upload de arquivos
Logs de auditoria
🗺️ Roadmap
Fase 1 — MVP (Concluído)
✅ Landing page básica
✅ Formulário de contato
✅ Login do cliente
✅ Dashboard básico
Fase 2 — Portal do Cliente (Em andamento)
🚧 Upload de documentos
🚧 Chat com contador
🚧 Notificações push
🚧 Visualização de documentos
Fase 3 — Marketing e SEO (Próximo)
⏳ Blog integrado
⏳ SEO otimizado
⏳ Google Analytics
⏳ Integração com redes sociais
Fase 4 — Automação (Futuro)
⏳ Chatbot de atendimento
⏳ Agendamento de reuniões
⏳ Pagamento de honorários online
⏳ Assinatura digital

🛠️ Tecnologias Utilizadas

Camada              Tecnologia
Frontend            Vite, React 19, Tailwind CSS, Axios
Backend             Node.js, Express, JWT, bcrypt
Banco de Dados      PostgreSQL 15+
Deploy              Docker, Cloudflare Tunnel, Nginx
Monitoramento       Logs customizados

📝 Convenções de Código
Frontend    
Componentes funcionais com hooks
Nomes de componentes em PascalCase
Arquivos .jsx para componentes, .js para utilitários
Estilização com Tailwind CSS (classes utilitárias)
Backend
Arquitetura MVC (Model-View-Controller)
Nomes de arquivos em kebab-case
Rotas RESTful
Validação com Joi/Express-Validator
🔒 Segurança
HTTPS obrigatório (Cloudflare)
Senhas com bcrypt (hash + salt)
JWT com expiração (24h)
CORS configurado
Rate limiting
Validação de inputs
Sanitização de dados
2FA/MFA (planejado)
🐛 Troubleshooting
Problema: Porta 5173 já em uso

# Encontre o processo
netstat -ano | findstr :5173

# Mate o processo
taskkill /PID <PID> /F

Problema: Banco de dados não conecta
# Verifique se o PostgreSQL está rodando
docker ps

# Reinicie o container
docker-compose restart postgres

Problema: CORS error
Verifique se o .env do backend tem:
CORS_ORIGIN=http://localhost:5173

📞 Suporte
Desenvolvedor: Marcos Toledo
Email: dev@contacerta.com.br
GitHub: @Mtoledo50
📄 Licença
Este projeto é proprietário da Conta Certa Soluções Empresariais. Todos os direitos reservados.
🤝 Contribuindo
Este é um projeto privado. Para contribuir:
Crie uma branch: git checkout -b feature/nova-funcionalidade
Commit suas mudanças: git commit -m 'feat: adiciona nova funcionalidade'
Push para a branch: git push origin feature/nova-funcionalidade
Abra um Pull Request
Última atualização: 11/09/2026


---

## 🔄 **README DE SINCRONIZAÇÃO DOS PROJETOS**

Criei um documento para manter os dois repositórios sincronizados:

```markdown
# 🔄 SINCRONIZAÇÃO RADAR ↔ SITE CONTA CERTA

**Guia para manter os repositórios radar-clone e Site-conta-certa sincronizados e integrados.**

---

## 📊 Visão Geral do Ecossistema

┌─────────────────────────────────────────────────────────┐
│ ECOSSISTEMA CONTA CERTA │
├─────────────────────────────────────────────────────────┤
│ │
│ 🌐 Site Conta Certa 📊 Radar │
│ (Público) (Interno) │
│ - Landing page - Gestão do escritório │
│ - Captação de leads - Operação mensal │
│ - Portal do cliente - Extrator bancário │
│ │
│ Frontend: Vite (5173) Frontend: Next.js (3002) │
│ Backend: Express (4000) Backend: NestJS (3001) │
│ DB: PostgreSQL (5432) DB: PostgreSQL (5433) │
│ │
│ 🏦 Extrator Bancário │
│ (App Irmã) │
│ - OCR de PDFs │
│ - Parsing de extratos │
│ - Geração de CSV │
│ │
│ Frontend: Vite (5174) │
│ Backend: FastAPI (8000) │
│ │
└─────────────────────────────────────────────────────────┘

---

## 🔗 Pontos de Integração

### **1. Autenticação Unificada (SSO)**
- **Site** → Gera JWT após login do cliente
- **Radar** → Valida JWT e cria sessão
- **Compartilhamento**: Mesma secret key no `.env`

env
.env (ambos os projetos)
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_EXPIRATION=24h


### **2. Banco de Dados**
- **Site**: Usa PostgreSQL nativo (porta 5432) — DADOS REAIS
- **Radar**: Usa PostgreSQL Docker (porta 5433) — Banco virgem
- **Extrator**: Compartilha dados com o Radar

### **3. Portal do Cliente**
- Site redireciona para Radar após login
- Radar valida token e carrega dados do cliente
- Logout em um sistema faz logout em ambos

### **4. Captação de Leads**
- Formulários do Site → API do Site → Banco compartilhado
- Radar lê prospects do banco e notifica equipe comercial

---

## 🚀 Boot Unificado

O script `Iniciar-Tudo.ps1` inicia todos os serviços:

```powershell
# Inicia tudo
.\Iniciar-Tudo.ps1

# Para tudo
.\Iniciar-Tudo.ps1 -Stop

# Reinicia tudo
.\Iniciar-Tudo.ps1 -Restart

Serviços iniciados:
PostgreSQL (Docker)
Backend do Site (Express - 4000)
Frontend do Site (Vite - 5173)
Backend do Radar (NestJS - 3001)
Frontend do Radar (Next.js - 3002)
Backend do Extrator (FastAPI - 8000)
Frontend do Extrator (Vite - 5174)

📋 Checklist de Sincronização
Antes de Commitar
Testar localmente (todos os serviços)
Verificar variáveis de ambiente
Atualizar documentação
Rodar testes (se houver)
Verificar se não quebrou integração
Ao Commitar
Usar conventional commits: feat:, fix:, docs:, refactor:
Referenciar issues (se houver)
Commitar em ambos os repositórios (se afetar integração)
Após Commitar
Verificar CI/CD (se configurado)
Testar em staging
Notificar equipe (se breaking change)
🔄 Fluxo de Desenvolvimento
Nova Funcionalidade

1. Criar branch em AMBOS os repositórios
   git checkout -b feature/nova-funcionalidade

2. Desenvolver no Site (se necessário)
   cd Site-conta-certa
   # código...
   git add .
   git commit -m "feat: adiciona nova funcionalidade no site"
   git push

3. Desenvolver no Radar (se necessário)
   cd radar-clone
   # código...
   git add .
   git commit -m "feat: integra nova funcionalidade no radar"
   git push

4. Testar integração localmente
   .\Iniciar-Tudo.ps1

5. Abrir PRs em ambos os repositórios

Bug Fix
1. Identificar qual repositório tem o bug
2. Corrigir no repositório afetado
3. Testar se não quebrou integração
4. Se afetou o outro repositório, corrigir lá também
5. Commitar e push

📊 Versionamento
Ambos os projetos de seguir Semantic Versioning:
MAJOR (1.0.0 → 2.0.0): Breaking changes
MINOR (.1 → 2.2.0): Novas funcionalidades (backward (2.2): Bug fixes (2Tag de Release:**: bash
Criar tag
git tag -a v2m0: Primeira de lançamento
Push taggit push origin v1.0.0
Cri push origin v

---

## 🐛 Troubleshooting demas Comuns

### **Problema: CORS Error**
**Causa**: Site não acess**
```env
# .env do backend do Radar (3.env do backend do Radar)


#env
CORS_ORIGIN=http://localhost:5173,http://localhost:3002

### **Problema: JWT Inválido**
**Sincronização**
-
JWT_SECRET=sua_chavesuper_secreta_aqui
JWT_ISS

### **Problema: Banco não**
### **
 de Dados não Conflito de Verificar portas
```bash
# Site
Radar
Radar usa (5432)

---

## 📚 Alertas Críticos

### **NUNCA COMMITAR**
- **NUNCA commitar `.env` com dados
- [ ] **NUNCA usar dados reais em- [ ] **SEMPRE test** dados de produção em produção sem homolog backup
- [ ] **SEMPRE testar integração após push**

---

## 📚ado Contato
- **Emailto
- **GitHub
- **GitHub**: [@Mtoledo50](https://github.com/Mtoledo50)

---

## 📄 Documentação Relacion

ltima atualização**: 11/09 atualizado**:/2026
📋 PRÓXIMOS PASSOS RECOMENDADOS
Imediato (Hoje)
✅ **Documentar oriar o README de Sincronização dos projetos
✅ Cri Documentar o módulo de envio com tracking no Radar
📝 Atualizar o CHANGELOG dos dois repositórios
Curto (Essa Semana)
📝 Cri a documentação de APIs (Swagger)
🛠️ Criar guias de desenvolvimento
Criar guias de deploy
📊 Documentar o módulo de envio com tracking
Médio Prazo (Esse Mês)
🔒 Documentação de segurança e LGPD
📈 Métricas e monitoramento
🧪 Testes automatizados (se não houver)
📚 Documentação completa do Extrator Bancário
