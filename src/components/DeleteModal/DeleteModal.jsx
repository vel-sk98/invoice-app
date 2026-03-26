import React from 'react'
import Button from '../Button/Button'
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onCancel, onConfirm, invoiceId }) => {
    
  return (
      <div className={`Modaloverlay ${isOpen ? 'Modaloverlay--open' : ''}`}>
          <div className='modal-box'>
              <h2>Confirm Deletion</h2>
              <p>{`Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone.`}</p>
              <div>
                  <Button variant='soft' children="Cancel" onClick={onCancel} />
                  <Button variant="danger" children="Delete" onClick={onConfirm} />
              </div>
         </div>
      </div>
  )
}

export default DeleteModal