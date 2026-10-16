import { onBeforeUnmount, onMounted } from 'vue'

// Values are sampled from position only. There is no clock, tween or settling loop.
const tracks = {
  'copy-y': [[0, 0], [0.34, -0.6]],
  'copy-opacity': [[0, 1], [0.1, 1], [0.32, 0]],
  'desktop-y': [[0, 0.5], [0.5, 0.16], [0.78, 0.12]],
  'desktop-tilt': [[0, 58], [0.5, 0]],
  'desktop-scale': [[0, 1.12], [0.5, 0.94], [0.78, 0.72]],
  'desktop-opacity': [[0, 1], [0.5, 1], [0.76, 0]],
  'phone-x': [[0, 0.76], [0.5, 0.75], [0.8, 0.73]],
  'phone-y': [[0, 0.48], [0.5, 0.105], [0.8, 0.17], [1, 0.1]],
  'phone-tilt': [[0, 50], [0.5, 0]],
  'phone-roll': [[0, -8], [0.5, 0]],
  'phone-scale': [[0, 1], [0.5, 0.96], [0.8, 0.82], [1, 0.78]],
  'phone-opacity': [[0, 1], [0.95, 1], [1, 0]],
  'heading-y': [[0, 48], [0.68, 48], [0.88, 0]],
  'heading-opacity': [[0, 0], [0.68, 0], [0.88, 1]],
  'background': [[0, 0], [0.55, 0], [0.85, 1]],
}

// A stacked handoff leaves room for the real catalog heading on narrow screens.
// These are position keyframes too: touch scrolling uses the same reversible scrub.
const narrowTracks = {
  ...tracks,
  'desktop-y': [[0, 0.5], [0.5, 0.24], [0.78, 0.2]],
  'desktop-tilt': [[0, 32], [0.5, 0]],
  'desktop-scale': [[0, 1], [0.5, 0.94], [0.78, 0.72]],
  'phone-x': [[0, 0.74], [0.5, 0.74], [0.8, 0.5]],
  'phone-y': [[0, 0.5], [0.5, 0.22], [0.8, 0.52], [1, 0.49]],
  'phone-tilt': [[0, 28], [0.5, 0]],
  'phone-roll': [[0, -5], [0.5, 0]],
}

const tabletTracks = {
  ...tracks,
  'phone-tilt': [[0, 38], [0.5, 0]],
  'phone-roll': [[0, -6], [0.5, 0]],
}

function sample(progress, keyframes) {
  for (let i = 1; i < keyframes.length; i++) {
    const [end, to] = keyframes[i]
    const [start, from] = keyframes[i - 1]
    if (progress <= end) {
      const position = Math.max(0, (progress - start) / (end - start))
      return from + (to - from) * position
    }
  }
  return keyframes.at(-1)[1]
}

export function useHeroScrollProgress(sceneRef) {
  let media, observer, frame = 0, scene, hero, stage, copy
  let start = 0, range = 1, stageHeight = 0, viewportWidth = 0, copyHeight = 0, desktopFit = 1
  let lastProgress = -1
  let disposed = false
  let activeTracks = tracks

  function update() {
    frame = 0
    if (!media.matches) return
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / range))
    if (progress === lastProgress) return
    lastProgress = progress
    const values = Object.fromEntries(Object.entries(activeTracks).map(([key, frames]) => [key, sample(progress, frames)]))
    scene.style.setProperty('--scene-progress', progress)
    for (const [key, value] of Object.entries(values)) {
      let unit = ''
      let resolved = value
      if (key === 'phone-x') { resolved *= viewportWidth; unit = 'px' }
      else if (['copy-y', 'desktop-y', 'phone-y'].includes(key)) {
        resolved *= stageHeight
        if (key !== 'copy-y') {
          const initialTop = activeTracks[key][0][1] * stageHeight
          resolved += Math.max(0, copyHeight + 32 - initialTop) * (1 - Math.min(1, progress / 0.5))
        }
        unit = 'px'
      } else if (key === 'desktop-scale') resolved *= 1 + (desktopFit - 1) * Math.min(1, progress / 0.5)
      else if (key === 'heading-y') unit = 'px'
      else if (key.endsWith('tilt') || key === 'phone-roll') unit = 'deg'
      scene.style.setProperty(`--${key}`, `${resolved}${unit}`)
    }
    const white = values.background
    scene.style.setProperty('--scene-background', `rgb(${248 + 7 * white}, ${249 + 6 * white}, ${246 + 9 * white})`)
    // Invisible Hero controls must not intercept clicks or keyboard navigation.
    copy.inert = progress >= 0.32
  }

  function queueUpdate() {
    if (media.matches && !frame) frame = requestAnimationFrame(update)
  }

  function measure() {
    if (disposed) return
    scene.classList.toggle('hero-companies-scene--scrub', media.matches)
    if (!media.matches) {
      cancelAnimationFrame(frame)
      frame = 0
      copy.inert = false
      scene.removeAttribute('style')
      return
    }
    const stageStyle = getComputedStyle(stage)
    stageHeight = stage.clientHeight
    copyHeight = copy.offsetHeight
    desktopFit = Math.min(1, stageHeight * 0.8 / (scene.querySelector('.desktop-frame').offsetHeight * 0.94))
    viewportWidth = document.documentElement.clientWidth
    activeTracks = viewportWidth <= 600 ? narrowTracks : viewportWidth <= 1100 ? tabletTracks : tracks
    const pinStart = hero.getBoundingClientRect().top + window.scrollY - parseFloat(stageStyle.top)
    start = Math.max(0, pinStart)
    range = Math.max(1, pinStart + hero.offsetHeight - stageHeight - start)
    lastProgress = -1
    update()
  }

  onMounted(() => {
    scene = sceneRef.value
    hero = scene.querySelector('#hero')
    stage = scene.querySelector('.hero-stage')
    copy = scene.querySelector('.hero-copy')
    media = matchMedia('(prefers-reduced-motion: no-preference)')
    measure()
    media.addEventListener('change', measure)
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('pageshow', measure)
    window.addEventListener('hashchange', queueUpdate)
    observer = new ResizeObserver(measure)
    observer.observe(hero)
    observer.observe(stage)
    document.fonts.ready.then(measure)
  })

  onBeforeUnmount(() => {
    disposed = true
    cancelAnimationFrame(frame)
    observer?.disconnect()
    media?.removeEventListener('change', measure)
    window.removeEventListener('scroll', queueUpdate)
    window.removeEventListener('resize', measure)
    window.removeEventListener('pageshow', measure)
    window.removeEventListener('hashchange', queueUpdate)
  })
}
