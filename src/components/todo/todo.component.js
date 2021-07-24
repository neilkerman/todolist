import TodoContainer from "./todo-container.component";
import { useState } from "react";
import SearchBar from "./todo-search.component";
import TodoModel from "./../../models/todo.model";
import AddTodo from './addtodo.component';

var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

var count = 0;

const Todo = () => {
    var todoList = [];
    var completeList = [];

    const [todos, updateTodos] = useState(todoList);
    const [completes, updateCompletes] = useState(completeList);

    const callbacks = {
        markCompleted: function (todo, type) {
            if (type === 'todo') {
                var items = removeByAttr(todos, 'id', todo.id);
                updateTodos([...items]);
                var completeditems = completes;
                todo.update({ completedAt: new Date().getMilliseconds() })
                completeditems.push(todo);
                updateCompletes(completeditems);
            } else if (type === 'completed') {
                var completeitems = removeByAttr(completes, 'id', todo.id);
                updateCompletes([...completeitems]);
                var todoitems = todos;
                todo.update({ completedAt: "" })
                todoitems.push(todo);
                updateTodos(todoitems);
            }
        },

        saveTodo: function (title, body) {
            if (title && body) {
                todos.push(new TodoModel({
                    id: (count + 1).toString(),
                    title: title,
                    body: body,
                    createdAt: new Date().getMilliseconds()
                }));

                count = count + 1;

                updateTodos([...todos]);
            }
        },

        removeElement: function (todo, type) {
            if (type === 'todo') {
                var items = removeByAttr(todos, 'id', todo.id);
                updateTodos([...items]);
            } else if (type === 'completed') {
                var completeditems = removeByAttr(completes, 'id', todo.id);
                updateCompletes([...completeditems]);
            }
        },

        duplicateElement: function (todo) {
            todos.push(new TodoModel({
                id: (todos.length + 1).toString(),
                title: todo.title,
                body: todo.body,
            }));

            updateTodos([...todos]);
        },

        storeReminder: function (todo, value) {
            todo.update({ reminder: new Date(value) });
            updateTodos([...todos]);
        },

        storeComment: function (todo, value) {
            todo.update({ comments: value });
            updateTodos([...todos]);
        },

    }

    return (
        <div>
            <AddTodo callbacks={callbacks} />
            <SearchBar todo={todos} completed={completes} />
            <TodoContainer heading="To Do" type="todo" todos={todos} updateTodos={updateTodos} callbacks={callbacks} />
            <TodoContainer heading="Completed" type="completed" todos={completes} updateTodos={updateCompletes} callbacks={callbacks} />
        </div>
    );
};

export default Todo;
