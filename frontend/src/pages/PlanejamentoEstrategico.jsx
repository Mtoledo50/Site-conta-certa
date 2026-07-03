import { Target } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function PlanejamentoEstrategico() {
  return (
    <ServicePageLayout
      icon={Target}
      title="Planejamento Estratégico"
      description="Planejamento tributário e estratégico para reduzir custos, aumentar a eficiência e impulsionar o crescimento sustentável do seu negócio."
      items={[
        'Planejamento tributário',
        'Análise de regime tributário',
        'Projeções financeiras',
        'Definição de metas e indicadores',
        'Análise de viabilidade',
        'Redução de carga tributária',
        'Consultoria estratégica',
        'Acompanhamento de resultados'
      ]}
    />
  )
}
