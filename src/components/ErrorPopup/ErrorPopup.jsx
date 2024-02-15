import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ErrorPopup = () => {
  const { errorText } = useSelector((state) => state.video);
  useEffect(() => {
    if (errorText) {
      toast.error(errorText, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [errorText]);
  return <ToastContainer />;
};

export default ErrorPopup;
