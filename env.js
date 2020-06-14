const vars = {
  googleApiKey: 'aaaa',
};

const getVariables = () => {
  if (__DEV__) {
    return vars.googleApiKey;
  }
  return null;
};

export default getVariables;
