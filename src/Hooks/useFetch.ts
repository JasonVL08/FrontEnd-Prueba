import { useEffect, useState } from 'react';
import { Producto } from '../Models/Producto';
import { listarProductos } from '../Service/ProductoService';


export const useProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const data = await listarProductos();
            setProductos(data);
        } catch (error) {
            setError('Error al obtener la lista de productos');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       
        fetchProductos();
    }, []);

    return { productos, loading, error, fetchProductos};
};
