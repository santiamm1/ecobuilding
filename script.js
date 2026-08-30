const ASSET = 'https://ecobuilding.msa-clientes.com/wp-content/uploads/'
const brands = ['Caldaia', 'Carrier', 'Baxi', 'Surrey', 'Peisa', 'Ariston']
const brandImages = brands.map((brand) => `${ASSET}2025/04/Ecobuilding-Logo-${brand}-gris-300x240.png`)

// Shrink header on scroll
const topbar = document.querySelector('.topbar')
const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 40)
document.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Menu toggle
const menuToggle = document.getElementById('menu-toggle')
const nav = document.getElementById('main-nav')
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open')
  menuToggle.setAttribute('aria-expanded', isOpen)
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú')
  menuToggle.querySelector('.icon-menu').style.display = isOpen ? 'none' : ''
  menuToggle.querySelector('.icon-close').style.display = isOpen ? '' : 'none'
})
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open')
  menuToggle.setAttribute('aria-expanded', false)
  menuToggle.setAttribute('aria-label', 'Abrir menú')
  menuToggle.querySelector('.icon-menu').style.display = ''
  menuToggle.querySelector('.icon-close').style.display = 'none'
}))

// Animated counters in the hero stats strip
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = parseInt(el.dataset.count, 10)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const duration = 1200
  const start = performance.now()
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - progress) * (1 - progress)
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target) }
  })
}, { threshold: .2 })
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

// Brands marquee (duplicated track for a seamless loop)
const brandHtml = brands.map((brand, i) => `<div class="brand-item"><img src="${brandImages[i]}" alt="${brand}" /></div>`).join('')
document.getElementById('brand-track').innerHTML = brandHtml
document.getElementById('brand-track-2').innerHTML = brandHtml

// Contact form: opens the visitor's email client (mailto)
// ponytail: swap for a fetch() to the Resend API once the endpoint is ready
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const form = e.target
  const { type, name, email, phone, message } = Object.fromEntries(new FormData(form))
  const subject = `Consulta de ${name} — sitio web Ecobuilding`
  const body = `Tipo: ${type}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\n\n${message}`
  window.location.href = `mailto:info@ecobuilding.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
