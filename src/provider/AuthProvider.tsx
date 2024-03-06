import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    loading: boolean,
    profile: any, 
    isAdmin: boolean
}
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState(null)
    const [loading, setIsloading] = useState(true)

    // fetch auth
    const fetchSession = async () => {
        const response = await supabase.auth.getSession()
        setSession(response.data.session)
        if (response.data.session) {
            // fetch profile
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', response.data.session.user.id)
                .single();
            setProfile(data || null);
        }
        setIsloading(false)
    }
    useEffect(() => {
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)