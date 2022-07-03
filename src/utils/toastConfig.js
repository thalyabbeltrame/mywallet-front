import { toast } from 'react-toastify';

const config = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const errorAlert = (message) => toast.error(message, config);

export default errorAlert;
