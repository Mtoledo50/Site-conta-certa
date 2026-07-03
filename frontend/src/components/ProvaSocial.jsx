import { useState, useEffect } from 'react'
import { Users, Calendar, MapPin, Award, Shield, CheckCircle } from 'lucide-react'
import './ProvaSocial.css'

const numeros = [
  {
    icone: <Users size={28} />,
    valor: '+10.000',
    label: 'Clientes atendidos',
    descricao: 'MEIs e empresas confiam na Conta Certa',
  },
  {
    icone: <Calendar size={28} />,
    valor: '+20',
    label: 'Anos de experiência',
    descricao: 'Atuando no mercado contábil gaúcho',
  },
  {
    icone: <MapPin size={28} />,
    valor: '6',
    label: 'Cidades atendidas',
    descricao: 'Alvorada, Cachoeirinha, Viamão e mais',
  },
  {
    icone: <Award size={28} />,
    valor: 'CRC',
    label: 'Registro ativo',
    descricao: 'Contadores registrados no Conselho Regional',
  },
]

// ============================================
// 📝 DEPOIMENTOS - EDITE AQUI!
// ============================================
const todosDepoimentos = [
  // Depoimentos gerais
  {
    nome: 'Ana Paula S.',
    cargo: 'MEI - Loja de Roupas',
    cidade: 'Alvorada',
    texto: 'Finalmente encontrei um escritório que explica tudo de forma simples. Antes eu tinha medo de abrir meu MEI, hoje me sinto segura com o suporte da Conta Certa.',
    avaliacao: 5,
    tipo: 'geral',
  },
  {
    nome: 'Carlos M.',
    cargo: 'Dono de Restaurante',
    cidade: 'Cachoeirinha',
    texto: 'Troquei de contador e a diferença foi enorme. Agora tenho relatórios claros e consigo tomar decisões com base em números reais. Recomendo demais!',
    avaliacao: 5,
    tipo: 'geral',
  },
  {
    nome: 'Juliana R.',
    cargo: 'Prestadora de Serviços',
    cidade: 'Viamão',
    texto: 'Atendimento rápido pelo WhatsApp, preço justo e zero burocracia. Para quem está começando, é o escritório ideal.',
    avaliacao: 5,
    tipo: 'geral',
  },
  // ✅ DEPOIMENTOS BPO FISCAL
  {
    nome: 'Roberto K.',
    cargo: 'MEI - Designer Gráfico',
    cidade: 'Porto Alegre',
    texto: 'Terceirizar a emissão das minhas notas foi a melhor decisão. Antes eu perdia horas tentando entender o sistema, agora a Conta Certa faz tudo para mim. Consigo focar no meu trabalho criativo!',
    avaliacao: 5,
    tipo: 'bpo',
  },
  {
    nome: 'Martha L.',
    cargo: 'Dona de Loja de Cosméticos',
    cidade: 'Gravataí',
    texto: 'O BPO Fiscal da Conta Certa salvou meu negócio! Eu mesma emitia notas erradas e tinha medo da fiscalização. Hoje eles cuidam de tudo, tenho relatórios mensais e durmo tranquila.',
    avaliacao: 5,
    tipo: 'bpo',
  },
  {
    nome: 'Maurício P.',
    cargo: 'MEI - Analista em Informática',
    cidade: 'Alvorada',
    texto: 'Contratei o plano Prime de BPO e valeu cada centavo. Emito até 30 notas por mês sem preocupação. Quando preciso de algo, o atendimento é rápido e sempre me explicam tudo direitinho.',
    avaliacao: 5,
    tipo: 'bpo',
  },
]
// ============================================

const selos = [
  {
    icone: <Shield size={32} />,
    titulo: 'CRC Ativo',
    descricao: 'Registro no Conselho Regional de Contabilidade',
  },
  {
    icone: <CheckCircle size={32} />,
    titulo: 'Sigilo Garantido',
    descricao: 'Seus dados protegidos por ética profissional',
  },
  {
    icone: <Award size={32} />,
    titulo: 'Atendimento Humanizado',
    descricao: 'Linguagem simples, sem "contabilês"',
  },
]

export default function ProvaSocial() {
  const [depoimentosExibidos, setDepoimentosExibidos] = useState([])

  useEffect(() => {
    const selecionar = () => {
      const embaralhados = [...todosDepoimentos].sort(() => Math.random() - 0.5)
      setDepoimentosExibidos(embaralhados.slice(0, 3))
    }
    
    selecionar()
    const intervalo = setInterval(selecionar, 15000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <>
      {/* NÚMEROS */}
      <section className="section stats-section">
        <div className="container">
          <h2>Por que escolher a Conta Certa?</h2>
          <p className="section-subtitle">
            Números que refletem nosso compromisso com seu negócio
          </p>
          <div className="stats-grid">
            {numeros.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-icon">{item.icone}</div>
                <div className="stat-valor">{item.valor}</div>
                <div className="stat-label">{item.label}</div>
                <div className="stat-desc">{item.descricao}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="section section-alt depoimentos-section">
        <div className="container">
          <h2>O que nossos clientes dizem</h2>
          <p className="section-subtitle">
            Histórias reais de quem confia na Conta Certa
          </p>
          <div className="depoimentos-grid">
            {depoimentosExibidos.map((dep, index) => (
              <article key={index} className="depoimento-card">
                {dep.tipo === 'bpo' && (
                  <span className="badge-bpo">BPO Fiscal</span>
                )}
                <div className="depoimento-estrelas">
                  {[...Array(dep.avaliacao)].map((_, i) => (
                    <span key={i} className="estrela">★</span>
                  ))}
                </div>
                <p className="depoimento-texto">"{dep.texto}"</p>
                <div className="depoimento-autor">
                  <div className="autor-avatar">
                    {dep.nome.charAt(0)}
                  </div>
                  <div>
                    <strong>{dep.nome}</strong>
                    <span>{dep.cargo} • {dep.cidade}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="depoimento-aviso">
            * Depoimentos Reais de Clientes que tiveram uma real transformação em seus negócios com nossa ajuda.
          </p>
        </div>
      </section>

      {/* SELOS DE CONFIANÇA */}
      <section className="section selos-section">
        <div className="container">
          <h2>Nosso compromisso com você</h2>
          <p className="section-subtitle">
            Valores que guiam nosso atendimento diário
          </p>
          <div className="selos-grid">
            {selos.map((selo) => (
              <div key={selo.titulo} className="selo-card">
                <div className="selo-icon">{selo.icone}</div>
                <h3>{selo.titulo}</h3>
                <p>{selo.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}