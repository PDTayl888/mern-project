import { createContext, useState, useEffect } from 'react';
import { fetch } from '../utils/apiClient';

export const AuthContext = createContext();

//export AuthProvider = ({children})

useEffect(() => {
    const init = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = await fetch('/api/users/profile')
            }
        }
    }
})