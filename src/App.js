import React from "react";
import Select2 from "./components/Select2";
import Select2Ajax from "./components/Select2Ajax";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
  },
  item: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    justifyContent: "space-around",
  },
};

class App extends React.Component {
  state = {
    todos: [],
    selectedTodo: {},
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

  handleTodoChange = (id) => {
    const { todos } = this.state;
    this.setState(
      {
        ...this.state,
        selectedTodo: todos.find((t) => t.id === parseInt(id)),
      },
      () => {
        console.log(`TODO_ID ${id} is selected!`);
        console.log(this.state.selectedTodo);
      }
    );
  };

  handlePostChange = (id) => console.log(`POST_ID ${id} is selected!`);

  render() {
    const { todos } = this.state;
    const todoList = todos.map((todo) => (
      <option key={todo.id} value={todo.id}>
        {todo.title}
      </option>
    ));

    return (
      <div style={styles.container}>
        <div style={styles.item}>
          <h4>Options added using Children: </h4>
          <Select2 onChange={this.handleTodoChange}>
            <option disabled="disabled" value="-1">
              Please choose from the list: (TODOS)
            </option>
            {todoList}
          </Select2>
        </div>
        <div style={styles.item}>
          <h4>Options added using AJAX internally by select2 library: </h4>
          <Select2Ajax
            onChange={this.handlePostChange}
            url="https://jsonplaceholder.typicode.com/posts"
            dataSet={{
              value: "id",
              text: "title",
            }}
            queryFieldName="search"
          >
            <option disabled="disabled" value="-1">
              Please choose from the list: (POSTS)
            </option>
            {todoList}
          </Select2Ajax>
        </div>
      </div>
    );
  }
}

export default App;
