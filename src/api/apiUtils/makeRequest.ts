const makeRequest = async (url: string, statusCode = 200, options = {}) => {
  const response: Response = await fetch(url, options);
  console.log(response);
  if (response.status === 204) {
    return true;
  }
  if (response.status === statusCode) {
    return response.json();
  }
  return response.text().then((text) => {
    throw new Error(text);
  });
};

export default makeRequest;
