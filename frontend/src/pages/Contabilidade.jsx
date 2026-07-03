import { BookOpen } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function Contabilidade() {
  return (
    <ServicePageLayout
      icon={BookOpen}
      title="Contabilidade"
      description="Assessoria e consultoria contábil com análises objetivas da situação da sua empresa, conduzindo o crescimento com segurança e estabilidade."
      items={[
        'Escrituração contábil',
        'Emissão de balancetes mensais',
        'Balanço Patrimonial e demonstrações financeiras',
        'Relatórios gerenciais',
        'Demonstrações contábeis mensais, trimestrais ou anuais',
        'Controle de bens do ativo fixo',
        'Análise horizontal e vertical das demonstrações',
        'Indicadores econômicos e financeiros',
        'Apoio à auditoria externa'
      ]}
    />
  )
}
