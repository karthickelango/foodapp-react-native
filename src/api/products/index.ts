import { supabase } from "@/src/lib/supabase"
import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query"


// get all product api
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


// get product by id api
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

// create product api
export const useInsertProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newProduct } = await supabase.from('product').insert({
                name: data.name,
                image: data.image,
                price: data.price
            }).single()
            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['product']);
        }
    })
}

// update product by id api
export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedProduct } = await supabase.from('product').update({
                name: data.name,
                image: data.image,
                price: data.price
            }).eq('id', data.id).select().single()
            if (error) {
                throw new Error(error.message)
            }
            return updatedProduct
        },
        async onSuccess(_, data) {
            await queryClient.invalidateQueries(['product']);
            await queryClient.invalidateQueries(['product', data.id]);
        }
    })
}

// delete product by id
export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(id: number) {
            const { data: deleteProduct, error } = await supabase.from('product').delete().eq('id', id)
            if (error) {
                throw new Error(error.message)
            }
            return deleteProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['product']);
        }
    })

}