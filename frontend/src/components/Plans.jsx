import { useState } from 'react'
import './Plans.css'

const linhas = {
  contabil: {
    id: 'contabil',
    label: 'Assessoria Contábil',
    subtitle: 'Contabilidade completa para sua empresa',
    planos: [
      {
        nome: 'Start',
        cor: 'start',
        preco: 'R$ 349',
        precoInfo: '/mês + R$ 30 por empregado',
        indicado: 'MEI em desenquadramento, ME e prestadores de serviços com baixa movimentação',
        itens: [
          'Abertura de empresa ou troca de contador',
          'Contabilidade mensal completa',
          'Fiscal e tributário',
          'Folha de pagamento',
          'Obrigações acessórias',
          'Atendimento consultivo básico',
        ],
        destaque: false,
      },
      {
        nome: 'Prime',
        cor: 'prime',
        preco: 'R$ 699',
        precoInfo: '/mês + R$ 40 por empregado',
        indicado: 'Empresas em crescimento, comércio e serviços com maior volume fiscal',
        itens: [
          'Todos os benefícios do Start',
          'Planejamento tributário periódico',
          'Reuniões de acompanhamento',
          'Indicadores gerenciais',
          'Suporte prioritário',
        ],
        destaque: true,
      },
      {
        nome: 'Black',
        cor: 'black',
        preco: 'R$ 1.500',
        precoInfo: '/mês + R$ 65 por empregado',
        indicado: 'Empresas estruturadas que buscam gestão contábil estratégica',
        itens: [
          'Todos os benefícios do Prime',
          'Gestão contábil completa',
          'Consultoria estratégica contínua',
          'Atendimento dedicado',
          'Relatórios executivos personalizados',
        ],
        destaque: false,
      },
    ],
  },
  bpoMei: {
    id: 'bpoMei',
    label: 'BPO Fiscal MEI',
    subtitle: 'Terceirização fiscal para microempreendedores',
    planos: [
      {
        nome: 'Start',
        cor: 'start',
        preco: 'R$ 180',
        precoInfo: '/mês • até 10 notas',
        indicado: 'MEI com poucas emissões mensais',
        itens: [
          'Emissão de notas fiscais',
          'Controle básico das receitas',
          'Apoio à DAS mensal',
        ],
        destaque: false,
      },
      {
        nome: 'Prime',
        cor: 'prime',
        preco: 'R$ 290',
        precoInfo: '/mês • até 30 notas',
        indicado: 'MEI em crescimento com volume moderado',
        itens: [
          'Emissão de notas fiscais',
          'Controle de faturamento',
          'Relatório mensal simplificado',
          'Suporte ao MEI',
        ],
        destaque: true,
      },
      {
        nome: 'Black',
        cor: 'black',
        preco: 'R$ 490',
        precoInfo: '/mês • até 60 notas',
        indicado: 'MEI com operação mais intensa',
        itens: [
          'Emissão de notas',
          'Controle financeiro básico',
          'Relatórios gerenciais',
          'Atendimento prioritário',
        ],
        destaque: false,
      },
    ],
  },
  bpoEmpresa: {
    id: 'bpoEmpresa',
    label: 'BPO Fiscal Empresas',
    subtitle: 'Terceirização fiscal para ME, EPP e LTDA',
    planos: [
      {
        nome: 'Start',
        cor: 'start',
        preco: 'R$ 490',
        precoInfo: '/mês • até 30 notas',
        indicado: 'Empresas com baixo volume de notas fiscais',
        itens: [
          'Emissão de NF-e/NFS-e',
          'Controle fiscal básico',
          'Conferência de tributos',
        ],
        destaque: false,
      },
      {
        nome: 'Prime',
        cor: 'prime',
        preco: 'R$ 890',
        precoInfo: '/mês • até 100 notas',
        indicado: 'Empresas em crescimento com volume fiscal médio',
        itens: [
          'Emissão de notas',
          'Lançamentos fiscais',
          'Controle de documentos',
          'Relatórios mensais',
        ],
        destaque: true,
      },
      {
        nome: 'Black',
        cor: 'black',
        preco: 'R$ 1.690',
        precoInfo: '/mês • até 300 notas',
        indicado: 'Empresas estruturadas com alta operação fiscal',
        itens: [
          'Operação fiscal completa',
          'Conferências periódicas',
          'Relatórios gerenciais',
          'Atendimento prioritário',
        ],
        destaque: false,
      },
    ],
  },
}

export default function Plans() {
  const [ativa, setAtiva] = useState('contabil')
  const linha = linhas[ativa]

  const whatsapp = (plano) => {
    const msg = `Olá! Tenho interesse no plano ${plano.nome} da linha ${linha.label}.`
    return `https://wa.me/+5551984383203?text=${encodeURIComponent(msg)}`
  }

  return (
    <section className="section plans-section" id="planos">
      <div className="container">
        <h2>Portfólio de Soluções</h2>
        <p className="section-subtitle">
          Escolha a linha ideal para o momento do seu negócio
        </p>

        {/* TABS */}
        <div className="plans-tabs">
          {Object.values(linhas).map((l) => (
            <button
              key={l.id}
              className={`tab-btn ${ativa === l.id ? 'active' : ''}`}
              onClick={() => setAtiva(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="plans-subtitle">{linha.subtitle}</p>

        {/* CARDS */}
        <div className="plans-grid">
          {linha.planos.map((plano) => (
            <article
              key={plano.nome}
              className={`plan-card ${plano.cor} ${plano.destaque ? 'destaque' : ''}`}
            >
              {plano.destaque && <span className="badge-destaque">Mais escolhido</span>}

              <div className="plan-header">
                <h3 className={`plan-nome ${plano.cor}`}>{plano.nome}</h3>
                <div className="plan-preco">
                  <span className="preco-valor">{plano.preco}</span>
                  <span className="preco-info">{plano.precoInfo}</span>
                </div>
                <p className="plan-indicado">{plano.indicado}</p>
              </div>

              <ul className="plan-itens">
                {plano.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a
                className={`btn ${plano.destaque ? 'btn-primary' : 'btn-secondary'} plan-cta`}
                href={whatsapp(plano)}
                target="_blank"
                rel="noreferrer"
              >
                Quero esse plano
              </a>
            </article>
          ))}
        </div>

        {/* EXCEDENTES */}
        <div className="excedentes-box">
          <h4>Notas excedentes</h4>
          <p>
            Ultrapassou o limite do seu plano? Sem problema. Cada nota excedente
            custa <strong>a partir de R$ 2,50</strong>. Fale com a gente para
            avaliar o upgrade para o próximo nível.
          </p>
        </div>

        {/* CTA FINAL */}
        <div className="plans-cta-final">
          <p>Não sabe qual plano é o ideal para você?</p>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/+5551984383203?text=${encodeURIComponent('Olá! Quero ajuda para escolher o plano ideal.')}`}
            target="_blank"
            rel="noreferrer"
          >
            Falar com um especialista
          </a>
        </div>
      </div>
    </section>
  )
}