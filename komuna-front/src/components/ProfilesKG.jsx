import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import AtrasIcon from '../image/Atras.png';
import GoogleMapsIcon from '../image/GoogleMaps.png';
import WhatsappIcon from '../image/WhatsappIcon.png';
import TikTokIcon from '../image/TikTokIcon.png';
import InstagramIcon from '../image/InstagramIcon.png';
import FacebookIcon from '../image/FacebookIcon.png';
import '../styles/ProfilesKG.css';

export default function ProfilesKG() {
    const navigate = useNavigate();
    const location = useLocation();
    const store = location.state?.selectedStore;
    const [modalContent, setModalContent] = useState(null);
    const [isMenu, setIsMenu] = useState(false);

    if (!store) {
        navigate('/turist-store');
        return null;
    }

    const handleImageClick = (image, isMenuImage = false) => {
        setModalContent(image);
        setIsMenu(isMenuImage);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsMenu(false);
    };

    return (
        <div className="profiles-kg-container">
            <div className="profiles-kg-header">
                <img className="profiles-kg-logo" src={LogoKomunaGO} alt="Logo KomunaGO" />
                <button 
                    className="profiles-kg-back-button"
                    onClick={() => navigate('/turist-store')}
                >
                    <img className="profiles-kg-back-icon" src={AtrasIcon} alt="Volver atrás" />
                </button>
            </div>
            <div className="profiles-kg-main">
                <div className="profiles-kg-chart">
                    <div className="profiles-kg-views">
                        <h2>{store.name}</h2>
                        <svg className="profiles-kg-path" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                                d="M0,60 L1200,60" 
                                stroke="#FF0000" 
                                strokeWidth="6" 
                                strokeDasharray="10,15" 
                                fill="none" 
                            />
                        </svg>
                    </div>
                    <div className="profiles-kg-info">
                        <div className="profiles-kg-info-title">
                            <h2>Perfil de Local</h2>
                        </div>
                        <div className="profiles-kg-info-menu">
                            <h2>Menú</h2>
                        </div>
                        <div className="profiles-kg-info-location">
                            <h2>Ubicación</h2>
                        </div>
                    </div>
                    <div className="profiles-kg-images">
                        <div className="profiles-kg-image-container" onClick={() => store.image && handleImageClick(store.image)}>
                            {store.image ? (
                                <img className="profiles-kg-photo" src={store.image} alt="Foto del Local" />
                            ) : (
                                <div className="profiles-kg-no-photo">Sin foto</div>
                            )}
                        </div>
                        <div className="profiles-kg-image-container" onClick={() => store.menu && handleImageClick(store.menu, true)}>
                            {store.menu ? (
                                <img className="profiles-kg-menu" src={store.menu} alt="Menu del Local" />
                            ) : (
                                <div className="profiles-kg-no-menu">Sin menú</div>
                            )}
                        </div>
                        <div className="profiles-kg-image-container">
                            {store.ubicacion ? (
                                <a 
                                    href={store.ubicacion}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <img className="profiles-kg-maps" src={GoogleMapsIcon} alt="Ver ubicación en Google Maps" />
                                </a>
                            ) : (
                                <div className="profiles-kg-no-location">Sin ubicación</div>
                            )}
                        </div>
                    </div>
                    <div className="profiles-kg-divider">
                        <svg className="profiles-kg-path-two" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                                d="M0,60 L1200,60" 
                                stroke="#FF0000" 
                                strokeWidth="6" 
                                strokeDasharray="10,15" 
                                fill="none" 
                            />
                        </svg>
                    </div>
                    <div className="profiles-kg-details">
                        <div className="profiles-kg-labels">
                            <h2>Cupo de Personas</h2>
                            <h2>Horario Laboral</h2>
                            <h2>Categoría</h2>
                        </div>
                        <div className="profiles-kg-values">
                            <h2>{store.cupo_personas || 'No especificado'}</h2>
                            <h2>{store.horario || 'No especificado'}</h2>
                            <h2>{store.categoriaLocal}</h2>
                        </div>
                        <div className="profiles-kg-social">
                            {store.redes_sociales?.whatsapp && (
                                <a 
                                    href={store.redes_sociales.whatsapp}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <img src={WhatsappIcon} alt="Contactar por WhatsApp" />
                                </a>
                            )}
                            {store.redes_sociales?.tiktok && (
                                <a 
                                    href={store.redes_sociales.tiktok}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <img src={TikTokIcon} alt="Seguir en TikTok" />
                                </a>
                            )}
                            {store.redes_sociales?.instagram && (
                                <a 
                                    href={store.redes_sociales.instagram}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <img src={InstagramIcon} alt="Seguir en Instagram" />
                                </a>
                            )}
                            {store.redes_sociales?.facebook && (
                                <a 
                                    href={store.redes_sociales.facebook}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <img src={FacebookIcon} alt="Compartir en Facebook" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para mostrar imágenes */}
            {modalContent && (
                <div className="profiles-kg-modal active" onClick={closeModal}>
                    <div className="profiles-kg-modal-content" onClick={e => e.stopPropagation()}>
                        <img 
                            src={modalContent} 
                            alt="Contenido ampliado" 
                            className={isMenu ? "profiles-kg-modal-menu" : "profiles-kg-modal-image"}
                        />
                        <button className="profiles-kg-modal-close" onClick={closeModal}>
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
