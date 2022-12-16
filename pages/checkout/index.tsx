import React from "react";
import Modal from "../../components/Modal";
import CheckOut from "./checkout";
import { useState, createContext } from "react";
import { ModalInterface } from "../../components/Modal";

export const ModalValue = createContext<ModalInterface>({
  setModal: () => Boolean,
});

const Index = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <ModalValue.Provider value={{ setModal }}>
        {modal ? <Modal /> : <CheckOut />}
      </ModalValue.Provider>
    </div>
  );
};

export default Index;
