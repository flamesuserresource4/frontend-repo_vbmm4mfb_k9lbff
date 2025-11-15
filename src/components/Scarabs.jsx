import { motion } from 'framer-motion'

function ScarabShape({ size = 14 }) {
  const body = size
  const head = size * 0.5
  return (
    <div style={{ width: body, height: body }} className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-700 to-amber-900 shadow" />
      <div className="absolute -top-[35%] left-1/2 -translate-x-1/2 rounded-full bg-amber-800" style={{ width: head, height: head }} />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[2px] h-[120%] bg-amber-950/40" />
      <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[2px] h-[120%] bg-amber-950/30 rotate-[25deg]" />
      <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[2px] h-[120%] bg-amber-950/30 -rotate-[25deg]" />
    </div>
  )
}

export default function Scarabs() {
  const bugs = Array.from({ length: 18 }).map((_, i) => ({
    key: i,
    size: 10 + Math.random() * 12,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 9 + Math.random() * 10,
    pathAmp: 10 + Math.random() * 30,
  }))

  return (
    <div className="absolute inset-x-0 bottom-0 h-48 overflow-visible pointer-events-none">
      {bugs.map(b => (
        <motion.div
          key={b.key}
          className="absolute"
          style={{ left: `${b.x}%`, bottom: '-12px' }}
          initial={{ y: 0, rotate: 0, opacity: 0 }}
          animate={{ y: [0, b.pathAmp * 0.3, b.pathAmp * 0.6, b.pathAmp * 0.2, 0], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ x: [0, 18, -6, 0], rotate: [0, 14, -8, 0], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: b.duration * 1.1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ScarabShape size={b.size} />
          </motion.div>
        </motion.div>
      ))}
      {/* Sand shimmer */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-700/0 via-amber-700/40 to-amber-700/0"
        animate={{ opacity: [0.1, 0.35, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
