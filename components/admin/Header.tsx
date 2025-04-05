import React from "react";

const Header = () => {
  return (
    <header className="admin-header">
      <div>
        <h2 className=" text-2xl font-semibold text-dark-500">{"IN"}</h2>
        <p className="text-base text-slate-500">
          Monitor all your users and books here!
        </p>
      </div>
      <p>Search</p>
    </header>
  );
};

export default Header;
