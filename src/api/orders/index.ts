import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/provider/AuthProvider";
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"
import { InsertTables, UpdateTables } from "@/src/types";
// get all order api
export const useAdminOrderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']
    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in('status', statuses).order('created_at', {ascending: false})
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

// get order by user id api
export const useMyOrderList = () => {
    const {session} = useAuth()
    const id = session?.user.id
    return useQuery({
        queryKey: ['orders', {userId: id}],
        queryFn: async () => {
            if(!id) return null
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', id).order('created_at', {ascending: false})
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}


// get order by order id api
export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders')
            .select('*, order_items(*, product(*))').eq('id', id).single()
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


// update product by id api
export const useUpdateOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn({id, updatedFields}: {id: Number; updatedFields: UpdateTables<'orders'>}) {
            const { error, data: updatedOrder } = await supabase.from('orders')
            .update(updatedFields)
            .eq('id', id)
            .select().single()
            if (error) {
                throw new Error(error.message)
            }
            return updatedOrder
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries(['orders']);
            await queryClient.invalidateQueries(['orders', data.id]);
        }
    })
}