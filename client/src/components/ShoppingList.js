import { useState, useEffect } from 'react';
import {
   Button,
   Container,
   ListGroup,
   ListGroupItem,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
 
import { useSelector,useDispatch } from 'react-redux'
import { getItems,addItem,deleteItem } from '../redux/actions/itemActions'

const ShoppingList = () => {

   const initialState = {
      items: [
         { id: uuid(), name: 'Eggs' },
         { id: uuid(), name: 'Milk' },
         { id: uuid(), name: 'Pizza' },
         { id: uuid(), name: 'Mozzarilla' },
      ],
   }

   const [items, setItems] = useState(initialState);
   const items_ = useSelector(state => state.item)
   const dispatch = useDispatch()

   useEffect(() => {
      console.log(items_,items)
   }, [])


   return (
      <Container>
         <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={() => {
               const name = prompt('Enter Item')
               name && dispatch(addItem(name))}}
         >
            Add Item
         </Button>
         <ListGroup>
            <TransitionGroup className="shopping-list">
               {items_.items.map(({ id, name }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                     <ListGroupItem>
                        <Button
                           className="remove-btn"
                           color="danger"
                           size="sm"
                           onClick={() => {dispatch(deleteItem(id))}}
                        >&times;</Button>
                        {name}
                     </ListGroupItem>
                  </CSSTransition>
               ))}
            </TransitionGroup>
         </ListGroup>
      </Container>
   )
}

export default ShoppingList;