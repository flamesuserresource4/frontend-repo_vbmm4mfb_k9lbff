import { motion } from 'framer-motion'
import { Pin, Trash2, Tag } from 'lucide-react'

export default function PapyrusNote({ note, onDelete, onTogglePin }) {
  const tilt = (Math.random() * 4) - 2
  const floatDelay = Math.random() * 2
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotate: tilt }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      whileHover={{ scale: 1.025, rotate: tilt * 0.3 }}
      className="relative group w-full p-4 rounded-[14px] shadow-xl bg-[rgb(247,238,207)] text-stone-800 border border-amber-800/30 overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 40px), radial-gradient(circle at 10% 10%, rgba(255,255,255,0.4), rgba(255,255,255,0)), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0))',
      }}
    >
      {/* Floating micro-dust */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={false}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
        style={{ maskImage: 'radial-gradient(60% 60% at 50% 40%, black, transparent)', backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(120,53,15,0.06), rgba(120,53,15,0))' }}
      />

      {/* Inner vignette */}
      <div className="absolute inset-0 pointer-events-none rounded-[14px]" style={{
        background:
          'linear-gradient(90deg, rgba(69,40,10,0.08), rgba(69,40,10,0.03) 40%, rgba(69,40,10,0.08))',
        maskImage: 'radial-gradient(circle at 50% -10%, black 60%, transparent 70%)'
      }} />

      <div className="flex items-start gap-3 relative">
        <div className="flex-1">
          <h3 className="font-serif text-xl mb-2 tracking-wide" style={{ fontVariant: 'small-caps' }}>
            {note.title}
          </h3>
          <p className="whitespace-pre-wrap leading-relaxed text-stone-900/90">
            {note.content}
          </p>
        </div>
        <motion.div
          className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          animate={{ y: [4, 0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay * 0.5 }}
        >
          <button onClick={() => onTogglePin(note)} className={`p-2 rounded-md hover:bg-amber-900/10 ${note.is_pinned ? 'text-amber-900' : 'text-stone-700'}`} title={note.is_pinned ? 'Unpin' : 'Pin'}>
            <Pin size={18} fill={note.is_pinned ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => onDelete(note)} className="p-2 rounded-md hover:bg-rose-900/10 text-rose-700" title="Delete">
            <Trash2 size={18} />
          </button>
        </motion.div>
      </div>

      {note.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((t, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            >
              <Tag size={12} /> {t}
            </motion.span>
          ))}
        </div>
      ) : null}

      {/* Corner curl shimmer */}
      <motion.div
        className="absolute right-0 bottom-0 w-24 h-24 pointer-events-none"
        animate={{ rotate: [0, 2, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(80% 80% at 100% 100%, rgba(120,53,15,0.25), rgba(120,53,15,0))'
        }}
      />
    </motion.div>
  )
}
