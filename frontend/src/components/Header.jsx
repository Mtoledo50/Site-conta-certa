import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_novo_ccerta.png'

export default function Header() {
  const [open, setOpen] = useState(false)
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Quero um orçamento da Conta Certa Contabilidade.'

  // 🆕 Scroll suave para âncoras (substitui o Link do react-router)
  const scrollToSection = (sectionId) => (e) => {
    e.preventDefault()
    setOpen(false) // fecha menu mobile
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="header header-branco">
      <div className="container header-content">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Conta Certa Escritório Contábil"
            className="logo logo-header"
          />
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? 'Fechar' : 'Menu'}
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          {/* 🆕 Links com scroll suave */}
          <a href="#servicos" onClick={scrollToSection('servicos')}>Serviços</a>
          <a href="#planos" onClick={scrollToSection('planos')}>Planos</a>
          <a href="#sobre" onClick={scrollToSection('sobre')}>Sobre</a>
          <a href="#contato" onClick={scrollToSection('contato')}>Contato</a>
          
          {/* 🆕 Botão Administração → Radar */}
          <a
            className="btn btn-admin"
            href="https://radar.contacerta.com.br"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Administração
          </a>

          <a
            className="btn btn-whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}