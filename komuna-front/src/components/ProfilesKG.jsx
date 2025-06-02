import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import AtrasIcon from '../image/Atras.png';
import Foto1 from '../image/Foto1.jpeg';
import Menu from '../image/MenuT6.jpeg';
import GoogleMapsIcon from '../image/GoogleMaps.png';
import WhatsappIcon from '../image/WhatsappIcon.png';
import TikTokIcon from '../image/TikTokIcon.png';
import InstagramIcon from '../image/InstagramIcon.png';
import FacebookIcon from '../image/FacebookIcon.png';
import '../styles/ProfilesKG.css';

export default function ProfilesKG() {
    const navigate = useNavigate();
    const [modalContent, setModalContent] = useState(null);
    const [isMenu, setIsMenu] = useState(false);

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
                        <h2>13 VIEW</h2>
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
                        <div className="profiles-kg-image-container" onClick={() => handleImageClick(Foto1)}>
                            <img className="profiles-kg-photo" src={Foto1} alt="Foto del Local" />
                        </div>
                        <div className="profiles-kg-image-container" onClick={() => handleImageClick(Menu, true)}>
                            <img className="profiles-kg-menu" src={Menu} alt="Menu del Local" />
                        </div>
                        <div className="profiles-kg-image-container">
                            <a 
                                href="https://www.google.com/maps/place/Comuna+13,+Medell%C3%ADn,+Antioquia" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img className="profiles-kg-maps" src={GoogleMapsIcon} alt="Ver ubicación en Google Maps" />
                            </a>
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
                            <h2>20</h2>
                            <h2>8 AM - 11 PM</h2>
                            <h2>Restaurante</h2>
                        </div>
                        <div className="profiles-kg-social">
                            <a 
                                href="https://walink.co/0f2978" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src={WhatsappIcon} alt="Contactar por WhatsApp" />
                            </a>
                            <a 
                                href="https://www.tiktok.com/@arielc.93" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src={TikTokIcon} alt="Seguir en TikTok" />
                            </a>
                            <a 
                                href="https://www.instagram.com/arielc.93" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src={InstagramIcon} alt="Seguir en Instagram" />
                            </a>
                            <a 
                                href="https://www.facebook.com/share" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img src={FacebookIcon} alt="Compartir en Facebook" />
                            </a>
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
