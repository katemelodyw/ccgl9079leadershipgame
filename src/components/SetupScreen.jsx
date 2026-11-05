import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Upload, UserRound } from 'lucide-react'
import { ARCHETYPES } from '../data/styles.js'

const EMOJI_CHOICES = ['🙂', '😤', '🫡', '🥷', '🧠', '🌱', '🔥', '🦉', '🎯', '☕']

function downscale(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file is not an image.'))
      img.onload = () => {
        const size = 200
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        const scale = Math.max(size / img.width, size / img.height)
        const w = img.width * scale
        const h = img.height * scale
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function SetupScreen({ initial, onBack, onBegin }) {
  const [name, setName] = useState(initial?.name || '')
  const [avatar, setAvatar] = useState(initial?.avatar || '🙂')
  const [archetype, setArchetype] = useState(initial?.archetype || 'dreamer')
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const upload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setAvatar(await downscale(file))
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200/70 hover:text-white">
        <ArrowLeft size={14} /> Back to title
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="panel overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-6">
          <p className="text-[11px] font-bold tracking-[0.18em] text-indigo-500 uppercase">Enrolment · Week 2</p>
          <h2 className="mt-1 font-display text-3xl text-ink">Who is leading this team?</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            You are the student lead for the Campus Innovation Showcase. Four people are waiting on your first call.
          </p>
        </div>

        <div className="space-y-7 px-6 py-6">
          <div>
            <label htmlFor="lead-name" className="mb-2 block text-xs font-bold tracking-wider text-slate-500 uppercase">
              Your name
            </label>
            <input
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 24))}
              placeholder="e.g. Priya"
              className="field"
              autoComplete="off"
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">Your avatar</p>
            <div className="flex flex-wrap items-center gap-2">
              {EMOJI_CHOICES.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setAvatar(emoji)}
                  aria-label={`Avatar ${emoji}`}
                  aria-pressed={avatar === emoji}
                  className={`grid h-11 w-11 place-items-center rounded-2xl border text-xl transition ${
                    avatar === emoji
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-dashed border-slate-300 px-3 text-xs font-semibold text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
              >
                <Upload size={14} /> Photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={upload} className="hidden" />
              <div className="ml-auto grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-indigo-100 ring-2 ring-white">
                {avatar.startsWith('data:image') ? (
                  <img src={avatar} alt="Your avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl">{avatar}</span>
                )}
              </div>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
          </div>

          <div>
            <p className="mb-1 text-xs font-bold tracking-wider text-slate-500 uppercase">Starting archetype</p>
            <p className="mb-3 text-xs text-slate-400">Nudges your starting meters. Your choices still decide everything else.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {ARCHETYPES.map((a) => {
                const active = archetype === a.id
                return (
                  <button
                    key={a.id}
                    onClick={() => setArchetype(a.id)}
                    aria-pressed={active}
                    className={`rounded-2xl border p-3 text-left transition ${
                      active
                        ? 'border-indigo-500 bg-indigo-50/70 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{a.emoji}</span>
                      <span className="text-sm font-bold text-ink">{a.name}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.blurb}</p>
                    <p className="mt-1.5 text-[10px] font-bold tracking-wider text-indigo-500 uppercase">
                      {a.bonus.rapport !== 0 && `${a.bonus.rapport > 0 ? '+' : ''}${a.bonus.rapport} rapport`}
                      {a.bonus.rapport !== 0 && a.bonus.energy !== 0 && ' · '}
                      {a.bonus.energy !== 0 && `${a.bonus.energy > 0 ? '+' : ''}${a.bonus.energy} energy`}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
            <p className="mb-1 flex items-center gap-1.5 font-semibold text-slate-600">
              <UserRound size={13} /> How it works
            </p>
            Every chapter gives you four written options and one blank line. There is no "correct" answer —
            only consequences that carry into the next week. Two meters decide whether you reach the finale.
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
          <button
            onClick={() => {
              if (!name.trim()) {
                setError('Give your lead a name first.')
                return
              }
              onBegin({ name: name.trim(), avatar, archetype })
            }}
            className="btn-primary w-full px-6 sm:w-auto"
          >
            Start the semester <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
