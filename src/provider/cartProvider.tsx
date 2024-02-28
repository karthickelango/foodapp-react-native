import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void
}

const CartContex = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {

    // item state
    const [items, setItems] = useState<CartItem[]>([])

    // add item to cart
    const addItem = (product: Product, size: CartItem['size']) => {
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items])
    }

    // update quantity 
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(items.map((item) => item.id === itemId ? {...item, quantity: item.quantity + 1} : item))
    }

    return (
        <CartContex.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContex.Provider>
    )
}

export default CartProvider

export const useCart = () => useContext(CartContex)