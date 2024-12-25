import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom success toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    style: {
      backgroundColor: '#28a745',  // Green
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  });
};

// Custom error toast
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    style: {
      backgroundColor: '#dc3545',  // Red
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  });
};
