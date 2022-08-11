import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json"

/*Data type (Typescript feature) of shoppingCartProp (From Context/ShoppingCartContext) is a bloolean. Either the cart is open or not. Offcanvas is from Bootstrap. 
We use formatCurrency to format currency. We also get CartItems from ./CartItem.*/
type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart( { isOpen } : ShoppingCartProps) {
    const {closeCart, cartItems} = useShoppingCart();
    return ( 
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton> 
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map( item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {formatCurrency(cartItems.reduce((total, cartitem) => {
                            const item = storeItems.find(i => i.id === cartitem.id)
                            return total + (item?.price || 0) * cartitem.quantity
                        },0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )

}