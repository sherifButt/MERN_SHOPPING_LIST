import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
   Button,
   Form,
   Modal,
   ModalBody,
   ModalHeader,
   FormGroup,
   Label,
   Input,
   FormFeedback,
} from 'reactstrap';
import { addItem } from '../redux/actions/itemActions';
import InputField from './form/InputField';

const ItemModal = ({ buttonLabel, className, user_id, addItem }) => {
   // redux
   const dispatch = useDispatch();
   // Modal controll
   const [modal, setModal] = useState(false);
   const [name, setName] = useState();
   const [discription, setDiscription] = useState();
   const [categories, setCategories] = useState();
   const toggle = () => setModal(!modal);
   
   const item = {
      name,
      discription,
      category_id: ['615c28e0e0a28882f974d9c1', '615c2902e0a28882f974d9c3'],
      user_id,
   };

   const handleSubmit = e => {
      e.preventDefault();
      name && addItem(item);
      toggle();
      setName('');
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
                  <FormGroup>
                     
                     <Label for="name">name</Label>
                     <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Johan Doh"
                        onChange={e => setName(e.target.value)}></Input>
                     <FormFeedback valid>Sweet! that name is available</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                     <label for="discription">Discription</label>
                     <Input
                        id="discription"
                        type="textarea"
                        name="discription"
                        placeholder="This items discription...."
                        onChange={e => setDiscription(e.target.value)}></Input>
                  </FormGroup>
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

const mapPropsToState = state =>({
user_id: state.auth.user._id,
})
export default connect(mapPropsToState,{addItem})(ItemModal);
