const initialState = { email: 'atumalaca' };

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'addEmail':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
