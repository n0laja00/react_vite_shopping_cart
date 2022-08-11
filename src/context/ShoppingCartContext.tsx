import { useContext, ReactNode, createContext, useState } from "react";
import { NavItem } from "react-bootstrap";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

/*Types (Typescript feature) for ShoppingCartProviderProps*/
type ShoppingCartProviderProps = {
    children: ReactNode
}
/*Types (Typescript feature) for the cart item.*/
type CartItem = {
    id: number
    quantity: number
}

/*Types (Typescript feature) for ShoppingCartContext functions and variables*/
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void 
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

/*Creating context */
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

/*cartItems are fetched from local storage. useLocalStorage is a function from hooks/useLocalStorage (using "shopping-cart" as the default value). 
Furthermore, we have closeCart and openCart functions, which are booleans (see more in /components/shopping cart where we use closeCart).*/
export function ShoppingCartProvider( { children }: ShoppingCartProviderProps) {
    const [isOpen, setisOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);

    const openCart = () => setisOpen(true);
    const closeCart = () => setisOpen(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity,0)
    function getItemQuantity( id: number ) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity ( id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity:1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity ( id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity == 1) {
                return currItems.filter( item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart (id: number) {
        setCartItems(currItems => {
            return currItems.filter( item => item.id !== id)
        })
    }

    /*Distribution to Children and ShoppingCart*/
    return( 
    <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}} >
        {children}
        <ShoppingCart isOpen={isOpen}/> 
    </ShoppingCartContext.Provider>
    )
}