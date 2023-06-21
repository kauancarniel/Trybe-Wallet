const initialState = {
  currencies: {},
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'saveCurrencies':
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default wallet;
