import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoice-detail.css'
import Badge from "../components/Badge/Badge";
import { Link } from "@tanstack/react-router";
import arrow from '../assets/icon-arrow-left.svg';
import Button from "../components/Button/Button";
import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import { useNavigate } from "@tanstack/react-router";
import DeleteModal from "../components/DeleteModal/DeleteModal";

export const Route = createFileRoute('/invoice/$id')({
    component: InvoiceDetail,
})

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};



function InvoiceDetail() {
    const { invoices, deleteInvoice, markAsPaid } = useContext(InvoiceContext);
    const { id } = Route.useParams()
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return null;

    const handleDelete = () => {
        setIsModalOpen(true)
    }
    const handleConfirm = () => {
        deleteInvoice(invoice.id)
        navigate({ to: "/" })

    }
    const handlePaid = () => {
        markAsPaid(invoice.id);
    }
    return (
        <div className="invoice-detail">

            <div className="invoice-detail-full">
                {isModalOpen && <DeleteModal isOpen={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                    invoiceId={invoice.id} />}
                <div>
                    <Link to="/" className="go-back">
                        <img src={arrow} alt="go-back" /> Go back
                    </Link>
                </div>

                <div className="status-bar-desktop">
                    <label className="status">
                        <span>Status</span>
                        <Badge status={invoice.status} /> </label>


                    <Button variant="edit" children="Edit" onClick={() => setIsFormOpen(true)} />
                    <Button variant="danger" children="Delete" onClick={handleDelete} />
                    <Button variant="primary" children={invoice.status === "pending" ? "Mark as Paid" : "Mark as Pending"} onClick={handlePaid} />

                </div>
                <div className="status-bar-mobile">
                    <label className="status">
                        <span>Status</span>
                        <Badge status={invoice.status} /> </label>
                </div>

                <div className="invoice-detail-content">
                    <div className="invoice-detail-sender">
                        <div className="invoice-detail-sender1">
                            <h3><span>#</span>{invoice.id}</h3>
                            <p>{invoice.description}</p>
                        </div>
                        <div className="invoice-detail-sender2">
                            <p>{invoice.senderAddress.street}</p>
                            <p>{invoice.senderAddress.city}</p>
                            <p>{invoice.senderAddress.postCode}</p>
                            <p>{invoice.senderAddress.country}</p>
                        </div>
                    </div>

                    <div className="invoice-detail-client">

                        <div className="box1">
                            <p>Invoice Date</p>
                            <h3>{formatDate(invoice.createdAt)}</h3>
                        </div>
                        <div className="box2">
                            <p>Payment Due</p>
                            <h3>{formatDate(invoice.paymentDue)}</h3>
                        </div>

                        <div className="box3">
                            <p>Bill to</p>
                            <h3>{invoice.clientName}</h3>
                            <p>{invoice.clientAddress.street}</p>
                            <p>{invoice.clientAddress.city}</p>
                            <p>{invoice.clientAddress.postCode}</p>
                            <p>{invoice.clientAddress.country}</p>
                        </div>
                        <div className="box4">
                            <p>Sent to</p>
                            <h3>{invoice.clientEmail}</h3>

                        </div>
                    </div>

                    <table className="table-desk">
                        <thead>
                            <tr>
                                <th>ItemName</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item) => (
                                <tr key={item.name}>
                                    <td className="highlight">{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>£{item.price}</td>
                                    <td className="highlight">£{item.total}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className="table-mob">
                        <tbody>
                            {invoice.items.map((item) => (
                                <tr key={item.name}>
                                    <td className="highlight-mob">{item.name}
                                        <p>{item.quantity}*£{item.price}</p></td>
                                    <td className="highlight-mob">£{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <div className="due">
                        <p className="due-desk">Amount Due</p>
                        <p className="due-mob">Grand Total</p>
                        <h2>£ {invoice.total}</h2>
                    </div>


                </div>
                <div className="button-mob">
                    <Button variant="edit" children="Edit" onClick={() => setIsFormOpen(true)} />
                    <Button variant="danger" children="Delete" onClick={handleDelete} />
                    <Button variant="primary" children={invoice.status === "pending" ? "Mark as Paid" : "Mark as Pending"} onClick={handlePaid} />
                </div>
            </div>
            <InvoiceForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} mode="edit" existingInvoice={invoice} />
        </div>
    )
}