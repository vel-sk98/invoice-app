import { createFileRoute } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    return(
    <div>
        Invoice List Page
        
    </div>
    )
}