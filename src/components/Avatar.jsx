// Hand-drawn SVG cast portraits — no external assets, crisp at any size.

const SKIN = {
  alex: '#f4d3bb',
  sam: '#c98a5d',
  taylor: '#e9b78d',
  jordan: '#efc9a7',
  you: '#d59a67',
}

const HAIR = {
  alex: '#4a3324',
  sam: '#2b211c',
  taylor: '#6b4630',
  jordan: '#2f333b',
  you: '#3a2a20',
}

function Shoulders({ id }) {
  const fills = {
    alex: '#c4b5fd',
    sam: '#fb7185',
    taylor: '#38bdf8',
    jordan: '#334155',
    you: '#6366f1',
  }
  const zip = { alex: '#a78bfa', sam: '#e11d48', taylor: '#0ea5e9', jordan: '#1e293b', you: '#4338ca' }
  return (
    <g>
      <path
        d="M20 120c2-22 17-32 40-32s38 10 40 32z"
        fill={fills[id]}
      />
      <path d="M60 88v32" stroke={zip[id]} strokeWidth="3" strokeLinecap="round" />
      {id === 'alex' && (
        <>
          <path d="M34 104c6-8 12-11 14-11" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M86 104c-6-8-12-11-14-11" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      )}
      {id === 'sam' && (
        <path d="M60 88l-9 10 9 9 9-9z" fill="#ffe4e6" opacity="0.9" />
      )}
      {id === 'taylor' && (
        <path d="M44 90l16 10 16-10" stroke="#e0f2fe" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {id === 'jordan' && (
        <path d="M36 110h48" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </g>
  )
}

function Head({ id, children }) {
  return (
    <g>
      <ellipse cx="60" cy="52" rx="23" ry="26" fill={SKIN[id]} />
      {children}
    </g>
  )
}

const FEATURES = {
  alex: (id) => (
    <>
      {/* messy hair + claw clip */}
      <path
        d="M37 48c-2-18 9-29 24-29 14 0 24 10 23 26-4-4-7-9-8-13-6 6-20 10-31 7-3 2-5 5-6 9z"
        fill={HAIR.alex}
      />
      <path d="M63 20c7 2 12 8 13 15-4-5-8-8-13-9z" fill="#5c4130" />
      <rect x="86" y="26" width="12" height="6" rx="3" fill="#f9a8d4" transform="rotate(18 86 26)" />
      {/* tired eyes with dark circles */}
      <ellipse cx="50" cy="55" rx="4.6" ry="5.4" fill="#fbe4ea" opacity="0.85" />
      <ellipse cx="70" cy="55" rx="4.6" ry="5.4" fill="#fbe4ea" opacity="0.85" />
      <circle cx="51" cy="54" r="2.3" fill="#2c1f18" />
      <circle cx="71" cy="54" r="2.3" fill="#2c1f18" />
      <path d="M48 63c1.6 1.8 4 2.6 6 2.4M66 65.4c2 .2 4.2-.6 5.6-2.2" stroke="#b9877a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  sam: () => (
    <>
      <path d="M36 50c-3-19 8-30 26-30 12 0 20 6 23 16-8-2-18 1-24 6-6 5-10 8-16 8-2 0-5 0-9 0z" fill={HAIR.sam} />
      <path d="M79 22c5 3 8 9 7 15-2-5-5-9-9-12z" fill="#171210" />
      {/* expressive brows + grin */}
      <path d="M45 45l9 2M66 47l9-2" stroke="#1f1916" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="51" cy="55" r="2.6" fill="#1f1916" />
      <circle cx="70" cy="55" r="2.6" fill="#1f1916" />
      <path d="M52 66c5 4 11 4 16 0" stroke="#7a3a33" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="42" cy="62" r="3.4" fill="#e8735f" opacity="0.35" />
      <circle cx="78" cy="62" r="3.4" fill="#e8735f" opacity="0.35" />
    </>
  ),
  taylor: () => (
    <>
      <circle cx="60" cy="16" r="11" fill={HAIR.taylor} />
      <path d="M36 48c-2-17 9-27 24-27s26 10 24 27c-6-7-9-13-9-13-5 5-19 8-30 6-4 1-7 4-9 7z" fill={HAIR.taylor} />
      {/* wire glasses */}
      <circle cx="50" cy="55" r="8" fill="#fff" fillOpacity="0.55" stroke="#3f3f46" strokeWidth="1.8" />
      <circle cx="70" cy="55" r="8" fill="#fff" fillOpacity="0.55" stroke="#3f3f46" strokeWidth="1.8" />
      <path d="M58 55h4M42 54l-6-2M78 54l6-2" stroke="#3f3f46" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="51" cy="55" r="2.2" fill="#2c1f18" />
      <circle cx="71" cy="55" r="2.2" fill="#2c1f18" />
      <path d="M52 68c4 2 8 2 12 0" stroke="#8a5a48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </>
  ),
  jordan: () => (
    <>
      <path d="M36 50c-4-18 8-30 25-30 15 0 25 10 24 27-5-3-8-8-9-12-7 7-21 12-33 9-3 2-5 3-7 6z" fill={HAIR.jordan} />
      <path d="M40 36c6 9 14 12 22 11" stroke="#1f232a" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="51" cy="56" r="2.4" fill="#252a32" />
      <circle cx="70" cy="56" r="2.4" fill="#252a32" />
      <path d="M54 67c4 1 8 1 11-1" stroke="#8a5a48" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </>
  ),
  you: () => (
    <>
      <path d="M36 48c-2-17 9-28 24-28 16 0 26 11 24 28-5-6-8-11-9-15-6 6-19 10-30 8-4 1-7 4-9 7z" fill={HAIR.you} />
      <circle cx="51" cy="55" r="2.5" fill="#2c1f18" />
      <circle cx="70" cy="55" r="2.5" fill="#2c1f18" />
      <path d="M52 66c4 3 9 3 13 0" stroke="#8a5a48" strokeWidth="2.3" strokeLinecap="round" fill="none" />
      <path d="M45 45l8 1M67 46l8-1" stroke="#3a2a20" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
}

export function CharacterAvatar({ id = 'you', size = 96, className = '' }) {
  const key = FEATURES[id] ? id : 'you'
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${key} character portrait`}
    >
      <circle cx="60" cy="60" r="60" fill="#f4f1ff" />
      <circle cx="60" cy="60" r="60" fill="url(#g)" opacity="0.25" />
      <defs>
        <radialGradient id="g" cx="35%" cy="20%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c7bff5" />
        </radialGradient>
      </defs>
      <Head id={key}>
        {FEATURES[key](key)}
        {key === 'jordan' && (
          <g>
            <path d="M13 66a47 47 0 0 1 94 0" stroke="none" fill="none" />
            <rect x="26" y="60" width="10" height="26" rx="5" fill="#111827" />
            <rect x="84" y="60" width="10" height="26" rx="5" fill="#111827" />
            <path d="M31 62a29 29 0 0 1 58 0" stroke="#111827" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        )}
        {key === 'alex' && (
          <g>
            <rect x="14" y="88" width="16" height="26" rx="4" fill="#fde8d7" transform="rotate(-8 14 88)" />
            <rect x="15" y="92" width="16" height="14" rx="3" fill="#d8b4fe" transform="rotate(-8 14 88)" />
            <circle cx="26" cy="88" r="2" fill="#7c3aed" transform="rotate(-8 14 88)" />
          </g>
        )}
        {key === 'sam' && (
          <g>
            <rect x="94" y="86" width="6" height="30" rx="3" fill="#ef4444" transform="rotate(14 94 86)" />
            <rect x="94" y="84" width="6" height="6" rx="2" fill="#991b1b" transform="rotate(14 94 86)" />
          </g>
        )}
        {key === 'taylor' && (
          <g>
            <rect x="94" y="92" width="20" height="24" rx="3" fill="#0ea5e9" transform="rotate(8 94 92)" />
            <rect x="98" y="96" width="13" height="2.5" rx="1.2" fill="#e0f2fe" transform="rotate(8 94 92)" />
            <rect x="98" y="102" width="10" height="2.5" rx="1.2" fill="#e0f2fe" transform="rotate(8 94 92)" />
          </g>
        )}
      </Head>
      <Shoulders id={key} />
    </svg>
  )
}

export function YouAvatar({ avatar, name, size = 64 }) {
  const isImage = typeof avatar === 'string' && avatar.startsWith('data:image')
  return (
    <div
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-indigo-100 ring-2 ring-white/70"
      style={{ width: size, height: size }}
      title={name}
    >
      {isImage ? (
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span style={{ fontSize: size * 0.5 }}>{avatar || '🙂'}</span>
      )}
    </div>
  )
}
