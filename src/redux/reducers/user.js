const initialState = { email: 'atumalaca' };

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'addEmail':
    return { ...state, email: action.em };
  default:
    return state;
  }
};

export default user;
