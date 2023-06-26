export const addEmail = (payload) => ({
  type: 'addEmail',
  payload,
});

export const saveCurrencies = (payload, payload2) => ({
  type: 'saveCurrencies',
  payload,
  payload2,
});

export const isFetching = (payload) => ({
  type: 'fetching',
  payload,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(isFetching(true));
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endpoint).then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        keys.splice(1, 1);
        dispatch(saveCurrencies(keys, data));
      });
  };
}

// export const fetchCurrencies = async () => {
//   return (dispatch) => {
//     const endpoint = 'https://economia.awesomeapi.com.br/json/all';
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     dispatch(saveCurrencies(data.USDT))
//   }
// };

export const saveExpenses = (payload) => ({
  type: 'addExpenses',
  payload,
});

export const exclExpense = (payload) => ({
  type: 'exclExpense',
  payload,
});
