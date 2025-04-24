import { Fragment, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon, UserGroupIcon, CalendarIcon, CurrencyDollarIcon, UserIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../../stores/useAppStore";
import PulseSpinner from "../Spinner";
import { formatDate } from "../../helpers";

export default function GroupDetailModal() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const groupId = searchParams.get("viewGroup");
    const { group, getGroup, isLoading } = useAppStore();

    // Verificar si el modal debe mostrarse
    const show = Boolean(groupId);

    // Cargar los datos del grupo cuando cambia el ID
    useEffect(() => {
        const fetchGroupDetail = async () => {
            if (groupId) {
                try {
                    await getGroup(groupId);
                } catch (error) {
                    console.error("Error al cargar los detalles del grupo:", error);
                }
            }
        };

        if (show) {
            fetchGroupDetail();
        }
    }, [groupId, getGroup]);

    // Calcular el total del grupo (cantidad semanal × semanas × miembros)
    const calculateGroupTotal = () => {
        if (!group || !group.miembros) return 0;
        return group.cantidadSemanal * group.semanas * group.miembros.length;
    };

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
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                {/* Encabezado del modal */}
                                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                                    <DialogTitle as="h3" className="text-2xl font-bold text-gray-800">
                                        Detalles del Grupo
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
                                    ) : group ? (
                                        <div className="space-y-6">
                                            {/* Información principal */}
                                            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                                <h4 className="text-xl font-bold text-gray-800 mb-4">{group.nombre}</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center">
                                                        <CurrencyDollarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Aportación semanal</p>
                                                            <p className="text-lg font-bold text-gray-800">${group.cantidadSemanal} MXN</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Duración</p>
                                                            <p className="text-lg font-bold text-gray-800">{group.semanas} semanas</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <UserGroupIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Participantes</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                {group.miembros?.length || 0} de {group.limiteUsuarios}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CurrencyDollarIcon className="h-5 w-5 text-green-700 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Total del grupo</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                ${calculateGroupTotal().toLocaleString()} MXN
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información del creador */}
                                            {group.creador && (
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Creador del grupo</h5>
                                                    <div className="flex items-center">
                                                        <div className="bg-green-100 rounded-full p-2 mr-3">
                                                            <UserIcon className="h-5 w-5 text-green-700" />
                                                        </div>
                                                        <div>
                                                            <p className="text-md font-medium text-gray-800">
                                                                {group.creador.nombre} {group.creador.apellidoPaterno} {group.creador.apellidoMaterno}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Lista de miembros */}
                                            {group.miembros && group.miembros.length > 0 && (
                                                <div>
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Miembros ({group.miembros.length})</h5>
                                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                        <div className="overflow-x-auto">
                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                <thead className="bg-gray-50">
                                                                    <tr>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                        >
                                                                            Nombre
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                        >
                                                                            Correo electrónico
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {group.miembros.map((miembro) => (
                                                                        <tr key={miembro._id} className="hover:bg-gray-50">
                                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                    {miembro.nombre} {miembro.apellidoPaterno}{" "}
                                                                                    {miembro.apellidoMaterno}
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                                <div className="text-sm text-gray-600">{miembro.email}</div>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Fechas */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 mt-4">
                                                <p>Creado: {formatDate(group.createdAt)}</p>
                                                <p>Última actualización: {formatDate(group.updatedAt)}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">No se pudo cargar la información del grupo.</div>
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
