import { Landmark } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function AssessoriaTributaria() {
  return (
    <ServicePageLayout
      icon={Landmark}
      title="Assessoria Tributária"
      description="Planejamento tributário dentro da legislação para minimizar efeitos fiscais e evitar contingências."
      items={[
        'Planejamento tributário',
        'Avaliação da melhor opção tributária e enquadramento',
        'Recuperação e aproveitamento de créditos tributários',
        'Compliance de declarações acessórias',
        'Substituição tributária',
        'Benefícios e incentivos fiscais',
        'Tributação internacional e acordos de bitributação',
        'CND (Certidão Negativa de Débito)',
        'Atualização constante da legislação'
      ]}
    />
  )
}
