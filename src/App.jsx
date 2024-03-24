import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { ProgressContextProvider } from "./context/ProgressContext.jsx";

export default function App() {
  return (
    <ProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ProgressContextProvider>
  );
}
