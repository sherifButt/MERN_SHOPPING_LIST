import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

// COMPONNENTS
import InputField from '../form/InputField';

import {
   Alert,
   Input,
   Label,
   FormGroup,
   FormFeedback,
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Form,
   NavLink,
   FormText,
} from 'reactstrap';

const RegisterModal = ({ buttonLabel, className }) => {
   // redux
   const dispatch = useDispatch();
   const authenticated = useSelector(state => state.auth);
   const error = useSelector(state => state.error);

   // Modal controll
   const [modal, setModal] = useState(false);
   const [alertIsVisible, setAlertIsVisible] = useState(false);
   const [inputName, setInputName] = useState('');
   const [inputEmail, setInputEmail] = useState('');
   const [inputPassword, setInputPassword] = useState('');
   const [message, setMessage] = useState(error.msg);

   const toggle = () => setModal(!modal);
   const alertToggle = () => setAlertIsVisible(!alertIsVisible);

   const handleSubmit = e => {
      e.preventDefault();
      dispatch(
         registerUser({ name: inputName, email: inputEmail, password: inputPassword, msg: message })
      );
      if (!authenticated.isAuthenticated) {
         setAlertIsVisible(true);
      } else {
         
         toggle();
         setAlertIsVisible(false);
         setInputName('');
         setInputEmail('');
         setInputPassword('');
      }
   };

   return (
      <div>
         <NavLink color="danger" onClick={toggle} style={{ marginBottom: '2rem' }}>
            {buttonLabel}
         </NavLink>
         <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Register User</ModalHeader>
            <ModalBody>
               <Alert color="info" isOpen={alertIsVisible} toggle={alertToggle}>
                  {error && error.msg}
               </Alert>
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
