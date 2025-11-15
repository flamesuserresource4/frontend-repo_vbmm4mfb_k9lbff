import { motion } from 'framer-motion'

export default function DesertWind() {
  const layers = 3
  const gusts = Array.from({ length: 36 }).map((_, i) => ({
    key: i,
    layer: i % layers,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 12,
    scale: 0.6 + Math.random() * 1.2,
    thickness: 0.5 + Math.random() * 2,
    opacity: 0.03 + Math.random() * 0.08,
    sway: 6 + Math.random() * 18,
  }))

  const layerSpeed = [1.4, 1.0, 0.7]
  const layerBlur = ['blur-[2px]', 'blur-[1px]', 'blur-none']

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {gusts.map(g => (
        <motion.span
          key={g.key}
          className={`absolute block bg-amber-900/40 ${layerBlur[g.layer]}`}
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: `${120 + Math.random() * 220}px`,
            height: `${g.thickness}px`,
            opacity: g.opacity,
            transformOrigin: 'left center',
            borderRadius: '9999px'
          }}
          initial={{ x: '-25vw', rotate: -8, scale: g.scale, y: 0 }}
          animate={{ x: '125vw', y: [0, -g.sway, 0, g.sway * 0.5, 0] }}
          transition={{ duration: g.duration * layerSpeed[g.layer], delay: g.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Whirl wisps */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`whirl-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-amber-900/10 to-amber-700/0"
          style={{
            width: `${80 + Math.random() * 140}px`,
            height: `${20 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(6px)'
          }}
          initial={{ x: '-30vw', rotate: -10, opacity: 0 }}
          animate={{ x: '130vw', rotate: [-10, -4, -10], opacity: [0, 1, 0] }}
          transition={{ duration: 16 + Math.random() * 10, delay: Math.random() * 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
