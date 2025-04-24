import { EyeIcon, TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { Contribution } from "../../interfaces";
import PulseSpinner from "../../components/Spinner";
import { formatCurrency } from "../../helpers";
import AddContributionModal from "../../components/contributions/AddContributionModal";
import ContributionDetailModal from "../../components/contributions/ContributionDetails";

const Contributions = () => {
    // Simulación de datos (reemplazar con datos reales de tu API)
    const { getContributions, isLoading, contributions, deleteContribution } = useAppStore();
    const navigate = useNavigate();
    // Efecto para cargar los datos cuando el componente se monta
    useEffect(() => {
        const loadContributions = async () => {
            try {
                await getContributions();
            } catch (error) {
                console.error("Error al cargar las aportaciones:", error);
            }
        };
        loadContributions();
    }, []);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular el total de páginas
    const totalPages = Math.ceil(contributions.length / itemsPerPage);

    // Obtener los elementos para la página actual
    const getCurrentItems = () => {
        if (contributions) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            return contributions.slice(indexOfFirstItem, indexOfLastItem);
        }
    };

    // Elementos actuales a mostrar
    const currentItems = getCurrentItems();

    // Funciones para cambiar de página
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

    const handleDelete = async (_id: Contribution["_id"]) => {
        await deleteContribution(_id);
    };

    if (isLoading) return <PulseSpinner />;

    if (contributions.length > 0)
        return (
            <div className="w-full">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Aportaciones</h2>
                    <button
                        onClick={() => navigate(location.pathname + "?AddContribution=true")}
                        className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Nueva Aportacion
                    </button>
                </div>

                {/* Tabla para pantallas medianas y grandes */}
                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grupo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Miembro
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cantidad Semanal
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semana
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems?.map((aportacion) => (
                                <tr key={aportacion._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{aportacion.grupo.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${aportacion.miembro.nombre} ${aportacion.miembro.apellidoPaterno} ${aportacion.miembro.apellidoPaterno} `}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(aportacion.cantidad)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{aportacion.semana}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => navigate(location.pathname + `?contributionDetails=${aportacion._id}`)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Ver detalles"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            {/* <Link
                                                to={`/app/aportaciones/${aportacion._id}/editar`}
                                                className="text-yellow-600 hover:text-yellow-900"
                                                title="Editar"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </Link> */}
                                            <button
                                                onClick={() => handleDelete(aportacion._id)}
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
                    {currentItems?.map((aportacion) => (
                        <div key={aportacion._id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{`${aportacion.miembro.nombre} ${aportacion.miembro.apellidoPaterno} ${aportacion.miembro.apellidoPaterno} `}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{aportacion.grupo.nombre}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => navigate(location.pathname + `?contributionDetails=${aportacion._id}`)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Ver detalles"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    {/* <Link
                                        to={`/app/aportaciones/${aportacion._id}/editar`}
                                        className="text-yellow-500 hover:text-yellow-900"
                                        title="Editar"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </Link> */}
                                    <button onClick={() => handleDelete(aportacion._id)} className="text-red-500 hover:text-red-900" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-medium text-gray-500">Cantidad:</span>
                                    <p className="font-semibold text-gray-900">{formatCurrency(aportacion.cantidad)}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Semana:</span>
                                    <p className="font-semibold text-gray-900">{aportacion.semana}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, contributions.length)}</span> de{" "}
                        <span className="font-medium">{contributions.length}</span> resultados
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
                <AddContributionModal />
                <ContributionDetailModal />
            </div>
        );
};

export default Contributions;
