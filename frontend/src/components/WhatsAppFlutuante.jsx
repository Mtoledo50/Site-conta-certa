import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import './WhatsAppFlutuante.css'

export default function WhatsAppFlutuante() {
  const [aberto, setAberto] = useState(false)
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Vim pelo site e gostaria de mais informações.'

  return (
    <>
      {/* TOOLTIP */}
      {aberto && (
        <div className="wpp-tooltip">
          <button
            className="wpp-tooltip-close"
            onClick={() => setAberto(false)}
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
          <p className="wpp-tooltip-titulo">Olá! 👋</p>
          <p className="wpp-tooltip-texto">
            Precisa de ajuda com contabilidade? Fale com a gente agora!
          </p>
          <a
            className="btn btn-whatsapp wpp-tooltip-btn"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Iniciar conversa
          </a>
        </div>
      )}

      {/* BOTÃO PRINCIPAL */}
      <button
        className={`wpp-btn ${aberto ? 'wpp-btn-open' : ''}`}
        onClick={() => setAberto(!aberto)}
        aria-label="Abrir WhatsApp"
      >
        {aberto ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  )
}