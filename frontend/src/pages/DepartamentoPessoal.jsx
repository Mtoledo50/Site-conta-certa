import { Users } from 'lucide-react'
import ServicePageLayout from './ServicePageLayout'

export default function DepartamentoPessoal() {
  return (
    <ServicePageLayout
      icon={Users}
      title="Departamento Pessoal"
      description="Suporte completo na gestão de colaboradores, garantindo conformidade com a legislação trabalhista e previdenciária."
      items={[
        'Elaboração de contratos de trabalho',
        'Admissões e demissões',
        'Processamento de folha de pagamento',
        'Apuração e emissão de guias de encargos sociais',
        'Obrigações acessórias: SEFIP, CAGED, RAIS, DIRF, DCTFweb, eSocial',
        'Rescisões e homologações',
        'Administração de acordos coletivos',
        'Orientação sobre legislação trabalhista',
        'Acesso 24h à plataforma digital',
        'Recibos de salário por e-mail'
      ]}
    />
  )
}
