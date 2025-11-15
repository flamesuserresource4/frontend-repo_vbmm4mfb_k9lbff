import { motion } from 'framer-motion'

export default function DesertWind() {
  const gusts = Array.from({ length: 24 }).map((_, i) => ({
    key: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 10,
    scale: 0.6 + Math.random() * 0.9,
    opacity: 0.05 + Math.random() * 0.08,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {gusts.map(g => (
        <motion.span
          key={g.key}
          className="absolute block h-px bg-amber-900/40"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: `${80 + Math.random() * 160}px`,
            opacity: g.opacity,
            transformOrigin: 'left center',
          }}
          initial={{ x: '-20vw', rotate: -8, scale: g.scale }}
          animate={{ x: '120vw' }}
          transition={{ duration: g.duration, delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
