import React from 'react';
import './modal.css';

const typeModal = ({ isOpen, onClose, onTypeSelect }) => {
    const types = ['animals', 'sports', 'science']; // Add more types as needed
  
    return (
      <>
      <div className='modal-container'>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
            <button className='modal-x' onClick={onClose}>X</button>
          <h3>Select a Type</h3>
          <ul>
            {types.map((type) => (
              <li key={type} onClick={() => onTypeSelect(type)}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
      </>
    );
  };

  export default typeModal;