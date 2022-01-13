const candidateInitialState = [];

const candidateReducers = (state = candidateInitialState, action) => {
  switch (action.type) {
    case "GET_CANDIDATES": {
      return [...action.payload];
    }
    case "ADD_CANDIDATE": {
      return [...state, action.payload];
    }
    case "UPDATE_CANDIDATE": {
      return state.map((cand) => {
        if (cand._id === action.payload._id) {
          return { ...cand, ...action.payload };
        } else {
          return { ...cand };
        }
      });
    }
    case "DELETE_CANDIDATE": {
      return state.filter((cand) => cand._id === action.payload._id);
    }
    default: {
      return [...state];
    }
  }
};

export default candidateReducers;
