import { Instagram } from 'lucide-react'
import './InstagramFeed.css'

export default function InstagramFeed() {
  const instagramUrl = 'https://www.instagram.com/contacerta.contabilidade_/'

  // Substitua pelos links reais dos seus posts
  const posts = [
    { id: 1, link: 'https://instagram.com/contacerta.contabilidade_' },
    { id: 2, link: 'https://instagram.com/contacerta.contabilidade_' },
    { id: 3, link: 'https://instagram.com/contacerta.contabilidade_' },
    { id: 4, link: 'https://instagram.com/contacerta.contabilidade_' },
    { id: 5, link: 'https://instagram.com/contacerta.contabilidade_' },
    { id: 6, link: 'https://instagram.com/contacerta.contabilidade_' },
  ]

  return (
    <section className="instagram-section">
      <div className="container">
        <h2>Siga-nos no Instagram</h2>
        <p className="section-subtitle">
          @contacerta.contabilidade_ • Dicas, novidades e muito mais!
        </p>

        <div className="instagram-grid">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-post"
            >
              <Instagram size={40} />
              <span>Ver no Instagram</span>
            </a>
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