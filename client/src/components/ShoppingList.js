import { useState, useEffect } from 'react';
import {
   Button,
   Container,
   ListGroup,
   ListGroupItem,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

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

   useEffect(() => {
      console.log(items.items)
   }, [])


   return (
      <Container>
         <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={ () => {
               const name =  prompt('Enter Item')
               name && setItems({
                  items: [...items.items, { id: uuid(), name }]
               })
               console.log( items)
            }}
         >Add Item</Button>
      </Container>
   )
}

export default ShoppingList;