const PulseSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
                    <div className="relative flex items-center justify-center w-16 h-16">
                        <div className="w-4 h-4 bg-white rounded-full mx-1 animate-pulse"></div>
                        <div className="w-4 h-4 bg-white rounded-full mx-1 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-4 h-4 bg-white rounded-full mx-1 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                </div>
                <p className="mt-6 text-white text-lg font-medium">Cargando...</p>
            </div>
        </div>
    );
};

export default PulseSpinner;
