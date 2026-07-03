import { Receipt } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function DepartamentoFiscal() {
  return (
    <ServicePageLayout
      icon={Receipt}
      title="Departamento Fiscal"
      description="Apuração de impostos e cumprimento das obrigações fiscais com total conformidade junto aos órgãos federais, estaduais e municipais."
      items={[
        'Escrituração dos documentos fiscais',
        'Apuração de impostos',
        'Orientação para emissão de notas fiscais',
        'Validação e transmissão de declarações eletrônicas',
        'Atendimento às obrigações da Receita Federal, Estadual e Municipal',
        'Análise permanente das operações fiscais',
        'Verificação do melhor enquadramento tributário',
        'Assessoria no atendimento à fiscalização'
      ]}
    />
  )
}
