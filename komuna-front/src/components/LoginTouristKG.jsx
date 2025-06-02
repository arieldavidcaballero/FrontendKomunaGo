import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import BackButton from '../image/Back.png';
import Foto1 from '../image/Foto1.jpeg';
import Foto2 from '../image/Foto2.jpeg';
import Foto3 from '../image/Foto3.jpeg';
import Foto4 from '../image/Foto4.jpeg';
import Foto5 from '../image/Foto5.jpeg';
import Foto6 from '../image/Foto6.jpeg';
import mandala from '../image/mandala.png';
import '../styles/LoginTouristKG.css'; 

export default function LoginTouristKG() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('todo');

    const stores = [
        { image: Foto1, name: "Tienda 1", categoriaLocal: 'mirador' },
        { image: Foto2, name: "Tienda 2", categoriaLocal: 'cocteleria' },
        { image: Foto3, name: "Tienda 3", categoriaLocal: 'manualidades' },
        { image: Foto4, name: "Tienda 4", categoriaLocal: 'manualidades' },
        { image: Foto5, name: "Tienda 5", categoriaLocal: 'manualidades' },
        { image: Foto6, name: "Tienda 6", categoriaLocal: 'restaurante' }
    ];

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleNavigate = (image) => {
        navigate('/profile-store', { state: { selectedImage: image } });
    };

    const filteredStores = activeFilter === 'todo' 
        ? stores 
        : stores.filter(store => store.categoriaLocal === activeFilter);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='login-tourist-kg-container'>
            <div className="login-tourist-kg-header">
                <img src={LogoKomunaGO} alt="Logo KomunaGO" />
                <button 
                    className="login-tourist-kg-back-button" 
                    onClick={() => navigate('/')}
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
                {filteredStores.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {filteredStores.map((store, index) => (
                            <div key={index} className='tienda-card'>
                                <div className='container-foto-local'>
                                    <img src={store.image} alt={`Foto ${store.name}`}/>
                                </div>
                                <div className='container-nombre-local'>
                                    <h3>{store.name}</h3>
                                </div>
                                <div className='container-informacion-local'>
                                    <button onClick={() => handleNavigate(store.image)}>Ver más</button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="no-stores-message">
                        <h2>No hay tiendas disponibles en esta categoría</h2>
                    </div>
                )}
            </div>

            <div className="login-tourist-kg-filters">
                <button 
                    className={`btnFilter restaurante ${activeFilter === 'restaurante' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('restaurante')}
                >
                    <span>RESTAURANTE</span>
                </button>
                <button 
                    className={`btnFilter mirador ${activeFilter === 'mirador' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('mirador')}
                >
                    <span>MIRADOR</span>
                </button>
                <button 
                    className={`btnFilter cocteleria ${activeFilter === 'cocteleria' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('cocteleria')}
                >
                    <span>COCTELERIA</span>
                </button>
                <button 
                    className={`btnFilter manualidades ${activeFilter === 'manualidades' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('manualidades')}
                >
                    <span>MANUALIDADES</span>
                </button>
                <button 
                    className={`btnFilter todo ${activeFilter === 'todo' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('todo')}
                >
                    <span>TODO</span>
                </button>
            </div>
        </div>
    );
}
