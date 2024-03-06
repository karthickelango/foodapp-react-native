import { supabase } from "@/src/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useProductList = () => {
    return useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const { data, error } = await supabase.from('product').select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('product').select('*').eq('id', id).single()
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}
