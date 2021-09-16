import { useState, useEffect } from 'react';
import {
   Button,
   Container,
   ListGroup,
   ListGroupItem,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
 
import { useSelector,useDispatch } from 'react-redux'
import { addItem,deleteItem } from '../redux/actions/itemActions'

const ShoppingList = () => {

   const items = useSelector(state => state.item.items)
   const dispatch = useDispatch()

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
               {items.map(({ id, name }) => (
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