import { createFileRoute } from "@tanstack/react-router";
import '../styles/invoice-detail.css'
import Badge from "../components/Badge/Badge";
import { Link } from "@tanstack/react-router";
import arrow from '../assets/icon-arrow-left.svg';
import Button from "../components/Button/Button";

export const Route = createFileRoute('/invoice/$id')({
    component: InvoiceDetail,
})

const invoice = {
    id: "RT3080",
    createdAt: "1 Aug 2021",
    paymentDue: "19 Aug 2021",
    description: "Re-branding",
    status: "paid",
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    clientAddress: { street: "106 Kendell Street", city: "Sharrington", postCode: "NR24 5WQ", country: "UK" },
    senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "UK" },
    items: [
        { id: 123, name: "Brand Guidelines", quantity: 1, price: 1800.90, total: 1800.90 }
    ],
    total: 1800.90
}

function InvoiceDetail() {
    const { id } = Route.useParams()
    return (
        <div className="invoice-detail">

            <div className="invoice-detail-full">
                <div>
                    <Link to="/" className="go-back">
                        <img src={arrow} alt="go-back" /> Go back
                    </Link>
                </div>

                <div className="status-bar-desktop">
                    <label className="status">
                        <span>Status</span>
                        <Badge status={invoice.status} /> </label>

                    
                    <Button variant="edit" children="Edit" />
                    <Button variant="danger" children="Delete" />
                    <Button variant="primary" children="Mark as Paid" />
                       
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
                            <h3>{invoice.createdAt}</h3>
                        </div>
                        <div className="box2">
                            <p>Payment Due</p>
                            <h3>{invoice.paymentDue}</h3>
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
                                <tr key={item.id}>
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
                                <tr key={item.id}>
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
                        <h2>£1800.90</h2>
                    </div>
                   

                </div>
                <div className="button-mob">
                    <Button variant="edit" children="Edit" />
                    <Button variant="danger" children="Delete" />
                    <Button variant="primary" children="Mark as Paid" />
                </div>
            </div>
        </div>
    )
}