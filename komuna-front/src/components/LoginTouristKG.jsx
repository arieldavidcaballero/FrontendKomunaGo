import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendedorService } from '../services/vendedorService';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import BackButton from '../image/Back.png';
import '../styles/LoginTouristKG.css'; 

export default function LoginTouristKG() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('todo');
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const cargarTiendas = async () => {
        try {
            const vendedores = await vendedorService.obtenerTodos();
            setStores(vendedores.map(vendedor => ({
                id: vendedor.id,
                name: vendedor.nombre_tienda,
                categoriaLocal: vendedor.tipo_negocio,
                image: vendedor.fotos || null,
                menu: vendedor.menu,
                cupo_personas: vendedor.cupo_personas,
                horario: vendedor.horario,
                ubicacion: vendedor.ubicacion,
                redes_sociales: vendedor.redes_sociales
            })));
        } catch (err) {
            setError('Error al cargar las tiendas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarTiendas();

        // Escuchar el evento de eliminación de tienda
        const handleStoreDeleted = (event) => {
            const deletedStoreId = event.detail.storeId;
            setStores(prevStores => prevStores.filter(store => store.id !== deletedStoreId));
        };

        window.addEventListener('storeDeleted', handleStoreDeleted);

        // Actualizar cada 30 segundos
        const interval = setInterval(cargarTiendas, 30000);

        // Limpiar los event listeners cuando el componente se desmonte
        return () => {
            clearInterval(interval);
            window.removeEventListener('storeDeleted', handleStoreDeleted);
        };
    }, []);

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleNavigate = (store) => {
        navigate('/profile-store', { 
            state: { 
                selectedStore: store
            } 
        });
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

    if (loading) {
        return (
            <div className='login-tourist-kg-container'>
                <div className="login-tourist-kg-loading">
                    <h2>Cargando tiendas...</h2>
                </div>
            </div>
        );
    }

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

            {error && <div className="login-tourist-kg-error">{error}</div>}

            <div className="login-tourist-kg-stores">
                {filteredStores.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {filteredStores.map((store) => (
                            <div key={store.id} className='tienda-card'>
                                <div className='container-foto-local'>
                                    {store.image ? (
                                        <img src={store.image} alt={`Foto ${store.name}`}/>
                                    ) : (
                                        <div className="no-image">Sin imagen</div>
                                    )}
                                </div>
                                <div className='container-nombre-local'>
                                    <h3>{store.name}</h3>
                                </div>
                                <div className='container-informacion-local'>
                                    <button onClick={() => handleNavigate(store)}>Ver más</button>
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
