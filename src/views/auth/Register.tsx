import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { UserRegisterForm } from "../../interfaces";

const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser, isAuthenticated, isLoading } = useAppStore();

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
                            {...register("nombre", {
                                required: "El nombre es obligatorio",
                                minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                maxLength: { value: 50, message: "El nombre no puede exceder los 50 caracteres" },
                            })}
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
                            {...register("apellidoPaterno", {
                                required: "El apellido paterno es obligatorio",
                                minLength: { value: 2, message: "El apellido paterno debe tener al menos 2 caracteres" },
                                maxLength: { value: 50, message: "El apellido paterno no puede exceder los 50 caracteres" },
                            })}
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
                            {...register("apellidoMaterno", {
                                required: "El apellido materno es obligatorio",
                                minLength: { value: 2, message: "El apellido materno debe tener al menos 2 caracteres" },
                                maxLength: { value: 50, message: "El apellido materno no puede exceder los 50 caracteres" },
                            })}
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
                            {...register("curp", {
                                required: "El CURP es obligatorio",
                                pattern: {
                                    value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/,
                                    message: "Formato de CURP inválido",
                                },
                                maxLength: { value: 18, message: "El CURP debe tener 18 caracteres" },
                                minLength: { value: 18, message: "El CURP debe tener 18 caracteres" },
                            })}
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
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Formato de email inválido",
                                },
                            })}
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
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
                                },
                            })}
                            disabled={isLoading}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 sm:py-3 px-4 rounded-md transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        Crear Cuenta
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/auth/login" className="text-green-700 hover:text-green-800 font-medium">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
