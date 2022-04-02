// tostify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const info = (text) => toast(`👩‍🚀 ${text}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark'
});

export const success = (text) => toast.success(`${text}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark'
});

export const error = (text) => toast.error(`${text}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark'
});