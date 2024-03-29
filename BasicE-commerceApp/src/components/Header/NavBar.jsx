import { Link } from "react-router-dom";
import wishlist from "/images/header/shopping-cart.svg";

const NavBar = () => {
  return (
    <div className="w-[600px] ">
      <ul className="w-full flex justify-end items-center gap-[30px]">
        <li>
          <a href="">Press Me</a>
        </li>
        <li>
          <a href="">Press Me</a>
        </li>
        <li>
          <Link to="/wishlist">
            <img className="w-[30px] h-[30px]" src={wishlist} alt="shooping card" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
