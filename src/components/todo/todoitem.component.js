import millisecondsToStr from "./../../helpers/readabletime.helper";
import { useState } from 'react';

const TodoItem = ({ todo, type, itemStyle, callbacks }) => {
    const [reminder, setReminder] = useState('')
    const [comment, setComment] = useState('')

    return (
        <div className="card" style={itemStyle}>
            <div className="d-flex">
                <div className="m-3 d-flex flex-row">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="grip-vertical"
                        className="svg-inline--fa fa-grip-vertical fa-w-10 mr-2 my-auto text-muted"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            fill="currentColor"
                            d="M96 32H32C14.33 32 0 46.33 0 64v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zM288 32h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z"
                        ></path>
                    </svg>
                    <div className="custom-control custom-checkbox my-auto">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`customCheck${todo.id}`}
                            defaultChecked={type === "completed"}
                            onChange={function () {
                                callbacks.markCompleted(todo, type);
                            }}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor={`customCheck${todo.id}`}
                        ></label>
                    </div>
                </div>

                {type === "todo" ? (
                    <div data-toggle="modal" data-target={`#detailsmodal_${todo.id}`} className="flex-grow-1 py-4 w-100">
                        <div className="col-8">
                            <h5 className="font-weight-bold mb-0">{todo.title}</h5>
                            <div className="d-flex align-items-end">
                                <p className="text-truncate text-muted mb-0">
                                    {(todo.body) ? todo.body.substring(0, 120) : ""}
                                </p>
                                <button className="btn btn-link d-inline p-0 m-0">
                                    {(todo.body && todo.body.length > 110) ? "Read more" : ""}
                                </button>
                            </div>

                            {
                                (todo.reminder) ?
                                    <div className="mt-3 mb-0 d-flex align-items-center">
                                        <span
                                            className={`d-block ${(Date.now() > todo.reminder) ? 'bg-danger' : 'bg-success'} rounded-circle`}
                                            style={{ width: "0.8rem", height: "0.8rem" }}
                                        ></span>
                                        <small className="ml-2 text-sm text-muted">
                                            {todo.reminder.toLocaleDateString()} at {todo.reminder.toLocaleTimeString()}
                                        </small>
                                    </div>
                                    : <div></div>
                            }
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow-1 py-4 w-100">
                        <div className="col-8">
                            <h6 className="font-weight-bold">
                                <span style={{ textDecoration: "line-through" }}>
                                    {todo.title}
                                </span>{" "}
                                &bull;{" "}
                                <small className="text-muted">
                                    completed {millisecondsToStr(todo.completedAt)} ago
                                </small>
                            </h6>
                        </div>
                    </div>
                )}

                {type === "todo" ? (
                    <div className="d-flex m-3">
                        <div className="dropdown my-auto">
                            <button
                                className="btn btn-sm btn-block btn-outline-secondary dropdown-toggle py-1"
                                type="button"
                                id="dropdown_small"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Edit
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdown_user_account"
                            >
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={function () {
                                        callbacks.removeElement(todo, "todo");
                                    }}
                                >
                                    <i className="fas fa-trash text-muted"></i>Delete
                                </button>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={function () {
                                        callbacks.duplicateElement(todo);
                                    }}
                                >
                                    <i className="fas fa-copy text-muted"></i>Duplicate
                                </button>
                                <button
                                    className="dropdown-item"
                                    data-toggle="modal"
                                    data-target={`#remindermodal_${todo.id}`}
                                    type="button"
                                >
                                    <i className="fas fa-stopwatch text-muted"></i>Add Reminder
                                </button>
                                <button
                                    className="dropdown-item"
                                    data-toggle="modal"
                                    data-target={`#commentmodal_${todo.id}`}
                                    type="button"
                                >
                                    <i className="fas fa-comment text-muted"></i>Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex m-3">
                        <div className="dropdown my-auto">
                            <button
                                className="btn btn-sm btn-block btn-outline-secondary dropdown-toggle py-1"
                                type="button"
                                id="dropdown_small"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Edit
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdown_user_account"
                            >
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={function () {
                                        callbacks.removeElement(todo, "completed");
                                    }}
                                >
                                    <i className="fas fa-trash text-muted"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="modal fade rounded" id={`remindermodal_${todo.id}`} tabIndex="-1" role="dialog" aria-labelledby={`#remindermodal_${todo.id}`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="p-4">
                                    <h4 className="heading h3">Add Reminder</h4>
                                    <p className="lead text-muted">
                                        Pick a date and time as to when you'd like to be reminded about this todo.
                                    </p>
                                    <div className="form-group">
                                        <div className="input-group input-group-transparent mb-4">
                                            <input type="datetime-local" className="form-control" onChange={event => setReminder(event.target.value)} />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={function () {
                                        callbacks.storeReminder(todo, reminder);
                                    }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade rounded" id={`commentmodal_${todo.id}`} tabIndex="-1" role="dialog" aria-labelledby={`#commentmodal_${todo.id}`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="p-4">
                                    <h4 className="heading h3">Add Comment</h4>
                                    <p className="lead text-muted">
                                        Add a Comment which would be associated with this todo
                                    </p>
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="What's on your mind?" onChange={event => setComment(event.target.value)} rows="3"></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={function () {
                                        callbacks.storeComment(todo, comment);
                                    }}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade rounded" id={`detailsmodal_${todo.id}`} tabIndex="-1" role="dialog" aria-labelledby={`#detailsmodal_${todo.id}`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row justify-content-center">
                                <div className="col-8">
                                    <h4 className="heading h3">#{todo.id}</h4>
                                    <h4 className="heading h4">{todo.title}</h4>
                                    <p className="lead text-muted">
                                        {todo.body}
                                    </p>
                                    {
                                        (todo.comments !== "") ?
                                            <div>
                                                <hr />
                                                <p className="text-muted">{todo.comments}</p>
                                            </div>
                                            : <div></div>
                                    }
                                </div>
                                <div className="col-4">
                                    <small>
                                        <span className="font-weight-bold">Created At:</span><br /><span className="text-muted">{millisecondsToStr(todo.completedAt)} ago</span>
                                    </small>
                                    <br />
                                    <small>
                                        <span className="font-weight-bold">Reminders:</span><br /><span className="text-muted">{(todo.reminder) ? `${todo.reminder.toLocaleDateString()} at ${todo.reminder.toLocaleTimeString()}` : 'No Reminders Set'}</span>
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
