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
  body: Record<string, string | number>,
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

const makeFileOptions = (
  files: FileList,
  fileName: string,
  taskId: string,
  token: string,
  method = 'POST'
): IRequestOptions => {
  const body = new FormData();
  body.append('taskId', taskId);
  body.append('file', files[0], fileName);

  const options: IRequestOptions = {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  };

  return options;
};

export { makeOptions, makeOptionsWithoutBody, makeFileOptions };
