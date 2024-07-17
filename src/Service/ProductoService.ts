import { Producto } from "../Models/Producto";


const baseUrl = 'https://localhost:7090/api/Producto';



export const listarProductos = async (): Promise<Producto[]> => {
    const response = await fetch(baseUrl +"/list", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Error al listar los productos');
    }
    return response.json();
};

export const crearProducto = async (producto: Producto) => {
    try {
        const response = await fetch(baseUrl + "/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al crear el producto/service');
        }

        const responseBody = await response.text(); // Obtener el cuerpo como texto
        console.log("Respuesta del servidor:", responseBody);


        return responseBody;
    } catch (error) {
        console.error("Error al procesar la respuesta del servidor:", error);
        throw error;
    }
};
