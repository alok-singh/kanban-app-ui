
const generateHeaders = (headers) => {
  return Object.keys(headers).reduce((acc, key) => {
    acc.append(key, headers[key]);
    return acc;
  }, new Headers());
};

export const fetchResource = async (url, method, data, headers = { 'Content-Type': 'application/json' }) => {
  const fetchHeaders = generateHeaders(headers);
  const urlResponse = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: fetchHeaders
  });

  if (urlResponse.status === 200) {
    const parsed = await urlResponse.json();
    return parsed;
  }

  return "";
};
