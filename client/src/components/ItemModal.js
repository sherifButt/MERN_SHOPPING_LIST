import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
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
} from 'reactstrap';
import { addItem } from '../redux/actions/itemActions';
import { getCategory } from '../redux/actions/categoryActions';
import  CategoryModal  from './CategoryModal';

const ItemModal = ({ buttonLabel, className, user_id, addItem, getCategory, categories }) => {
   // Modal controll
   const [modal, setModal] = useState(false);
   const [name, setName] = useState(null);
   const [description, setDescription] = useState(null);
   const [quantity, setQuantity] = useState(null);
   const [importance, setImportance] = useState(null);
   const [pricePerUnit, setPricePerUnit] = useState(null);
   const [unit, setUnits] = useState(null);
   const [category_id, setCategory_id] = useState();

   const toggle = () => setModal(!modal);

   useEffect(async () => {
      getCategory(); //from db
      
   }, []);

   

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
               <Container>
                  <Form
                     onSubmit={e => {
                        e.preventDefault();
                     }}>
                     <Row>
                        <Col>
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
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <FormGroup>
                              <label for="description">Discription</label>
                              <Input
                                 id="description"
                                 type="textarea"
                                 name="description"
                                 placeholder="This items description...."
                                 onChange={e => setDescription(e.target.value)}></Input>
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <FormGroup>
                              <Label for="exampleSelectMulti">
                                 Categories?{' '}
                                 {/* <Button className="ml-2" size="sm">
                                    + ADD NEw Category
                                 </Button> */}
                                 <CategoryModal user_id={ user_id}/>
                              </Label>
                              <Input
                                 type="select"
                                 name="selectMulti"
                                 id="exampleSelectMulti"
                                 // options={categories}
                                 onChange={e => {
                                    const options = e.target.options
                                    const value = []
                                    for (var i = 0; i < options.length; i++){
                                       if (options[i].selected) {
                                          value.push(options[i].value)
                                       }
                                    }
                                    setCategory_id(value)
                                 }}
                                 multiple>
                                 {categories.map((category, i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
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
                              <label for="quantity">Quatitiy</label>
                              <Input
                                 id="quantity"
                                 type="number"
                                 name="quantity"
                                 placeholder="1"
                                 min={1}
                                 max={100}
                                 onChange={e => setQuantity(e.target.value)}></Input>
                           </FormGroup>
                        </Col>
                        <Col>
                           <FormGroup>
                              <label for="description">Price per unit</label>
                              <InputGroup>
                                 <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                 <Input
                                    id="price"
                                    placeholder="Amount"
                                    min={0}
                                    max={100}
                                    type="number"
                                    step="1"
                                    onChange={e => setPricePerUnit(e.target.value)}
                                 />
                                 <InputGroupAddon addonType="append">.00</InputGroupAddon>
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
                              onChange={e => setImportance(e.target.value)}
                           />
                        </Col>
                     </Row>

                     <Row>
                        <Col>
                           <Button
                              type="submit"
                              color="dark"
                              style={{ marginTop: '2rem' }}
                              onClick={handleSubmit}
                              block>
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
   error:state.error
});
export default connect(mapPropsToState, { addItem, getCategory })(ItemModal);
