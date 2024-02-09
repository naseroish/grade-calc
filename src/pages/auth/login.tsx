import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../HomePage';
import { useAuth } from '../../services/authService';
import { supabase } from '../../services/supabaseConfig';

export default function Login() {
    const session = useAuth();

    if (!session) {
        return(
        <div  className="mx-auto max-w-md py-16 sm:py-16 lg:py-16">
            <Auth supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                          colors: {
                            brand: '#a991f7',
                            brandAccent: '#37cdbe',
                            inputText: '',
                            defaultButtonBackground: '',
                          },
                          space: {
                            inputPadding: '10px 15px',
                          },
                          
                        },
                      },
                    
                }} />
        </div>
        );
         
    } else {
        return (
            <Routes>
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<HomePage />} />
            </Routes>
        );
    }
}
