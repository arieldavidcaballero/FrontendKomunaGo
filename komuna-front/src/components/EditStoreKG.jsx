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
import Swal from 'sweetalert2';

const ensureArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    }
    if (typeof data === 'string') {
        try {
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData)) {
                return parsedData;
            }
            return parsedData ? [parsedData] : [];
        } catch (e) {
            return [data];
        }
    }
    return data ? [data] : [];
};

const EditStoreKG = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState({
        nombreLocal: '',
        cupoPersonas: '',
        horarioLaboral: '',
        categoria: '',
        fotos: '',
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
                    fotos: vendedor.fotos || '',
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
        if (!file) return;

        // Validar tipo de archivo
        if (type === 'menu' && file.type !== 'application/pdf') {
            setError('El menú debe ser un archivo PDF');
            return;
        }

        if (type === 'foto' && !file.type.startsWith('image/')) {
            setError('Por favor seleccione un archivo de imagen válido');
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64 = event.target.result;
                console.log('Generated Base64 string:', base64);
                
                if (type === 'foto') {
                    setStoreData(prevState => ({
                        ...prevState,
                        fotos: base64
                    }));
                } else {
                    setStoreData(prevState => ({
                        ...prevState,
                        [type]: base64
                    }));
                }
            };
            reader.onerror = () => {
                setError('Error al procesar el archivo');
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Error al procesar el archivo:', err);
            setError('Error al procesar el archivo');
        }
    };

    // Función para previsualizar imágenes
    const renderImagePreview = (imageData) => {
        if (!imageData) return null;
        return (
            <img 
                src={imageData} 
                alt="Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
        );
    };

    // Función para previsualizar PDF
    const renderPDFPreview = (pdfData) => {
        if (!pdfData) return null;
        return (
            <embed
                src={pdfData}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ borderRadius: '8px' }}
            />
        );
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
            const response = await vendedorService.actualizarPerfil(vendedorId, {
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

            console.log('Sending storeData to backend:', storeData);

            // Actualizar el estado con los datos devueltos por el servidor
            setStoreData(prevState => ({
                ...prevState,
                menu: response.menu,
                fotos: response.fotos
            }));

            Swal.fire('Perfil actualizado exitosamente');
        } catch (error) {
            setError('Error al actualizar el perfil. Por favor intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteStore = async () => {
        const vendedorId = localStorage.getItem('vendedorId');
        if (!vendedorId) {
            setError('Error de autenticación');
            return;
        }

        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirmDelete.isConfirmed) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await vendedorService.eliminarTienda(vendedorId);
            
            // Emitir un evento personalizado para notificar que se eliminó una tienda
            const event = new CustomEvent('storeDeleted', { detail: { storeId: vendedorId } });
            window.dispatchEvent(event);
            
            localStorage.removeItem('vendedorId');
            Swal.fire('Tienda eliminada exitosamente');
            navigate('/');
        } catch (error) {
            setError('Error al eliminar la tienda. Por favor intente nuevamente.');
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
                    <button 
                        className="edit-store-kg-delete"
                        onClick={handleDeleteStore}
                        disabled={isLoading}
                    >
                        Eliminar Tienda
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
                                {storeData.fotos ? (
                                    <div className="edit-store-kg-photo-container">
                                        {renderImagePreview(storeData.fotos)}
                                    </div>
                                ) : (
                                    <img src={UploadIcon} alt="Subir foto" className="edit-store-kg-upload-icon" />
                                )}
                            </label>
                        </div>

                        <div className="edit-store-kg-upload-container">
                            <h3 className="edit-store-kg-upload-title">Menú (PDF)</h3>
                            <label className="edit-store-kg-upload-box">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => handleFileUpload('menu', e)}
                                    style={{ display: 'none' }}
                                    disabled={isLoading}
                                />
                                {storeData.menu ? (
                                    renderPDFPreview(storeData.menu)
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