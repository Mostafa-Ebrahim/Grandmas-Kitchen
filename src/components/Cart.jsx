import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/cartContext";
import { currencyFormatter } from "../utils/formating.js";
import Button from "./UI/Button.jsx";
import ProgressContext from "../context/ProgressContext.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);
  const total = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <Modal
      className="cart"
      open={progressCtx.progress === "cart"}
      onClose={
        progressCtx.progress === "cart" ? () => progressCtx.hideCart() : null
      }
    >
      <h2>Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li className="cart-item" key={item.id}>
            <p>
              {item.name} - {item.quantity} x{" "}
              {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
              <Button textOnly onClick={() => cartCtx.removeItem(item.id)}>
                -
              </Button>
              <span>{item.quantity}</span>
              <Button textOnly onClick={() => cartCtx.addItem(item)}>
                +
              </Button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(total)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={() => progressCtx.hideCart()}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={() => progressCtx.showCheckout()}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
