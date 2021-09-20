import { useEffect, useState } from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// COMPONNETNT
import ItemModal from './ItemModal';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getItems } from '../redux/actions/itemActions';

const ShoppingList = () => {
   
   const items = useSelector(state => state.item.items);
   // const [_items,set_Items] = useState({})
   const dispatch = useDispatch();
   
   console.log('===>',items);
   useEffect( () => {
       dispatch(getItems());
   }, []);

   return (
      <Container>
         <ItemModal buttonLabel="Add Item" />
         <ListGroup>
            <TransitionGroup className="shopping-list">
               {items.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                     <ListGroupItem>
                        <Button
                           className="remove-btn"
                           color="danger"
                           size="sm"
                           onClick={() => {
                              dispatch(deleteItem(_id));
                           }}>
                           &times;
                        </Button>
                        {name}
                     </ListGroupItem>
                  </CSSTransition>
               ))}
            </TransitionGroup>
         </ListGroup>
      </Container>
   );
};

export default ShoppingList;
