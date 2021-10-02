import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions'
import { NavLink } from 'reactstrap'


const Logout = ({logout}) => {
   return (
      
         <NavLink href="#" onClick={logout}>Logout</NavLink>
      
   );
};
export default connect(null,{logout})(Logout);
