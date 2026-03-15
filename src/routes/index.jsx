import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoices.css'
import InvoiceCard from "../components/InvoiceCard";
import data from "../data/invoices";
import arrow from '../assets/icon-arrow-down.svg';

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

                    <button className="filter-btn">
                        Filter by status
                        <img src={arrow} alt='down arrow' />
                    </button>

                    <button className="new-btn">
                        <span className="plus">+</span>
                        <span>New Invoice</span>
                    </button>

                </div>
            </div>
            <div className="invoice-list">
                <InvoiceCard invoiceData={data[0]} />
                <InvoiceCard invoiceData={data[1]} />
                <InvoiceCard invoiceData={data[2]} />
            </div>

        </div>
    )
}