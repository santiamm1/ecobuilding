const brands = ['Caldaia', 'Carrier', 'Baxi', 'Surrey', 'Peisa', 'Ariston']
const brandImages = brands.map((brand) => `assets/brands/logo-${brand.toLowerCase()}.png`)

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

// Brands marquee (duplicated track for a seamless loop) — only present on the homepage
const brandTrack = document.getElementById('brand-track')
if (brandTrack) {
  const brandHtml = brands.map((brand, i) => `<div class="brand-item"><img src="${brandImages[i]}" alt="${brand}" /></div>`).join('')
  brandTrack.innerHTML = brandHtml
  document.getElementById('brand-track-2').innerHTML = brandHtml
}

// Blog listing filters (category pills + search) — only present on blog/index.html
const blogGrid = document.getElementById('blogGrid')
if (blogGrid) {
  const cards = Array.from(blogGrid.querySelectorAll('.bcard'))
  const catBar = document.getElementById('catBar')
  const searchInput = document.getElementById('blogSearch')
  let activeCat = 'all'
  const applyFilters = () => {
    const q = searchInput.value.trim().toLowerCase()
    cards.forEach((card) => {
      const matchesCat = activeCat === 'all' || card.dataset.cat === activeCat
      const matchesSearch = !q || card.textContent.toLowerCase().includes(q)
      card.style.display = matchesCat && matchesSearch ? '' : 'none'
    })
  }
  catBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.blog-cat-btn')
    if (!btn) return
    catBar.querySelector('.active')?.classList.remove('active')
    btn.classList.add('active')
    activeCat = btn.dataset.cat
    applyFilters()
  })
  searchInput.addEventListener('input', applyFilters)
}

// Contact form: submits to contact.php (PHP mail() on the cPanel host) — only present on the homepage
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const form = e.target
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalLabel = submitBtn.innerHTML
  submitBtn.disabled = true
  submitBtn.innerHTML = 'Enviando…'

  try {
    const res = await fetch('contact.php', { method: 'POST', body: new FormData(form) })
    const data = await res.json()
    if (!res.ok || !data.ok) throw new Error(data.error || 'send_failed')
    form.reset()
    submitBtn.innerHTML = '¡Enviado! Te contactamos pronto'
  } catch (err) {
    const { type, name, email, phone, message } = Object.fromEntries(new FormData(form))
    const subject = `Consulta de ${name} — sitio web Ecobuilding`
    const body = `Tipo: ${type}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\n\n${message}`
    window.location.href = `mailto:info@ecobuilding.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    submitBtn.innerHTML = originalLabel
  } finally {
    submitBtn.disabled = false
  }
})
