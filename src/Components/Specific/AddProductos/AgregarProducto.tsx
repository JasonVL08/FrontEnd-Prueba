import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { Producto } from '../../../Models/Producto';
import './AgregarProducto.css';


interface AgregarProductoModalProps {
    open: boolean;
    handleClose: () => void;
    addProducto: (producto: Producto) => Promise<void>;
}

const AgregarProductoModal: React.FC<AgregarProductoModalProps> = ({ open, handleClose, addProducto }) => {
    const [producto, setProducto] = useState<Producto>({
        name: '',
        price: 0
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await addProducto(producto);
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: `Producto ${producto.name} agregado con éxito.`
            });
            setProducto({
                name: '',
                price: 0
            });
            handleClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al agregar el producto.'
            });
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modal-box">
                <Typography id="modal-title" variant="h6" component="h2">
                    Agregar Producto
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        name="name"
                        value={producto.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ minLength: 3 }}
                    />
                    <TextField
                        label="Precio"
                        name="price"
                        type="number"
                        value={producto.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ min: 0.01, step: 0.01 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Agregar Producto
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AgregarProductoModal;