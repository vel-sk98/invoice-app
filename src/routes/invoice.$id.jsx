import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/invoice/$id')({
    component: InvoiceDetail,
})

function InvoiceDetail() {
    const { id } = Route.useParams()
    return <div>Invoice Detail - {id}</div>
}