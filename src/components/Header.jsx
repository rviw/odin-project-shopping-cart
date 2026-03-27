import { useContext } from "react";
import ShopContext from "../contexts/ShopContext.jsx";
import { Link, NavLink } from "react-router";

function Header() {
  const { cartItems } = useContext(ShopContext);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="header">
      <Link to="/" className="brand">
        Shopping Cart
      </Link>

      <nav className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/shop" end>
          Shop
        </NavLink>

        <NavLink to="/cart" end>
          Cart ({cartItemsCount})
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
