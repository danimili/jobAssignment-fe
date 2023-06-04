import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Defining the initial state
const initialState = {
  photos: [],
  error: null,
  currentPage: 1,
  selectedType: "",
  isLoading: false,
  isTypeModalOpen: false,
  isPictureModalOpen: false,
  selectedPicture: null,
};

// Create an async thunk to fetch the photos
export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async ({ photos, category, page }) => {
    try {
      const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?category=${category}&page=${page}`, {
        params: {
          q: category,
          sort: "date",
        }
      });
      const newPhotos = [...photos, ...response.data];
      return { photos: newPhotos, category, page };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // async ({ category, page }) => {
  //   try {
  //     const response = await axios.get(`https://job-assignment-be.vercel.app/api/photos?category=${category}&page=${page}`);
  //     return response.data;
  //   } catch (error) {
  //     // Handle the error
  //     throw new Error(error.message);
  //   }
  // }
);

// Create a slice for the photos
const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsTypeModalOpen: (state, action) => {
      state.isTypeModalOpen = action.payload;
    },
    setIsPictureModalOpen: (state, action) => {
      state.isPictureModalOpen = action.payload;
    },
    setSelectedPicture: (state, action) => {
      state.selectedPicture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      const { photos, category, page } = action.payload;

      if (state.selectedType === category && state.currentPage === page) {
        state.photos = photos;
      }

      state.error = null;
      // state.photos = action.payload;
      // state.error = null;
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

// Create the Redux store using configureStore from Redux Toolkit
const store = configureStore({
  reducer: {
    photos: photosSlice.reducer,
  },
});

export const {
  setCurrentPage,
  setSelectedType,
  setIsLoading,
  setIsTypeModalOpen,
  setIsPictureModalOpen,
  setSelectedPicture,
} = photosSlice.actions;

export default store;
