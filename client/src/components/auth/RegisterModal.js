import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

// COMPONNENTS
import InputField from '../form/InputField';

import { Button, Modal, ModalHeader, ModalBody, Form, NavLink } from 'reactstrap';


const RegisterModal = ({ buttonLabel, className }) => {
   // redux
   const dispatch = useDispatch();
   const authenticated = useSelector(state => state.auth)
   const error = useSelector(state => state.error)

   // Modal controll
   const [modal, setModal] = useState(false);
   const [inputName, setInputName] = useState('');
   const [inputEmail, setInputEmail] = useState('');
   const [inputPassword, setInputPassword] = useState('');
   const [message, setMessage] = useState('');

   const toggle = () => setModal(!modal);

   const handleSubmit = e => {
      e.preventDefault();

      toggle();
      setInputName('');
      setInputEmail('');
      setInputPassword('');
   };

   return (
      <div>
         <NavLink color="danger" onClick={toggle} style={{ marginBottom: '2rem' }}>
            {buttonLabel}
         </NavLink>
         <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Register User</ModalHeader>
            <ModalBody>
               <Form
                  onSubmit={e => {
                     e.preventDefault();
                  }}>
                  <InputField
                     id="name"
                     input={inputName}
                     setInput={setInputName}
                     labelName="Name"
                     placeholder="John Doh"
                  />
                  <InputField
                     id="item"
                     input={inputEmail}
                     setInput={setInputEmail}
                     labelName="Email"
                     placeholder="email@address.com"
                     type="email"
                  />
                  <InputField
                     id="item"
                     input={inputPassword}
                     setInput={setInputPassword}
                     labelName="Password"
                     placeholder="*****"
                     type="password"
                  />
                  <Button
                     type="submit"
                     color="dark"
                     style={{ marginTop: '2rem' }}
                     onClick={handleSubmit}
                     block>
                     Register
                  </Button>
               </Form>
            </ModalBody>
         </Modal>
      </div>
   );
};

export default RegisterModal;
