export default function Contact() {
  const whatsapp = 'https://wa.me/551984383203?text=Olá! Quero falar com a Conta Certa Contabilidade.'

  return (
    <section className="section section-contact" id="contato">
      <div className="container contact">
        <div>
          <h2>Fale com a equipe</h2>
          <p>Solicite orçamento, tire dúvidas e descubra o plano ideal para o seu negócio.</p>
        </div>
        <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  )
}
