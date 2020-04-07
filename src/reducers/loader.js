const defaultState = [];
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...action.loading };
    default:
      return state;
  }
};
