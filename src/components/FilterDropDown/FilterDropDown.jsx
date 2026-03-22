
import arrow from '../../assets/icon-arrow-down.svg';
import { useState } from 'react';
import './FilterDropDown.css'
const FilterDropDown = ({filteredData}) => {
    const [show, setShow] = useState(false);

    const statusFilter = () => {
        setShow(!show);
    }

    const handleChange = (event) => {
            filteredData(event.target.value)

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
                    <label> <input type='checkbox' value="paid" onChange={handleChange} /> Paid</label>
                    <label> <input type='checkbox' value="pending" onChange={handleChange} /> Pending</label>
                    <label> <input type='checkbox' value="draft" onChange={handleChange} /> Draft</label>
                </div>
            }

        </div>
    )
}

export default FilterDropDown