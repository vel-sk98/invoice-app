import './EmptyState.css'
import empty from '../../assets/illustration-empty.svg'
const EmptyState = () => {
  return (
      <div className='empty'>
          <div className='empty-illustration'>
              <img src={empty} alt='empty' />
          </div> 
          <div className='empty-content'>
          <h2>There is nothing here</h2>
              <p>Create an invoice by clicking the New Invoice button and get started</p>
         </div>  
              
      </div>
  )
}

export default EmptyState