import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import AtrasIcon from '../image/Atras.png';
import Foto1 from '../image/Foto1.jpeg';
import MenuT6 from '../image/MenuT6.jpeg';
import GoogleMapsIcon from '../image/GoogleMaps.png';
import WhatsappIcon from '../image/WhatsappIcon.png';
import TikTokIcon from '../image/TikTokIcon.png';
import InstagramIcon from '../image/InstagramIcon.png';
import FacebookIcon from '../image/FacebookIcon.png';
import '../styles/ProfilesKG.css';

export default function ProfilesKG() {
    const navigate = useNavigate();

    return (
        <div className="containerProfiles">
            <div className="containerOne">
                <img className="logoKomuna" src={LogoKomunaGO} alt="Logo KomunaGO" />
                <button 
                    className="back-button"
                    onClick={() => navigate('/login-tourist')}
                >
                    <img className="buttonBack" src={AtrasIcon} alt="Volver atrás" />
                </button>
            </div>
            <div className="containerTwo">
                <div className="ContainerChart">
                    <div className="containerTree">
                        <h2>13 VIEW</h2>
                        <svg className="pathLines" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                                d="M0,60 L1200,60" 
                                stroke="#FF0000" 
                                strokeWidth="6" 
                                strokeDasharray="10,15" 
                                fill="none" 
                            />
                        </svg>
                    </div>
                    <div className="containerFour">
                        <div className="containerStatementOne">
                            <h2>Perfil de Local</h2>
                        </div>
                        <div className="containerStatementTwo">
                            <h2>Menú</h2>
                        </div>
                        <div className="containerStatementTree">
                            <h2>Ubicación</h2>
                        </div>
                    </div>
                    <div className="containerFive">
                        <div className="containerimgUne">
                            <img className="FotoT1" src={Foto1} alt="Foto del Local" />
                        </div>
                        <div className="containerimgTwo">
                            <a 
                                href="/Dosc/MenúT6.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img className="MenuT1" src={MenuT6} alt="Menu del Local" />
                            </a>
                        </div>
                        <div className="containerimgTree">
                            <a 
                                href="https://www.google.com/maps/place/Comuna+13,+Medell%C3%ADn,+Antioquia" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img className="GoogleMaps" src={GoogleMapsIcon} alt="Ver ubicación en Google Maps" />
                            </a>
                        </div>
                    </div>
                    <div className="containerSix">
                        <svg className="pathLinesTwo" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path 
                                d="M0,60 L1200,60" 
                                stroke="#FF0000" 
                                strokeWidth="6" 
                                strokeDasharray="10,15" 
                                fill="none" 
                            />
                        </svg>
                    </div>
                    <div className="containerSeven">
                        <div className="containerTex">
                            <h2>Cupo de Personas</h2>
                            <h2>Horario Laboral</h2>
                        </div>
                        <div className="containerData">
                            <h2>10</h2>
                            <h2>8 AM - 10 PM</h2>
                        </div>
                        <div className="containerSocialNetworks">
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
        </div>
    );
}
