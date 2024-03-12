import { supabase } from "@/src/lib/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"


export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const orders = supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    queryClient.invalidateQueries(['orders'])
                }
            )
            .subscribe()
        return () => {
            orders.unsubscribe()
        }
    }, [])
}