interface IRequestOptions {
  method: string;
  headers: { 'Content-Type': string; Authorization?: string };
  body: string;
}

interface IRequestOptionsWithToken {
  method: string;
  headers: Record<string, string>;
}

const makeOptions = (
  body: Record<string, string>,
  method = 'POST',
  token?: string
): IRequestOptions => {
  const options: IRequestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return options;
};

const makeOptionsWithoutBody = (token: string, method = 'GET'): IRequestOptionsWithToken => ({
  method,
  headers: { Authorization: `Bearer ${token}` },
});

export { makeOptions, makeOptionsWithoutBody };
