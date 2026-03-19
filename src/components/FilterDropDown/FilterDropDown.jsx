import React from 'react'
import arrow from '../../assets/icon-arrow-down.svg';
import { useState } from 'react';
import './FilterDropDown.css'
const FilterDropDown = () => {
    const [show, setShow] = useState(false);


    const statusFilter = () => {
        setShow(!show);
    }

    return (
        <div className='drop-down'>
            <button className="filter-btn" onClick={statusFilter}>
                <span className='filter-desk'>Filter by status</span>
                <span className='filter-mob'>Filter</span>
                <img src={arrow} alt='down arrow' className={show ? "arrow-open" : ''} />
            </button>
            {show &&
                <div className='content'>
                    <label> <input type='checkbox' value="paid" /> Paid</label>
                    <label> <input type='checkbox' value="pending" /> Pending</label>
                    <label> <input type='checkbox' value="draft" /> Draft</label>
                </div>
            }

        </div>
    )
}

export default FilterDropDown