import { Link } from "react-router-dom";
import { MenuCard } from "../views/admin/Dashboard";

interface DashboardCardProps {
    card: MenuCard;
}

const DashboardCard = ({ card }: DashboardCardProps) => {
    return (
        <Link
            key={card.id}
            to={card.route}
            className={`bg-gradient-to-br ${card.color} text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-opacity-20 border-white`}
        >
            <div className="p-6 flex flex-col items-center sm:items-start sm:flex-row">
                <div className="flex-shrink-0 flex items-center justify-center p-3 bg-white bg-opacity-20 rounded-full mb-4 sm:mb-0 sm:mr-4">
                    {card.icon}
                </div>
                <div className="flex flex-col text-center sm:text-left">
                    <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                    <p className="text-white text-opacity-90">{card.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default DashboardCard;
