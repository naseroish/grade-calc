import { useState, useEffect } from 'react';
import { supabase } from './supabaseConfig';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

export function useAuth() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: sessionData, error } = await supabase.auth.getSession();
                if (sessionData) {
                    setSession(sessionData.session);
                } else {
                    setSession(null);
                    throw error;
                }
            } catch (error) {
                console.error('Error fetching session:', (error as Error).message);
            }
        };

        fetchSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(
            (event: AuthChangeEvent, session: Session | null) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                } else {
                    setSession(session);
                }
            }
        );

        return () => subscription.subscription.unsubscribe();
    }, []);

    return session;
}
