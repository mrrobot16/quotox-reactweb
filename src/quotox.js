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
      <div className="home">
        <Quote/>
        <Detox/>
      </div>
    );
  }
}
// Quotox App Structure

class Quote extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="container quote">
        <h4>Quote of the day</h4>
          <p>
            A Lion does not concern himself with the opinion of a sheep.
          </p>
      </div>
    )
  }
}

class AddQuote extends React.Component {
// Here we can add quotes only for us
}


class Detox extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="container detox">
        <p>Days Alcohol Free: 271</p>
      </div>
    )
  }
}

class AddDetox extends React.Component {
// Here we add our Detox object
}




ReactDOM.render(<QuotoxApp/>,document.getElementById('quotox_app'));
