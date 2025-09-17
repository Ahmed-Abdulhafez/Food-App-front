import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";

const Modals = ({ onClose , children }) => {
  return (
<div className="fixed inset-0 bg-[rgb(0,0,0,0.5)] flex justify-start items-stretch z-[999]">
  {/* المودال الجانبي */}
  <div
    className="bg-white h-full w-[350px] shadow-lg"
    style={{ display: "block", position: "relative" }}
  >
    <Modal.Dialog className="m-0 h-full flex flex-col border-0">
      {/* الهيدر مع زر الإغلاق */}
      <div className="flex justify-between items-center p-3 border-b">
        <Modal.Title>Modal title</Modal.Title>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoMdClose size={22} />
        </button>
      </div>

      {/* البودي */}
      <Modal.Body className="flex-1 overflow-y-auto p-4">
        {children}
      </Modal.Body>



    </Modal.Dialog>
  </div>
</div>



  );
};

export default Modals;
