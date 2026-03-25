import { Link, NavLink } from "react-router";
import PropTypes from "prop-types";

function Header({ cartItemsCount }) {
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

Header.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
};

export default Header;
