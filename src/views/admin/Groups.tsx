import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { Group } from "../../interfaces";
import PulseSpinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helpers";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import AddGroupModal from "../../components/groups/AddGroupModal";
import EditGroupModal from "../../components/groups/EditGroupModal";
import toast from "react-hot-toast";
import GroupDetailModal from "../../components/groups/GroupDetailsModal";

const Groups = () => {
    // Simulación de datos (reemplazar con datos reales de tu API)
    const { groups, isLoading, getGroups, deleteGroups } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        const loadGroups = async () => {
            try {
                await getGroups();
            } catch (error) {
                console.error("Error al cargar los Grupos:", error);
            }
        };
        loadGroups();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(groups.length / itemsPerPage);

    const getCurrentItems = () => {
        if (groups) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            return groups.slice(indexOfFirstItem, indexOfLastItem);
        }
    };

    const currentItems = getCurrentItems();

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = async (_id: Group["_id"]) => {
        const response = confirm("Desea Borrar Este Grupo?");

        if (response) {
            const success = await deleteGroups(_id);

            if (success) {
                toast.success(success);
            }
        }
    };

    if (isLoading) return <PulseSpinner />;

    if (groups.length > 0)
        return (
            <div className="w-full">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Aportaciones</h2>
                    <button
                        onClick={() => navigate(location.pathname + "?addGroup=true")}
                        className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Nuevo Grupo
                    </button>
                </div>

                {/* Tabla para pantallas medianas y grandes */}
                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semanas
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad Semanal
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Limite Usuarios
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems?.map((grupo) => (
                                <tr key={grupo._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grupo.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grupo.semanas}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(grupo.cantidadSemanal)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grupo.limiteUsuarios}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Link to={`?viewGroup=${grupo._id}`} className="text-blue-600 hover:text-blue-900" title="Ver detalles">
                                                <EyeIcon className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                to={location.pathname + "?editGroup=" + grupo._id}
                                                className="text-yellow-600 hover:text-yellow-900"
                                                title="Editar"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(grupo._id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Eliminar"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Vista de tarjetas para dispositivos móviles */}
                <div className="md:hidden space-y-4">
                    {currentItems?.map((grupo) => (
                        <div key={grupo._id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{grupo.nombre}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{grupo.nombre}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`?viewGroup=${grupo._id}`} className="text-blue-600 hover:text-blue-900" title="Ver detalles">
                                        <EyeIcon className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        to={location.pathname + "?editGroup=" + grupo._id}
                                        className="text-yellow-500 hover:text-yellow-900"
                                        title="Editar"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </Link>
                                    <button onClick={() => handleDelete(grupo._id)} className="text-red-500 hover:text-red-900" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-medium text-gray-500">Cantidad:</span>
                                    <p className="font-semibold text-gray-900">{formatCurrency(grupo.cantidadSemanal)}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Semana:</span>
                                    <p className="font-semibold text-gray-900">{grupo.limiteUsuarios}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, groups.length)}</span> de{" "}
                        <span className="font-medium">{groups.length}</span> resultados
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={goToNextPage}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

                <AddGroupModal />
                <EditGroupModal />
                <GroupDetailModal />
            </div>
        );
};

export default Groups;
