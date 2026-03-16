import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoices.css'
import InvoiceCard from "../components/InvoiceCard";
import data from "../data/invoices";
import EmptyState from "../components/EmptyState";
import FilterDropDown from "../components/FilterDropDown";

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    return (
        <div className="main">
            <div className="main-content">
                <div>
                    <h1>Invoices</h1>
                    <p>No invoices</p>
                </div>
                <div className="heading-right">

                    <FilterDropDown/>

                    <button className="new-btn">
                        <span className="plus">+</span>
                        <span>New Invoice</span>
                    </button>

                </div>
            </div>

            <EmptyState />
            {/* <div className="invoice-list">
                <InvoiceCard invoiceData={data[0]} />
                <InvoiceCard invoiceData={data[1]} />
                <InvoiceCard invoiceData={data[2]} />
            </div> */}

        </div>
    )
}