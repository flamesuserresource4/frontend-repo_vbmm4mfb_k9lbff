import { motion } from 'framer-motion'
import { Pin, Trash2, Tag } from 'lucide-react'

export default function PapyrusNote({ note, onDelete, onTogglePin }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, rotate: (Math.random() * 6) - 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      className="relative group w-full p-4 rounded-[14px] shadow-xl bg-[rgb(247,238,207)] text-stone-800 border border-amber-800/30"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 40px), radial-gradient(circle at 10% 10%, rgba(255,255,255,0.4), rgba(255,255,255,0)), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0))',
      }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[14px]" style={{
        background:
          'linear-gradient(90deg, rgba(69,40,10,0.08), rgba(69,40,10,0.03) 40%, rgba(69,40,10,0.08))',
        maskImage: 'radial-gradient(circle at 50% -10%, black 60%, transparent 70%)'
      }} />

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-serif text-xl mb-2 tracking-wide" style={{ fontVariant: 'small-caps' }}>
            {note.title}
          </h3>
          <p className="whitespace-pre-wrap leading-relaxed text-stone-900/90">
            {note.content}
          </p>
        </div>
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onTogglePin(note)} className={`p-2 rounded-md hover:bg-amber-900/10 ${note.is_pinned ? 'text-amber-900' : 'text-stone-700'}`} title={note.is_pinned ? 'Unpin' : 'Pin'}>
            <Pin size={18} fill={note.is_pinned ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => onDelete(note)} className="p-2 rounded-md hover:bg-rose-900/10 text-rose-700" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {note.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20">
              <Tag size={12} /> {t}
            </span>
          ))}
        </div>
      ) : null}
    </motion.div>
  )
}
