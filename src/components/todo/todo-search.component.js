import { useRef, useState } from "react";

const SearchBar = ({ todo, completed }) => {
    const [listTodo, setListTodo] = useState([]);
    const [listCompleted, setListCompleted] = useState([]);
    const searchDropdown = useRef(null);

    function searchList(search) {
        var newtodolist = todo.filter(
            (item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.body.toLowerCase().includes(search.toLowerCase())
        );
        setListTodo([...newtodolist]);
        var newcompletedlist = completed.filter(
            (item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.body.toLowerCase().includes(search.toLowerCase())
        );
        setListCompleted([...newcompletedlist]);
    }

    function showSearchDropDown() {
        searchDropdown.current.classList.remove("d-none");
    }

    function hideSearchDropDown() {
        searchDropdown.current.classList.add("d-none");
    }

    return (
        <div className="form-group mt-4 col-md-6 px-0 position-relative">
            <div className="input-group input-group-transparent mb-4">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search To Do"
                    onChange={(event) => searchList(event.target.value)}
                    onFocus={function () {
                        showSearchDropDown();
                    }}
                    onBlur={function () {
                        setTimeout(() => {
                            hideSearchDropDown();
                        }, 100)
                    }}
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <div
                ref={searchDropdown}
                className="card position-absolute top-5 left-0 right-0 rounded px-2 d-none"
                style={{
                    boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    zIndex: "20",
                }}
            >
                {listTodo.length < 1 && listCompleted.length < 1 ? (
                    <div className="d-flex justify-content-center">
                        <p className="text-truncate text-muted mb-1">
                            Couldn't find any item
                        </p>
                    </div>
                ) : (
                    <div></div>
                )}

                {listTodo.map((item) => (
                    <div
                        key={item.id}
                        className="card my-2 p-3"
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        data-toggle="modal" data-target={`#detailsmodal_${item.id}`}
                    >
                        <h5>{item.title}</h5>
                        <p className="text-truncate text-muted mb-1">{item.body}</p>
                        <hr className="my-0" />
                        <small className="mt-2 text-warning">
                            <span className="font-weight-bold">Status: </span>To Do
                        </small>
                    </div>
                ))}

                {listCompleted.map((item) => (
                    <div
                        key={item.id}
                        className="card my-2 p-3"
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <h5>{item.title}</h5>
                        <p className="text-truncate text-muted mb-1">{item.body}</p>
                        <hr className="my-0" />
                        <small className="mt-2 text-success">
                            <span className="font-weight-bold">Status: </span>Completed <i class="fas fa-check"></i>
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
