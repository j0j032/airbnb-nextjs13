'use client';

import {Toaster} from "react-hot-toast";

// client Provider to handle toast in server components
const ToasterProvider = () => {
    return (
        <Toaster />
    );
}

export default ToasterProvider;
