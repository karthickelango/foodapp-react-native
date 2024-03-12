import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"
import { InsertTables } from "@/src/types";

// create orders api
export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>) {
            const { error, data: newProduct } = await supabase.from('order_items')
            .insert(items)
            .select()
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