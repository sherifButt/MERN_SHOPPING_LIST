import { getItems } from "../../redux/actions/itemActions";
import { connect } from "react-redux";
import {Button} from 'reactstrap'

const SubmitOrder = ({ items, isAuthenticated, user }) => {
   const currentUserOrders = items.filter((item) => item.user_id.name === user.name);
   console.log("currentUserOrders", currentUserOrders);
   console.log("user", user._id);
   const total = currentUserOrders.reduce((p, item) => {
      return item.quantity * item.pricePerUnit + p;
      console.log("hi", item.user_id);
   }, 0);
   return (
      <div>
         {isAuthenticated && (
            <Button
               as="input"
               type="button"
               value="Input"
               color="success"
            >{`£ ${total} Pay`}</Button>
         )}
      </div>
   );
};

const mapStateToProps = (state) => ({
   items: state.item.items,
   isAuthenticated: state.auth.isAuthenticated,
   user: state.auth.user,
});
export default connect(mapStateToProps, {})(SubmitOrder);
