import { Scale } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function AssessoriaJuridica() {
  return (
    <ServicePageLayout
      icon={Scale}
      title="Assessoria Jurídica"
      description="Suporte jurídico especializado nas áreas tributária, societária e trabalhista para proteger e fortalecer o seu negócio."
      items={[
        'Administração de passivos tributários e parcelamentos',
        'Execuções fiscais administrativas e judiciais',
        'Parcelamento de dívida ativa',
        'Defesa em autos de infração fiscal',
        'Consultoria em contratos societários',
        'Orientação jurídica preventiva'
      ]}
    />
  )
}
