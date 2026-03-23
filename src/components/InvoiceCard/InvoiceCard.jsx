import { Link } from "@tanstack/react-router";
import arrow from '../../assets/icon-arrow-right.svg';
import Badge from '../Badge/Badge';
import './InvoiceCard.css'

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};


const InvoiceCard = ({ invoiceData }) => {
    return (
        <>
            <Link to={`/invoice/${invoiceData.id}`}>
            <div className='grid-container-desktop'>
                <div className='grid-item col1'><span>#</span>{invoiceData.id} </div>
                <div className='grid-item col2'>Due  {formatDate(invoiceData.paymentDue)} </div>
                <div className='grid-item col3'> {invoiceData.clientName} </div>
                <div className='grid-item col4'> £ {invoiceData.total} </div>
                <div className='grid-item col5'> <Badge status={invoiceData.status} /> </div>
                <div className='grid-item col6'><img src={arrow} alt='left arrow' /></div>
                </div>
            </Link>    
            <div className='grid-container-mobile'>
                <div className='grid-item col1'><span>#</span>{invoiceData.id} </div>
                <div className='grid-item col3'> {invoiceData.clientName} </div>
                <div className='grid-item col2'> Due {invoiceData.paymentDue} <h3>£ {invoiceData.total}</h3></div>
                <div className='grid-item col5'> <Badge status={invoiceData.status} /> </div>
            </div>


        </>
    )
}

export default InvoiceCard