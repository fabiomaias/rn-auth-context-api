import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator} from 'react-native';

import * as auth from '../services/auth';
import api from '../services/api';

// import { Container } from './styles';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({});

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');
            api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

            if(storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
            }
        }

       loadStorageData();
    },[])

    async function signIn(){
        setLoading(true);
        auth.signIn().then((response) => {
            setUser(response.user);
            AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
            AsyncStorage.setItem('@RNAuth:token', response.token);
            api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
            setLoading(false);
        });
        
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }

    if(loading){
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }

    return (
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
        { children }
    </AuthContext.Provider>
    )
}

export default AuthContext;