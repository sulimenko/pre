import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { screens } from '../data/terminal'

gsap.registerPlugin(ScrollTrigger)

export function setupLandingMotion() {
  const q = new URLSearchParams(location.search)
  const debugAll = q.has('all')
  const shot = q.get('shot')
  const scrollToPosition = q.get('scroll')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = matchMedia('(min-width: 1000px)').matches
  let lenis = null
  const cleanups = []

  if (shot === null && !reduced) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    cleanups.push(() => gsap.ticker.remove(tick))
  }

  function scrollTo(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -70 })
    else el.scrollIntoView()
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const onClick = (e) => {
      const target = document.querySelector(a.getAttribute('href'))
      if (target) { e.preventDefault(); scrollTo(target) }
    }
    a.addEventListener('click', onClick)
    cleanups.push(() => a.removeEventListener('click', onClick))
  })

  const nav = document.getElementById('nav')
  const onScroll = () => nav?.classList.toggle('scrolled', scrollY > 10)
  window.addEventListener('scroll', onScroll)
  cleanups.push(() => window.removeEventListener('scroll', onScroll))

  if (debugAll) gsap.set('.reveal', { opacity: 1, y: 0 })
  else {
    gsap.set('.reveal', { opacity: 0, y: 36 })
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%', onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .12 })
    })
  }

  if (shot === null && !reduced) {
    gsap.from('.hero-hands', { y: 120, opacity: 0, duration: 1.2, ease: 'power3.out', delay: .2 })
    gsap.from('.hero-chip', { scale: .5, opacity: 0, duration: .8, ease: 'back.out(2)', stagger: .15, delay: .7, clearProps: 'scale,opacity' })
    gsap.to('.hero-hands', { y: 60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.hero-grid>div:first-child', { y: -40, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
  }

  const cineCards = gsap.utils.toArray('.cine-card')
  const capText = document.getElementById('cineCapText')
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
  tl.set(cineCards, { pointerEvents: 'none' }, 0)
    .fromTo('#cineTerm', { rotateX: 62, y: '42vh', opacity: 0, scale: .92, transformOrigin: '50% 100%' }, { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: .30 }, 0)
    .to('#cineCap', { opacity: 0, y: -40, duration: .10 }, .28)
    .to('#cineTerm', { duration: .10 }, .30)
    .to('#cineTerm', { scale: .72, y: '-14vh', opacity: 0, filter: 'blur(8px)', duration: .17, ease: 'power2.in' }, .45)
    .fromTo(capText, {}, { duration: .01 }, .50)
    .call(() => { capText.innerHTML = '5 компаний доступны сейчас.<br>Вход от $5 000.' }, null, .55)
    .to('#cineCap', { opacity: 1, y: 0, duration: .08 }, .55)
    .fromTo(cineCards, { y: '70vh', opacity: 0, rotateX: 24 }, { y: 0, opacity: 1, rotateX: 0, duration: .20, stagger: .035, ease: 'power3.out' }, .58)
    .set(cineCards, { pointerEvents: 'auto' }, .78)
    .to(cineCards, { duration: .12 }, .80)
    .set(cineCards, { pointerEvents: 'none' }, .92)
    .to(cineCards, { y: '40vh', opacity: 0, duration: .08, stagger: .012, ease: 'power2.in' }, .92)
    .to('#cineCap', { opacity: 0, duration: .06 }, .94)

  if (shot !== null) {
    document.getElementById('cineStage').style.height = '900px'
    tl.progress(parseFloat(shot))
  } else if (reduced || !desktop) {
    tl.progress(.85)
    gsap.set(cineCards, { y: 0, opacity: 1, rotateX: 0, pointerEvents: 'auto' })
    document.getElementById('cine').style.padding = '40px 0'
  } else {
    tl.progress(0)
    ScrollTrigger.create({ trigger: '#cineStage', start: 'top top', end: '+=280%', pin: true, scrub: 1, anticipatePin: 1, onUpdate: (self) => tl.progress(self.progress) })
  }

  if (shot === null && !reduced) {
    gsap.fromTo('#maniBg', { yPercent: -8 }, { yPercent: 8, scrollTrigger: { trigger: '.mani', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    gsap.fromTo('#finalBg', { yPercent: -6 }, { yPercent: 6, scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom top', scrub: 1 } })
  }

  const stepEls = [...document.querySelectorAll('.step')]
  const screenEl = document.getElementById('screen')
  const titleEl = document.getElementById('screenTitle')
  function setScreen(i) {
    screenEl.innerHTML = screens[i]
    titleEl.textContent = 'Terminal — Шаг 0' + (i + 1) + ' / 06'
  }
  setScreen(0)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      stepEls.forEach((el) => el.classList.remove('active'))
      entry.target.classList.add('active')
      setScreen(Number(entry.target.dataset.screen))
    })
  }, { rootMargin: '-45% 0px -45% 0px' })
  stepEls.forEach((el) => observer.observe(el))
  cleanups.push(() => observer.disconnect())

  const ba = document.getElementById('ba')
  const baAfter = document.getElementById('baAfter')
  const baHandle = document.getElementById('baHandle')
  const baKnob = document.getElementById('baKnob')
  let dragging = false
  function setBA(p) {
    const pct = Math.max(4, Math.min(96, p))
    baAfter.style.clipPath = `inset(0 0 0 ${pct}%)`
    baHandle.style.left = pct + '%'
    baKnob.style.left = pct + '%'
  }
  function move(x) { const r = ba.getBoundingClientRect(); setBA((x - r.left) / r.width * 100) }
  const onDown = (e) => { dragging = true; move(e.clientX) }
  const onMove = (e) => { if (dragging) move(e.clientX) }
  const onUp = () => { dragging = false }
  ba.addEventListener('pointerdown', onDown)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  cleanups.push(() => {
    ba.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  })

  if (scrollToPosition) {
    const adjust = () => setTimeout(() => { document.body.style.transform = `translateY(-${+scrollToPosition}px)` }, 400)
    window.addEventListener('load', adjust, { once: true })
  }
  requestAnimationFrame(() => ScrollTrigger.refresh())

  return {
    scrollTo,
    setModalOpen(open) {
      document.body.style.overflow = open ? 'hidden' : ''
      if (open) lenis?.stop()
      else lenis?.start()
    },
    destroy() {
      cleanups.forEach((fn) => fn())
      observer.disconnect()
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      lenis?.destroy()
    }
  }
}
