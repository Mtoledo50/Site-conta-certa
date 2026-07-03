import wallpaper from '../assets/wallpaper-ondas.png'  // ← única adição

export default function Hero() {
  const whatsapp = 'https://wa.me/551984383203?text=Olá! Quero um orçamento do plano MEI.'

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container hero-grid">
        <div>
          <span className="badge">Especialistas em MEI</span>
          <h2>Contabilidade clara, acessível e feita para o crescimento do seu negócio</h2>
          <p>
            A Conta Certa Contabilidade atende MEIs, microempresas e empresas que precisam de regularização,
            gestão fiscal, folha de pagamento e acompanhamento profissional.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">Quero orçamento</a>
            <a className="btn btn-secondary" href="#planos">Ver planos</a>
          </div>
        </div>

        <div className="hero-card">
          <h3>Plano MEI</h3>
          <strong>R$ 49,90/mês</strong>
          <p>Ideal para quem quer suporte prático e econômico.</p>
          <ul>
            <li>DAS mensal</li>
            <li>DASN-SIMEI</li>
            <li>Controle de faturamento</li>
            <li>Suporte para emissão de notas</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
