import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    loading: boolean,
    profile: any,
    isAdmin: boolean,
    fetchSession: () => void
}
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
    fetchSession: () => { }
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState(null)
    const [loading, setIsloading] = useState(true)
    // fetch auth
    const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        if (session) {
            try {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            } catch (error) {
                console.log(error)
            }
        }
        setIsloading(false)
    } 

    useEffect(() => {
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setProfile(null);
        })
    }, [])
    console.log(session)
    console.log(profile)

    return (
        <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN', fetchSession }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)