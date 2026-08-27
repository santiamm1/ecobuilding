import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Mail, MapPin, Menu, Phone, Wrench, X } from 'lucide-react'
import heroOffice from './assets/hero-office.webp'
import './styles.css'

const ASSET = 'https://ecobuilding.msa-clientes.com/wp-content/uploads/'
const images = {
  logo: `${ASSET}2025/04/cropped-Ecobuilding-logo-mejorado.png`,
  iconAir: `${ASSET}2025/04/icons8-aire-acondicionado-64-1.png`,
  ventilation: `${ASSET}elementor/thumbs/ventilacion_mecanica_forzada_industrial-scaled-rs88iltxlixoy0d1n5r4qgih6n6dp29hxg6f8yo9zc.png`,
  residential: `${ASSET}elementor/thumbs/Ecobuilding-img-10-rs87lf52b3i91mkefbcb7bzm5wquxrinp70aa9vnns.png`,
  healthcare: `${ASSET}elementor/thumbs/Ecobuilding-img-11-e1744034795165-rs87lf52b3i91mkefbcb7bzm5wquxrinp70aa9vnns.png`,
  boilers: `${ASSET}elementor/thumbs/Ecobuilding-img-13-rs87lf52b3i91mkefbcb7bzm5wquxrinp70aa9vnns.png`,
  tech: `${ASSET}2025/04/icons8-aire-tecnico-96-1.png`,
  collageA: `${ASSET}elementor/thumbs/Ecobuilding-img-8-rs87m1j6x5o3f4x2x5h5qg9d8j7k6l5m4n3b2v1c0.png`,
  collageB: `${ASSET}elementor/thumbs/Ecobuilding-img-14-rs87n0m9l8k7j6h5g4f3d2s1a0p9o8i7u6y5t4r3.png`,
}
const brands = ['Caldaia', 'Carrier', 'Baxi', 'Surrey', 'Peisa', 'Ariston']
const brandImages = brands.map((brand) => `${ASSET}2025/04/Ecobuilding-Logo-${brand}-gris-300x240.png`)

const services = [
  { image: images.residential, tag: 'Espacios habitados', title: 'Residenciales, edificios y clínicas.', items: ['Asesoramiento técnico personalizado.', 'Venta e instalación de aires acondicionados, radiadores y calderas.', 'Diseño del sistema adaptado a cada espacio, pensado para bajar el consumo.'] },
  { image: images.healthcare, tag: 'Salas blancas', title: 'Climatización sanitaria para salas blancas.', items: ['Sistemas certificados para uso hospitalario.', 'Equipos de última generación y control preciso de temperatura y humedad.', 'Montaje profesional cumpliendo normativas sanitarias.'] },
  { image: images.ventilation, tag: 'Proyectos industriales', title: 'Ventilación mecánica forzada', items: ['Bancos.', 'Gimnasios.', 'Auditorios.', 'Estaciones de servicios.'], diagram: true },
  { image: images.boilers, tag: 'Venta directa', title: 'Venta directa de calderas y aire acondicionado', items: ['Radiadores de aluminio de primeras marcas.', 'Calderas murales y de pie, con y sin acumulador.', 'Envíos a todo el país y asesoramiento postventa.'] },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); io.disconnect() }
    }, { threshold: .2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function App() {
  const [brandIndex, setBrandIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleBrands = [0, 1, 2].map((offset) => brands[(brandIndex + offset) % brands.length])
  const servicesReveal = useReveal()
  const companyReveal = useReveal()
  const brandsReveal = useReveal()
  const contactReveal = useReveal()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <header className="topbar">
        <a href="#inicio" className="logo-link" aria-label="Ecobuilding, inicio"><img src={images.logo} alt="Ecobuilding S.A. Confort humano" /></a>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a><a href="#empresa" onClick={() => setMenuOpen(false)}>Nosotros</a><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <a className="header-call" href="tel:+542615632927"><Phone size={16} /> 261 563 2927</a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}><span>{menuOpen ? <X /> : <Menu />}</span></button>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-layout">
            <div className="hero-content">
              <p className="eyebrow">Climatización central en Mendoza</p>
              <h1>Confort que<br /><span>ahorra energía.</span></h1>
              <p className="hero-copy"><strong>Calefacción, ventilación y aire acondicionado central.</strong> Diseñamos e instalamos sistemas eficientes para oficinas, residencias y clínicas, con control preciso de temperatura y respaldo técnico real.</p>
              <div className="hero-actions"><a href="#contacto" className="button button-primary">Pedí tu diagnóstico <ArrowRight size={18} /></a><a href="#servicios" className="button button-quiet">Ver servicios <ArrowRight size={17} /></a></div>
              <div className="hero-icons" aria-label="Soluciones de climatización">
                <img className="hero-icon" src={images.iconAir} alt="Aire acondicionado" width="64" height="64" />
                <span className="hero-plus" aria-hidden="true">+</span>
                <svg className="boiler-icon" viewBox="0 0 96 96" role="img" aria-label="Caldera" xmlns="http://www.w3.org/2000/svg">
                  <rect x="21" y="13" width="54" height="70" rx="5" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="30" y="23" width="36" height="18" rx="2" fill="currentColor" opacity=".14" stroke="currentColor" strokeWidth="3" />
                  <circle cx="38" cy="32" r="3" fill="currentColor" />
                  <path d="M48 30h11M48 35h8M31 54h34M31 63h34M31 72h22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M75 30h8v27h-8M13 47h8v27h-8" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <div className="hero-visual" aria-label="Oficina con climatización central y termostato inteligente">
              <div className="hero-photo" style={{ backgroundImage: `url(${heroOffice})` }} />
              <div className="hero-visual-card"><span>Control inteligente</span><strong>Cada grado,<br />bajo control.</strong><a href="#empresa">Conocé Ecobuilding <ArrowRight size={15} /></a></div>
              <div className="hero-visual-mark">ECO<br /><span>01</span></div>
            </div>
          </div>
          <div className="hero-proof"><div><strong>+20</strong><span>años de<br />trayectoria</span></div><div><strong>4</strong><span>rubros<br />atendidos</span></div><div><strong>100%</strong><span>respaldo<br />postventa</span></div><p>Una solución completa, de principio a fin.</p></div>
        </section>

        <section className="services-section" id="servicios">
          <div className="section-intro reveal" ref={servicesReveal}><p className="section-label">Servicios</p><h2>Una respuesta<br /><em>para cada ambiente.</em></h2><p>Diseñamos, instalamos y damos servicio a sistemas de climatización eficientes, pensados para reducir el consumo sin resignar confort.</p></div>
          <div className="service-grid">{services.map((service, index) => <article className={`service-card ${service.diagram ? 'service-card-diagram' : ''}`} key={service.title}><div className="service-media"><img src={service.image} alt={`Instalación de ${service.title.toLowerCase()}`} width="700" height="460" loading="lazy" /><span className="service-number">{String(index + 1).padStart(2, '0')}</span></div><div className="service-body"><span className="service-type">{service.tag}</span><h3>{service.title}</h3><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><a className="service-link" href="#contacto">Consultar <ArrowRight size={14} /></a></div></article>)}</div>
        </section>

        <section className="company-section" id="empresa">
          <div className="photo-stack"><div className="photo-large" style={{ backgroundImage: `url(${images.residential})` }} /><div className="photo-small" style={{ backgroundImage: `url(${images.boilers})` }} /><span className="photo-tag">+20 años de trayectoria</span></div>
          <div className="company-copy reveal" ref={companyReveal}><p className="section-label">Nosotros</p><h2>Estamos cuando<br /><em>más importa.</em></h2><p><strong>En Ecobuilding somos especialistas en climatización central.</strong> Trabajamos exclusivamente con marcas líderes, con repuestos y servicio postventa. Acompañamos a nuestros clientes desde el proyecto hasta la puesta en marcha.</p><p>En Ecobuilding S.A. ponemos toda nuestra experiencia y nuestros recursos a tu disposición, antes y después de la venta. <strong>¡Atendemos el teléfono!</strong></p><div className="company-points"><span><strong>Asesoramiento</strong> para cada proyecto</span><span><strong>Instalación</strong> con respaldo técnico</span><span><strong>Postventa</strong> que sigue presente</span></div></div>
        </section>

        <section className="brands-section" aria-label="Marcas con las que trabajamos"><div className="reveal" ref={brandsReveal}><h2>Marcas que<br /><em>garantizan.</em></h2></div><div className="brand-carousel"><div className="brand-track">{visibleBrands.map((brand, index) => <div className="brand-item" key={`${brand}-${index}`}><img src={brandImages[brands.indexOf(brand)]} alt={brand} /></div>)}</div><div className="carousel-controls"><button onClick={() => setBrandIndex((brandIndex - 1 + brands.length) % brands.length)} aria-label="Marca anterior"><ChevronLeft /></button><span>{String(brandIndex + 1).padStart(2, '0')} / 06</span><button onClick={() => setBrandIndex((brandIndex + 1) % brands.length)} aria-label="Marca siguiente"><ChevronRight /></button></div></div></section>

        <section className="contact-section" id="contacto"><div className="reveal" ref={contactReveal}><h2>Tu próximo espacio<br /><em>empieza acá.</em></h2></div><div className="contact-details"><p>Contanos qué necesitás y nuestro equipo te asesora.</p><a href="mailto:info@ecobuilding.com.ar"><Mail size={18} /> info@ecobuilding.com.ar</a><a href="tel:+542615632927"><Phone size={18} /> +54 261 563 2927</a><span><MapPin size={18} /> Mendoza, Argentina</span></div></section>
      </main>

      <footer><div className="footer-main"><div className="footer-brand"><img src={images.logo} alt="Ecobuilding" width="700" height="222" /><p>Climatización pensada para el confort humano.</p><div className="footer-social"><a href="https://www.facebook.com/FanPage.Ecobuilding.S.A" aria-label="Facebook">Fb</a><a href="https://www.instagram.com" aria-label="Instagram">Ig</a></div></div><div className="footer-column"><h3>Explorar</h3><a href="#inicio">Inicio</a><a href="#empresa">Nosotros</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div><div className="footer-column"><h3>Contacto</h3><a href="mailto:info@ecobuilding.com.ar">info@ecobuilding.com.ar</a><a href="tel:+542615632927">+54 261 563 2927</a><span>Mendoza, Argentina</span></div><div className="footer-column footer-action"><h3>¿Necesitás asesoramiento?</h3><p>Hablemos de la solución adecuada para tu espacio.</p><a href="#contacto" className="footer-link">Contactarnos <ArrowRight size={15} /></a></div></div><div className="footer-bottom"><p>© 2026 Ecobuilding S.A.</p><a href="#inicio" className="back-top">Volver arriba <ArrowUp size={15} /></a><p>Diseñado por <a href="https://msa-projects.com">msa-projects</a></p></div></footer>
      <a className="tutorials" href="https://ecobuilding.msa-clientes.com/tutoriales/"><Wrench size={17} /> Acceso a tutoriales</a>
      <a className="whatsapp" href="https://wa.me/2615632927" aria-label="Contactar por WhatsApp"><span>¿Podemos ayudarte?</span><strong>WA</strong></a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
