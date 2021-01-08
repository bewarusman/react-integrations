import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import DataTable from "./components/DataTable";
import Select2 from "./components/Select2";

class App extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          todos: data,
        })
      );
  }

  render() {
    return (
      <Container>
        <Row className="mt-3">
          <Col>
            <DataTable>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "Yes" : "No"}</td>
                  <td>
                    <Button color="warning" className="mr-3">
                      Edit
                    </Button>
                    <Button color="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </DataTable>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Select2 onChange={(id) => console.log(`selected id is ${id}`)}>
              {this.state.todos.map((todo) => (
                <option key={todo.id} value={todo.id}>
                  {todo.title}
                </option>
              ))}
            </Select2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
