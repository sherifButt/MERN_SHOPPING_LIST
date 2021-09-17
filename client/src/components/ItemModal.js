import { useState } from "react";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Label,
   Input,
   FormGroup,
   Form,
   Col,
   Row,
} from "reactstrap";

const ItemModal = ({ buttonLabel, className }) => {
   // Modal controll
   const [modal, setModal] = useState(false);
   const [open, setOpen] = useState(false);
   const [focusAfterClose, setFocusAfterClose] = useState(true);
   const toggle = () => setModal(!modal);
   const closeBtn = (
      <button className="close" onClick={toggle}>
         &times;
      </button>
   );
   const handleSelectChange = ({ target: { value } }) => {
      setFocusAfterClose(JSON.parse(value));
   };

   return (
      <div>
         <Button color="dark" onClick={toggle}>
            {buttonLabel}
         </Button>
         <Modal autoFocus="true" isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle} close={closeBtn}>
               ADD ITEM
            </ModalHeader>
            <ModalBody>
               <Form onSubmit={(e) => e.preventDefault()}>
                  <FormGroup>
                     <Label for="item">Item</Label>
                     <Input
                        type="text"
                        id="item"
                        placeholder="Add shopping item"
                        onChange={handleSelectChange}></Input>
                  </FormGroup>
                     <Button block color="dark" style={{ marginTop: "2rem" }} onClick={toggle} >
                        Add Item	
                     </Button>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default ItemModal;
