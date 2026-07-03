export default function About() {
  const cidades = [
    'Alvorada',
    'Cachoeirinha',
    'Viamão',
    'Gravataí',
    'Porto Alegre',
    'Torres/RS',
  ]

  return (
    <section className="section" id="sobre">
      <div className="container about">
        <div>
          <h2>Sobre a Conta Certa</h2>
          <p>
            Nascemos em Alvorada com um propósito claro: fazer contabilidade
            <strong> de verdade</strong> — daquelas que o empresário entende,
            confia e vê resultado.
          </p>
          <p>
            Atendemos MEIs que estão começando, microempresas em crescimento e
            negócios que precisam de um parceiro contábil presente, não apenas
            um gerador de guias. Nosso atendimento é próximo, humano e direto
            ao ponto.
          </p>
          <p>
            <strong>Atendemos toda a região metropolitana de Porto Alegre</strong> e
            também clientes em Torres/RS, sempre com a mesma qualidade e
            agilidade.
          </p>
        </div>

        <div className="info-box">
          <p><strong>📍 Endereço:</strong> Av. Pátria, 287 - Alvorada/RS</p>
          <p><strong>💬 WhatsApp:</strong> (51) 98438-3203</p>
          <p><strong>🎯 Especialidade:</strong> MEI, regularização, impostos e suporte empresarial</p>
          <p><strong>️ Cidades atendidas:</strong></p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
            {cidades.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}