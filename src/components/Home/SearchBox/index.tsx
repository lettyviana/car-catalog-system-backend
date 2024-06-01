"use client";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="secondary-nav-container">
      <div
        className="search-container"
        onClick={() => setActive(!active)}
        onBlur={() => setActive(!active)}
      >
        <input type="text" placeholder="Busque por marca, modelo, cor..." />
        <IoSearchOutline className={active ? "active" : ""} />
      </div>
    </div>
  );
};

export default SearchBox;
