import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendedorService } from '../services/vendedorService';
import '../styles/RegisterLocalKG.css';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import LogoTienda from '../image/Logo-Tienda.jpg';
import Atras from '../image/Atras.png';
import entrar from '../image/BEnter.jpg';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const [codigoTienda, setCodigoTienda] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setCodigoTienda(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await vendedorService.validarCodigo(codigoTienda);
            if (response.valid) {
                // Guardar el ID del vendedor para usarlo en el perfil
                localStorage.setItem('vendedorId', response.vendedor.id);
                navigate('/edit-store');
            }
        } catch (err) {
            setError(err.message || 'Código inválido. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotCode = async () => {
        const email = prompt('Por favor, ingrese su correo electrónico:');
        if (email) {
            try {
                await vendedorService.recuperarCodigo(email);
                Swal.fire('Éxito', 'Si el correo está registrado, recibirá el código de acceso.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Hubo un error al procesar su solicitud. Por favor intente nuevamente.', 'error');
            }
        }
    };

    const helpMessage = () => {
        Swal.fire({
            title: 'Para registrarte, sigue estos pasos:',
            text: '1️⃣ Ingresa el nombre del local.\n2️⃣ Introduce tu correo electrónico (sirve para recuperar tu código si lo pierdes).\n3️⃣ Selecciona la categoría del local (solo puedes elegir entre las opciones disponibles).',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    };

    return (
        <div className="register-kg-container">
            <div className="register-kg-chart">
                {/* Contenedor Uno */}
                <div className="register-kg-back-container">
                    <button onClick={() => navigate('/')} className="register-kg-back-button">
                        <img className="register-kg-back-icon" src={Atras} alt="button Back" />
                    </button>
                </div>

                {/* Contenedor Dos */}
                <div className="register-kg-logo-container">
                    <img className="register-kg-store-logo" src={LogoTienda} alt="Logo Tienda" />
                </div>

                {error && <div className="register-kg-error">{error}</div>}

                {/* Contenedor Tres */}
                <form onSubmit={handleSubmit} className="register-kg-form">
                    <div className="register-kg-input-group">
                        <input
                            className="register-kg-input"
                            type="text"
                            required
                            name="codigoTienda"
                            placeholder="Código Tienda"
                            value={codigoTienda}
                            onChange={handleInputChange}
                            disabled={loading}
                        />

                        <button 
                            type="submit" 
                            className="register-kg-enter-button"
                            disabled={loading}
                        >
                            <img src={entrar} alt="Botón Enter"/>
                        </button>
                    </div>
                </form>

                <div className="register-kg-footer">
                    <button 
                        onClick={() => navigate('/login-store')} 
                        className="register-kg-link"
                    >
                        Registrar Tienda
                    </button>
                    <button 
                        onClick={handleForgotCode} 
                        className="register-kg-link"
                        disabled={loading}
                    >
                        Olvidé Código
                    </button>
                </div>

                {/* Contenedor Cinco */}
                    <div className="register-kg-help-container">
                        <img className="login-store-kg-logo" src={LogoKomunaGO} alt="Logo KomunaGO"/>
                    </div>
            </div>
        </div>
    );
};

export default Register;