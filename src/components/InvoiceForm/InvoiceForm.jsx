import React, { useContext, useEffect, useState } from 'react';
import './InvoiceForm.css';
import icon from '../../assets/icon-delete.svg';
import Button from '../Button/Button';
import arrow from '../../assets/icon-arrow-left.svg';
import generateID from '../../utils/generateID';
import calculateDueDate from '../../utils/calculateDueDate';
import { InvoiceContext } from '../../context/InvoiceContext';

const invoice = {
    senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
    },
    invoiceDate: "",
    paymentTerms: "Net 30 days",
    projectDescription: "",
    items: []
}

const InvoiceForm = ({ isOpen, onClose, mode, existingInvoice }) => {
    const { addInvoice, editInvoice } = useContext(InvoiceContext)
    const [formData, setFormData] = useState(() => {
        return mode === "edit" ? existingInvoice : invoice;
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.includes(".")) {
            const [parent, field] = name.split(".");
            setFormData({ ...formData, [parent]: { ...formData[parent], [field]: value } });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItem = [...formData.items];
        updatedItem[index] = { ...updatedItem[index], [name]: value };

        if (name === "quantity" || name === "price") {
            updatedItem[index].total = parseFloat(updatedItem[index].quantity) * parseFloat(updatedItem[index].price);
        }

        setFormData({ ...formData, items: updatedItem })
    }

    const handleAddItem = () => {
        setFormData({ ...formData, items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }] })
    }

    const removeItem = (index) => {
        setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });

    }

    const handleSaveAndSend = () => {
        const newInvoice = {
            ...formData,
            status: "pending", id: generateID(),
            paymentDue: formData.invoiceDate ? calculateDueDate(formData.invoiceDate, formData.paymentTerms) : ""
        };
        addInvoice(newInvoice);
        onClose();
        setFormData(invoice);

    };
    const handleSaveDraft = () => {
        const newInvoice = {
            ...formData,
            status: "draft", id: generateID(),
            paymentDue:
                formData.invoiceDate ? calculateDueDate(formData.invoiceDate, formData.paymentTerms) : ""

        };
        addInvoice(newInvoice);
        onClose();
        setFormData(invoice);
    };
    const handleSaveChanges = () => {
        const updatedInvoice = { ...formData };
        editInvoice(updatedInvoice);
        onClose();
    }


    return (
        <div>
            <div className={`overlay ${isOpen ? 'overlay--open' : ''}`}>
            </div>


            <div className={`form-panel ${isOpen ? 'form-panel--open' : ''}`}>

                <button className="go-back-mob" onClick={onClose} >  <img src={arrow} alt="go-back" /> Go back</button>


                <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)} Invoice</h2>
                <div >
                    <p>Bill From</p>
                    <div className='bill-from'>
                        <label className='bill1'>Street Address
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.street'
                                value={formData.senderAddress.street}
                            /></label>
                        <label className='bill2'>City
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.city'
                                value={formData.senderAddress.city}
                            /></label>
                        <label className='bill3'>Post Code
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.postCode'
                                value={formData.senderAddress.postCode}
                            /></label>
                        <label className='bill4'>Country
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.country'
                                value={formData.senderAddress.country}
                            /></label>

                    </div>
                </div>
                <div>
                    <p>Bill To</p>
                    <div className='bill-to'>
                        <label className='bill-to1'>Client's Name
                            <input type='text'
                                onChange={handleChange}
                                name='clientName'
                                value={formData.clientName}
                            /></label>
                        <label className='bill-to2'>Client's Email
                            <input type='text'
                                onChange={handleChange}
                                name='clientEmail'
                                value={formData.clientEmail}
                            /></label>
                        <label className='bill-to3'>Street Address
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.street'
                                value={formData.clientAddress.street}
                            /></label>
                        <label className='bill-to4'>City
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.city'
                                value={formData.clientAddress.city}
                            /></label>
                        <label className='bill-to5' >Post Code
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.postCode'
                                value={formData.clientAddress.postCode}
                            /></label>
                        <label className='bill-to6' >Country
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.country'
                                value={formData.clientAddress.country}
                            /></label>
                    </div>
                    <div className='bill-to-sec'>
                        <label className='bill-to7' >Invoice Date
                            <input type='date'
                                onChange={handleChange}
                                name='invoiceDate'
                                value={formData.invoiceDate}
                            /></label>
                        <label className='bill-to8' >Payment Terms
                            <select onChange={handleChange}
                                name='paymentTerms'
                                value={formData.paymentTerms}
                            >
                                <option value={1}>Net 1 Day</option>
                                <option value={7}>Net 7 days</option>
                                <option value={14}> Net 14 days</option>
                                <option value={30}>Net 30 days</option>
                            </select>
                        </label>
                        <label className='bill-to9' >Project Description
                            <input type='text'
                                onChange={handleChange}
                                name='projectDescription'
                                value={formData.projectDescription}
                            />
                        </label>

                    </div>
                </div>
                <div>
                    <h3>Item List</h3>
                </div>

                <table className='table-desktop'>
                    <thead>
                        <tr>
                            <th>ItemName</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.items.map((item, index) => (
                            < tr key={index}>
                                <td className="highlight">
                                    <input type='text'
                                        name='name'
                                        value={item.name}
                                        onChange={e => handleItemChange(e, index)} />
                                </td>
                                <td><input type="number"
                                    name='quantity'
                                    value={item.quantity}
                                    onChange={e => handleItemChange(e, index)} /></td>
                                <td><input type='number'
                                    name='price'
                                    value={item.price}
                                    onChange={e => handleItemChange(e, index)} /></td>
                                <td className="highlight">
                                    <input type='number'
                                        name='item.total'
                                        value={item.total}
                                        onChange={e => handleItemChange(e, index)}
                                        readOnly
                                    />
                                </td>
                                <td ><button onClick={() => removeItem(index)}><img src={icon} alt='delete' />
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className='table-mobile'>
                    <thead>
                        <tr>
                            <th colSpan="5">ItemName</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {formData.items.map((item, index) => (
                            < tr key={index}>
                                <td colSpan="5" className="highlight">
                                    <input type='text'
                                        name='name'
                                        value={item.name}
                                        onChange={e => handleItemChange(e, index)}
                                    /></td>
                                <td><input type="number"
                                    name='quantity'
                                    value={item.quantity}
                                    onChange={e => handleItemChange(e, index)}
                                /></td>
                                <td><input
                                    type='number'
                                    name='price'
                                    value={item.price}
                                    onChange={e => handleItemChange(e, index)} /></td>
                                <td className="highlight">
                                    <input type='number'
                                        name='item.total'
                                        value={item.total}
                                        onChange={e => handleItemChange(e, index)}
                                        readOnly
                                    /></td>
                                <td ><button onClick={() => removeItem(index)}><img src={icon} alt='delete' />
                                </button></td>
                            </tr>))}
                    </tbody>
                </table>
                <button className="add-item-btn" onClick={handleAddItem}>+ Add New Item</button>
                {mode ==="edit" ? <div className='form-buttons'>
                    <Button variant='soft' children="Cancel" onClick={onClose} />
                    <Button variant='primary' children="Save Changes" onClick={handleSaveChanges}/>
                </div> : <div className='form-buttons'>
                        <Button variant='soft' children="Discard" onClick={onClose} />
                        <Button variant='ghost' children="Save & Draft" onClick={handleSaveDraft} />
                        <Button variant='primary' children="Save & Send" onClick={handleSaveAndSend} />
                </div>}
            </div>
        </div>
    )
}

export default InvoiceForm