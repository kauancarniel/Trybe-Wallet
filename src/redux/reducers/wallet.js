const initialState = {
  fetchObject: {},
  currencies: [],
  expenses: [],
  fetching: true,
  editing: false,
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
  case 'exclExpense':
    return { ...state, expenses: action.payload };
  case 'editing':
    return { ...state, editing: !state.editing };
  default:
    return state;
  }
};

export default wallet;
