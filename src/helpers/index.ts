export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(amount);
};

export const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);

        // Opciones de formato para español
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };

        return new Intl.DateTimeFormat("es-ES", options).format(date);
    } catch (error) {
        return "Fecha no disponible";
    }
};
