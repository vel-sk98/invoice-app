import React from 'react';
import './InvoiceForm.css';
import icon from '../../assets/icon-delete.svg';

const InvoiceForm = ({ isOpen, onClose, mode }) => {
    return (
        <div>
            <div className={`overlay ${isOpen ? 'overlay--open' : ''}`}>
            </div>
        <div className={`form-panel ${isOpen ? 'form-panel--open' : ''}`}>
            {/* form content */}
                <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)} Invoice</h2>
            <div >
                <p>Bill From</p>
                <div className='bill-from'>
                    <label className='bill1'>Street Address<input type='text' /></label>
                    <label className='bill2'>City<input type='text' /></label>
                    <label className='bill3'>Post Code<input type='text' /></label>
                    <label className='bill4'>Country <input type='text' /></label>

                </div>
            </div>
            <div>
                <p>Bill To</p>
                <div className='bill-to'>
                    <label className='bill-to1'>Client's Name<input type='text' /></label>
                    <label className='bill-to2'>Client's Email<input type='text' /></label>
                    <label className='bill-to3'>Street Address<input type='text' /></label>
                    <label className='bill-to4'>City <input type='text' /></label>
                    <label className='bill-to5' >Post Code <input type='text' /></label>
                    <label className='bill-to6' >Country <input type='text' /></label>
                </div>
                <div className='bill-to-sec'>
                    <label className='bill-to7' >Invoice Date <input type='date' /></label>
                    <label className='bill-to8' >Payment Terms
                        <select>
                            <option>Net 1 Day</option>
                            <option>Net 7 days</option>
                            <option>Net 14 days</option>
                            <option>Net 30 days</option>
                        </select>
                    </label>
                    <label className='bill-to9' >Project Description <input type='text' /></label>

                </div>
            </div>
            <div>
                <h3>Item List</h3>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ItemName</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="highlight">Banner Design</td>
                        <td>1</td>
                        <td>156.00</td>
                        <td className="highlight">156.00</td>
                        <td><img src={icon} alt='delete' /></td>
                    </tr>
                </tbody>

            </table>
            <button className="add-item-btn">+ Add New Item</button>
            <div className='form-buttons'>
                <button onClick={onClose} className='form-button-dis'>Discard</button>
                <button className='form-button-sd'>Save as Draft</button>
                <button className='form-button-ss'>Save & Send</button>
            </div>
            </div>
        </div>    
    )
}

export default InvoiceForm