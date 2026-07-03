import { useState } from 'react'

export default function Contact() {
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Quero falar com a Conta Certa Contabilidade.'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'MEI',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('enviando')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sucesso')
        setForm({ name: '', email: '', phone: '', service: 'MEI', message: '' })
      } else {
        setStatus('erro')
      }
    } catch {
      setStatus('erro')
    }
  }

  return (
    <section className="section section-contact" id="contato">
      <div className="container contact">
        <div>
          <h2>Fale com a gente</h2>
          <p>
            Tire suas dúvidas, peça um orçamento ou descubra o plano ideal
            para o seu negócio. Respondemos em até 1 dia útil.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a
              className="btn btn-whatsapp"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
               Chamar no WhatsApp
            </a>
          </div>
        </div>

        <form className="hero-card" onSubmit={handleSubmit} style={{ color: 'var(--grafite)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--azul-profundo)' }}>
            Envie sua mensagem
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Seu e-mail (opcional)"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="MEI">Sou MEI</option>
            <option value="Microempresa">Microempresa</option>
            <option value="Empresa">Empresa (EPP/LTDA)</option>
            <option value="Outro">Outro assunto</option>
          </select>

          <textarea
            name="message"
            placeholder="Como podemos te ajudar?"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'enviando'}
            style={{ width: '100%' }}
          >
            {status === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {status === 'sucesso' && (
            <p style={{ color: 'var(--verde-musgo)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              ✅ Mensagem enviada! Entraremos em contato em breve.
            </p>
          )}
          {status === 'erro' && (
            <p style={{ color: '#c0392b', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              ❌ Erro ao enviar. Tente pelo WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  marginBottom: '0.8rem',
  border: '1px solid var(--cinza-borda)',
  borderRadius: '8px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.95rem',
  background: 'var(--off-white)',
  color: 'var(--grafite)',
  outline: 'none',
  transition: 'border-color 0.2s',
}