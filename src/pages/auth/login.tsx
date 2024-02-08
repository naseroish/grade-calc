import { useState, useEffect } from 'react'
import { Session, createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from '../HomePage' 

const supabaseUrl = '';
const supabaseAnonKey = '';

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Login() {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            navigate('/home');
        }
    }, [session, navigate]);

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />);
    } else {
        return (<Routes> <Route path='/home' element={HomePage()} /> </Routes>);
    }
}