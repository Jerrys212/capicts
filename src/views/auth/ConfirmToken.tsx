import { useEffect, useState } from "react";
import { ConfirmToken as IConfirmToken } from "../../interfaces";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useAppStore } from "../../stores/useAppStore";
import { useNavigate } from "react-router-dom";

const ConfirmToken = () => {
    const navigate = useNavigate();
    const { isAuthenticated, confirmToken } = useAppStore();

    const [token, setToken] = useState<IConfirmToken["token"]>("");

    const handleChange = (token: IConfirmToken["token"]) => {
        setToken(token);
    };

    const handleComplete = (token: IConfirmToken["token"]) => {
        confirmToken(token);
    };

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-8 sm:py-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-1">Confirmar Cuenta</h1>
            <form className="space-y-8 p-10 bg-white">
                <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
        </div>
    );
};

export default ConfirmToken;
