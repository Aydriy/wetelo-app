const initialState = {
  items: [],
  isLoading: false,
};

export const main = (state = initialState, action) => {
  switch (action.type) {
    case "MAIN":
      return {
     
      };
    default:
      return state;
  }
};


