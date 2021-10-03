import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { addItem } from '../redux/actions/itemActions';
import InputField from './form/InputField';

const ItemModal = ({ buttonLabel, className }) => {
   // redux
   const dispatch = useDispatch();
   // Modal controll
   const [modal, setModal] = useState(false);
   const [inputName, setInputName] = useState();

   const toggle = () => setModal(!modal);

   const handleSubmit = e => {
      e.preventDefault();
      inputName && dispatch(addItem({ name: inputName }));
      toggle();
      setInputName('');
   };

   return (
      <div>
         <Button color="dark" onClick={toggle} style={{ marginBottom: '2rem' }}>
            {buttonLabel}
         </Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>ADD ITEM</ModalHeader>
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
                     autoFocus="true"
                  />
                  <Button
                     type="submit"
                     color="dark"
                     style={{ marginTop: '2rem' }}
                     onClick={handleSubmit}
                     block>
                     Add Item
                  </Button>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default ItemModal;
