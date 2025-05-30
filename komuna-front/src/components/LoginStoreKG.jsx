import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos
        console.log('Datos del formulario:', formData);
    };

    const handleHelp = () => {
        alert(
            "Para registrarte, sigue estos pasos:\n\n" +
            "1️⃣ Ingresa el nombre del local.\n" +
            "2️⃣ Introduce tu correo electrónico (sirve para recuperar tu código si lo pierdes).\n" +
            "3️⃣ Selecciona la categoría del local (solo puedes elegir entre las opciones disponibles)."
        );
    };

    return (
        <div className="login-store-kg-container">
            <div className="login-store-kg-chart">
                <div className="login-store-kg-back-container">
                    <button 
                        className="login-store-kg-back-button"
                        onClick={() => navigate(-1)}
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
                        />
                    </div>
                    <div className="login-store-kg-input-group">
                        <select
                            className="login-store-kg-input"
                            required
                            name="categoriaLocal"
                            value={formData.categoriaLocal}
                            onChange={handleInputChange}
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
                    >
                        REGISTRAR LOCAL
                    </button>
                </div>

                <div className="login-store-kg-help-container">
                    <button 
                        className="login-store-kg-help-button"
                        onClick={handleHelp}
                    >
                        <h3>Ayuda</h3>
                    </button>
                </div>
            </div>
        </div>
    );
}
