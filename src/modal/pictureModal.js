import React from 'react';
import './modal.css';

const PictureModal = ({ isOpen, onClose, picture }) => {
  const { views, downloads, likes } = picture;

  return (
    <>
    {isOpen && (
    <div className='modal-container'>
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
      <button className='modal-x' onClick={onClose}>X</button>
        <h3>Details</h3>
        <p>Views {views}</p>
        <p>Downloads {downloads}</p>
        <p>Likes {likes}</p>
        {/* Add more relevant parameters */}
      </div>
    </div>
    </div>
    )}
    </>
  );
};

export default PictureModal;
