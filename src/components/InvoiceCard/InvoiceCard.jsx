
import arrow from '../../assets/icon-arrow-right.svg';
import Badge from '../Badge/Badge';
import './InvoiceCard.css'

const InvoiceCard = ({ invoiceData }) => {
    return (
        <>
        <div className='grid-container-desktop'>
            <div className='grid-item col1'><span>#</span>{invoiceData.id} </div>
            <div className='grid-item col2'> {invoiceData.dueDate} </div>
            <div className='grid-item col3'> {invoiceData.clientName} </div>
            <div className='grid-item col4'> £ {invoiceData.amount} </div>
            <div className='grid-item col5'> <Badge status={invoiceData.status} /> </div>
            <div className='grid-item col6'><img src={arrow} alt='left arrow' /></div>
            </div>
            <div className='grid-container-mobile'>
                <div className='grid-item col1'><span>#</span>{invoiceData.id} </div>
                <div className='grid-item col3'> {invoiceData.clientName} </div>
                <div className='grid-item col2'> Due {invoiceData.dueDate} <h3>£ {invoiceData.amount}</h3></div>
                <div className='grid-item col5'> <Badge status={invoiceData.status} /> </div>
            </div>    
            

        </>    
    )
}

export default InvoiceCard