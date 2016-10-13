const todos_endpoint = "https://todo-ang.herokuapp.com/todos"

class TodoApp extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(<TodosList/>);
  }
}

class Todo extends React.Component{
  constructor(){
    super();
    this.setTodo =  this.setTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.putTodo =  this.putTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.state = {id:'', description:''}
  }

  render(){
    if(this.props.data !== []){
      var todos = this.props.data.map((todo)=>{
        return (
          <div className="todo" key={todo.id}>
            <form id={todo.id} onSubmit={this.editTodo}>
              <input id={todo.id} type="text" onChange={this.setTodo} className="todo" defaultValue={todo.description} />
            </form>
         <input id={todo.id} type="submit" onClick={this.deleteTodo} className="delete_todo" defaultValue="delete" />

          </div>
        );
      });
      return (
        <div className="todos">
            {todos}
        </div>
      );
    }
  }

  setTodo(event){
    event.preventDefault();
    this.setState({
      id: event.target.id,
      description: event.target.value
    })
  }

  editTodo(event){
    event.preventDefault();
    this.state ? event.target.id == this.state.id ? this.putTodo(): console.log("this state: null or you havent changed the state") : console.log("else");
  }

  putTodo(){
    let todo = {todo: { description: this.state.description } }
    let request = new Request(todos_endpoint+"/"+this.state.id, {
      method:"PUT",
      mode:"cors",
      redirect:"follow",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify(todo)
    });
    fetch(request).then((res)=>{ this.props.getTodos(todos_endpoint) }, (error)=>{console.log("error message: ", error)});
  }

  deleteTodo(event){
    event.preventDefault();
    var request = new Request(todos_endpoint +"/"+ event.target.id,{
    method: "DELETE",
    mode: "cors",
    redirect: 'follow',
    headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request).then((res)=>{ this.props.getTodos(todos_endpoint) }, (error)=>{console.log("error message: ", error)});
  }

}

class TodosList extends React.Component {
  constructor(){
    super();
    this.getTodos = this.getTodos.bind(this)
    this.getTodos(todos_endpoint)
    this.state = {todos:[]}
  }

  render(){
    return(
          <div className="some_class">
           <h1>Todo React App</h1>
           <Todo className="todos_list" getTodos={this.getTodos} data={this.state.todos}/>
           <AddTodo getTodos={this.getTodos}/>
          </div>
        );
  }

  getTodos(endpoint){
    return fetch(endpoint).then(response => {
      return response.json()
    }).then(res => {
      this.setState({todos:res});
      return res;
    },
    (error)=>{
      console.log("error.message");
      console.log(error.message);
    });
  }
}

class AddTodo extends React.Component {
    constructor(props){
      super(props)
      console.log("this");
      console.log(this);
      this.state = {description:''};
      this.setTodo = this.setTodo.bind(this)
      this.addTodo = this.addTodo.bind(this);
    }
    render(){
      return (
        <div className="addTodo">
          <form onSubmit={this.addTodo}>
            <input type="text" onChange={this.setTodo} className="new-todo" placeholder="What needs to be done?" id='todo_description' />
          </form>
        </div>
      );
    }
    setTodo(event){
      this.setState({description: event.target.value});
    }
    addTodo(event){
      event.preventDefault();
      var todo = {
        todo: {
          description:this.state.description
        }
      }
      var request = new Request(todos_endpoint, {method:"POST", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(todo)});
      return fetch(request).then((res)=>{return res.json()}).then((res)=> { console.log("res :", res), this.props.getTodos(todos_endpoint) }, (error)=>{console.log("Error occurred: ", error)});
    }

}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('todo_app')
);
