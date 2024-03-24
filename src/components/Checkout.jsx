import { useContext } from "react";
import useHttp from "../hooks/useHttp";
import CartContext from "../context/CartContext";
import ProgressContext from "../context/ProgressContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Error from "./Error";
import { currencyFormatter } from "../utils/formating";

const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    reqConfig
  );

  const total = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal
        className="checkout"
        open={progressCtx.progress === "checkout"}
        onClose={() => {
          progressCtx.hideCheckout();
          cartCtx.clear();
          clearData();
        }}
      >
        <h2>Grandma approves!</h2>
        <p>
          Your order is baking with love and maybe a little grandma supervision
        </p>
        <p className="modal-actions">
          <Button
            onClick={() => {
              progressCtx.hideCheckout();
              cartCtx.clear();
              clearData();
            }}
          >
            Ok
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={progressCtx.progress === "checkout"}
      onClose={() => progressCtx.hideCheckout()}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(total)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Full address" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && (
          <Error
            title="Uh oh! Seems like the internet ate your order. Try submitting again."
            message={error}
          ></Error>
        )}
        <p className="modal-actions">
          {isLoading && <span>Sending order data...</span>}
          {!isLoading && (
            <>
              <Button textOnly onClick={() => progressCtx.hideCheckout()}>
                Cancel
              </Button>
              <Button>Submit</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
