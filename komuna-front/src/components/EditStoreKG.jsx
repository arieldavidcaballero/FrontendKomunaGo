import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import WhatsappIcon from '../image/WhatsappIcon.png';
import TikTokIcon from '../image/TikTokIcon.png';
import InstagramIcon from '../image/InstagramIcon.png';
import FacebookIcon from '../image/FacebookIcon.png';
import UploadIcon from '../image/SubirImagenIcono.png';
import '../styles/EditStoreKG.css';

const EditStoreKG = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [storeData, setStoreData] = useState({
        nombreLocal: '',
        cupoPersonas: '',
        horarioLaboral: '',
        categoria: '',
        foto: null,
        menu: null,
        whatsappUrl: '',
        tiktokUrl: '',
        instagramUrl: '',
        facebookUrl: '',
        ubicacion: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileUpload = (type, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStoreData(prevState => ({
                    ...prevState,
                    [type]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulamos un proceso de guardado
        setTimeout(() => {
            setIsLoading(false);
            alert('Los cambios se guardarán cuando la API esté implementada');
            console.log('Datos que se enviarán a la API:', storeData);
        }, 1000);
    };

    return (
        <div className="edit-store-kg-container">
            {/* Header */}
            <div className="edit-store-kg-header">
                <img src={LogoKomunaGO} alt="Logo KomunaGO" className="edit-store-kg-logo" />
                <div className="edit-store-kg-buttons">
                    <button 
                        className="edit-store-kg-back"
                        onClick={() => navigate(-2)}
                        disabled={isLoading}
                    >
                        BACK
                    </button>
                    <button 
                        className="edit-store-kg-register"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="edit-store-kg-content">
                {/* Left Section */}
                <div className="edit-store-kg-left">
                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Nombre del Local</label>
                        <input
                            type="text"
                            name="nombreLocal"
                            value={storeData.nombreLocal}
                            onChange={handleInputChange}
                            className="edit-store-kg-input"
                        />
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Cupo de Personas</label>
                        <input
                            type="number"
                            name="cupoPersonas"
                            value={storeData.cupoPersonas}
                            onChange={handleInputChange}
                            className="edit-store-kg-input"
                        />
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Horario Laboral</label>
                        <input
                            type="text"
                            name="horarioLaboral"
                            value={storeData.horarioLaboral}
                            onChange={handleInputChange}
                            className="edit-store-kg-input"
                            placeholder="Ejemplo: 8 AM - 11 PM"
                        />
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Selecciona una categoría</label>
                        <div className="edit-store-kg-select-container">
                            <select
                                name="categoria"
                                value={storeData.categoria}
                                onChange={handleInputChange}
                                className="edit-store-kg-select"
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="restaurante">Restaurante</option>
                                <option value="mirador">Mirador</option>
                                <option value="cocteleria">Coctelería</option>
                                <option value="manualidades">Manualidades</option>
                            </select>
                        </div>
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Ubicación Google Maps</label>
                        <div 
                            className="edit-store-kg-maps-button"
                            onClick={() => {
                                // Aquí irá la lógica para abrir el selector de ubicación
                                console.log('Abrir selector de ubicación');
                            }}
                        >
                            {storeData.ubicacion ? (
                                <img 
                                    src={storeData.ubicacion} 
                                    alt="Ubicación seleccionada" 
                                    className="edit-store-kg-maps-preview"
                                />
                            ) : (
                                <div className="edit-store-kg-maps-placeholder">
                                    <img 
                                        src="/image/MapIcon.png" 
                                        alt="Seleccionar ubicación" 
                                        className="edit-store-kg-maps-icon"
                                    />
                                    <span>Seleccionar ubicación</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="edit-store-kg-right">
                    <div className="edit-store-kg-upload-section">
                        <div className="edit-store-kg-upload-container">
                            <h3 className="edit-store-kg-upload-title">Foto de local</h3>
                            <label className="edit-store-kg-upload-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload('foto', e)}
                                    style={{ display: 'none' }}
                                />
                                {storeData.foto ? (
                                    <img 
                                        src={storeData.foto} 
                                        alt="Vista previa" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                ) : (
                                    <img src={UploadIcon} alt="Subir foto" className="edit-store-kg-upload-icon" />
                                )}
                            </label>
                        </div>

                        <div className="edit-store-kg-upload-container">
                            <h3 className="edit-store-kg-upload-title">Menú</h3>
                            <label className="edit-store-kg-upload-box">
                                <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    onChange={(e) => handleFileUpload('menu', e)}
                                    style={{ display: 'none' }}
                                />
                                {storeData.menu ? (
                                    <img 
                                        src={storeData.menu} 
                                        alt="Vista previa menú" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                ) : (
                                    <img src={UploadIcon} alt="Subir menú" className="edit-store-kg-upload-icon" />
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="edit-store-kg-social">
                        <div className="edit-store-kg-social-input-group">
                            <img src={WhatsappIcon} alt="WhatsApp" className="edit-store-kg-social-icon" />
                            <input
                                type="text"
                                name="whatsappUrl"
                                value={storeData.whatsappUrl}
                                onChange={handleInputChange}
                                placeholder="URL de WhatsApp"
                                className="edit-store-kg-social-input"
                            />
                        </div>

                        <div className="edit-store-kg-social-input-group">
                            <img src={TikTokIcon} alt="TikTok" className="edit-store-kg-social-icon" />
                            <input
                                type="text"
                                name="tiktokUrl"
                                value={storeData.tiktokUrl}
                                onChange={handleInputChange}
                                placeholder="URL de TikTok"
                                className="edit-store-kg-social-input"
                            />
                        </div>

                        <div className="edit-store-kg-social-input-group">
                            <img src={InstagramIcon} alt="Instagram" className="edit-store-kg-social-icon" />
                            <input
                                type="text"
                                name="instagramUrl"
                                value={storeData.instagramUrl}
                                onChange={handleInputChange}
                                placeholder="URL de Instagram"
                                className="edit-store-kg-social-input"
                            />
                        </div>

                        <div className="edit-store-kg-social-input-group">
                            <img src={FacebookIcon} alt="Facebook" className="edit-store-kg-social-icon" />
                            <input
                                type="text"
                                name="facebookUrl"
                                value={storeData.facebookUrl}
                                onChange={handleInputChange}
                                placeholder="URL de Facebook"
                                className="edit-store-kg-social-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStoreKG;