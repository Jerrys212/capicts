import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const AuthLayout = () => {
    return (
        <div className="bg-green-800 min-h-screen">
            <div className="py-6 sm:py-8 md:py-10 lg:py-20 px-4 mx-auto w-full max-w-[450px]">
                <Logo />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
