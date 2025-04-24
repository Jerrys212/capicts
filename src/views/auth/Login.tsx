import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginForm } from "../../interfaces";
import { useAppStore } from "../../stores/useAppStore";
import ErrorMessage from "../../components/FormError";
import { useEffect } from "react";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginForm>();

    const { login, isAuthenticated } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<UserLoginForm> = async (data) => {
        try {
            const success = await login(data);
            if (success) navigate("/dashboard");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-0 md:max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-8 sm:py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">Iniciar Sesión</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Tu email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido",
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Tu contraseña"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres",
                                },
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 sm:py-3 px-4 rounded-md transition-colors mt-2"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/auth/register" className="text-green-700 hover:text-green-800 font-medium">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
