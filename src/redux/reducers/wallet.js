const initialState = {
  fetchObject: {},
  currencies: [],
  expenses: [],
  fetching: true,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'saveCurrencies':
    return { ...state,
      currencies: action.payload,
      fetching: false,
      fetchObject: action.payload2 };
  case 'addExpenses':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'fetching':
    return { ...state, fetching: action.payload };
  default:
    return state;
  }
};

export default wallet;
