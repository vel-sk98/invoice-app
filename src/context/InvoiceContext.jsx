import { createContext } from "react";
import initialinvoices from '../data/invoices'
import useLocalStorage from "../hooks/useLocalStorage";


export const InvoiceContext = createContext();

const InvoiceContextProvider = ({ children }) => {
    const [invoices, setInvoices] = useLocalStorage('invoices', initialinvoices);

    function addInvoice() {
        
    }
    function editInvoice() {
        
    }
    function deleteInvoice() {
        
    }
    function markAsPaid() {
        
    }


    return (
        <InvoiceContext.Provider value={{ invoices, addInvoice, editInvoice, deleteInvoice, markAsPaid }}>
            {children}
        </InvoiceContext.Provider>
    )
    
}
export default InvoiceContextProvider