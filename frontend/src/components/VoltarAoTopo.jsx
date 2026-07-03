import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import './VoltarAoTopo.css'

export default function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão após rolar 300px
      setVisivel(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`voltar-topo-btn ${visivel ? 'visivel' : ''}`}
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} />
    </button>
  )
}