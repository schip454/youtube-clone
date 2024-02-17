import { FC, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface IErrorPopupProps {
  text: string | null | undefined;
}

const ErrorPopup: FC<IErrorPopupProps> = ({ text }) => {
  useEffect(() => {
    if (text) {
      toast.error(text, {
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
  }, [text]);
  return <ToastContainer />;
};

export default ErrorPopup;
