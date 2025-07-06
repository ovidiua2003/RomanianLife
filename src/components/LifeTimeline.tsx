import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useGameStore } from '../store/useGameStore'

const LifeTimeline = () => {
  const eventLog = useGameStore(state => state.eventLog)

  return (
    <div className="bg-gray-900 p-4 rounded shadow">
      <h2 className="text-lg font-bold text-white mb-4">📊 Cronologia vieții</h2>
      <VerticalTimeline lineColor="#4B5563">
        {eventLog.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            date={entry.age}
            contentStyle={{ background: '#1F2937', color: '#D1D5DB' }}
            contentArrowStyle={{ borderRight: '7px solid #1F2937' }}
            iconStyle={{ background: '#4B5563', color: '#fff' }}
            icon={<span>📌</span>}
          >
            <p className="text-sm">{entry.message}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default LifeTimeline
