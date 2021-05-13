import React from "react";

const HeaderBar = ({ children }) => {
  return (
    <div className="w-full py-4 px-7 text-4xl font-bold">
      <h1>{children}</h1>
    </div>
  );
};

export default HeaderBar;
