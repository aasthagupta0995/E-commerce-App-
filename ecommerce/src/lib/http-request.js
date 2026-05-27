import axios from 'axios'

const parseSession = (value) => {
    if (!value) {
        return null
    }

    try {
        return JSON.parse(value)
    } catch {
        return null
    }
}

const getSessionToken = () => {
    const userSession = parseSession(localStorage.getItem('user_session'))
    if (userSession?.token) {
        return userSession.token
    }

    const adminSession = parseSession(localStorage.getItem('ecom_admin_session'))
    if (adminSession?.token) {
        return adminSession.token
    }

    return null
}

const apiClient = axios.create({
    timeout: 10000,
})

apiClient.interceptors.request.use(
    (config) => {
        const token = getSessionToken()

        if (token && !config.headers?.Authorization) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }
        }

        return config
    },
    (error) => Promise.reject(error),
)

export const httpRequest = {
    get: async (url, config = {}) => {
        const response = await apiClient.get(url, config)
        return response.data
    },
    post: async (url, data, config = {}) => {
        const response = await apiClient.post(url, data, config)
        return response.data
    },
    put: async (url, data, config = {}) => {
        const response = await apiClient.put(url, data, config)
        return response.data
    },
    delete: async (url, config = {}) => {
        const response = await apiClient.delete(url, config)
        return response.data
    },
}

