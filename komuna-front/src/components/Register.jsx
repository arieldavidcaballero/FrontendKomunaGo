import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterLocalKG.css';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import LogoTienda from '../image/Logo-Tienda.jpg';
import Atras from '../image/Atras.png';

const Register = () => {
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
        // TODO: Implement registration logic here
        console.log('Form submitted:', formData);
    };

    const helpMessage = () => {
        alert("Para registrarte, sigue estos pasos:\n\n" +
            "1️⃣ Ingresa el nombre del local.\n" +
            "2️⃣ Introduce tu correo electrónico (sirve para recuperar tu código si lo pierdes).\n" +
            "3️⃣ Selecciona la categoría del local (solo puedes elegir entre las opciones disponibles).");
    };

    return (
        <div className="register-kg-container">
            <div className="register-kg-chart">
                {/* Contenedor Uno */}
                <div className="register-kg-back-container">
                    <Link to="/login-store">
                        <img className="register-kg-back-icon" src={Atras} alt="button Back" />
                    </Link>
                </div>

                {/* Contenedor Dos */}
                <div className="register-kg-logo-container">
                    <img className="register-kg-logo" src={LogoKomunaGO} alt="Logo KomunaGO" />
                    <img className="register-kg-store-logo" src={LogoTienda} alt="Logo Tienda" />
                </div>

                {/* Horizontal Dashed Line */}
                <div className="register-kg-divider"></div>

                {/* Contenedor Tres */}
                <form onSubmit={handleSubmit} className="register-kg-form">
                    <div className="register-kg-input-group">
                        <input
                            className="register-kg-input"
                            type="text"
                            required
                            name="nombreLocal"
                            placeholder="NombreLocal"
                            value={formData.nombreLocal}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="register-kg-input-group">
                        <input
                            className="register-kg-input"
                            type="email"
                            required
                            name="correoElectronico"
                            placeholder="CorreoElectronico"
                            value={formData.correoElectronico}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="register-kg-input-group">
                        <input
                            className="register-kg-input"
                            type="text"
                            required
                            name="categoriaLocal"
                            placeholder="CategoriaLocal"
                            value={formData.categoriaLocal}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Contenedor Cuatro */}
                    <div className="register-kg-submit-container">
                        <button type="submit" className="register-kg-submit-button">
                            REGISTRAR LOCAL
                        </button>
                    </div>
                </form>

                <div className="register-kg-footer">
                    {/* Registrar Tienda Link */}
                    <div className="register-kg-store-link">
                        <Link to="/register-store">
                            Registrar Tienda
                        </Link>
                    </div>

                    {/* Contenedor Cinco */}
                    <div className="register-kg-help-container">
                        <button onClick={helpMessage} className="register-kg-help-button">
                            <h3>Ayuda</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;