import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterLocalKG.css';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import LogoTienda from '../image/Logo-Tienda.jpg';
import Atras from '../image/Atras.png';
import entrar from '../image/BEnter.jpg';

const Register = () => {
    const [codigoTienda, setCodigoTienda] = useState('');

    const handleInputChange = (e) => {
        setCodigoTienda(e.target.value);
    };

    const forgotCodeMessage = () => {
        alert("Revisa tu correo para restablecer tu código.");
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
                    <Link to="/">
                        <img className="register-kg-back-icon" src={Atras} alt="button Back" />
                    </Link>
                </div>

                {/* Contenedor Dos */}
                <div className="register-kg-logo-container">
                    <img className="register-kg-store-logo" src={LogoTienda} alt="Logo Tienda" />
                </div>

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
                        />

                        <Link to="/edit-store">
                            <img className="register-kg-enter-button" src={entrar} alt="Botón Enter"/>
                        </Link>
                    </div>
                </form>

                <div className="register-kg-footer">
                    <Link to="/login-store" className="register-kg-link">Registrar Tienda</Link>
                    <button onClick={forgotCodeMessage} className="register-kg-link">Olvidé Código</button>
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