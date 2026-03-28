import { createContext } from "react";
import initialinvoices from '../data/invoices'
import useLocalStorage from "../hooks/useLocalStorage";


export const InvoiceContext = createContext();

const InvoiceContextProvider = ({ children }) => {
    const [invoices, setInvoices] = useLocalStorage('invoices', initialinvoices);
    

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


    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice, editInvoice, deleteInvoice, markAsPaid }}>
            {children}
        </InvoiceContext.Provider>
    )

}
export default InvoiceContextProvider