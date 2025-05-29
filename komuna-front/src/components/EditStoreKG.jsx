import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EditStoreKG.css';

const EditStoreKG = () => {
    const [storeData, setStoreData] = useState({
        nombreLocal: '',
        cupoPersonas: '',
        horarioLaboral: '',
        whatsappUrl: '',
        tiktokUrl: '',
        instagramUrl: '',
        facebookUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement store update logic here
        console.log('Store data updated:', storeData);
    };

    return (
        <div className="edit-store-kg-container">
            {/* Caja Izquierda */}
            <div className="edit-store-kg-box-left">
                {/* Contenedor Uno */}
                <div className="edit-store-kg-logo-container">
                    <img className="edit-store-kg-logo" src="/image/Logo KomunaGO.png" alt="Logo KomunaGO" />
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Contenedor Dos */}
                    <div className="edit-store-kg-title-container">
                        <h2 className="edit-store-kg-title">Nombre del Local</h2>
                    </div>

                    {/* Contenedor Tres */}
                    <div className="edit-store-kg-input-container">
                        <input 
                            className="edit-store-kg-input" 
                            type="text"
                            name="nombreLocal"
                            value={storeData.nombreLocal}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Contenedor Cuatro */}
                    <div className="edit-store-kg-title-container">
                        <h2 className="edit-store-kg-title">Cupo de Personas</h2>
                    </div>

                    {/* Contenedor Cinco */}
                    <div className="edit-store-kg-input-container">
                        <input 
                            className="edit-store-kg-input" 
                            type="text"
                            name="cupoPersonas"
                            value={storeData.cupoPersonas}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Contenedor Seis */}
                    <div className="edit-store-kg-title-container">
                        <h2 className="edit-store-kg-title">Horario Laboral</h2>
                    </div>

                    {/* Contenedor Siete */}
                    <div className="edit-store-kg-input-container">
                        <input 
                            className="edit-store-kg-input" 
                            type="text"
                            name="horarioLaboral"
                            value={storeData.horarioLaboral}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Contenedor Ocho */}
                    <div className="edit-store-kg-map-container">
                        <h2 className="edit-store-kg-title">
                            <a className="edit-store-kg-map-link" href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                                Ubicación Google Maps
                            </a>
                        </h2>
                    </div>
                </form>
            </div>

            {/* Caja Derecha */}
            <div className="edit-store-kg-box-right">
                {/* Contenedor Nueve */}
                <div className="edit-store-kg-back-container">
                    <Link to="/start">
                        <img className="edit-store-kg-back-button" src="/image/Back.png" alt="button Back" />
                    </Link>
                </div>

                {/* Contenedor Foto y Menú */}
                <div className="edit-store-kg-photo-menu">
                    {/* Contenedor Diez */}
                    <div className="edit-store-kg-photo-container">
                        <h2 className="edit-store-kg-title">Foto de local</h2>
                        <img className="edit-store-kg-photo" src="/Image/Foto1.jpeg" alt="Foto del Local" />
                    </div>

                    {/* Contenedor Once */}
                    <div className="edit-store-kg-menu-container">
                        <h2 className="edit-store-kg-title">Menú</h2>
                        <a href="/Dosc/MenúT6.pdf" target="_blank" rel="noopener noreferrer">
                            <img className="edit-store-kg-menu" src="/image/MenuT6.jpeg" alt="Menú del Local" />
                        </a>
                    </div>
                </div>

                {/* Contenedor Doce */}
                <div className="edit-store-kg-social-container">
                    <div className="edit-store-kg-social-item">
                        <img src="/image/WhatsappIcon.png" alt="Whatsapp Icon" />
                        <input 
                            className="edit-store-kg-social-input" 
                            type="text" 
                            placeholder="Url"
                            name="whatsappUrl"
                            value={storeData.whatsappUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="edit-store-kg-social-item">
                        <img src="/image/TikTokIcon.png" alt="TikTok Icon" />
                        <input 
                            className="edit-store-kg-social-input" 
                            type="text" 
                            placeholder="Url"
                            name="tiktokUrl"
                            value={storeData.tiktokUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="edit-store-kg-social-item">
                        <img src="/image/InstagramIcon.png" alt="Instagram Icon" />
                        <input 
                            className="edit-store-kg-social-input" 
                            type="text" 
                            placeholder="Url"
                            name="instagramUrl"
                            value={storeData.instagramUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="edit-store-kg-social-item">
                        <img src="/image/FacebookIcon.png" alt="Facebook Icon" />
                        <input 
                            className="edit-store-kg-social-input" 
                            type="text" 
                            placeholder="Url"
                            name="facebookUrl"
                            value={storeData.facebookUrl}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStoreKG;