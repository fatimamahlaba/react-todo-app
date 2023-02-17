import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Modal, Table } from "react-bootstrap";

import TodoItem from "./TodoItem";
import FormAdd from "./FormAdd";
import { removeTodo } from "./redux/slice/todo";

function App() {

  const dispatch = useDispatch()

  const todoList = useSelector(state => state.todo.list)

  const [show, setShow] = useState(false)
  const [deleteTodo, setDeleteTodo] = useState({})

  const handleClickRemove = (todo) => {
    setShow(true)
    setDeleteTodo(todo)
  }

  const handleRemove = () => {
    dispatch(removeTodo(deleteTodo))
    setShow(false)
  }

  return (
    <div className="App">
      <Container>
      <h1 className="title">To-do App</h1>
        <Modal className="modal" show={show} onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title className="remove">Remove todo?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="footer">Do you really want to delete it?</Modal.Body>
          <Modal.Footer className="footer">
            <Button  onClick={() => setShow(false)}>
              No
            </Button>
            <Button onClick={handleRemove}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <FormAdd />
        <Table striped hover bordered style={{ textAlign: "center", verticalAlign: "middle" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList && todoList.map(todo => {
              return (
                <TodoItem 
                  key={todo.id} 
                  id={todo.id}
                  name={todo.name} 
                  isDone={todo.isDone} 
                  createdAt={todo.createdAt}
                  updatedAt={todo.updatedAt}
                  onClickRemove={handleClickRemove}
                />
              )
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;