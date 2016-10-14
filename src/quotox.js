class QuotoxApp extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(<Home/>);
  }
}

class Home extends React.Component {
  // Main Screen
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <h1>Home</h1>
        <div className="container detox">
          <p>Days Alcohol(variable) Free: 271</p>
        </div>
      </div>
    )
  }

// Quotox App Structure

class Quote extends React.Component {
// Here we
// Quote of the day
// A Lion does not concern himself with the opinion of Sheep
}

class Detox extends React.Component {
// Here we show how many clean days
}

class AddDetox extends React.Component {
// Here we add our Detox object
}

class AddQuote extends React.Component {
// Here we can add quotes only for us
}



ReactDOM.render(
  <QuotoxApp/>,
  document.getElementById('quotox_app')
);
