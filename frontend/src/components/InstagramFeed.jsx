import { useEffect } from 'react'
import { Instagram } from 'lucide-react'
import './InstagramFeed.css'

// Lista de posts a exibir — adicione o link do post (data-instgrm-permalink)
const posts = [
  'https://www.instagram.com/p/Da3MNFbROAd/',
  'https://www.instagram.com/p/DavHvY-BUED/',
  'https://www.instagram.com/p/DWomPVqoO9p/',

  // ⬇ Adicione mais posts aqui (até 3 espaços reservados abaixo)
  // 'https://www.instagram.com/p/POST_ID_4/',
  // 'https://www.instagram.com/p/POST_ID_5/',
  // 'https://www.instagram.com/p/POST_ID_6/',
]

export default function InstagramFeed() {
  const instagramUrl = 'https://www.instagram.com/contacerta.contabilidade_/'

  useEffect(() => {
    // Se o script do Instagram já foi carregado antes, apenas reprocessa os embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process()
      return
    }

    // Caso contrário, carrega o script oficial do Instagram
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="instagram-section">
      <div className="container">
        <h2>Siga-nos no Instagram</h2>
        <p className="section-subtitle">
          @contacerta.contabilidade_ • Dicas, novidades e muito mais!
        </p>

        <div className="instagram-grid">
          {posts.map((url, i) => (
            <blockquote
              key={i}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                width: 'calc(100% - 2px)',
              }}
            ></blockquote>
          ))}
        </div>

        <div className="instagram-link-container">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-cta"
          >
            <Instagram size={24} />
            <span>Seguir @contacerta.contabilidade_</span>
          </a>
        </div>
      </div>
    </section>
  )
}
