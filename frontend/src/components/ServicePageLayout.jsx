import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ServicePageLayout({ icon: Icon, title, description, items }) {
  const whatsapp = 'https://wa.me/+5551984383203?text=Olá! Tenho interesse no serviço de ' + encodeURIComponent(title) + '.'

  return (
    <section className="section service-page">
      <div className="container">
        <Link to="/" className="btn btn-secondary back-btn">
          <ArrowLeft size={18} /> Voltar
        </Link>

        <div className="service-header">
          <div className="service-icon-large">
            <Icon size={40} />
          </div>
          <h2>{title}</h2>
        </div>

        <p className="service-description">{description}</p>

        <div className="info-box">
          <h3>O que fazemos</h3>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-actions">
          <a
            className="btn btn-whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
          <Link to="/#servicos" className="btn btn-primary">
            Ver outros serviços
          </Link>
        </div>
      </div>
    </section>
  )
}