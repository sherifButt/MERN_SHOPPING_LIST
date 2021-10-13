import { useEffect,useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// REDUX
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Tooltip,Button, Container, ListGroup, ListGroupItem, Badge, CustomInput, Alert } from 'reactstrap';
import {
   deleteItem,
   getItems,
   itemDndReOrder,
   itemDndReArrange,
} from '../redux/actions/itemActions';
import { returnErrors } from '../redux/actions/errorActions'
// COMPONNETNT
import ItemModal from './ItemModal';

const ShoppingList = ({
   getItems,
   deleteItem,
   items,
   error,
   isAuthenticated,
   itemDndReOrder,
   itemDndReArrange,
   returnErrors,
}) => {
   useEffect(() => {
      getItems();
   }, []);

   // html
   const dash = <span color="gray"> = </span>;
   const button = _id => {
      return (
         <Button
            className="remove-btn ml-3 "
            color="danger"
            size="sm"
            onClick={() => {
               deleteItem(_id);
            }}>
            &times;
         </Button>
      );
   };

   const categoriesList = category_id =>
      category_id.map(cat => {
         return (
            <>
               <Badge href="#" color="secondary" className="ml-2">
                  {cat.name}
               </Badge>
            </>
         );
      });
   const purchased = _id => {
      return <CustomInput type="checkbox" id={_id} label="" className="ml-3" inline />;
   };

   return (
      <DragDropContext
         onDragEnd={param => {
            const srcI = param.source.index;
            const desI = !!param.destination ? param.destination.index : null;

            if (desI !== null && isAuthenticated) {
               console.log(items[srcI]._id, desI);
               console.log(items[desI]._id, srcI);
               itemDndReArrange({
                  item0: { _id: items[srcI]._id, srcI: srcI, desI: desI },
                  item1: { _id: items[desI]._id, srcI: desI, desI: srcI },
               });
            } else {
               returnErrors('Please log in to re-arrange items...', 403, 'D&D_AUTH_ERROR');
            }
         }}>
         <Container>
            {error.id === 'D&D_AUTH_ERROR' ? (
               <Alert color="danger">{error.msg}</Alert>
            ) : (
               ''
            )}
            <ItemModal buttonLabel="Add Item" />
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  <Droppable droppableId="droppable-1" type="Items">
                     {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {items.map(({ _id, name, category_id, description, order }, i) => (
                              <Draggable key={_id} draggableId={'draggable-1' + _id} index={i}>
                                 {(provided, snapshot) => (
                                    <div
                                       // key={i + _id}
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
                                          className="mb-2  text-dark fw-light align-items-center py-3 d-flex justify-content-between"
                                          // key={`listItem_${_id}`}
                                       >
                                          <div
                                             // key={"o"+i + _id}
                                             className="d-flex align-items-center align-middle">
                                             <div>
                                                {dash}

                                                {button(_id)}
                                             </div>

                                             <div className="d-flex  flex-column">
                                                {name.charAt(0).toUpperCase() + name.slice(1)}
                                                {/* {order} */}
                                                <span
                                                   className="sm text-sm-left font-weight-light"
                                                   style={{ fontSize: '.7em', color: 'gray' }}>
                                                   {description}
                                                </span>
                                             </div>
                                          </div>
                                          <div>
                                             {categoriesList(category_id)}
                                             {isAuthenticated ? purchased(_id) : ''}
                                          </div>
                                       </ListGroupItem>
                                    </div>
                                 )}
                              </Draggable>
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
   isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
   getItems,
   deleteItem,
   itemDndReOrder,
   itemDndReArrange,
   returnErrors,
})(ShoppingList);
