const plans = [  {
    title: 'MEI Essencial',
    price: 'R$ 49,90/mês',
    description: 'Para o microempreendedor que quer suporte prático e acessível.',
    items: [      'Abertura e regularização',
      'Emissão do DAS',
      'Declaração anual',
      'Controle de faturamento',
      'Suporte básico'
    ]
  },
  {
    title: 'Microempresa',
    price: 'Sob consulta',
    description: 'Para negócios em crescimento que precisam de maior suporte.',
    items: [      'Escrituração contábil',
      'Folha de pagamento',
      'Obrigações acessórias',
      'Apoio fiscal',
      'Relatórios gerenciais'
    ]
  },
  {
    title: 'Empresarial Premium',
    price: 'Sob consulta',
    description: 'Para empresas que buscam acompanhamento estratégico completo.',
    items: [      'Planejamento tributário',
      'Consultoria contínua',
      'Acompanhamento personalizado',
      'Suporte prioritário',
      'Gestão contábil completa'
    ]
  }
]

export default function Plans() {
  return (
    <section className="section section-alt" id="planos">
      <div className="container">
        <h2>Planos por complexidade</h2>
        <div className="grid">
          {plans.map((plan) => (
            <article className="card plan-card" key={plan.title}>
              <h3>{plan.title}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
