
import './Badge.css'

const Badge = ({status}) => {
  return (
      <div className={`badge badge--${status}`}>
          <span className='badge-dot'>●</span>
          {status.charAt(0).toUpperCase()+status.slice(1)}
      </div>
  )
}

export default Badge