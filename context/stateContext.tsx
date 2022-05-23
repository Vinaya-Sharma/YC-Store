import React, {useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import { Order, orderItem, User } from '../typings'

interface ContextStateProps {
    order: Order | null,
    items: number,
    cartTotal: number,
    user: User,
    orders: orderItem[]  | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    addToOrder: (orderBody: orderItem) => void,
    toggleQuantity: (dir: string, product: orderItem) => void,
    deleteItem: (product: orderItem) => void,
    setorders:  React.Dispatch<React.SetStateAction<Order | null>>,
    setCartTotal: React.Dispatch<React.SetStateAction<number>>
}

interface Props {
    children: React.ReactNode
}

const Context = createContext<ContextStateProps>({
    order: null,
    orders: [],
    items:0,
    cartTotal:0, 
    user: {
        _id:'', name:'', img:'', email:''
    },
    setUser: (User) => {},
    addToOrder: () => {},
    toggleQuantity: () => {},
    deleteItem: () => {},
    setorders: () => {},
    setCartTotal: () => {}
})

export const StateContext = ({children}:Props) => {
    const [order, setorder] = useState<Order | null>(null)
    const [orders, setorders] = useState<orderItem[]>([])
    const [items, setItems] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [user, setUser] = useState<User>({
        _id:'', name:'', img:'', email:''
    })

    const addToOrder = (orderBody: orderItem) => {
        setorders([...orders, orderBody])
        setCartTotal(cartTotal+orderBody.quantity*orderBody.product.cost)
    }

    const toggleQuantity = (dir:string, product:orderItem) => {
        const theProduct = orders.find((order) => order === product)
        const newCartItems = orders.filter((order) => order!==product)

        if (dir == 'inc'){
            setorders([...newCartItems, {...product, quantity:product.quantity+1}])
            setCartTotal(cartTotal+product.product.cost)
        } else if (dir == 'dec'){
            setorders([...newCartItems, {...product, quantity:product.quantity-1}])
            setCartTotal(cartTotal-product.product.cost)
        }
    }

    const deleteItem = (product: orderItem) => {
        const newCartItems = orders.filter((order) => order!==product)
        setorders([...newCartItems])
        const subtractCost = cartTotal - product.product.cost*product.quantity
        setCartTotal(subtractCost)
    }

    return <Context.Provider value={{order, items, cartTotal, user, setUser,setCartTotal, setorders,orders, 
        addToOrder, toggleQuantity, deleteItem}}>{children}</Context.Provider>
}

export const useStateContext = () => useContext(Context)