import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoices.css'
import InvoiceCard from "../components/InvoiceCard/InvoiceCard";
import data from "../data/invoices";
import EmptyState from "../components/EmptyState/EmptyState";
import FilterDropDown from "../components/FilterDropDown/FilterDropDown";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import { useState } from "react";

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    return (
        <div className="main">
            <div className="main-content">
                <div>
                    <h1>Invoices</h1>
                    <p>No invoices</p>
                </div>
                <div className="heading-right">

                    <FilterDropDown />

                    <button className="new-btn" onClick={() => setIsFormOpen(true)}>
                        <span className="plus">+</span>
                        <span className="new-desktop">New Invoice</span>
                        <span className="new-mobile">New</span>
                    </button>

                </div>
            </div>

            {/* <EmptyState /> */}
            <div className="invoice-list">
                <InvoiceCard invoiceData={data[0]} />
                <InvoiceCard invoiceData={data[1]} />
                <InvoiceCard invoiceData={data[2]} />
            </div>
            <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="new" />

        </div>
    )
}
