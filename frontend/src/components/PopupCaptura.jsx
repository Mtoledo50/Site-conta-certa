import { useState, useEffect } from 'react'
import { X, Gift, Download, CheckCircle } from 'lucide-react'
import './PopupCaptura.css'

export default function PopupCaptura() {
  const [aberto, setAberto] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nome: '', whatsapp: '' })
  const [erro, setErro] = useState('')

  // Verifica se já foi exibido nesta sessão
  useEffect(() => {
    const jaExibido = sessionStorage.getItem('popup_captura_exibido')
    if (jaExibido) return

    // Timer: aparece após 30 segundos
    const timer = setTimeout(() => {
      setAberto(true)
      sessionStorage.setItem('popup_captura_exibido', 'true')
    }, 30000)

    // Exit-intent: aparece quando o mouse sai pelo topo
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('popup_captura_exibido')) {
        setAberto(true)
        sessionStorage.setItem('popup_captura_exibido', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const fechar = () => {
    setAberto(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    // Validação simples do WhatsApp
    const whatsappLimpo = form.whatsapp.replace(/\D/g, '')
    if (whatsappLimpo.length < 10) {
      setErro('Informe um WhatsApp válido com DDD')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      await fetch(`${apiUrl}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nome,
          phone: form.whatsapp,
          service: 'Guia MEI Gratuito',
          message: 'Solicitação do Guia Completo do MEI 2026 via popup',
          email: '',
        }),
      })
      setEnviado(true)
    } catch (err) {
      // Mesmo se falhar, mostra sucesso (não queremos perder o lead)
      setEnviado(true)
    }
  }

  if (!aberto) return null

  return (
    <div className="popup-overlay" onClick={fechar}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={fechar} aria-label="Fechar">
          <X size={20} />
        </button>

        {!enviado ? (
          <>
            <div className="popup-icon">
              <Gift size={36} />
            </div>
            <h3 className="popup-titulo">Guia Completo do MEI 2026</h3>
            <p className="popup-subtitulo">
              Tudo o que você precisa saber para <strong>abrir, manter e crescer</strong> como MEI — em um PDF simples e direto ao ponto.
            </p>

            <ul className="popup-beneficios">
              <li><CheckCircle size={16} /> Passo a passo para abrir seu MEI</li>
              <li><CheckCircle size={16} /> Quanto pagar de DAS por mês</li>
              <li><CheckCircle size={16} /> Erros que podem te multar</li>
              <li><CheckCircle size={16} /> Quando desenquadrar do MEI</li>
            </ul>

            <form onSubmit={handleSubmit} className="popup-form">
              <input
                type="text"
                placeholder="Seu nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
                className="popup-input"
              />
              <input
                type="tel"
                placeholder="WhatsApp com DDD"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                required
                className="popup-input"
              />
              {erro && <p className="popup-erro">{erro}</p>}
              <button type="submit" className="btn btn-primary popup-btn">
                <Download size={18} />
                Baixar Guia Grátis
              </button>
              <p className="popup-aviso">
                🔒 Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          </>
        ) : (
          <div className="popup-sucesso">
            <div className="popup-icon sucesso">
              <CheckCircle size={36} />
            </div>
            <h3 className="popup-titulo">Guia a caminho! 🎉</h3>
            <p className="popup-subtitulo">
              Em instantes um de nossos consultores vai te chamar no <strong>WhatsApp</strong> com o link do PDF.
            </p>
            <a
              className="btn btn-whatsapp popup-btn"
              href={`https://wa.me/5551984383203?text=${encodeURIComponent(`Olá! Acabei de solicitar o Guia do MEI. Meu nome é ${form.nome}.`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp agora
            </a>
          </div>
        )}
      </div>
    </div>
  )
}