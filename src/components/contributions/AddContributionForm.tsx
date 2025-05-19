import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppStore } from "../../stores/useAppStore";
import { ContributionFormData } from "../../interfaces";
import { isAxiosError } from "axios";

const AddContributionForm = () => {
    const navigate = useNavigate();
    // Asume que tienes estas funciones en tu store
    const { createContribution, getGroups, getMembers, isLoading, groups, members, resetForm } = useAppStore();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            grupo: "",
            miembro: "",
            cantidad: 0,
            semana: 0,
        },
    });

    const selectedGroupId = watch("grupo");

    useEffect(() => {
        resetForm();

        const loadData = async () => {
            try {
                await getGroups();
            } catch (error) {
                toast.error("Error al cargar los datos necesarios");
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (selectedGroupId && groups?.length) {
            const group = groups.find((g) => g._id === selectedGroupId);

            if (group) {
                const loadMembers = async () => {
                    try {
                        const hasMembers = await getMembers(selectedGroupId);

                        if (!hasMembers) {
                            toast.error("No hay Miembros en este Grupo");
                        }
                    } catch (error) {
                        toast.error("Error al cargar los datos necesarios");
                    }
                };

                loadMembers();
            }
        }
    }, [selectedGroupId, groups, setValue]);

    const onSubmit = async (formData: ContributionFormData) => {
        try {
            const success = await createContribution(formData);
            if (success) {
                toast.success(success);
                reset();
                navigate(location.pathname, { replace: true });
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="add-contribution-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-1">
                        Grupo
                    </label>
                    <select
                        id="grupo"
                        {...register("grupo", {
                            required: "Debes seleccionar un grupo",
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.grupo ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        disabled={isLoading || !groups?.length}
                    >
                        <option value="">Seleccionar grupo</option>
                        {groups?.map((grupo) => (
                            <option key={grupo._id} value={grupo._id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.grupo && <p className="mt-1 text-sm text-red-600">{errors.grupo.message}</p>}
                </div>

                <div>
                    <label htmlFor="miembro" className="block text-sm font-medium text-gray-700 mb-1">
                        Miembro
                    </label>
                    <select
                        id="miembro"
                        {...register("miembro", {
                            required: "Debes seleccionar un miembro",
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.miembro ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        disabled={isLoading || !members?.length}
                    >
                        <option value="">Seleccionar miembro</option>
                        {members?.map((miembro) => (
                            <option key={miembro._id} value={miembro._id}>
                                {`${miembro.nombre} ${miembro.apellidoPaterno} ${miembro.apellidoMaterno || ""}`}
                            </option>
                        ))}
                    </select>
                    {errors.miembro && <p className="mt-1 text-sm text-red-600">{errors.miembro.message}</p>}
                </div>

                <div>
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad (MXN)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            id="cantidad"
                            {...register("cantidad", {
                                required: "La cantidad es obligatoria",
                                min: { value: 1, message: "Debe ser mayor a 0" },
                                valueAsNumber: true,
                            })}
                            className={`w-full pl-7 pr-3 py-2 border ${
                                errors.cantidad ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                            placeholder="0"
                        />
                    </div>
                    {errors.cantidad && <p className="mt-1 text-sm text-red-600">{errors.cantidad.message}</p>}
                </div>

                <div>
                    <label htmlFor="semana" className="block text-sm font-medium text-gray-700 mb-1">
                        Semana
                    </label>
                    <input
                        type="number"
                        id="semana"
                        {...register("semana", {
                            required: "La semana es obligatoria",
                            min: { value: 1, message: "Debe ser al menos semana 1" },

                            valueAsNumber: true,
                        })}
                        className={`w-full px-3 py-2 border ${
                            errors.semana ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
                        placeholder="1"
                    />
                    {errors.semana && <p className="mt-1 text-sm text-red-600">{errors.semana.message}</p>}
                </div>
            </div>
        </form>
    );
};

export default AddContributionForm;
