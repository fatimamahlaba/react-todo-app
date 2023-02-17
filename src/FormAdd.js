import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addTodo } from "./redux/slice/todo";

export default function FormAdd() {

    const [todo, setTodo] = useState("")
  
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const newTodo = {
            id: "",
            name: todo,
            isDone: false,
            createdAt: (new Date().toLocaleTimeString())
        }
        dispatch(addTodo(newTodo))
        setTodo('')
    }

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <div className="d-flex">
                <Form.Group style={{width: "100%"}}>
                    <Form.Control 
                        required
                        placeholder="Enter Task"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="ms-2">
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </div>
        </Form>
    )
}