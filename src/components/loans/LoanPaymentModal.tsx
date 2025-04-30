import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon, UserIcon, CurrencyDollarIcon, CalendarIcon, CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "../../stores/useAppStore";
import PulseSpinner from "../Spinner";
import { formatDate } from "../../helpers";
import toast from "react-hot-toast";

export default function LoanPaymentModal() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const loanId = searchParams.get("paymentLoan");
    const { loan, getLoan, isLoading, registerLoanPayment } = useAppStore();
    const [savingPayment, setSavingPayment] = useState<boolean>(false);

    // Verificar si el modal debe mostrarse
    const show = Boolean(loanId);

    // Cargar los datos del préstamo cuando cambia el ID
    useEffect(() => {
        const fetchLoanDetail = async () => {
            if (loanId) {
                try {
                    await getLoan(loanId);
                } catch (error) {
                    toast.error("Hubo un error al obtener el prestamo");
                }
            }
        };

        if (show) {
            fetchLoanDetail();
        }
    }, [loanId, getLoan]);

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    };

    // Formatear número a moneda
    const formatCurrency = (amount: number): string => {
        return `$${amount.toLocaleString()} MXN`;
    };

    // Estado del préstamo en español
    const getLoanStatus = (status: string): string => {
        const statusMap: Record<string, string> = {
            aprobado: "Aprobado",
            pendiente: "Pendiente",
            rechazado: "Rechazado",
            completado: "Completado",
        };
        return statusMap[status] || status;
    };

    // Obtener color según estado
    const getStatusColor = (status: string): string => {
        const colorMap: Record<string, string> = {
            aprobado: "green",
            pendiente: "yellow",
            rechazado: "red",
            completado: "blue",
        };
        return colorMap[status] || "gray";
    };

    // Manejar cambio en el checkbox de pago
    const handlePaymentChange = async (semana: number) => {
        if (!loanId) return;

        setSavingPayment(true);

        try {
            // Llamar al API para actualizar el estado del pago
            await registerLoanPayment(loanId, semana);
        } catch (error) {
            toast.error("Error al actualizar el pago:", error);
        }
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
                            <DialogPanel className="w-full max-w-3xl max-h-[70vh] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all flex flex-col">
                                {/* Encabezado del modal */}
                                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                                    <DialogTitle as="h3" className="text-2xl font-bold text-gray-800">
                                        Gestión de Pagos
                                    </DialogTitle>
                                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={handleClose}>
                                        <span className="sr-only">Cerrar</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="px-6 py-4 overflow-y-auto flex-grow">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center py-8">
                                            <PulseSpinner />
                                        </div>
                                    ) : loan ? (
                                        <div className="space-y-6">
                                            <div
                                                className={`bg-${getStatusColor(loan.estado)}-50 border border-${getStatusColor(
                                                    loan.estado
                                                )}-100 rounded-lg p-4`}
                                            >
                                                <div className="mb-3 flex justify-between items-center">
                                                    <h4 className="text-xl font-bold text-gray-800">Préstamo ID: {loan._id}</h4>
                                                    <span
                                                        className={`text-${getStatusColor(loan.estado)}-700 bg-${getStatusColor(
                                                            loan.estado
                                                        )}-100 py-1 px-3 rounded-full text-sm font-medium`}
                                                    >
                                                        {getLoanStatus(loan.estado)}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="flex items-center">
                                                        <CurrencyDollarIcon className={`h-5 w-5 text-${getStatusColor(loan.estado)}-700 mr-2`} />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Total a pagar</p>
                                                            <p className="text-lg font-bold text-gray-800">{formatCurrency(loan.totalPagar)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CalendarIcon className={`h-5 w-5 text-${getStatusColor(loan.estado)}-700 mr-2`} />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Duración</p>
                                                            <p className="text-lg font-bold text-gray-800">{loan.semanas} semanas</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <CurrencyDollarIcon className={`h-5 w-5 text-${getStatusColor(loan.estado)}-700 mr-2`} />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-600">Pago semanal</p>
                                                            <p className="text-lg font-bold text-gray-800">{formatCurrency(loan.cantidadSemanal)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Información del miembro */}
                                            {loan.miembro && (
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Información del solicitante</h5>
                                                    <div className="flex items-center">
                                                        <div className={`bg-${getStatusColor(loan.estado)}-100 rounded-full p-2 mr-3`}>
                                                            <UserIcon className={`h-5 w-5 text-${getStatusColor(loan.estado)}-700`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-md font-medium text-gray-800">
                                                                {loan.miembro.nombre} {loan.miembro.apellidoPaterno} {loan.miembro.apellidoMaterno}
                                                            </p>
                                                            <p className="text-sm text-gray-600">{loan.miembro.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Resumen de pagos */}
                                            {loan.resumen && (
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Resumen de pagos</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium text-gray-600">Pagado hasta ahora</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                {formatCurrency(loan.resumen.pagadoHastaAhora)}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium text-gray-600">Monto restante</p>
                                                            <p className="text-lg font-bold text-gray-800">
                                                                {formatCurrency(loan.resumen.montoRestante)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Barra de progreso */}
                                                    <div className="mt-3">
                                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className={`bg-${getStatusColor(loan.estado)}-600 h-2.5 rounded-full`}
                                                                style={{ width: `${loan.resumen.progresoPago}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Formulario de pagos con checkboxes */}
                                            {loan.pagos && loan.pagos.length > 0 && (
                                                <div>
                                                    <h5 className="text-md font-semibold text-gray-700 mb-3">Registro de pagos</h5>
                                                    <div className="border border-gray-200 rounded-lg">
                                                        <div className="divide-y divide-gray-200">
                                                            {loan.pagos.map((pago) => (
                                                                <div
                                                                    key={pago.semana}
                                                                    className="flex items-center justify-between py-3 px-4 hover:bg-gray-50"
                                                                >
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900">Semana {pago.semana}</p>
                                                                        <p className="text-sm text-gray-600">{formatCurrency(pago.cantidad)}</p>
                                                                    </div>

                                                                    <div className="flex items-center">
                                                                        {pago.fechaPago && (
                                                                            <span className="text-xs text-gray-500 mr-4">
                                                                                Pagado: {formatDate(pago.fechaPago)}
                                                                            </span>
                                                                        )}

                                                                        <label className="inline-flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                                                                checked={pago.pagado || false}
                                                                                onChange={(e) => handlePaymentChange(pago.semana, e.target.checked)}
                                                                                disabled={savingPayment}
                                                                            />
                                                                            <span className="ml-2 text-gray-700">
                                                                                {pago.pagado ? "Pagado" : "Marcar como pagado"}
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">No se pudo cargar la información del préstamo.</div>
                                    )}
                                </div>

                                {/* Pie del modal */}
                                <div className="bg-gray-50 px-6 py-4 flex justify-end flex-shrink-0 border-t border-gray-200">
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
