import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from "../api/orders";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    checkout: () => void
}

const CartContex = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout: () => { }
})

const CartProvider = ({ children }: PropsWithChildren) => {

    const {mutate: insertOrder} = useInsertOrder()

    // item state
    const [items, setItems] = useState<CartItem[]>([])

    // add item to cart
    const addItem = (product: Product, size: CartItem['size']) => {
        // if item already in cart
        const existingItem = items.find(item => item.product === product && item.size === size)
        if (existingItem) {
            updateQuantity(existingItem.id, 1)
            return
        }
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
        setItems(items.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
    }
    // total amount 
    const total = items.reduce((sum, item) => sum += item.product.price * item.quantity, 0)

    // checkout 
    const checkout = () => {
        console.warn('yes')
    }
    return (
        <CartContex.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContex.Provider>
    )
}


export default CartProvider

export const useCart = () => useContext(CartContex)