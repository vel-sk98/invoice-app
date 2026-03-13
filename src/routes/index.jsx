import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
    component: InvoiceList,
})

function InvoiceList() {
    return <div>Invoice List Page</div>
}