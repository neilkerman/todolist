import { useState } from 'react';

const AddTodo = ({ callbacks }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    return (
        <div className="px-3 mt-5 row w-full justify-content-between align-items-center">
            <h1 className="font-weight-bold mb-0">To Do List</h1>
            <button
                type="button" data-toggle="modal" data-target="#addTodoModal"
                className="btn btn-sm btn-primary btn-animated btn-animated-x px-4"
            >
                <span className="btn-inner--visible">Add To Do</span>
                <span className="btn-inner--hidden">
                    <i className="fas fa-plus"></i>
                </span>
            </button>

            <div className="modal fade rounded" id="addTodoModal" tabIndex="-1" role="dialog" aria-labelledby="addTodoModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="p-4 w-100">
                                    <h4 className="heading h3">Add Todo</h4>
                                    <div className="form-group">
                                        <input type="text" maxLength={58} className="form-control" value={title} onChange={event => setTitle(event.target.value)} placeholder="Todo Title" />
                                    </div>

                                    <div className="form-group">
                                        <textarea className="form-control" value={body} placeholder="Tell more about the todo" onChange={event => setBody(event.target.value)} rows="3"></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={function () {
                                        callbacks.saveTodo(title, body);
                                        setTitle('');
                                        setBody('');
                                    }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
