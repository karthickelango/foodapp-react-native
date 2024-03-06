import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    loading: boolean
}
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setIsloading] = useState(true)

    // fetch auth
    const fetchSession = async () => {
        const response = await supabase.auth.getSession()
        setSession(response.data.session)
        setIsloading(false)
    }

    useEffect(() => {
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <AuthContext.Provider value={{session, loading}}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)