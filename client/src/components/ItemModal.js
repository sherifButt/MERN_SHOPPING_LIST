import { useEffect, useState } from 'react';
import {  loginToggle, registerToggle } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import {
   Alert,
   Button,
   Col,
   Container,
   Form,
   FormFeedback,
   FormGroup,
   FormText,
   Input,
   InputGroup,
   InputGroupAddon,
   Label,
   Modal,
   ModalBody,
   ModalHeader,
   NavLink,
   Row,
   UncontrolledAlert,
} from 'reactstrap';
import { addItem } from '../redux/actions/itemActions';
import { getCategory } from '../redux/actions/categoryActions';
import { clearErrors } from '../redux/actions/errorActions';
import CategoryModal from './CategoryModal';

const ItemModal = ({
   buttonLabel,
   className,
   user_id,
   addItem,
   getCategory,
   categories,
   error,
   clearErrors,
   isAuthenticated,
   loginToggle,
   registerToggle,
   isLoginOpen,
   isRegisterOpen,
}) => {
   // Modal control
   const [modal, setModal] = useState(false);
   const [alertSwitch, setAlertSwitch] = useState(false);
   const [name, setName] = useState(null);
   const [description, setDescription] = useState(null);
   const [quantity, setQuantity] = useState(null);
   const [importance, setImportance] = useState(null);
   const [pricePerUnit, setPricePerUnit] = useState(null);
   const [unit, setUnits] = useState("pce");
   const [category_id, setCategory_id] = useState();

   const alert = (
      <UncontrolledAlert color="danger">
         {error.msg ? error.msg : 'Please Login firsts'}{' '}
         <a href="#" onClick={loginToggle}>
            Login
         </a>
         {' '}/{' '}
         <a href="#" onClick={registerToggle}>
            Register
         </a>
      </UncontrolledAlert>
   );

   const toggle = () => {
      setAlertSwitch(!alertSwitch);
      if (isAuthenticated) {
         setModal(!modal);
         clearErrors();
      } else {
      }
   };

   useEffect(async () => {}, []);

   const item = {
      name,
      description,
      category_id,
      user_id,
      quantity,
      importance,
      pricePerUnit,
       unit,
   };

   const handleSubmit = async e => {
      e.preventDefault();
      // Add item via addItem action
      const result = await addItem(item);
      // if item added successfully returns true..
      if (result) {
         toggle();
         setName('');
         setDescription('');
      }
   };

   return (
      <div>
         {(error.id == "LOGIN_FAIL" || !isAuthenticated) && alertSwitch ? alert : ""}
         <Button color="dark" onClick={toggle} style={{ marginBottom: "2rem" }}>
            {buttonLabel}
         </Button>
         <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>ADD ITEM</ModalHeader>
            
            <ModalBody>
               {error.id == "ADD_ITEM_ERROR" || error.id == "AUTH_ERROR" ? alert : ""}{" "}
               {error.id == "AUTH_ERROR" ? "hi" : ""}
               <Container>
                  <Form
                     onSubmit={(e) => {
                        e.preventDefault();
                     }}
                  >
                     <Row>
                        <Col>
                           <FormGroup>
                              <Label for="name">Item Name</Label>
                              <Input
                                 id="name"
                                 type="text"
                                 name="name"
                                 placeholder="Red Apple"
                                 onChange={(e) => setName(e.target.value)}
                              ></Input>
                              <FormFeedback valid>Sweet! that name is available</FormFeedback>
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <FormGroup>
                              <label for="description">Description</label>
                              <Input
                                 id="description"
                                 type="textarea"
                                 name="description"
                                 placeholder="Sweet preferably western-Europe production...."
                                 onChange={(e) => setDescription(e.target.value)}
                              ></Input>
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <FormGroup>
                              <Label for="exampleSelectMulti">
                                 Categories? <CategoryModal user_id={user_id} />
                              </Label>
                              <Input
                                 type="select"
                                 name="selectMulti"
                                 id="exampleSelectMulti"
                                 // options={categories}
                                 onChange={(e) => {
                                    const options = e.target.options;
                                    const value = [];
                                    for (var i = 0; i < options.length; i++) {
                                       if (options[i].selected) {
                                          value.push(options[i].value);
                                       }
                                    }
                                    setCategory_id(value);
                                 }}
                                 multiple
                              >
                                 {categories.map((category, i) => (
                                    <option key={i} value={category._id}>
                                       {category.name}
                                    </option>
                                 ))}
                              </Input>
                              <FormText color="muted">
                                 You can select multiple Press Shift+Category.
                              </FormText>
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <FormGroup>
                              <label for="quantity">Quantity</label>
                              <InputGroup>
                                 <InputGroupAddon addonType="prepend">pce</InputGroupAddon>
                                 <Input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    placeholder="1"
                                    min={1}
                                    max={100}
                                    onChange={(e) => setQuantity(e.target.value)}
                                 ></Input>
                              </InputGroup>
                           </FormGroup>
                        </Col>
                        <Col>
                           <FormGroup>
                              <label for="description">Price per Unit/Pec</label>
                              <InputGroup>
                                 <InputGroupAddon addonType="prepend">£</InputGroupAddon>
                                 <Input
                                    id="price"
                                    placeholder=".12"
                                    min={0.0}
                                    max={100}
                                    type="number"
                                    step=".01"
                                    onChange={(e) => setPricePerUnit(e.target.value)}
                                 />
                                 {/* <InputGroupAddon addonType="append">.00</InputGroupAddon> */}
                              </InputGroup>
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <Label for="importance">Importance</Label>
                           <Input
                              type="range"
                              min="1"
                              max="3"
                              name="importance"
                              id="importance"
                              defaultValue="1"
                              onChange={(e) => setImportance(e.target.value)}
                           />
                        </Col>
                     </Row>

                     <Row>
                        <Col>
                           <Button
                              type="submit"
                              color="dark"
                              style={{ marginTop: "2rem" }}
                              onClick={handleSubmit}
                              block
                           >
                              Add Item
                           </Button>
                        </Col>
                     </Row>
                  </Form>
               </Container>
            </ModalBody>
         </Modal>
      </div>
   );
};

const mapPropsToState = state => ({
   user_id: state.auth.user._id ? state.auth.user._id : null,
   categories: state.category.categories,
   error: state.error,
   isAuthenticated: state.auth.isAuthenticated,
   isRegisterOpen: state.auth.isRegisterOpen,
   isLoginOpen: state.auth.isLoginOpen,
});
export default connect(mapPropsToState, {
   addItem,
   getCategory,
   clearErrors,
   loginToggle,
   registerToggle
})(ItemModal);
