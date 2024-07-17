import { useState } from 'react';
import { Producto } from '../Models/Producto';
import { crearProducto } from '../Service/ProductoService';


export const useAddProducto = (fetchProductos: () => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addProducto = async (producto: Producto) => {
        setLoading(true);
        try {
            const nuevoProducto = await crearProducto(producto);
            fetchProductos();
            return nuevoProducto;
            
        } catch (error: any) {
            if (error instanceof SyntaxError) {
                console.error(error);
                setError('Error al procesar la respuesta del servidor: ' + error.message);
            } else {
                setError('Error al agregar el producto: ' + error.message);
            }
            throw error;
        } finally {
            
            setLoading(false);
        }
    };
    return { addProducto, loading, error };
};