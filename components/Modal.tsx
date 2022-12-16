import { useContext } from "react";
import { ModalValue } from "../pages/checkout";

export interface ModalInterface {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = () => {
  const { setModal } = useContext<ModalInterface>(ModalValue);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-200  ">
      <div className=" bg-black-5 rounded-md shadow-2xl  max-w-6xl w-1/2 h-1/2 shrink backdrop-blur-md   flex flex-col justify-center items-center ">
        <h1 className="text-xl font-mono font-semibold text-gray-800   ">
          {" "}
          Your Order has been confirmed.
        </h1>
        <button
          className="text-lg bg-indigo-600 px-5 py-1 mt-10 text-white  font-semibold shrink rounded-md hover:bg-indigo-700 cursor-pointer  "
          type="submit"
          onClick={() => {
            setModal(false);
          }}
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default Modal;
