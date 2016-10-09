// var todos_endpoint = "https://desolate-spire-35851.herokuapp.com/todos"
var todos_endpoint = "https://todo-ang.herokuapp.com/todos"
var TodoApp = React.createClass({
  render: ()=> {
    // <AddTodo endpoint="https://desolate-spire-35851.herokuapp.com/todos"/>
    return (
      <div>
        <TodosList endpoint={todos_endpoint}/>
        <AddTodo endpoint={todos_endpoint}/>
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
       <Todo className="todos_list" endpoint={todos_endpoint} data={this.state.todos}/>
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
            <input id={todo.id}  type="text" onChange={this.setTodo} className="todo" defaultValue={todo.description} />
          </form>
          <form id={todo.id} onSubmit={this.delete}>
            <input type="submit" className="delete_todo" defaultValue="delete" />
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
      console.log(this.state);
      this.setState({id: event.target.id, description: event.target.value});
      console.log(this.state);
    },
    setID:function(id){
      console.log("");
      this.setState({id:id});
    },
    componentDidMount:function(){

    },
    editTodo:function(event){
      event.preventDefault();
      if(this.state){
        console.log("if");
        console.log(event.target.id);
        console.log(this.state.id);
        event.target.id == this.state.id ? this.put() : console.log("this state: null or you havent changed the state");
      }
      else {
        console.log("else");
        return;
      }
      console.log("this.state");
      console.log(this.state);
    },
    put:function(){
      var todo = {todo: {description: this.state.description}};
      var request = new Request(this.props.endpoint +"/"+ this.state.id,{
      method: "PUT",
      mode: "cors",
      redirect: 'follow',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(todo)
      });
      fetch(request).then(function(res){ console.dir( "res", res ); });
  },
  delete:function(event){
    event.preventDefault();
    this.setID(event.target.id).toPromise().then(console.log(this.state));
    // console.log(this.state);
    // if(this.state.id){
    //   var request = new Request(this.props.endpoint +"/"+ this.state.id,{
    //   method: "DELETE",
    //   mode: "cors",
    //   redirect: 'follow',
    //   headers: new Headers({'Content-Type': 'application/json'}),
    //   body: JSON.stringify(todo)
    //   });
    //   fetch(request).then(function(res){ console.dir( "res delete request", res ); });
    // }
    // else {
    //   console.log(this.state);
    // }


    // var request = new Request(this.props.endpoint +"/"+ this.state.id,{
    // method: "DELETE",
    // mode: "cors",
    // redirect: 'follow',
    // headers: new Headers({'Content-Type': 'application/json'}),
    // body: JSON.stringify(todo)
    // });
    // fetch(request).then(function(res){ console.dir( "res delete request", res ); });
  }


});
// return this.http
//     .put(this.todo_end + '/' + todo.id, JSON.stringify(updated_todo), { headers: headers })
//     .toPromise()
//     .then(function (res) { return res.json(); });

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
    var request = new Request(this.props.endpoint, {method:"POST", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(todo)});
    return fetch(request).then((res)=>{return res.json()}).then((res)=> {console.log("res :", res) }, (error)=>{console.log("Error occurred: ", error)})
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

// FETCH WAY
// put:function(){
//   console.log("todo in put");
//   var todo = {
//     todo: {
//       id:this.state.id,
//       description: this.state.description
//     }
//   }
//   console.log(todo);
//   var request = new Request(this.props.endpoint+"/"+this.state.id, {method:"PUT", mode:"cors", headers: new Headers({"Content-Type":"application/json"}), body:JSON.stringify(todo), redirect:"follow"});
//   console.log("request");
//   console.log(request);
//   fetch(request).then((res)=>{return res.json()}).then((res)=> {console.log("res :", res) }, (error)=>{console.log("Error occurred: ", error)});
// }
