import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../context/cartContext";
import ProgressContext from "../context/ProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);
  const total = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Logo" />
        <h1>Grandma's Kitchen</h1>
      </div>
      <nav>
        <Button textOnly onClick={() => progressCtx.showCart()}>
          Cart ({total})
        </Button>
      </nav>
    </header>
  );
}
