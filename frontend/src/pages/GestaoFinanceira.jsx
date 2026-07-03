import { TrendingUp } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function GestaoFinanceira() {
  return (
    <ServicePageLayout
      icon={TrendingUp}
      title="Gestão Financeira"
      description="Soluções para as demandas financeiras, unindo agilidade nos processos e visão estratégica para a tomada de decisões."
      items={[
        'Análise de indicadores estratégicos',
        'Consultoria na gestão de fluxo de caixa',
        'Diagnóstico custo com funcionários x rentabilidade',
        'Assessoria na elaboração do plano orçamentário',
        'Estratégias tributárias para redução de custos',
        'Implementação e gestão do departamento financeiro',
        'Proteção patrimonial',
        'Planejamento financeiro'
      ]}
    />
  )
}
