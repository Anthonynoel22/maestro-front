import toast, { Toaster } from "react-hot-toast";

export function notify(message) {
    return toast(message);
}

function ToastProvider() {
    return <Toaster />;
}

export default ToastProvider;
