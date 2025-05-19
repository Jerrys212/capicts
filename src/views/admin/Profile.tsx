import { useEffect, useState } from "react";
import { UserIcon, EnvelopeIcon, IdentificationIcon, CalendarIcon, ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useAppStore } from "../../stores/useAppStore";
import PulseSpinner from "../../components/Spinner";
import { formatDate } from "../../helpers";

interface PasswordFormInputs {
    newPassword: string;
    confirmPassword: string;
}

const UserProfile = () => {
    const { updatePassword, isLoading, user } = useAppStore();
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

    // Configurar react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormInputs>({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Limpiar mensajes de error/éxito cuando se muestra/oculta el formulario
    useEffect(() => {
        reset();
    }, [showPasswordForm, reset]);

    // Enviar formulario de cambio de contraseña
    const onSubmitPassword = async (data: PasswordFormInputs) => {
        try {
            await updatePassword(data.newPassword);

            reset();

            // Ocultar el formulario después de 3 segundos
            setTimeout(() => {
                setShowPasswordForm(false);
            }, 3000);
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
        }
    };

    // Formatear rol para mostrar
    const formatRole = (role: string): string => {
        const roleMap: Record<string, string> = {
            admin: "Administrador",
            user: "Usuario",
            client: "Cliente",
        };
        return roleMap[role] || role;
    };

    if (isLoading) return <PulseSpinner />;

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

            {user ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Información personal */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white">Información Personal</h2>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <UserIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                                            <p className="text-base font-semibold text-gray-900">
                                                {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <EnvelopeIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
                                            <p className="text-base font-semibold text-gray-900">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <IdentificationIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">CURP</p>
                                            <p className="text-base font-semibold text-gray-900">{user.curp}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <ShieldCheckIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Rol</p>
                                            <p className="text-base font-semibold text-gray-900">{formatRole(user.role)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start md:col-span-2">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <CalendarIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Fechas</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Registro:</span> {formatDate(user.createdAt)}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Última actualización:</span> {formatDate(user.updatedAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Opciones y acciones */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="bg-gradient-to-r from-amber-700 to-amber-600 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white">Seguridad</h2>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                                            <KeyIcon className="h-6 w-6 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">Contraseña</p>
                                            <p className="text-sm text-gray-500">Actualiza tu contraseña periódicamente</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                                        className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        {showPasswordForm ? "Cancelar" : "Cambiar contraseña"}
                                    </button>
                                </div>

                                {showPasswordForm && (
                                    <form onSubmit={handleSubmit(onSubmitPassword)} className="mt-6 space-y-4 border-t border-gray-200 pt-4">
                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Nueva contraseña
                                            </label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                {...register("newPassword", {
                                                    required: "La nueva contraseña es requerida",
                                                    minLength: {
                                                        value: 8,
                                                        message: "La contraseña debe tener al menos 8 caracteres",
                                                    },
                                                })}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            />
                                            {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirmar nueva contraseña
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                {...register("confirmPassword", {
                                                    required: "La confirmación de contraseña es requerida",
                                                    validate: (value) => value === watch("newPassword") || "Las contraseñas no coinciden",
                                                })}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            />
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
                                        </button>
                                    </form>
                                )}

                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <p className="text-xs text-gray-500">
                                        <span className="font-semibold">Nota:</span> Tu información personal es confidencial y solo puede ser
                                        modificada por un administrador. Si necesitas actualizar tus datos, por favor contacta al departamento
                                        correspondiente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <p className="text-gray-500">No se pudo cargar la información del perfil.</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
