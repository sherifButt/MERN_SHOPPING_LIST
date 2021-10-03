import { useState } from 'react';
import { connect } from 'react-redux';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Container,
} from 'reactstrap';

// COMPONENTS
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/Login';

const AppNavbar = ({ isAuthenticated, user }) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   const registerUser = (
      <NavItem>
         <RegisterModal buttonLabel="Regester user" />
      </NavItem>
   );
   const logIn = (
      <NavItem>
         <Login buttonLabel="Login" />
      </NavItem>
   );

   return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
         <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto" navbar>
                  {isAuthenticated ? (
                     <>
                        <NavItem>
                           <NavLink>
                              <strong>Welcome, {user.name && user.name}</strong>
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <Logout />
                        </NavItem>
                     </>
                  ) : (
                     <>
                        <NavItem>
                           <RegisterModal buttonLabel="Regester user" />
                        </NavItem>
                        <NavItem>
                           <Login buttonLabel="Login" />
                        </NavItem>
                     </>
                  )}
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   );
};

const mapStateToPropos = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   user: state.auth.user,
});
export default connect(mapStateToPropos, {})(AppNavbar);
