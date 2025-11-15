import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Feather, Bookmark, PlusCircle } from 'lucide-react'
import PapyrusNote from './components/PapyrusNote'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return notes
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      (n.tags || []).some(t => t.toLowerCase().includes(q))
    )
  }, [notes, query])

  async function loadNotes() {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/notes`)
      const data = await res.json()
      setNotes(data)
    } finally {
      setLoading(false)
    }
  }

  async function createNote(e) {
    e.preventDefault()
    if (!title.trim() && !content.trim()) return
    const body = {
      title: title.trim() || 'Untitled',
      content: content.trim(),
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    }
    const res = await fetch(`${API}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      setTitle(''); setContent(''); setTags('')
      loadNotes()
    }
  }

  async function deleteNote(n) {
    const res = await fetch(`${API}/api/notes/${n.id}`, { method: 'DELETE' })
    if (res.ok) loadNotes()
  }

  async function togglePin(n) {
    const res = await fetch(`${API}/api/notes/${n.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_pinned: !n.is_pinned })
    })
    if (res.ok) loadNotes()
  }

  useEffect(() => { loadNotes() }, [])

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Animated background with hieroglyphs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100" />
        <HieroglyphParallax />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPositionX: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.6), transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.5), transparent 35%)' }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -8, y: -8 }} animate={{ rotate: 0, y: 0 }} transition={{ type: 'spring', stiffness: 100 }} className="w-12 h-12 rounded-full bg-amber-900/10 grid place-items-center text-amber-900">
              <Feather />
            </motion.div>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-amber-900" style={{ fontVariant: 'small-caps' }}>Papyrus Notes</h1>
              <p className="text-amber-900/70">Capture thoughts like ancient scribes, with modern magic.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <section className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/50" size={18} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search scrolls..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-900/20 bg-white/70 backdrop-blur placeholder:text-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div className="flex items-center gap-2 text-amber-900/70">
              <Bookmark size={16} /> Ancient Theme Active
            </div>
          </div>

          {/* Composer */}
          <motion.form onSubmit={createNote} className="rounded-2xl border border-amber-900/20 p-5 bg-[rgb(247,238,207)]/80 shadow-xl backdrop-blur relative overflow-hidden">
            <PapyrusEdge />
            <div className="grid sm:grid-cols-3 gap-4">
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="sm:col-span-1 px-4 py-3 rounded-lg border border-amber-900/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="tags, comma,separated" className="sm:col-span-2 px-4 py-3 rounded-lg border border-amber-900/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write on the papyrus..." rows={4} className="sm:col-span-3 px-4 py-3 rounded-lg border border-amber-900/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="inline-flex items-center gap-2 bg-amber-800 text-amber-50 px-4 py-2 rounded-lg shadow hover:bg-amber-900 transition">
                <PlusCircle size={18} /> Add Scroll
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Notes grid */}
      <section className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-amber-900">Loading...</div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map(n => (
                  <PapyrusNote key={n.id} note={n} onDelete={deleteNote} onTogglePin={togglePin} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <FooterRibbon />
    </div>
  )
}

function HieroglyphParallax() {
  const glyphs = ['𓂀', '𓆣', '𓃹', '𓅓', '𓏏', '𓊹', '𓃭', '𓇋', '𓄿', '𓂧', '𓎛']
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-900/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 60}px`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
        >
          {glyphs[i % glyphs.length]}
        </motion.div>
      ))}
    </div>
  )
}

function PapyrusEdge() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{
      boxShadow: 'inset 0 0 0 1px rgba(120, 53, 15, 0.25), inset 0 40px 80px rgba(120, 53, 15, 0.15), inset 0 -40px 80px rgba(120, 53, 15, 0.15)'
    }} />
  )
}

function FooterRibbon() {
  return (
    <div className="relative z-10 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-xl p-6 bg-amber-900 text-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif text-xl" style={{ fontVariant: 'small-caps' }}>Scribe your legend</div>
            <div className="text-amber-200/80">A minimal note app with an ancient soul.</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-md bg-amber-800">Archaic Mode</div>
            <div className="px-3 py-2 rounded-md bg-amber-800">Papyrus Canvas</div>
          </div>
        </div>
      </div>
    </div>
  )
}
