import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
    const { user, isAuthenticated, logout } = useAppStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/login");
        }
    }, []);

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    // Función para cerrar el menú al hacer clic en una opción
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    if (user)
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <header className="bg-green-800 text-white shadow-md">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <img className="w-24" src="/logo_transparent.png" alt="" />
                            </div>

                            <nav className="hidden md:flex space-x-6">
                                <Link to="/profile" className="hover:text-green-200 transition-colors">
                                    Perfil
                                </Link>
                                <Link to="/groups" className="hover:text-green-200 transition-colors">
                                    Grupos
                                </Link>
                                <Link to="/contributions" className="hover:text-green-200 transition-colors">
                                    Aportaciones
                                </Link>
                                <Link to="/loans" className="hover:text-green-200 transition-colors">
                                    Préstamos
                                </Link>
                                <Link to="/reports" className="hover:text-green-200 transition-colors">
                                    Reportes
                                </Link>
                                <button onClick={handleLogout} className="hover:text-green-200 transition-colors">
                                    Cerrar Sesión
                                </button>
                            </nav>

                            <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {isMenuOpen && (
                            <div className="md:hidden py-3 pb-4 border-t border-green-700">
                                <div className="flex flex-col space-y-3">
                                    <Link to="/profile" className="hover:bg-green-700 px-3 py-2 rounded" onClick={closeMenu}>
                                        Perfil
                                    </Link>
                                    <Link to="/groups" className="hover:bg-green-700 px-3 py-2 rounded" onClick={closeMenu}>
                                        Grupos
                                    </Link>
                                    <Link to="/contributions" className="hover:bg-green-700 px-3 py-2 rounded" onClick={closeMenu}>
                                        Aportaciones
                                    </Link>
                                    <Link to="/loans" className="hover:bg-green-700 px-3 py-2 rounded" onClick={closeMenu}>
                                        Préstamos
                                    </Link>
                                    <Link to="/reports" className="hover:bg-green-700 px-3 py-2 rounded" onClick={closeMenu}>
                                        Reportes
                                    </Link>
                                    <button
                                        onClick={() => {
                                            closeMenu();
                                            handleLogout();
                                        }}
                                        className="hover:bg-green-700 px-3 py-2 rounded text-left"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Contenido principal */}
                <main className="flex-grow container mx-auto px-4 py-6">
                    {/* Aquí va el contenido dinámico (tablas CRUD, etc.) */}
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-green-800 text-white py-4">
                    <div className="container mx-auto px-4 text-center">
                        <p>© {new Date().getFullYear()} - Todos los derechos reservados CAPIC</p>
                    </div>
                </footer>

                <Toaster position="top-right" />
            </div>
        );
};

export default AppLayout;
