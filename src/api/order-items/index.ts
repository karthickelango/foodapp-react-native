import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"
import { InsertTables } from "@/src/types";

// create orders api
export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: InsertTables<'order_items'>) {
            const { error, data: newProduct } = await supabase.from('order_items')
            .insert({...data})
            .select().single()
            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['order_items']);
        }
    })
}