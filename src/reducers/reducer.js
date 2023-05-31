// Initial state
const initialState = {
  data: null,
  loading: true,
  error: null,
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    // Add other cases for handling different actions if needed

    default:
      return state;
  }
};

export default reducer;


// const initialState = {}; // Define your initial state here

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // Define cases for different action types and update the state accordingly
//     default:
//       return state;
//   }
// };

// export default rootReducer;