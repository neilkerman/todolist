import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Empty from "../utility/empty.component";
import TodoItem from "./todoitem.component";
import Empty2 from '../utility/empty2.component';

const TodoContainer = ({ heading, type, todos, updateTodos, callbacks }) => {
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateTodos(items);
    }

    const getItemStyle = (isDragging) => ({
        transition: "all 300ms",
        boxShadow: isDragging
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    });

    return (
        <div
            className="mt-4 card shadow-sm bg-white"
            style={{
                boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
        >
            <div className="card-header py-2">
                <h5 className="mb-0">{heading}</h5>
            </div>
            <div className="card-body py-3">
                {
                    (todos.length > 0) ?
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="todosuniquekey">
                                {(provided) => {
                                    return (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {todos.map((todo, index) => {
                                                return (
                                                    <Draggable
                                                        key={todo.id}
                                                        draggableId={todo.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className="py-2"
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <TodoItem
                                                                        todo={todo}
                                                                        type={type}
                                                                        callbacks={callbacks}
                                                                        itemStyle={getItemStyle(snapshot.isDragging)}
                                                                    />
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </DragDropContext>
                        :
                        (type === 'todo') ?
                            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                <Empty /><br />
                                <p className="d-block text-muted">Oops, we couldn't find anything for you to do. Click on the button to add something.</p>
                                <button type="button" data-toggle="modal" data-target="#addTodoModal" className="btn btn-sm btn-outline-primary">Add a todo</button>
                            </div>
                            : <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                <Empty2 />
                                <p className="d-block mt-3 text-muted">Still running? A few more miles and your tasks will appear here!</p>
                            </div>
                }
            </div>
        </div>
    );
};

export default TodoContainer;
