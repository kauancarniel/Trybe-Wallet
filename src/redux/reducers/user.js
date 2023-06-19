const innitialState = { email: '' };

const user = (state = innitialState, action) => {
  switch (action.type) {
  case 'addEmail':
    return { ...state, email: action.em };
  default:
    return state;
  }
};

export default user;
