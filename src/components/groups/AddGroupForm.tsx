import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { GroupFormData } from "../../interfaces";
import PulseSpinner from "../Spinner";
import { useAppStore } from "../../stores/useAppStore";

const AddGroupForm = () => {
    const navigate = useNavigate();
    // Asume que tienes una función createGroup en tu store
    const { createGroup, isLoading } = useAppStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: "",
            semanas: 0,
            cantidadSemanal: 0,
            limiteUsuarios: 0,
        },
    });

    const onSubmit = async (formData: GroupFormData) => {
        try {
            const success = await createGroup(formData);
            if (success) {
                toast.success(success);
                navigate(location.pathname, { replace: true });
            }
        } catch (error) {
            console.error("Error al crear el grupo:", error);
        }
    };

    if (isLoading) return <PulseSpinner />;

    return (
        <form id="add-group-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre del Grupo */}
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Grupo
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        {...register("nombre", {
                            required: "El nombre del grupo es obligatorio",
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.nombre ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        placeholder="Ej: Círculo de Ahorro Familiar"
                    />
                    {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                </div>

                {/* Cantidad Semanal */}
                <div>
                    <label htmlFor="cantidadSemanal" className="block text-sm font-medium text-gray-700 mb-1">
                        Aportación Semanal (MXN)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            id="cantidadSemanal"
                            {...register("cantidadSemanal", {
                                required: "La cantidad es obligatoria",
                                min: { value: 1, message: "Debe ser mayor a 0" },
                                valueAsNumber: true,
                            })}
                            className={`w-full pl-7 pr-3 py-2 border ${
                                errors.cantidadSemanal ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                            placeholder="150"
                        />
                    </div>
                    {errors.cantidadSemanal && <p className="mt-1 text-sm text-red-600">{errors.cantidadSemanal.message}</p>}
                </div>

                {/* Duración (semanas) */}
                <div>
                    <label htmlFor="semanas" className="block text-sm font-medium text-gray-700 mb-1">
                        Duración (semanas)
                    </label>
                    <input
                        type="number"
                        id="semanas"
                        {...register("semanas", {
                            required: "La duración es obligatoria",
                            min: { value: 1, message: "Debe ser al menos 1 semana" },
                            valueAsNumber: true,
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.semanas ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        placeholder="6"
                    />
                    {errors.semanas && <p className="mt-1 text-sm text-red-600">{errors.semanas.message}</p>}
                </div>

                {/* Límite de Usuarios */}
                <div>
                    <label htmlFor="limiteUsuarios" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Participantes
                    </label>
                    <input
                        type="number"
                        id="limiteUsuarios"
                        {...register("limiteUsuarios", {
                            required: "El límite de usuarios es obligatorio",
                            min: { value: 2, message: "Necesita al menos 2 participantes" },
                            valueAsNumber: true,
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.limiteUsuarios ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        placeholder="6"
                    />
                    {errors.limiteUsuarios && <p className="mt-1 text-sm text-red-600">{errors.limiteUsuarios.message}</p>}
                </div>
            </div>
        </form>
    );
};

export default AddGroupForm;
