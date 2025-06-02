import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendedorService } from '../services/vendedorService';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import LogoTienda from '../image/Logo-Tienda.jpg';
import AtrasIcon from '../image/Atras.png';
import '../styles/LoginStoreKG.css';

export default function LoginStoreKG() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombreLocal: '',
        correoElectronico: '',
        categoriaLocal: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await vendedorService.registrar({
                nombre_local: formData.nombreLocal,
                correoElectronico: formData.correoElectronico,
                categoriaLocal: formData.categoriaLocal
            });

            alert(response.message);
            navigate('/'); // Redirigir al inicio para que ingrese con el código
        } catch (err) {
            setError(err.error || 'Error al registrar el local. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleHelp = () => {
        alert(
            "Para registrarte, sigue estos pasos:\n\n" +
            "1️⃣ Ingresa el nombre del local.\n" +
            "2️⃣ Introduce tu correo electrónico (sirve para recuperar tu código si lo pierdes).\n" +
            "3️⃣ Selecciona la categoría del local (solo puedes elegir entre las opciones disponibles).\n" +
            "4️⃣ Recibirás un código único en tu correo para acceder a tu perfil."
        );
    };

    return (
        <div className="login-store-kg-container">
            <div className="login-store-kg-chart">
                <div className="login-store-kg-back-container">
                    <button 
                        className="login-store-kg-back-button"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        <img 
                            className="login-store-kg-back-icon" 
                            src={AtrasIcon} 
                            alt="Volver atrás" 
                        />
                    </button>
                </div>

                <div className="login-store-kg-logo-container">
                    <img 
                        className="login-store-kg-logo" 
                        src={LogoKomunaGO} 
                        alt="Logo KomunaGO" 
                    />
                    <img 
                        className="login-store-kg-store-logo" 
                        src={LogoTienda} 
                        alt="Logo Tienda" 
                    />
                </div>

                {error && <div className="login-store-kg-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-store-kg-form">
                    <div className="login-store-kg-input-group">
                        <input 
                            className="login-store-kg-input"
                            type="text"
                            required
                            name="nombreLocal"
                            placeholder="Nombre del Local"
                            value={formData.nombreLocal}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="login-store-kg-input-group">
                        <input 
                            className="login-store-kg-input"
                            type="email"
                            required
                            name="correoElectronico"
                            placeholder="Correo Electrónico"
                            value={formData.correoElectronico}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="login-store-kg-input-group">
                        <select
                            className="login-store-kg-input"
                            required
                            name="categoriaLocal"
                            value={formData.categoriaLocal}
                            onChange={handleInputChange}
                            disabled={loading}
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="restaurante">Restaurante</option>
                            <option value="mirador">Mirador</option>
                            <option value="cocteleria">Coctelería</option>
                            <option value="manualidades">Manualidades</option>
                        </select>
                    </div>
                </form>

                <div className="login-store-kg-register-container">
                    <button 
                        className="login-store-kg-register-button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'REGISTRANDO...' : 'REGISTRAR LOCAL'}
                    </button>
                </div>

                <div className="login-store-kg-help-container">
                    <button 
                        className="login-store-kg-help-button"
                        onClick={handleHelp}
                        disabled={loading}
                    >
                        <h3>Ayuda</h3>
                    </button>
                </div>
            </div>
        </div>
    );
}
