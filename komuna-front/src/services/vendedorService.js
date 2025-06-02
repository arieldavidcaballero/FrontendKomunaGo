import api from '../config/api';

export const vendedorService = {
    // Registro de vendedor
    registrar: async (datos) => {
        try {
            const response = await api.post('/vendedores/registro', datos);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al registrar el vendedor' };
        }
    },

    // Login de vendedor
    login: async (credenciales) => {
        try {
            const response = await api.post('/vendedores/login', credenciales);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Validar código de acceso
    validarCodigo: async (codigo) => {
        try {
            const response = await api.post('/vendedores/validar-codigo', { codigo });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al validar el código' };
        }
    },

    // Recuperar código
    recuperarCodigo: async (email) => {
        try {
            const response = await api.post('/vendedores/recuperar-codigo', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al recuperar el código' };
        }
    },

    // Actualizar perfil
    actualizarPerfil: async (id, datos) => {
        try {
            const response = await api.put(`/vendedores/${id}`, datos);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al actualizar el perfil' };
        }
    },

    // Obtener todos los vendedores
    obtenerTodos: async () => {
        try {
            const response = await api.get('/vendedores');
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al obtener los vendedores' };
        }
    },

    // Obtener un vendedor específico
    obtenerVendedor: async (id) => {
        try {
            const response = await api.get(`/vendedores/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al obtener el vendedor' };
        }
    },

    // Cerrar sesión
    logout: () => {
        localStorage.removeItem('token');
    }
}; 