// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import './App.css';
// import AppContainer from './containers/AppContainer';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <AppContainer />
//       </div>
//     </Provider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TypeModal from './modal/typeModal'
import PictureModal from './modal/pictureModal';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handleTypeModalOpen = () => {
    setIsTypeModalOpen(true);
  };

  const handleTypeModalClose = () => {
    setIsTypeModalOpen(false);
  };

  const handleTypeSelect = async (type) => {
    setSelectedType(type);
    setIsTypeModalOpen(false);
    console.log(selectedType);
    try {
      const timestamp = Date.now();
      const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?category=${type}&page=${currentPage}&timestamp=${timestamp}`, {
        params: {
          q: category,
          sort: "date",
        }
      });
      setPhotos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePictureClick = (photo) => {
    setSelectedPicture(photo);
    setIsPictureModalOpen(true);
    setSelectedType(null);
  };

  const fetchPhotos = async (selectedType) => {
    setIsLoading(true);
    try {
      const timestamp = Date.now();
      const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?type=${selectedType}&page=${currentPage}&timestamp=${timestamp}`);
      setPhotos(response.data);
      console.log(response.data, "resss data");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPhotos(selectedType);
  }, [currentPage, selectedType]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
     fetchPhotos(selectedType);
  };

  return (
    <>
      <body>
        <div>
          {/* Pagination buttons */}
          <div className='buttons'>
            <button className="prev-button" onClick={handlePrevClick} disabled={currentPage === 1}>
              &#8249; Prev
            </button>
            <button className="type-button" onClick={handleTypeModalOpen}>
              Select Type
            </button>
            <button className="next-button" onClick={handleNextClick}>
              Next &#8250;
            </button>
          </div>

          {/* Render the fetched photos */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="photo-grid">
              {photos.map((photo) => (
                <img
                  src={photo.largeImageURL}
                  alt={photo.tags}
                  className="photo"
                  key={photo.id}
                  onClick={() => handlePictureClick(photo)}
                />
              ))}
            </div>
          )}

          {/* Render the type modal */}
          {isTypeModalOpen && (
            <TypeModal isOpen={isTypeModalOpen} onClose={handleTypeModalClose} onTypeSelect={handleTypeSelect} />
          )}

          {/* Render the picture modal */}
          {selectedPicture && isPictureModalOpen && (
            <PictureModal isOpen={isPictureModalOpen} onClose={() => setIsPictureModalOpen(false)} picture={selectedPicture} />
          )}
        </div>
      </body>
    </>
  );
};

export default App;