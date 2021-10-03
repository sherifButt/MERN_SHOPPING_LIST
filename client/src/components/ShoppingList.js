import { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// REDUX
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { deleteItem, getItems } from '../redux/actions/itemActions';
// COMPONNETNT
import ItemModal from './ItemModal';

const ShoppingList = ({ getItems, deleteItem, items, error }) => {
   // const items = useSelector(state => state.item.items);
   // const error = useSelector(state => state.error);

   // const dispatch = useDispatch();

   useEffect(() => {
      (async () => await getItems())();
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
                                             // borderRadius: snapshot.isDragging ? '5px' : 'none',
                                          }}>
                                          <ListGroupItem
                                             {...provided.dragHandleProps}
                                             className="mb-2 text-dark fw-light">
                                             <span color="gray"> = </span>
                                             <Button
                                                className="remove-btn ml-3"
                                                color="danger"
                                                size="sm"
                                                onClick={() => {
                                                   deleteItem(_id);
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

const mapStateToProps = state => ({
   items: state.item.items,
   error: state.error,
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
