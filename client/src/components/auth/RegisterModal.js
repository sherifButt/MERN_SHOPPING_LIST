import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
// COMPONNENTS
import InputField from '../form/InputField';

const RegisterModal = ({
   buttonLabel,
   className,
   isAuthenticated,
   error,
   register,
   clearErrors,
}) => {
   // redux
   // const dispatch = useDispatch();
   // redux STATE
   // const authenticated = useSelector(state => state.auth);
   // const error = useSelector(state => state.error);

   // STATE
   // Modal controll
   const [modal, setModal] = useState(false);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [msg, setMsg] = useState(error.msg);

   const handleToggle = useCallback(() => {
      setModal(!modal);
      clearErrors();
   }, [modal]);

   const handleSubmit = e => {
      e.preventDefault();
      const user = {
         name,
         email,
         password,
         msg,
      };

      // attempt to rgister
      register(user);
      if (!isAuthenticated) {
         //setAlert(true);
      } else {
         handleToggle();
         setName('');
         setEmail('');
         setPassword('');
      }
   };

   useEffect(() => {
      // check for register errors
      if (error.id == 'REGISTER_FAIL') setMsg(error.msg);
      else setMsg(null);
      // clearErrors();
      // If authintecated, close modal
      if (modal) if (isAuthenticated) handleToggle();
   }, [error, handleToggle, isAuthenticated, modal]);

   return (
      <div>
         <NavLink href="#" color="danger" onClick={handleToggle} style={{ marginBottom: '2rem' }}>
            {buttonLabel}
         </NavLink>
         <Modal isOpen={modal} toggle={handleToggle} className={className}>
            <ModalHeader toggle={handleToggle}>Register User</ModalHeader>
            <ModalBody>
               {error.msg ? <Alert color="danger"> {error.msg} </Alert> : null}
               <Form
                  onSubmit={e => {
                     e.preventDefault();
                  }}>
                  <InputField
                     id="name"
                     input={name}
                     setInput={setName}
                     labelName="Name"
                     placeholder="John Doh"
                  />
                  <InputField
                     id="email"
                     input={email}
                     setInput={setEmail}
                     labelName="Email"
                     placeholder="email@address.com"
                     type="email"
                  />
                  <InputField
                     id="password"
                     input={password}
                     setInput={setPassword}
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

const mapStateToPropos = state => ({
   error: state.error,
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToPropos, { register, clearErrors })(RegisterModal);
