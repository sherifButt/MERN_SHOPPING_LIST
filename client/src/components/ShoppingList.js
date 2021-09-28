import { useEffect } from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// COMPONNETNT
import ItemModal from './ItemModal';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getItems } from '../redux/actions/itemActions';

const ShoppingList = () => {
   const items = useSelector(state => state.item.items);
   const error = useSelector(state => state.error);

   const dispatch = useDispatch();

   useEffect(() => {
      (async () => await dispatch(getItems()))();
   }, []);

   return (
      <DragDropContext
         onDragEnd={param => {
            const srcI = param.source.index;
            const desI = param.destination ? param.destination.index : null;
         }}>
         <Container>
            <ItemModal buttonLabel="Add Item" />
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  <Droppable droppableId="droppable-1" type="Items">
                     {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {items.map(({ _id, name }, i) => (
                              <CSSTransition key={_id} timeout={500} classNames="fade">
                                 <Draggable key={i} draggableId={'draggable-1' + i} index={i}>
                                    {(provided, snapshot) => (
                                       <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          style={{
                                             ...provided.draggableProps.style,
                                             boxShadow: snapshot.isDragging
                                                ? '0 0 .9rem #66666640'
                                                : 'none',
                                             borderRadius: snapshot.isDragging ? '5px' : 'none',
                                          }}>
                                          <ListGroupItem
                                             {...provided.dragHandleProps}
                                             className="mb-2">
                                             <span color="light"> =</span>
                                             <Button
                                                className="remove-btn ml-3"
                                                color="danger"
                                                size="sm"
                                                onClick={() => {
                                                   dispatch(deleteItem(_id));
                                                }}>
                                                &times;
                                             </Button>
                                             {name}
                                          </ListGroupItem>
                                       </div>
                                    )}
                                 </Draggable>
                              </CSSTransition>
                           ))}
                           {provided.placeholder}
                        </div>
                     )}
                  </Droppable>
               </TransitionGroup>
            </ListGroup>
         </Container>
      </DragDropContext>
   );
};

export default ShoppingList;
