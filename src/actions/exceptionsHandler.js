// import { toast }from 'react-toastify';
export default (error, dispatch, cb) => {
  let toast = {
    error: (msg) => alert(msg),
    info: (msg) => alert(msg),
    success: (msg) => alert(msg),
  }
  const { message, response, isAxiosError } = error;
  if (response) {
    if (response.status === 401) {
      toast.info('invalid email or password');
    }
    else if (response.status === 403) {
      toast.info(response.data.message);
    }
    else if (response.status === 400) {
      toast.error('Something went wrong! Please try again!');
    }
    else if (response.status === 500) {
      toast.error('Something went wrong! Please try again!');

    }
    else if (response.status === 500) {
      toast.error('Something went wrong! Please try again!');

    }
  }
  else if (message) {
    toast.error(message);
  }
  else if (isAxiosError) {
    toast.error("Something went wrong!");
  }
}