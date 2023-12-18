import { ToastOptions, toast } from 'react-toastify';

const toastifyConfig: ToastOptions = {
  position: 'top-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  toastId: 'sameIdToReplace',
  updateId: 'sameIdToReplace',
  autoClose: false,
  theme: 'colored',
};

export const showErrorMessage = (msg: string, otherProps = {}) => {
  toast.error(msg, {
    ...toastifyConfig,
    ...otherProps,
  });
};

export const showSuccessMessage = (msg: string, otherProps = {}) => {
  toast.success(msg, {
    ...toastifyConfig,
    ...otherProps,
  });
};

export const showWarningMessage = (msg: string, otherProps = {}) => {
  toast.warning(msg, {
    ...toastifyConfig,
    ...otherProps,
  });
};
