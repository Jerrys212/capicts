import { Fragment, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon, UserIcon, CalendarIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../../stores/useAppStore";
import PulseSpinner from "../Spinner";
import { formatDate } from "../../helpers";

export default function ContributionDetailModal() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const contributionId = searchParams.get("contributionDetails");
    const { contribution, getContribution, isLoading } = useAppStore();

    // Verificar si el modal debe mostrarse
    const show = Boolean(contributionId);

    // Cargar los datos de la aportación cuando cambia el ID
    useEffect(() => {
        const loadAportacionDetail = async () => {
            if (contributionId) {
                try {
                    await getContribution(contributionId);
                } catch (error) {
                    console.error("Error al cargar los detalles de la aportación:", error);
                }
            }
        };

        if (show) {
            loadAportacionDetail();
        }
    }, [contributionId, getContribution]);

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    };

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                {/* Encabezado del modal */}
                                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                                    <DialogTitle as="h3" className="text-2xl font-bold text-gray-800">
                                        Detalles de la Aportación
                                    </DialogTitle>
                                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={handleClose}>
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Contenido del modal */}
                                <div className="px-6 py-4">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center py-8">
                                            <PulseSpinner />
                                        </div>
                                    ) : contribution ? (
                                        <div className="space-y-6">
                                            {/* Información principal */}
                                            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center">
                                                        <CurrencyDollarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Cantidad aportada</p>
                                                            <p className="text-lg font-bold text-gray-800">${contribution.cantidad} MXN</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Semana</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                {contribution.semana} de {contribution.grupo?.semanas || "N/A"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Fecha de aportación</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                {formatDate(contribution.fechaAportacion)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información del grupo */}
                                            {contribution.grupo && (
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Información del grupo</h5>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center">
                                                            <UserGroupIcon className="h-5 w-5 text-green-700 mr-2" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-600">Nombre del grupo</p>
                                                                <p className="text-md font-medium text-gray-800">{contribution.grupo.nombre}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <CurrencyDollarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-600">Aportación semanal</p>
                                                                <p className="text-md font-medium text-gray-800">
                                                                    ${contribution.grupo.cantidadSemanal} MXN
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-600">Duración</p>
                                                                <p className="text-md font-medium text-gray-800">
                                                                    {contribution.grupo.semanas} semanas
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Información del miembro */}
                                            {contribution.miembro && (
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Miembro que realizó la aportación</h5>
                                                    <div className="flex items-center">
                                                        <div className="bg-green-100 rounded-full p-2 mr-3">
                                                            <UserIcon className="h-5 w-5 text-green-700" />
                                                        </div>
                                                        <div>
                                                            <p className="text-md font-medium text-gray-800">
                                                                {contribution.miembro.nombre} {contribution.miembro.apellidoPaterno}{" "}
                                                                {contribution.miembro.apellidoMaterno}
                                                            </p>
                                                            <p className="text-sm text-gray-600">{contribution.miembro.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Fechas de creación/actualización */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 mt-4">
                                                <p>Creado: {formatDate(contribution.createdAt)}</p>
                                                <p>Última actualización: {formatDate(contribution.updatedAt)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">No se pudo cargar la información de la aportación.</div>
                                    )}
                                </div>

                                {/* Pie del modal */}
                                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
                                        onClick={handleClose}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
