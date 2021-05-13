import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useHistory } from "react-router";

const CloseButton = ({ backTo, ...props }) => {
  let history = useHistory();
  return (
    <>
      <button
        className="text-black text-3xl focus:outline-none hover:text-red-600"
        onClick={() => history.replace(backTo)}
      >
        <IoIosCloseCircle />
      </button>
    </>
  );
};

export default CloseButton;
