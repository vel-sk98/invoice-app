import { createFileRoute } from "@tanstack/react-router";

import '../styles/invoices.css'

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    return (
        <div className="main">
            <div className="main-content">
            <div>       
            <h1>Invoices</h1>
            <p>There are 7 total invoices</p>
            </div> 
                <div className="heading-right">
                    
                <label htmlFor="status" >
                    <button className="filter-btn">
                    Filter by status <span>▾</span>
                    </button>
                </label>
                <select name="status" id="status">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                </select>
                
                <button className="new-btn"><span className="plus">+</span><span>New Invoice</span></button>
                
            </div>
           
            </div>

            <div className="invoice-list">
                <div> Invoice no 1</div>
                <div> Invoice no 2</div>
                <div> Invoice no 3</div>
            </div>

        </div>
    )
}