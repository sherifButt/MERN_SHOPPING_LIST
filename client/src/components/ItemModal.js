import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/actions/itemActions"
import InputField from "./form/InputField";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Form,
} from "reactstrap";

const ItemModal = ({ buttonLabel, className }) => {
   // redux
	const dispatch = useDispatch();
	// Modal controll
   const [modal, setModal] = useState(false);
   const [inputName, setInputName] = useState("");

   const toggle = () => setModal(!modal);
   const closeBtn = (
      <button className="close" onClick={toggle}>
         &times;
      </button>
   );

   const handleSubmit = e => {
		e.preventDefault();
		dispatch(addItem(inputName))
		toggle();
		setInputName('')
   };

   return (
      <div>
         <Button color="dark" onClick={toggle}>
            {buttonLabel}
         </Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle} close={closeBtn}>
               ADD ITEM
            </ModalHeader>
            <ModalBody>
               <Form
                  onSubmit={e => {
                     e.preventDefault();
                  }}>
                  <InputField
                     id="item"
                     input={inputName}
                     setInput={setInputName}
                     labelName="name"
                  />

                  <Button color="dark" style={{ marginTop: "2rem" }} onClick={handleSubmit} block>
                     Add Item
                  </Button>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default ItemModal;
