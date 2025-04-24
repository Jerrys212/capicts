import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { UserRegisterForm } from "../../interfaces";

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser, isAuthenticated, isLoading, error } = useAppStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterForm>();

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<UserRegisterForm> = async (data) => {
        const success = await registerUser(data);
        if (success) {
            navigate("/auth/confirm-token");
        }
    };

    return (
        <div className="w-full px-4 sm:px-6 md:px-0 md:max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-8 sm:py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">Crear Cuenta</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.nombre ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("nombre")}
                            disabled={isLoading}
                        />
                        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                    </div>

                    {/* Apellido Paterno */}
                    <div>
                        <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido Paterno
                        </label>
                        <input
                            id="apellidoPaterno"
                            type="text"
                            placeholder="Tu apellido paterno"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.apellidoPaterno ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("apellidoPaterno")}
                            disabled={isLoading}
                        />
                        {errors.apellidoPaterno && <p className="mt-1 text-sm text-red-600">{errors.apellidoPaterno.message}</p>}
                    </div>

                    {/* Apellido Materno */}
                    <div>
                        <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido Materno
                        </label>
                        <input
                            id="apellidoMaterno"
                            type="text"
                            placeholder="Tu apellido materno"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.apellidoMaterno ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("apellidoMaterno")}
                            disabled={isLoading}
                        />
                        {errors.apellidoMaterno && <p className="mt-1 text-sm text-red-600">{errors.apellidoMaterno.message}</p>}
                    </div>

                    {/* CURP */}
                    <div>
                        <label htmlFor="curp" className="block text-sm font-medium text-gray-700 mb-1">
                            CURP
                        </label>
                        <input
                            id="curp"
                            type="text"
                            placeholder="Tu CURP"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                                errors.curp ? "border-red-500" : "border-gray-300"
                            }`}
                            {...register("curp")}
                            disabled={isLoading}
                        />
                        {errors.curp && <p className="mt-1 text-sm text-red-600">{errors.curp.message}</p>}
                    </div>

                    {/* Email */}
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
                            {...register("email")}
                            disabled={isLoading}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Contraseña */}
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
                            {...register("password")}
                            disabled={isLoading}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 sm:py-3 px-4 rounded-md transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-green-700 hover:text-green-800 font-medium">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
