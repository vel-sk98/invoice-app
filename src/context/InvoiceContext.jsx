import { createContext, useEffect, useState } from "react";
import initialinvoices from '../data/invoices'
import useLocalStorage from "../hooks/useLocalStorage";


export const InvoiceContext = createContext();

const InvoiceContextProvider = ({ children }) => {
    const [invoices, setInvoices] = useLocalStorage('invoices', initialinvoices);
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    
    useEffect(() => document.body.setAttribute('data-theme', theme), []);

    function addInvoice(newInvoice) {
        setInvoices([...invoices, newInvoice]);

    }
    function editInvoice(updatedInvoice) {
        const updated = invoices.map((inv) => {
            if (inv.id === updatedInvoice.id) {
                return updatedInvoice
            } else {
                return inv
            }
        })
        setInvoices(updated);

    }
    function deleteInvoice(id) {
        setInvoices((prevInvoices) =>
            prevInvoices.filter((inv) => inv.id !== id)
        );
    }
    function markAsPaid(id) {
        setInvoices((prevInvoices) =>
            prevInvoices.map((inv) => {
                if (inv.id === id) {
                    if (inv.status === 'paid') {
                        const Invoice = {
                            ...inv,
                            status: "pending"
                        };
                        return Invoice
                    } else {
                        const newInvoice = {
                            ...inv,
                            status: "paid"
                        };
                        return newInvoice
                    }
                } else {
                    return inv
                }  
            })
        );

    }
    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.setAttribute("data-theme", newTheme);
            
    }


    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice, editInvoice, deleteInvoice, markAsPaid, theme, toggleTheme }}>
            {children}
        </InvoiceContext.Provider>
    )

}
export default InvoiceContextProvider