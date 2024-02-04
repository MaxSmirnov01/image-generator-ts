import type { Error } from '../types/apiTypes';

const handleError = (error: Error) => {
  console.log(error);
  const { data, status } = error;
  const message = data.errors.join('');

  switch (status) {
    case 400:
      return message;
    case 401:
      return message;
    case 403:
      return message;
    case 404:
      return message;
    case 500 || 503:
      return message;
    default:
      return 'Unknown error';
  }
};

export default handleError;
