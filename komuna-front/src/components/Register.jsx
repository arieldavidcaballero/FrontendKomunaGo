import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/RegisterLocalKG.css';

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
        <div className="containerRegisterLocal">
            <div className="ContainerChart">
                {/* Contenedor Uno */}
                <div className="containerOne">
                    <Link to="/login-store">
                        <img className="buttonBack" src="/image/Atras.png" alt="button Back" />
                    </Link>
                </div>

                {/* Contenedor Dos */}
                <div className="containerTwo">
                    <img className="LogoKomunaGO" src="/image/Logo KomunaGO.png" alt="Logo KomunaGO" />
                    <img className="LogoTienda" src="/image/Logo Tienda.jpg" alt="Logo Tienda" />
                </div>

                {/* Horizontal Dashed Line */}
                <div className="dashed-line"></div>

                {/* Contenedor Tres */}
                <form onSubmit={handleSubmit} className="containerTree">
                    <div className="containerTreeZore">
                        <input
                            className="inputEnter"
                            type="text"
                            required
                            name="nombreLocal"
                            placeholder="NombreLocal"
                            value={formData.nombreLocal}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="containerTreeOne">
                        <input
                            className="inputEnter"
                            type="email"
                            required
                            name="correoElectronico"
                            placeholder="CorreoElectronico"
                            value={formData.correoElectronico}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="containerTreeTwo">
                        <input
                            className="inputEnter"
                            type="text"
                            required
                            name="categoriaLocal"
                            placeholder="CategoriaLocal"
                            value={formData.categoriaLocal}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Contenedor Cuatro */}
                    <div className="containerFour">
                        <button type="submit" className="RegisterLocal">
                            REGISTRAR LOCAL
                        </button>
                    </div>
                </form>

                {/* Registrar Tienda Link */}
                <div className="register-store-link">
                    <Link to="/register-store">
                        Registrar Tienda
                    </Link>
                </div>

                {/* Contenedor Cinco */}
                <div className="containerFive">
                    <button onClick={helpMessage} className="help-button">
                        <h3>Ayuda</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;