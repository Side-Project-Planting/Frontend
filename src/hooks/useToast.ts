import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UseToastOptions extends ToastOptions {
  type?: 'default' | 'success' | 'warning' | 'error';
}

const useToast = () => {
  const showToast = (message: string, options: UseToastOptions) => {
    const { type = 'default' } = options;
    toast(message, {
      type,
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return {
    showToast,
  };
};

export default useToast;
