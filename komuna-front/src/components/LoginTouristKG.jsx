import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importaciones de imágenes con nombres de archivo seguros
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import BackButton from '../image/Back.png';
import B1Image from '../image/B1.jpg';
import B2Image from '../image/B2.jpg';
import B3Image from '../image/B3.jpg';
import B4Image from '../image/B4.jpg';
import B5Image from '../image/B5.jpg';
import B6Image from '../image/B6.jpg';
import '../styles/LoginTouristKG.css'; 

export default function LoginTouristKG() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('todo');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className='login-tourist-kg-container'>
            <div className="login-tourist-kg-header">
                <img src={LogoKomunaGO} alt="Logo KomunaGO" />
                <button 
                    className="login-tourist-kg-back-button" 
                    onClick={() => handleNavigate('/start')}
                >
                    <img className="login-tourist-kg-back-icon" src={BackButton} alt="Volver" />
                </button>
            </div>

            <div className="login-tourist-kg-divider"> 
                <svg className="login-tourist-kg-path" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path 
                        d="M0,60 L1200,60" 
                        stroke="#FF0000" 
                        strokeWidth="6" 
                        strokeDasharray="10,15" 
                        fill="none" 
                    />
                </svg>
            </div>

            <div className="login-tourist-kg-stores">
                {[B1Image, B2Image, B3Image, B4Image, B5Image, B6Image].map((image, index) => (
                    <button 
                        key={index}
                        className="login-tourist-kg-store-button"
                        onClick={() => handleNavigate('/profiles')}
                    >
                        <img className="login-tourist-kg-store-image" src={image} alt={`Tienda ${index + 1}`} />
                    </button>
                ))}
            </div>

            <div className="login-tourist-kg-filters">
                {[
                    { id: 'restaurante', label: 'RESTAURANTE' },
                    { id: 'mirador', label: 'MIRADOR' },
                    { id: 'cocteleria', label: 'COCTELERIA' },
                    { id: 'manualidades', label: 'MANUALIDADES' },
                    { id: 'todo', label: 'TODO' }
                ].map(({ id, label }) => (
                    <button 
                        key={id}
                        className={`login-tourist-kg-filter-button ${id} ${activeFilter === id ? 'active' : ''}`}
                        onClick={() => handleFilterClick(id)}
                    >
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
