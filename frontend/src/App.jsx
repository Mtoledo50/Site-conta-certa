import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Plans from './components/Plans'
import About from './components/About'
import AreasAtendimento from './components/AreasAtendimento'
import ProvaSocial from './components/ProvaSocial' // ✅ Novo componente
import Contact from './components/Contact'
import Footer from './components/Footer'
import Contabilidade from './pages/Contabilidade'
import DepartamentoPessoal from './pages/DepartamentoPessoal'
import DepartamentoFiscal from './pages/DepartamentoFiscal'
import DepartamentoSocietario from './pages/DepartamentoSocietario'
import AssessoriaTributaria from './pages/AssessoriaTributaria'
import GestaoFinanceira from './pages/GestaoFinanceira'
import Auditoria from './pages/Auditoria'
import AssessoriaJuridica from './pages/AssessoriaJuridica'
import PlanejamentoEstrategico from './pages/PlanejamentoEstrategico'
import WhatsAppFlutuante from './components/WhatsAppFlutuante'
import VoltarAoTopo from './components/VoltarAoTopo'
import PopupCaptura from './components/PopupCaptura'
import InstagramFeed from './components/InstagramFeed'  // ⬅ adicionar esta linha


function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Plans />
      <About />
      <AreasAtendimento />
      <ProvaSocial /> {/* ✅ Adicionado aqui */}
      <InstagramFeed /> {/* ✅ ADICIONADO AQUI */}
      <Contact />
      
    </main>
  )
}

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos/contabilidade" element={<Contabilidade />} />
        <Route path="/servicos/departamento-pessoal" element={<DepartamentoPessoal />} />
        <Route path="/servicos/departamento-fiscal" element={<DepartamentoFiscal />} />
        <Route path="/servicos/departamento-societario" element={<DepartamentoSocietario />} />
        <Route path="/servicos/assessoria-tributaria" element={<AssessoriaTributaria />} />
        <Route path="/servicos/gestao-financeira" element={<GestaoFinanceira />} />
        <Route path="/servicos/auditoria" element={<Auditoria />} />
        <Route path="/servicos/assessoria-juridica" element={<AssessoriaJuridica />} />
        <Route path="/servicos/planejamento-estrategico" element={<PlanejamentoEstrategico />} />
      </Routes>
      <Footer />
      <WhatsAppFlutuante />
      <VoltarAoTopo />
      <PopupCaptura />
    </div>
  )
}