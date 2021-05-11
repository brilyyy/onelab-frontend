import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = (props) => {
  return (
    <NavLink
      exact
      to={props.to}
      activeClassName="bg-blue-900"
      className="text-white cursor-pointer flex px-3 py-4 hover:bg-blue-600 hover:shadow-md"
    >
      {props.title}
    </NavLink>
  );
};

export default SidebarLink;
