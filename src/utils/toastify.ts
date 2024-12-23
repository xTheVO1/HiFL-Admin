import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



export const ErrorPopUp = (data: any) => {
    toast.error(data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0
    })
}


export const SuccessPopUp = (data: any) => {
    toast.success(data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0
    })
}