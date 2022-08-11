import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

/*CartItemProps to outline data types (typescript feature).*/
type CartItemProps = {
    id: number
    quantity: number
}

/*Most of the functions seen here are from Context/ShoppingCartContext (RemoveFromCart). We get Items from the same context-. */
export function CartItem({id, quantity}:CartItemProps) {
    const {removeFromCart} = useShoppingCart();
    const item= storeItems.find(i => i.id === id);
    if (item == null) return null; 

    return (
        <Stack direction="horizontal" gap={2} className="d-flax align-items-center">
            <img src={item.imgUrl} style={{width:"125px", height:"75px", objectFit: "cover"}}></img>
            <div className="me-auto">
                <div>
                    {item.name} { quantity > 1 && <span className="text-muted" style={{fontSize: ".65rem"}}>{quantity}x</span>}
                </div>
            </div>
            <div className="me-auto" style={{fontSize: ".75rem"}}>
                <div>
                   {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                   {formatCurrency(item.price * quantity)}       
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )

}