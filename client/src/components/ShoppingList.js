import { useState, useEffect } from 'react';
import {
   Button,
   Container,
   ListGroup,
   ListGroupItem,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
 
import {useSelector} from 'react-redux'

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
   // const items = useSelector(state => state.item)

   useEffect(() => {
      console.log(items.items)
   }, [])


   return (
      <Container>
         <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={() => {
               const name = prompt('Enter Item')
               name && setItems({
                  items: [...items.items, { id: uuid(), name }]
               })
            }}
         >
            Add Item
         </Button>
         <ListGroup>
            <TransitionGroup className="shopping-list">
               {items.items.map(({ id, name }) => (
                  <CSSTransition key={id} timeout={500} classNames="fade">
                     <ListGroupItem>
                        <Button
                           className="remove-btn"
                           color="danger"
                           size="sm"
                           onClick={() => {
                              const newItems = items.items.filter(item => item.id !== id)
                              setItems({items:newItems})  
                            }}
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