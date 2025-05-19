import { ReactNode, useState } from "react";
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon,
    CreditCardIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ShieldExclamationIcon,
    ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../../stores/useAppStore";
import PulseSpinner from "../../components/Spinner";

interface Report {
    id: string;
    name: string;
    description: string;
    endpoint: string;
    icon: ReactNode;
    color: string;
}

const ReportsDashboard = () => {
    const { isLoading } = useAppStore();
    const [downloadingReport, setDownloadingReport] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const reports: Report[] = [
        {
            id: "system-stats",
            name: "Estadísticas del Sistema",
            description: "Reporte general con las métricas clave del sistema incluyendo usuarios activos, grupos, préstamos y aportaciones.",
            endpoint: "/api/reports/system-stats",
            icon: <ChartBarIcon className="h-8 w-8" />,
            color: "bg-blue-100 text-blue-700",
        },
        {
            id: "monthly-trends",
            name: "Tendencias Mensuales",
            description: "Análisis de las aportaciones mensuales, mostrando tendencias y patrones a lo largo del tiempo.",
            endpoint: "/api/reports/monthly-trends",
            icon: <ArrowTrendingUpIcon className="h-8 w-8" />,
            color: "bg-green-100 text-green-700",
        },
        {
            id: "user-ranking",
            name: "Ranking de Usuarios",
            description: "Clasificación de los usuarios según su nivel de aportaciones y participación en el sistema.",
            endpoint: "/api/reports/user-ranking",
            icon: <UsersIcon className="h-8 w-8" />,
            color: "bg-purple-100 text-purple-700",
        },
        {
            id: "loan-stats",
            name: "Estadísticas de Préstamos",
            description: "Información detallada sobre préstamos activos, completados y en mora, con análisis de tendencias.",
            endpoint: "/api/reports/loan-stats",
            icon: <CreditCardIcon className="h-8 w-8" />,
            color: "bg-amber-100 text-amber-700",
        },
        {
            id: "group-performance",
            name: "Rendimiento de Grupos",
            description: "Evaluación del desempeño de los grupos, incluyendo tasas de participación y cumplimiento de objetivos.",
            endpoint: "/api/reports/group-performance",
            icon: <UserGroupIcon className="h-8 w-8" />,
            color: "bg-indigo-100 text-indigo-700",
        },
        {
            id: "financial-projections",
            name: "Proyecciones Financieras",
            description: "Estimaciones y proyecciones financieras basadas en los datos históricos y tendencias actuales.",
            endpoint: "/api/reports/financial-projections",
            icon: <CurrencyDollarIcon className="h-8 w-8" />,
            color: "bg-emerald-100 text-emerald-700",
        },
        {
            id: "risk-assessment",
            name: "Evaluación de Riesgos",
            description: "Análisis de riesgos potenciales, identificando áreas de preocupación y recomendando acciones preventivas.",
            endpoint: "/api/reports/risk-assessment",
            icon: <ShieldExclamationIcon className="h-8 w-8" />,
            color: "bg-red-100 text-red-700",
        },
    ];

    // Función para descargar un reporte
    const downloadReport = async (report: Report) => {
        try {
            setDownloadingReport(report.id);
            setError(null);
            setSuccess(null);

            // Obtener la fecha actual para el nombre del archivo
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;

            // Realizar la petición para descargar el reporte
            const response = await fetch(report.endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Aquí puedes agregar tokens de autenticación si es necesario
                    // "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error al descargar el reporte: ${response.statusText}`);
            }

            // Obtener el blob del reporte
            const blob = await response.blob();

            // Crear una URL del blob
            const url = window.URL.createObjectURL(blob);

            // Crear un elemento <a> para descargar el archivo
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            // Asignar nombre al archivo
            a.download = `${report.name.replace(/\s+/g, "_").toLowerCase()}_${formattedDate}.xlsx`;

            // Añadir al documento y hacer clic
            document.body.appendChild(a);
            a.click();

            // Limpiar
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setSuccess(`Reporte "${report.name}" descargado correctamente`);

            // Ocultar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            setError("Error al descargar el reporte. Por favor, inténtalo de nuevo.");
        } finally {
            setDownloadingReport(null);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <PulseSpinner />
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Centro de Reportes</h1>

            {/* Mensajes de éxito o error */}
            {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">{error}</div>}

            {success && <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">{success}</div>}

            {/* Descripción */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Descarga de Reportes</h2>
                <p className="text-gray-600">
                    Accede a una variedad de reportes para analizar el rendimiento del sistema, tendencias de aportaciones, estadísticas de préstamos
                    y más. Haz clic en el botón "Descargar" para obtener el reporte en formato Excel.
                </p>
            </div>

            {/* Grid de tarjetas de reportes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`p-5 ${report.color} flex items-center justify-center`}>{report.icon}</div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 h-20">{report.description}</p>

                            <button
                                onClick={() => downloadReport(report)}
                                disabled={downloadingReport !== null}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {downloadingReport === report.id ? (
                                    <PulseSpinner />
                                ) : (
                                    <>
                                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                        Descargar Reporte
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsDashboard;
