import { EyeIcon, PlusIcon, CheckIcon, XMarkIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { Loan } from "../../interfaces";
import PulseSpinner from "../../components/Spinner";
import { formatCurrency } from "../../helpers";
import AddLoanModal from "../../components/loans/AddLoanModal";
import LoanDetailModal from "../../components/loans/LoanDetailModal";
import toast from "react-hot-toast";
import LoanPaymentModal from "../../components/loans/LoanPaymentModal";

const Loans = () => {
    const { getLoans, isLoading, loans, updateLoanStatus } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        const loadLoans = async () => {
            try {
                await getLoans();
            } catch (error) {
                console.error("Error al cargar los préstamos:", error);
            }
        };
        loadLoans();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const getCurrentItems = () => {
        if (loans) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            return loans.slice(indexOfFirstItem, indexOfLastItem);
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

    const handleApprove = async (_id: Loan["_id"]) => {
        const response = confirm("Desea Aprobar Este Prestamo?");

        if (response) {
            const success = await updateLoanStatus(_id, "aprobado");

            if (success) {
                toast.success(success);
            }
        }
    };

    const handleReject = async (_id: Loan["_id"]) => {
        const response = confirm("Desea Rechazar Este Prestamo?");

        if (response) {
            const success = await await updateLoanStatus(_id, "rechazado");

            if (success) {
                toast.success(success);
            }
        }
    };

    const handleOpenPaymentModal = (_id: Loan["_id"]) => {
        navigate(location.pathname + `?paymentModal=${_id}`);
    };

    if (isLoading) return <PulseSpinner />;

    if (loans.length > 0)
        return (
            <div className="w-full">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Préstamos</h2>
                </div>

                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Miembro
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Monto
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tasa de Interés
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plazo (semanal)
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems?.map((prestamo) => (
                                <tr key={prestamo._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {prestamo.miembro.nombre + " " + prestamo.miembro.apellidoPaterno + " " + prestamo.miembro.apellidoMaterno}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(prestamo.cantidad)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prestamo.interes}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prestamo.cantidadSemanal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                prestamo.estado === "aprobado"
                                                    ? "bg-green-100 text-green-800"
                                                    : prestamo.estado === "pendiente"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : prestamo.estado === "rechazado"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {prestamo.estado === "aprobado"
                                                ? "Aprobado"
                                                : prestamo.estado === "pendiente"
                                                ? "Pendiente"
                                                : prestamo.estado === "rechazado"
                                                ? "Rechazado"
                                                : "Pagado"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            {prestamo.estado === "pendiente" && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(prestamo._id)}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Aprobar préstamo"
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(prestamo._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Rechazar préstamo"
                                                    >
                                                        <XMarkIcon className="h-5 w-5" />
                                                    </button>
                                                </>
                                            )}
                                            {prestamo.estado === "aprobado" && (
                                                <button
                                                    onClick={() => handleOpenPaymentModal(prestamo._id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Registrar pago"
                                                >
                                                    <CurrencyDollarIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => navigate(location.pathname + `?loanDetails=${prestamo._id}`)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Ver detalles"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden space-y-4">
                    {currentItems?.map((prestamo) => (
                        <div key={prestamo._id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">Préstamo #{prestamo?._id}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Miembro: {prestamo.miembro.nombre + prestamo.miembro.apellidoPaterno + prestamo.miembro.apellidoMaterno}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {prestamo.estado === "pendiente" && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(prestamo._id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Aprobar préstamo"
                                            >
                                                <CheckIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(prestamo._id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Rechazar préstamo"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                    {prestamo.estado === "aprobado" && (
                                        <button
                                            onClick={() => navigate(location.pathname + `?paymentModal=${prestamo._id}`)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Registrar pago"
                                        >
                                            <CurrencyDollarIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(location.pathname + `?loanDetails=${prestamo._id}`)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Ver detalles"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-medium text-gray-500">Monto:</span>
                                    <p className="font-semibold text-gray-900">{formatCurrency(prestamo.cantidad)}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Tasa:</span>
                                    <p className="font-semibold text-gray-900">{prestamo.interes}%</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Plazo:</span>
                                    <p className="font-semibold text-gray-900">{prestamo.cantidadSemanal} meses</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-500">Estado:</span>
                                    <p
                                        className={`font-semibold ${
                                            prestamo.estado === "aprobado"
                                                ? "text-green-600"
                                                : prestamo.estado === "pendiente"
                                                ? "text-yellow-600"
                                                : prestamo.estado === "rechazado"
                                                ? "text-red-600"
                                                : "text-blue-600"
                                        }`}
                                    >
                                        {prestamo.estado === "aprobado"
                                            ? "Aprobado"
                                            : prestamo.estado === "pendiente"
                                            ? "Pendiente"
                                            : prestamo.estado === "rechazado"
                                            ? "Rechazado"
                                            : "Pagado"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, loans.length)}</span> de{" "}
                        <span className="font-medium">{loans.length}</span> resultados
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
                <AddLoanModal />
                <LoanDetailModal />
                <LoanPaymentModal />
            </div>
        );

    // Si no hay préstamos, mostrar mensaje
    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Préstamos</h2>
            <div className="bg-white rounded-lg shadow p-8 text-center max-w-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">No hay préstamos registrados</h3>
                <p className="text-gray-600 mb-6">Comienza creando un nuevo préstamo haciendo clic en el botón de abajo.</p>
                <button
                    onClick={() => navigate(location.pathname + "?AddLoan=true")}
                    className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Nuevo Préstamo
                </button>
            </div>
            <AddLoanModal />
        </div>
    );
};

export default Loans;
