import api from './api'

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (userData) => api.post('/auth/register', userData)
export const logout = () => api.post('/auth/logout')
export const resetPassword = (email) => api.post('/auth/reset-password', { email })