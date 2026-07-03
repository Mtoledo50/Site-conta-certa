import { Link } from 'react-router-dom'
import './Services.css'
import {
  Calculator,
  Users,
  Receipt,
  Building2,
  Scale,
  TrendingUp,
  Search,
  Gavel,
  Target,
} from 'lucide-react'

const services = [
  { title: 'Contabilidade', path: '/servicos/contabilidade', icon: <Calculator /> },
  { title: 'Departamento Pessoal', path: '/servicos/departamento-pessoal', icon: <Users /> },
  { title: 'Departamento Fiscal', path: '/servicos/departamento-fiscal', icon: <Receipt /> },
  { title: 'Departamento Societário', path: '/servicos/departamento-societario', icon: <Building2 /> },
  { title: 'Assessoria Tributária', path: '/servicos/assessoria-tributaria', icon: <Scale /> },
  { title: 'Gestão Financeira', path: '/servicos/gestao-financeira', icon: <TrendingUp /> },
  { title: 'Auditoria', path: '/servicos/auditoria', icon: <Search /> },
  { title: 'Assessoria Jurídica', path: '/servicos/assessoria-juridica', icon: <Gavel /> },
  { title: 'Planejamento Estratégico', path: '/servicos/planejamento-estrategico', icon: <Target /> },
]

export default function Services() {
  return (
    <section className="services" id="servicos">
      <h2>Nossos Serviços</h2>
      <div className="services-grid">
        {services.map((service) => (
          <Link className="card" to={service.path} key={service.path}>
            <div className="card-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>Atendimento especializado para o seu negócio.</p>
            <span className="card-link">Saiba mais →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
