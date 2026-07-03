import { Building2 } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function DepartamentoSocietario() {
  return (
    <ServicePageLayout
      icon={Building2}
      title="Departamento Societário"
      description="Cuidamos de toda a parte societária da sua empresa, desde a abertura até alterações contratuais, com segurança jurídica e agilidade."
      items={[
        'Abertura de empresas',
        'Alteração contratual',
        'Encerramento de empresas',
        'Registro em órgãos competentes',
        'Emissão de certidões',
        'Transformação de natureza jurídica',
        'Regularização cadastral',
        'Assessoria em contratos sociais'
      ]}
    />
  )
}
