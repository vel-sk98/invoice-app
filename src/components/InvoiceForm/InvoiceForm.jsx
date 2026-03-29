import { useContext, useState, useEffect } from 'react';
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
    createdAt: "",
    paymentTerms: "Net 30 days",
    projectDescription: "",
    items: [],
    
}

const InvoiceForm = ({ isOpen, onClose, mode, existingInvoice }) => {
    const { addInvoice, editInvoice } = useContext(InvoiceContext)
    const [formData, setFormData] = useState(() => {
        return mode === "edit" ? existingInvoice : invoice;
    });
    const [formErrors, setFormErrors] = useState({});


    useEffect(() => {
        if (isOpen && mode === "edit") {
            setFormData(existingInvoice)
        }
        if (isOpen && mode === "new") {
            setFormData(invoice)
        }
    }, [isOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("field changed:", name, "value:", value)
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
        const errors = validate(formData)
        setFormErrors(errors);
        console.log(errors)
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const newInvoice = {
                ...formData,
                status: "pending", id: generateID(),
                paymentDue: formData.createdAt ? calculateDueDate(formData.createdAt, formData.paymentTerms) : "",
                total: formData.items.reduce((acc, item) => acc + item.total, 0)
            };
            addInvoice(newInvoice);
            onClose();
            setFormData(invoice);
        }

    };
    const handleSaveDraft = () => {
        const errors = validate(formData)
        setFormErrors(errors);
        console.log(errors)

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const newInvoice = {
                ...formData,
                status: "draft", id: generateID(),
                paymentDue:
                    formData.createdAt ? calculateDueDate(formData.createdAt, formData.paymentTerms) : "",
                total: formData.items.reduce((acc, item)=> acc+item.total, 0)

            };
            addInvoice(newInvoice);
            onClose();
            setFormData(invoice);
        }
    };
    const handleSaveChanges = () => {
        const errors = validate(formData)
        setFormErrors(errors);
        console.log(errors)
        console.log("formData status:", formData.status)
        console.log("existingInvoice status:", existingInvoice.status)
        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const updatedInvoice = { ...formData, total: formData.items.reduce((acc, item) => acc + item.total, 0) };
            editInvoice(updatedInvoice);
            onClose();
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.senderAddress.street) {
            errors.senderStreet = "Street is required"
        }
        if (!values.senderAddress.city) {
            errors.senderCity = "City is required"
        }
        if (!values.senderAddress.postCode) {
            errors.senderPostcode = "PostCode is required"
        }
        if (!values.senderAddress.country) {
            errors.senderCountry = "Country is required"
        }
        if (!values.clientName) {
            errors.clientName = "Name is required"
        }
        if (!values.clientEmail) {
            errors.clientEmail = "Email is required"
        } else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(values.clientEmail)) {
                errors.clientEmail = "Enter a Valid email"
            }
        }
        if (!values.clientAddress.street) {
            errors.clientStreet = "Street is required"
        }
        if (!values.clientAddress.city) {
            errors.clientCity = "City is required"
        }
        if (!values.clientAddress.postCode) {
            errors.clientPostCode = "PostCode is required"
        }
        if (!values.clientAddress.country) {
            errors.clientCountry = "Country is required"
        }
        if (!values.createdAt) {
            errors.createdAt = "Date is required"
        }
        if (!values.projectDescription) {
            errors.projectDescription = "Describe you Project"
        }
        if (!values.paymentTerms) {
            errors.paymentTerms = "Select your term"
        }
        if (values.items.length === 0) {
            errors.items = "Item list cannot be empty"
        }

        return errors;
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
                            />
                            <span className='error'>{formErrors.senderStreet}</span>
                        </label>

                        <label className='bill2'>City
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.city'
                                value={formData.senderAddress.city}
                            />
                            <span className='error'>{formErrors.senderCity}</span>
                        </label>
                        <label className='bill3'>Post Code
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.postCode'
                                value={formData.senderAddress.postCode}
                            />
                            <span className='error'>{formErrors.senderPostcode}</span>
                        </label>
                        <label className='bill4'>Country
                            <input type='text'
                                onChange={handleChange}
                                name='senderAddress.country'
                                value={formData.senderAddress.country}
                            />
                            <span className='error'>{formErrors.senderCountry}</span>
                        </label>

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
                            />
                            <span className='error'>{formErrors.clientName}</span>
                        </label>
                        <label className='bill-to2'>Client's Email
                            <input type='text'
                                onChange={handleChange}
                                name='clientEmail'
                                value={formData.clientEmail}
                            />
                            <span className='error'>{formErrors.clientEmail}</span>
                        </label>
                        <label className='bill-to3'>Street Address
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.street'
                                value={formData.clientAddress.street}
                            />
                            <span className='error'>{formErrors.clientStreet}</span>
                        </label>
                        <label className='bill-to4'>City
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.city'
                                value={formData.clientAddress.city}
                            />
                            <span className='error'>{formErrors.clientCity}</span>
                        </label>
                        <label className='bill-to5' >Post Code
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.postCode'
                                value={formData.clientAddress.postCode}
                            />
                            <span className='error'>{formErrors.clientPostCode}</span>
                        </label>
                        <label className='bill-to6' >Country
                            <input type='text'
                                onChange={handleChange}
                                name='clientAddress.country'
                                value={formData.clientAddress.country}
                            />
                            <span className='error'>{formErrors.clientCountry}</span>
                        </label>
                    </div>
                    <div className='bill-to-sec'>
                        <label className='bill-to7' >Invoice Date
                            <input type='date'
                                onChange={handleChange}
                                name='createdAt'
                                value={formData.createdAt}
                            />
                            <span className='error'>{formErrors.createdAt}</span>
                        </label>
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
                            <span className='error'>{formErrors.projectDescription}</span>
                        </label>

                    </div>
                </div>
                <div>
                    <h3>Item List</h3>
                </div>
                <span className='error'>{formErrors.items}</span>
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

                {Object.keys(formErrors).length > 0 &&
                    <span className='error'>All fields must be filled and item list must have at least one item</span>
                }
                {mode === "edit" ? <div className='form-buttons'>
                    <Button variant='soft' children="Cancel" onClick={() => { onClose(); setFormErrors({}); }} />
                    <Button variant='primary' children="Save Changes" onClick={handleSaveChanges} />
                </div> : <div className='form-buttons'>
                    <Button variant='soft' children="Discard" onClick={() => { onClose(); setFormErrors({}); }} />
                    <Button variant='ghost' children="Save & Draft" onClick={handleSaveDraft} />
                    <Button variant='primary' children="Save & Send" onClick={handleSaveAndSend} />
                </div>}
            </div>
        </div>
    )
}

export default InvoiceForm