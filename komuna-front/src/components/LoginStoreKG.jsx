import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import LogoTienda from '../image/Logo Tienda.jpg';
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
        <div className="containerRegisterLocal">
            <div className="ContainerChart">
                <div className="containerOne">
                    <button 
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        <img 
                            className="buttonBack" 
                            src={AtrasIcon} 
                            alt="Volver atrás" 
                        />
                    </button>
                </div>

                <div className="containerTwo">
                    <img 
                        className="LogoKomunaGO" 
                        src={LogoKomunaGO} 
                        alt="Logo KomunaGO" 
                    />
                    <img 
                        className="LogoTienda" 
                        src={LogoTienda} 
                        alt="Logo Tienda" 
                    />
                </div>

                <form onSubmit={handleSubmit} className="containerTree">
                    <div className="containerTreeZore">
                        <input 
                            className="inputEnter"
                            type="text"
                            required
                            name="nombreLocal"
                            placeholder="Nombre del Local"
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
                            placeholder="Correo Electrónico"
                            value={formData.correoElectronico}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="containerTreeTwo">
                        <select
                            className="inputEnter"
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

                <div className="containerFour">
                    <button 
                        className="RegisterLocal"
                        onClick={handleSubmit}
                    >
                        REGISTRAR LOCAL
                    </button>
                </div>

                <div className="containerFive">
                    <button 
                        className="help-button"
                        onClick={handleHelp}
                    >
                        <h3>Ayuda</h3>
                    </button>
                </div>
            </div>
        </div>
    );
}
