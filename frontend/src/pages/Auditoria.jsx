import { Search } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function Auditoria() {
  return (
    <ServicePageLayout
      icon={Search}
      title="Auditoria e Revisão de Processos"
      description="Análise detalhada e otimização dos processos internos e práticas fiscais para assegurar conformidade e eficiência."
      items={[
        'Auditoria financeira e contábil',
        'Auditoria tributária',
        'Revisão tributária',
        'Auditoria e melhoria de processos internos',
        'Due diligence contábil, fiscal e financeira',
        'Análise fiscal',
        'Parametrização de produtos em sistemas'
      ]}
    />
  )
}
