import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoices.css'
import InvoiceCard from "../components/InvoiceCard/InvoiceCard";
import EmptyState from "../components/EmptyState/EmptyState";
import FilterDropDown from "../components/FilterDropDown/FilterDropDown";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { invoices } = useContext(InvoiceContext);
    const [checked, setChecked] = useState([]);

    const filtered = (item) => {
        if (!checked.includes(item)) {
            setChecked((prev) => [...prev, item])
            
        } else {
            setChecked(() => (
                checked.filter((status) => status !== item)))
            
        }
        
    }

    const filteredInvoices =
        checked.length === 0 ? invoices :
            invoices.filter((invoice) => checked.includes(invoice.status));
    return (
        <div className="main">
            <div className="main-content">
                <div>
                    <h1>Invoices</h1>
                    {filteredInvoices.length === 0 ? <p>No invoices</p> : <p>There are {filteredInvoices.length} invoices</p>}
                </div>
                <div className="heading-right">

                    <FilterDropDown filteredData={filtered} />

                <button className="new-btn" onClick={() => setIsFormOpen(true)}>
                        <span className="plus">+</span>
                        <span className="new-desktop">New Invoice</span>
                        <span className="new-mobile">New</span>
                    </button>

                </div>
            </div>
            {filteredInvoices.length > 0 ? <div className="invoice-list">
                {filteredInvoices.map((item) => (
                        <InvoiceCard invoiceData={item} key={item.id} />
                ))}
            </div> : <EmptyState />}

            <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="new" />

        </div>
    )
}
