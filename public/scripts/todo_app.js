var TodoApp = React.createClass({
  render: ()=> {
    return (
      <div>
        <TodosList endpoint="http://todo-ang.herokuapp.com/todos"/>
        <AddTodo endpoint="http://todo-ang.herokuapp.com/todos"/>
      </div>
    );
  }
});
 //
var TodosList = React.createClass({
  render:function(){
    return(
      <div className="some_class">
       <h1>Todo React App</h1>
       <Todo className="todos_list" data={this.state.todos}/>
      </div>
    );
  },
  getInitialState:function(){
    return {todos:[]};
  },
  getTodos:function(endpoint){
    return fetch(endpoint).then(response => {
      return response.json()
    }).then(res => {
      this.setState({todos:res});
      console.log("this.state in TodosList");
      console.log(this.state);
      return res;
    },
    (error)=>{
      console.log("error.message");
      console.log(error.message);
    });
  },
  componentDidMount:function(){
    this.getTodos(this.props.endpoint);
  }
});

var Todo = React.createClass({
  render:function(){
    if(this.props.data !== []) {
      var todos = this.props.data.map((todo)=>{
      return(
        <div className="todo" key={todo.id}>
          <form id={todo.id} onSubmit={this.editTodo}>
            <input id={todo.id}  type="text" onChange={this.setTodo} className="todo" placeholder="What needs to be done?" defaultValue={todo.description} />
          </form>
        </div>
        );
      });
        return(
          <div className="todos">
            {todos}
          </div>
        );
      }
    },
    setTodo:function(event){
      event.preventDefault();
      this.setState({id: event.target.id, description: event.target.value});
    },
    componentDidMount:function(){

    },
    editTodo:function(event){
      event.preventDefault();
      if(this.state){
        event.target.id == this.state.id ? this.put(event.target.id) : console.log("this state: null or you havent changed the state");
      }
      else {
        return;
      }
    },
    put:function(todo){
      console.log("todo in put");
      console.log(todo);
    }
});

var AddTodo = React.createClass({
  getInitialState:function(){
    return {description:''};
  },
  render:function(){
    return (
      <div className="addTodo">
        <form onSubmit={this.addTodo}>
          <input type="text" onChange={this.setTodo} className="new-todo" placeholder="What needs to be done?" id='todo_description' />
        </form>
      </div>
    );
  },
  setTodo:function(event){
    this.setState({description: event.target.value});
  },
  addTodo:function(event){
    event.preventDefault();
    var todo = {
      todo: {
        description:this.state.description
      }
    }
    return fetch(this.props.endpoint,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(todo),
        cors:true
    }).then((res)=>{return res.json()}).then((res)=> {console.log("res :", res);},(error)=>{console.log("Error occurred: ", error);})
  }

});

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('todo_app')
);



// function post_todo(object){
//   var object = {
//     todo: {
//       description:object[""]
//     }
//   }
//   return fetch("http://todo-ang.herokuapp.com/todos", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(object)
//     }).then(r => { return r.json(); }).then(function (r) {
//           console.log(r);
//           console.log(r);
//     }, function (e) {
//       console.log("Error occurred " + e);
//   })
// }

// <div className="container" id="todos">
//     <div className="todo">
//       <li>
//         <p>
//            "Build Quotox in React"
//         </p>
//       </li>
//     </div>
//
//     <div className="todo">
//       <li>
//         <p>
//            "Put Quotox in Heroku using express"
//         </p>
//       </li>
//     </div>
//     <div className="todo">
//       <li>
//         <p>
//           "Quotox can post to rails and also get quotes"
//         </p>
//       </li>
//     </div>
//
//     <div className="todo">
//       <li>
//         <p>
//            "Extra Mile: Put in PHP production"
//         </p>
//       </li>
//     </div>
//     <div className="todo">
//       <li>
//         <p>
//            "SOME VARIABLE"
//         </p>
//       </li>
//     </div>
//   </div>
