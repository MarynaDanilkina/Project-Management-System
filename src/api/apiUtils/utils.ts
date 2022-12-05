export const BASE_URL = 'http://localhost:4000/';

export type ErrorMessage = { statusCode: number; message: string };

export function parseJwt(token: string): { login: string; userId: string } {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const parsedError = JSON.parse(error.message) as ErrorMessage;
    return parsedError.message;
  }
  return String(error);
}
