import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";
import {
  setCurrentPage,
  setSelectedType,
  setIsLoading,
  setIsTypeModalOpen,
  setIsPictureModalOpen,
  setSelectedPicture,
  fetchPhotos,
} from "../store/store";

import TypeModal from "../modal/typeModal";
import PictureModal from "../modal/pictureModal";

const AppContainer = () => {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.photos.photos);
  const currentPage = useSelector((state) => state.photos.currentPage);
  const selectedType = useSelector((state) => state.photos.selectedType);
  const isLoading = useSelector((state) => state.photos.isLoading);
  const isTypeModalOpen = useSelector((state) => state.photos.isTypeModalOpen);
  const isPictureModalOpen = useSelector((state) => state.photos.isPictureModalOpen);
  const selectedPicture = useSelector((state) => state.photos.selectedPicture);

  const handleTypeModalOpen = () => {
    dispatch(setIsTypeModalOpen(true));
  };

  const handleTypeModalClose = () => {
    dispatch(setIsTypeModalOpen(false));
  };

  const handleTypeSelect = async ({ category }) => {
    dispatch(setSelectedType(category));
    dispatch(setIsTypeModalOpen(false));
console.log(category)
    try {
      const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?category=${category}&page=${currentPage}`, {
        params: {
          q: category,
          sort: "date",
        }
      });
      dispatch(fetchPhotos(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePictureClick = (photo) => {
    dispatch(setSelectedPicture(photo));
    dispatch(setIsPictureModalOpen(true));
    dispatch(setSelectedType(null));
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
    console.log('next click')
    // dispatch(fetchPhotos({ category: selectedType, page: currentPage + 1 }));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      console.log("Fetching data...");
      try {
        const nextPage = currentPage + 1;
        const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?type=${selectedType}&page=${nextPage}`);
        console.log(response.data);
        dispatch(fetchPhotos(response.data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchData();
  }, [currentPage, selectedType, dispatch]);

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
            <PictureModal isOpen={isPictureModalOpen} onClose={() => dispatch(setIsPictureModalOpen(false))} picture={selectedPicture} />
          )}
        </div>
      </body>
    </>
  );
};

export default AppContainer;
