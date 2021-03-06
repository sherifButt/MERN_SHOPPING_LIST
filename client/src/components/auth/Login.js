import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { login,loginToggle,registerToggle } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
// COMPONNENTS
import InputField from '../form/InputField';

const Login = ({
   buttonLabel,
   className,
   isAuthenticated,
   error,
   login,
   clearErrors,
   loginToggle,
   registerToggle,
   isLoginOpen,
}) => {
   // STATE
   // Modal controll
   const [modal, setModal] = useState(false);
   // const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [msg, setMsg] = useState(error.msg);

   const handleToggle = useCallback(() => {
      setModal(!modal);
      loginToggle(!isLoginOpen);
      clearErrors();
   }, [modal]);

   const handleSubmit = e => {
      e.preventDefault();
      const user = {
         // name,
         email,
         password,
         msg,
      };

      // attempt to rgister
      login(user);
      if (!isAuthenticated) {
         //setAlert(true);
      } else {
         handleToggle();
         // setName('');
         setEmail('');
         setPassword('');
      }
   };

   useEffect(() => {
      // check for login errors
      if (error.id == 'REGISTER_FAIL') setMsg(error.msg);
      else setMsg(null);
      // clearErrors();
      // If authintecated, close modal
      if (modal) if (isAuthenticated) {
         handleToggle()
      };
   }, [error, handleToggle, isAuthenticated, modal]);

   return (
      <div>
         <NavLink href="#" color="danger" onClick={handleToggle} style={{ marginBottom: '2rem' }}>
            {buttonLabel}
         </NavLink>
         <Modal isOpen={isLoginOpen} toggle={handleToggle} className={className}>
            <ModalHeader toggle={handleToggle}>Login</ModalHeader>
            <ModalBody>
               {error.msg ? <Alert color="danger"> {error.msg} </Alert> : null}
               <Form
                  onSubmit={e => {
                     e.preventDefault();
                  }}>
                  {/* <InputField
                     id="name"
                     input={name}
                     setInput={setName}
                     labelName="Name"
                     placeholder="John Doh"
                  /> */}
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
                     Login
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
   isLoginOpen: state.auth.isLoginOpen
});

export default connect(mapStateToPropos, { login, clearErrors, loginToggle, registerToggle })(
   Login
);
