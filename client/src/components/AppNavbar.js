import { useState } from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarText,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Container
} from 'reactstrap';
const AppNavbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   return (
      <Navbar color="dark" dark expand="sm" className="mb-5" >
         <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto" navbar>
                  <NavItem>
                     <NavLink href="https://github.com/sherifButt/MERN_SHOPPING_LIST">Github</NavLink>
                  </NavItem>
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   )
}

export default AppNavbar;