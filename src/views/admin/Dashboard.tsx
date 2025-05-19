import { BanknotesIcon, CreditCardIcon, CurrencyDollarIcon, DocumentChartBarIcon, UserGroupIcon, UserIcon } from "@heroicons/react/20/solid";
import DashboardCard from "../../components/DashboardCard";
import { ReactNode } from "react";

export interface MenuCard {
    id: number;
    title: string;
    icon: ReactNode;
    description: string;
    route: string;
    color: string;
}

const Dashboard = () => {
    const menuCards: MenuCard[] = [
        {
            id: 1,
            title: "Perfil",
            icon: <UserIcon className="h-8 w-8" />,
            description: "Gestiona tu información personal",
            route: "/profile",
            color: "from-amber-700 to-amber-600",
        },
        {
            id: 2,
            title: "Grupos",
            icon: <UserGroupIcon className="h-8 w-8" />,
            description: "Administra tus grupos",
            route: "/groups",
            color: "from-green-700 to-green-600",
        },
        {
            id: 3,
            title: "Aportaciones",
            icon: <BanknotesIcon className="h-8 w-8" />,
            description: "Consulta y registra aportaciones",
            route: "/contributions",
            color: "from-green-700 to-green-600",
        },
        {
            id: 4,
            title: "Préstamos",
            icon: <CreditCardIcon className="h-8 w-8" />,
            description: "Gestiona tus préstamos",
            route: "/loans",
            color: "from-green-700 to-green-600",
        },
        {
            id: 5,
            title: "Reportes",
            icon: <DocumentChartBarIcon className="h-8 w-8" />,
            description: "Visualiza estadísticas y reportes",
            route: "/reports",
            color: "from-green-700 to-green-600",
        },
    ];

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuCards.map((card) => (
                    <DashboardCard key={card.id} card={card} />
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Resumen de Aportaciones</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="block text-gray-500">Total aportado</span>
                            <span className="text-2xl font-bold text-gray-800">$45,250.00</span>
                        </div>
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CurrencyDollarIcon className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Préstamos Activos</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="block text-gray-500">Total pendiente</span>
                            <span className="text-2xl font-bold text-gray-800">$12,800.00</span>
                        </div>
                        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCardIcon className="w-7 h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
