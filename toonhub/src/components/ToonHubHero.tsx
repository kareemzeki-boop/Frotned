import { useState, useEffect, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface CharImage {
  id: number
  url: string
  bg: string
}

// Replace these with your own transparent-background character PNG/SVG URLs
const IMAGES: CharImage[] = [
  { id: 0, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Mia&backgroundColor=transparent', bg: '#e63946' },
  { id: 1, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Kai&backgroundColor=transparent', bg: '#7c3aed' },
  { id: 2, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Luna&backgroundColor=transparent', bg: '#0284c7' },
  { id: 3, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Zara&backgroundColor=transparent', bg: '#16a34a' },
]

const GRAIN_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
  `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>` +
  `<feColorMatrix type='saturate' values='0'/></filter>` +
  `<rect width='200' height='200' filter='url(#n)' opacity='0.08'/></svg>`
)
const GRAIN_URI = `url("data:image/svg+xml,${GRAIN_SVG}")`

type Dir = 'next' | 'prev'

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  // Preload all images on mount
  useEffect(() => {
    IMAGES.forEach(({ url }) => {
      const img = new Image()
      img.src = url
    })
  }, [])

  // Track mobile breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = useCallback((dir: Dir) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex(prev => dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4)
    setTimeout(() => setIsAnimating(false), 650)
  }, [isAnimating])

  const center = activeIndex
  const left   = (activeIndex + 3) % 4
  const right  = (activeIndex + 1) % 4

  const getRoleStyle = (id: number): CSSProperties => {
    const ease = 'cubic-bezier(0.4,0,0.2,1)'
    const d    = `650ms ${ease}`
    const shared: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transition: `transform ${d}, filter ${d}, opacity ${d}, left ${d}`,
      willChange: 'transform, filter, opacity',
    }

    if (id === center) return {
      ...shared,
      left:      '50%',
      bottom:    isMobile ? '22%' : 0,
      height:    isMobile ? '60%' : '92%',
      transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
      filter:    'none',
      opacity:   1,
      zIndex:    20,
    }
    if (id === left) return {
      ...shared,
      left:      isMobile ? '20%' : '30%',
      bottom:    isMobile ? '32%' : '12%',
      height:    isMobile ? '16%' : '28%',
      transform: 'translateX(-50%) scale(1)',
      filter:    'blur(2px)',
      opacity:   0.85,
      zIndex:    10,
    }
    if (id === right) return {
      ...shared,
      left:      isMobile ? '80%' : '70%',
      bottom:    isMobile ? '32%' : '12%',
      height:    isMobile ? '16%' : '28%',
      transform: 'translateX(-50%) scale(1)',
      filter:    'blur(2px)',
      opacity:   0.85,
      zIndex:    10,
    }
    // back
    return {
      ...shared,
      left:      '50%',
      bottom:    isMobile ? '32%' : '12%',
      height:    isMobile ? '13%' : '22%',
      transform: 'translateX(-50%) scale(1)',
      filter:    'blur(4px)',
      opacity:   1,
      zIndex:    5,
    }
  }

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition:      'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily:      'Inter, sans-serif',
        position:        'relative',
        width:           '100%',
        overflow:        'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* ── Grain overlay ────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50,
            backgroundImage: GRAIN_URI, backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat', opacity: 0.4,
          }}
        />

        {/* ── Giant ghost text ─────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: '18%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', userSelect: 'none', zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily:     'Anton, sans-serif',
              fontSize:       'clamp(90px, 28vw, 380px)',
              fontWeight:     900,
              color:          'white',
              opacity:        1,
              lineHeight:     1,
              textTransform:  'uppercase',
              letterSpacing:  '-0.02em',
              whiteSpace:     'nowrap',
            }}
          >
            3D SHAPE
          </span>
        </div>

        {/* ── Brand label ──────────────────────────────────────────────── */}
        <div className="absolute top-6 left-4 sm:left-8" style={{ zIndex: 60 }}>
          <span
            style={{
              fontSize:      '0.75rem',
              fontWeight:    600,
              textTransform: 'uppercase',
              color:         'white',
              opacity:       0.9,
              letterSpacing: '0.18em',
            }}
          >
            TOONHUB
          </span>
        </div>

        {/* ── Character carousel ───────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          {IMAGES.map(img => (
            <div key={img.id} style={getRoleStyle(img.id)}>
              <img
                src={img.url}
                alt={`Character ${img.id + 1}`}
                draggable={false}
                style={{
                  width:          '100%',
                  height:         '100%',
                  objectFit:      'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom-left: title + description + nav ───────────────────── */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{ color: 'white', opacity: 0.95, letterSpacing: '0.02em' }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: 'white', opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('prev')}
              aria-label="Previous character"
              className="
                w-12 h-12 sm:w-16 sm:h-16 rounded-full
                flex items-center justify-center
                bg-transparent border-2 border-white text-white
                cursor-pointer
                transition-[transform,background-color] duration-150
                hover:scale-[1.08] hover:bg-white/[0.12]
              "
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              aria-label="Next character"
              className="
                w-12 h-12 sm:w-16 sm:h-16 rounded-full
                flex items-center justify-center
                bg-transparent border-2 border-white text-white
                cursor-pointer
                transition-[transform,background-color] duration-150
                hover:scale-[1.08] hover:bg-white/[0.12]
              "
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* ── Bottom-right: DISCOVER IT ────────────────────────────────── */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <a
            href="#"
            className="flex items-center gap-2 no-underline"
            style={{
              fontFamily:    'Anton, sans-serif',
              fontSize:      'clamp(20px, 4vw, 56px)',
              fontWeight:    400,
              color:         'white',
              opacity:       0.95,
              letterSpacing: '-0.02em',
              lineHeight:    1,
              textTransform: 'uppercase',
              textDecoration:'none',
              transition:    'opacity 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'    }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.95' }}
          >
            DISCOVER IT
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>

      </div>
    </div>
  )
}
