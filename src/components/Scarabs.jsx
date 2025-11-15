import { motion } from 'framer-motion'

export default function Scarabs() {
  const bugs = Array.from({ length: 12 }).map((_, i) => ({
    key: i,
    size: 10 + Math.random() * 10,
    x: Math.random() * 100,
    y: 100 + Math.random() * 20,
    delay: Math.random() * 4,
    duration: 10 + Math.random() * 8,
  }))

  return (
    <div className="absolute inset-x-0 bottom-0 h-40 overflow-visible -z-0 pointer-events-none">
      {bugs.map(b => (
        <motion.div
          key={b.key}
          className="absolute"
          style={{ left: `${b.x}%`, bottom: '-20px' }}
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [-10, -20, -12, -10], rotate: [0, 4, -2, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="rounded-full bg-amber-900/70"
            style={{ width: b.size, height: b.size }}
            animate={{ x: [0, 20, 0, -10, 0] }}
            transition={{ duration: b.duration * 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}
    </div>
  )
}
