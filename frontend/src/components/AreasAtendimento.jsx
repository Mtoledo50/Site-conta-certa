import { useState } from 'react'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import './AreasAtendimento.css'

const cidades = [
  { nome: 'Alvorada', descricao: 'Sede do escritório' },
  { nome: 'Cachoeirinha', descricao: 'Região Metropolitana' },
  { nome: 'Viamão', descricao: 'Região Metropolitana' },
  { nome: 'Gravataí', descricao: 'Região Metropolitana' },
  { nome: 'Porto Alegre', descricao: 'Capital e região' },
  { nome: 'Torres/RS', descricao: 'Litoral Norte' },
]

export default function AreasAtendimento() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cidades.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cidades.length) % cidades.length)
  }

  const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 3 : 4

  return (
    <section className="section section-alt areas-section">
      <div className="container">
        <h2>Onde estamos e onde atendemos</h2>
        <p className="section-subtitle">
          Nosso escritório fica em Alvorada, mas atendemos clientes em toda a região metropolitana e litoral norte.
        </p>

        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {cidades.map((cidade, index) => (
                <div key={index} className="carousel-card">
                  <div className="card-icon">
                    <MapPin size={24} />
                  </div>
                  <h3>{cidade.nome}</h3>
                  <p>{cidade.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="carousel-dots">
          {cidades.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}