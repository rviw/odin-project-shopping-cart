import { Link, NavLink } from "react-router";

function Header() {
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
          Cart
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
