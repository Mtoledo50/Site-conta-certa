export default function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>Conta Certa Contabilidade</strong> — Av. Pátria, 287 - Alvorada/RS
        </p>
        <p style={{ opacity: 0.7, fontSize: '0.85rem', marginTop: '0.4rem' }}>
          Atendemos Alvorada, Cachoeirinha, Viamão, Gravataí, Porto Alegre e Torres/RS
        </p>
        <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '0.6rem' }}>
          © {ano} Conta Certa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}