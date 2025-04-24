import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return <div className="my-4 text-red-600 font-bold uppercase text-sm">{children}</div>;
};

export default ErrorMessage;
