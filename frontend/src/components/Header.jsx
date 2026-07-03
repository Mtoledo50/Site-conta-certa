import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-conta-certa.png'

export default function Header() {
  const [open, setOpen] = useState(false)
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Quero um orçamento da Conta Certa Contabilidade.'

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Conta Certa Escritório Contábil"
            className="logo"
          />
          <p>Av. Pátria, 287 - Alvorada</p>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? 'Fechar' : 'Menu'}
        </button>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          <Link to="/#servicos" onClick={() => setOpen(false)}>Serviços</Link>
          <Link to="/#planos" onClick={() => setOpen(false)}>Planos</Link>
          <Link to="/#sobre" onClick={() => setOpen(false)}>Sobre</Link>
          <Link to="/#contato" onClick={() => setOpen(false)}>Contato</Link>
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