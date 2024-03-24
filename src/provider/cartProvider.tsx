import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product, Tables } from "../types";
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
import { initialisePaymentSheet, openPaymentSheet } from "../lib/stripe";
import { useAuth } from "./AuthProvider";

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
    // item state
    const [items, setItems] = useState<CartItem[]>([])
    const { mutate: insertOrder } = useInsertOrder()
    const { mutate: insertOrderItems } = useInsertOrderItems()
    const { session } = useAuth()

    const router = useRouter()
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
            quantity: 1,
            customer_name: session?.user.user_metadata.full_name
        }
        setItems([newCartItem, ...items])
    }

    // update quantity 
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(items.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
    }
    // total amount 
    const total = items.reduce((sum, item) => sum += item.product.price * item.quantity, 0)
    // clear cart
    const clearCart = () => {
        setItems([])
    }
    // checkout 
    const checkout = async () => {
        // await initialisePaymentSheet(Math.floor(total * 100))
        // const Payed = await openPaymentSheet()
        // if (!Payed) {
        //     return
        // }
        insertOrder({ total }, {
            onSuccess: saveOrderItems
        })
    }
    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((cartItem) => ({
            order_id: order.id,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            size: cartItem.size,
            customer_name: cartItem.customer_name
        }));
        insertOrderItems(orderItems, {
            onSuccess() {
                clearCart()
                router.push(`/(user)/orders/${order.id}`)
            }
        })
    }
    return (
        <CartContex.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContex.Provider>
    )
}


export default CartProvider

export const useCart = () => useContext(CartContex)