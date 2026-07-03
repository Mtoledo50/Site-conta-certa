import { MapPin } from 'lucide-react'

const cidades = [
  { nome: 'Alvorada', destaque: true, descricao: 'Sede do escritório' },
  { nome: 'Cachoeirinha', destaque: false, descricao: 'Região Metropolitana' },
  { nome: 'Viamão', destaque: false, descricao: 'Região Metropolitana' },
  { nome: 'Gravataí', destaque: false, descricao: 'Região Metropolitana' },
  { nome: 'Porto Alegre', destaque: false, descricao: 'Capital e região' },
  { nome: 'Torres/RS', destaque: false, descricao: 'Litoral Norte' },
]

export default function AreasAtendimento() {
  return (
    <section className="section section-alt" id="areas">
      <div className="container">
        <h2>Onde estamos e onde atendemos</h2>
        <p className="section-subtitle">
          Nosso escritório fica em Alvorada, mas atendemos clientes em toda a região metropolitana e litoral norte.
        </p>

        <div className="grid" style={{ marginTop: '2.5rem' }}>
          {cidades.map((cidade) => (
            <div
              key={cidade.nome}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderLeft: cidade.destaque ? '4px solid var(--ambar)' : 'none',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: cidade.destaque ? 'var(--ambar-claro)' : 'var(--creme)',
                  color: cidade.destaque ? 'var(--ambar-escuro)' : 'var(--azul-profundo)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{cidade.nome}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--cinza-suave)', margin: 0 }}>
                  {cidade.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}