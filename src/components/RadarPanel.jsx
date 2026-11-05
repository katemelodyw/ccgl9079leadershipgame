import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { STYLES, STYLE_ORDER } from '../data/styles.js'

/**
 * series: [{ key, name, pct: {styleId: 0-100}, hex }]
 */
export default function RadarPanel({ series, height = 320, showLegend = series.length > 1 }) {
  const data = STYLE_ORDER.map((s) => {
    const row = { style: STYLES[s].label, fullMark: 100 }
    for (const ser of series) row[ser.key] = ser.pct?.[s] || 0
    return row
  })

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="style"
            tick={{ fill: '#4a4478', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {series.map((ser) => (
            <Radar
              key={ser.key}
              name={ser.name}
              dataKey={ser.key}
              stroke={ser.hex}
              fill={ser.hex}
              fillOpacity={series.length > 1 ? 0.14 : 0.28}
              strokeWidth={2}
            />
          ))}
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              fontSize: 12,
              boxShadow: '0 12px 30px -12px rgba(20,16,58,0.35)',
            }}
            formatter={(value, name) => [`${value}%`, name]}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} iconType="circle" />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
