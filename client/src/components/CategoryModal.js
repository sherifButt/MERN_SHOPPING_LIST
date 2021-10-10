import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
   Alert,
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownToggle,
   Form,
   FormGroup,
   Input,
} from 'reactstrap';
import { addCategory, getCategory } from '../redux/actions/categoryActions';
import { clearErrors } from '../redux/actions/errorActions';

const CategoryModal = props => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [name, setName] = useState();
   const [description, setDescription] = useState(null);
   const [msg, setMsg] = useState(null);

   const toggle = () => setDropdownOpen(prevState => !prevState);

   const alert = <Alert color="danger">{props.error.msg}</Alert>;

   const submitHandle = e => {
      e.preventDefault();
      const category = {
         name,
         description,
         user_id: props.user_id,
      };

      props.addCategory(category);

      if (!props.error) toggle();
   };



   useEffect(() => {
      props.getCategory();
   }, []);
   return (
      <Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle} size="sm">
         <DropdownToggle caret>ADD CATEGORY</DropdownToggle>
         <DropdownMenu>
            <DropdownItem color="#000000" header>
               {props.error.id == 'ADD_CATEGORY_ERROR' || props.error.msg == 'AUTH_ERROR'
                  ? alert
                  : ''}
               Add new Category:
            </DropdownItem>
            <DropdownItem text>
               <Form onSubmit={e => submitHandle}>
                  <FormGroup>
                     <label for="quantity" size="sm">
                        Quatitiy
                     </label>
                     <Input
                        type="text"
                        id="name"
                        name="name"
                        size="sm"
                        placeholder="name"
                        onChange={e => setName(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                     <label for="description">Discription</label>
                     <Input
                        id="description"
                        type="textarea"
                        name="description"
                        placeholder="This items description...."
                        onChange={e => setDescription(e.target.value)}></Input>
                  </FormGroup>

                  <Button type="submit" color="dark" onClick={submitHandle}>
                     SAVE
                  </Button>
               </Form>
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
};
const mapStateToProps = state => ({
   error: state.error,
});
export default connect(mapStateToProps, { addCategory, getCategory, clearErrors })(CategoryModal);
