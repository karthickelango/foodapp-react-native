import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"
import { InsertTables } from "@/src/types";
// get all order api
export const useAdminOrderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']
    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in('status', statuses)
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

// get order by id api
export const useMyOrderList = () => {
    const {session} = useAuth()
    const id = session?.user.id
    return useQuery({
        queryKey: ['orders', {userId: id}],
        queryFn: async () => {
            if(!id) return null
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', id)
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}


// get order by id api
export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

// create orders api
export const useInsertOrder = () => {
    const queryClient = useQueryClient()
    const {session} = useAuth()
    const userId = session?.user.id
    return useMutation({
        async mutationFn(data: InsertTables<'orders'>) {
            const { error, data: newProduct } = await supabase.from('orders').insert({...data, user_id: userId}).select().single()
            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['orders']);
        }
    })
}