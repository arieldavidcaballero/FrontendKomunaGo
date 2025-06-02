import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendedorService } from '../services/vendedorService';
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
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState({
        nombreLocal: '',
        cupoPersonas: '',
        horarioLaboral: '',
        categoria: '',
        fotos: [],
        menu: null,
        whatsappUrl: '',
        tiktokUrl: '',
        instagramUrl: '',
        facebookUrl: '',
        ubicacion: null
    });

    useEffect(() => {
        const vendedorId = localStorage.getItem('vendedorId');
        if (!vendedorId) {
            navigate('/');
            return;
        }

        const cargarDatosVendedor = async () => {
            try {
                const vendedor = await vendedorService.obtenerVendedor(vendedorId);
                setStoreData({
                    nombreLocal: vendedor.nombre_tienda,
                    cupoPersonas: vendedor.cupo_personas || '',
                    horarioLaboral: vendedor.horario || '',
                    categoria: vendedor.tipo_negocio,
                    fotos: vendedor.fotos || [],
                    menu: vendedor.menu,
                    whatsappUrl: vendedor.redes_sociales?.whatsapp || '',
                    tiktokUrl: vendedor.redes_sociales?.tiktok || '',
                    instagramUrl: vendedor.redes_sociales?.instagram || '',
                    facebookUrl: vendedor.redes_sociales?.facebook || '',
                    ubicacion: vendedor.ubicacion
                });
            } catch (err) {
                setError('Error al cargar los datos del vendedor');
            }
        };

        cargarDatosVendedor();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const handleFileUpload = async (type, e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                if (type === 'foto') {
                    setStoreData(prevState => ({
                        ...prevState,
                        fotos: [...prevState.fotos, base64]
                    }));
                } else {
                    setStoreData(prevState => ({
                        ...prevState,
                        [type]: base64
                    }));
                }
            } catch (err) {
                setError('Error al procesar la imagen');
            }
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const vendedorId = localStorage.getItem('vendedorId');
        if (!vendedorId) {
            setError('Error de autenticación');
            setIsLoading(false);
            return;
        }

        try {
            await vendedorService.actualizarPerfil(vendedorId, {
                cupo_personas: parseInt(storeData.cupoPersonas),
                horario: storeData.horarioLaboral,
                ubicacion: storeData.ubicacion,
                menu: storeData.menu,
                fotos: storeData.fotos,
                redes_sociales: {
                    whatsapp: storeData.whatsappUrl,
                    tiktok: storeData.tiktokUrl,
                    instagram: storeData.instagramUrl,
                    facebook: storeData.facebookUrl
                }
            });

            alert('Perfil actualizado exitosamente');
        } catch (error) {
            setError('Error al actualizar el perfil. Por favor intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-store-kg-container">
            <div className="edit-store-kg-header">
                <img src={LogoKomunaGO} alt="Logo KomunaGO" className="edit-store-kg-logo" />
                <div className="edit-store-kg-buttons">
                    <button 
                        className="edit-store-kg-back"
                        onClick={() => navigate('/')}
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

            {error && <div className="edit-store-kg-error">{error}</div>}

            <div className="edit-store-kg-content">
                <div className="edit-store-kg-left">
                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Nombre del Local</label>
                        <input
                            type="text"
                            name="nombreLocal"
                            value={storeData.nombreLocal}
                            className="edit-store-kg-input"
                            disabled
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Categoría</label>
                        <input
                            type="text"
                            name="categoria"
                            value={storeData.categoria}
                            className="edit-store-kg-input"
                            disabled
                        />
                    </div>

                    <div className="edit-store-kg-input-group">
                        <label className="edit-store-kg-label">Ubicación Google Maps</label>
                        <input
                            type="text"
                            name="ubicacion"
                            value={storeData.ubicacion || ''}
                            onChange={handleInputChange}
                            className="edit-store-kg-input"
                            placeholder="URL de Google Maps"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="edit-store-kg-right">
                    <div className="edit-store-kg-upload-section">
                        <div className="edit-store-kg-upload-container">
                            <h3 className="edit-store-kg-upload-title">Fotos del local</h3>
                            <label className="edit-store-kg-upload-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload('foto', e)}
                                    style={{ display: 'none' }}
                                    disabled={isLoading}
                                />
                                <img src={UploadIcon} alt="Subir foto" className="edit-store-kg-upload-icon" />
                            </label>
                            <div className="edit-store-kg-photos-preview">
                                {storeData.fotos.map((foto, index) => (
                                    <img 
                                        key={index}
                                        src={foto} 
                                        alt={`Foto ${index + 1}`}
                                        className="edit-store-kg-photo-preview"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="edit-store-kg-upload-container">
                            <h3 className="edit-store-kg-upload-title">Menú</h3>
                            <label className="edit-store-kg-upload-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload('menu', e)}
                                    style={{ display: 'none' }}
                                    disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStoreKG;