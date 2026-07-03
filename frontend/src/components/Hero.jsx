import wallpaper from '../assets/wallpaper-ondas.png'

export default function Hero() {
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Quero um orçamento da Conta Certa.'

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
          <span className="badge">👋 Especialistas em MEI e pequenas empresas</span>

          <h2>
            Cuidamos dos números para você cuidar do que ama
          </h2>

          <p>
            Somos um escritório contábil de Alvorada que atende MEIs,
            microempresas e negócios em crescimento com atendimento próximo,
            linguagem simples e preço justo. Sem burocracia desnecessária —
            só o que faz seu negócio andar.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-whatsapp"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Falar com um contador
            </a>
            <a className="btn btn-secondary" href="#planos">
              Ver planos e preços
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h3>Plano MEI</h3>
          <strong>R$ 49,90/mês</strong>
          <p>Ideal para quem está começando e quer tudo em dia.</p>
          <ul>
            <li>Emissão do DAS mensal</li>
            <li>Declaração anual (DASN-SIMEI)</li>
            <li>Controle de faturamento</li>
            <li>Suporte para emissão de notas</li>
          </ul>
        </div>
      </div>
    </section>
  )
}