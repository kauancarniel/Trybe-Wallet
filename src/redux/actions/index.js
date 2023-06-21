export const addEmail = (payload) => ({
  type: 'addEmail',
  payload,
});

export const saveCurrencies = (payload) => ({
  type: 'saveCurrencies',
  payload,
});

export function fetchCurrencies() {
  return (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endpoint).then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        keys.splice(1, 1);
        dispatch(saveCurrencies(keys));
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
