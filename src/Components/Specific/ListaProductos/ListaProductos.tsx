import React, { useState } from 'react';
import './ListaProductos.css';
import { useProductos } from '../../../Hooks/useFetch';
import { Button, Container, Box } from '@mui/material';
import AgregarProductoModal from '../AddProductos/AgregarProducto';
import { useAddProducto } from '../../../Hooks/CreateFetch';
import { Producto } from '../../../Models/Producto';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

const ListaProductos: React.FC = () => {
    const { productos, loading, error, fetchProductos } = useProductos();
    const { addProducto, loading: adding, error: addError } = useAddProducto(fetchProductos);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleAddProducto = async (nuevoProducto: Producto) => {
        try {
            await addProducto(nuevoProducto);
            handleCloseModal();
        } catch (error) {
            console.error('Error al agregar el producto', error);
        }
    };

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'price', headerName: 'Precio', width: 150, type: 'number', valueFormatter: (params) => `S/.${Number(params).toFixed(2)}`},
    ];

    const rows: GridRowsProp = productos.map((producto) => ({
        id: producto.id,
        name: producto.name,
        price: producto.price,
    }));

    return (
        <Container>
            <h2>Lista de Productos</h2>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Registrar Producto
            </Button>
            <AgregarProductoModal open={openModal} handleClose={handleCloseModal} addProducto={handleAddProducto} />
            <Box sx={{ height: 600, width: '100%', marginTop: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                   
                />
            </Box>
            {adding && <p>Agregando producto...</p>}
            {addError && <p>{addError}</p>}
        </Container>
    );
};

export default ListaProductos;