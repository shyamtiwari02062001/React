import React from 'react';
class App extends React.Component{
     refreshPage() {
        window.location.reload(false);
      }

  constructor(props){
      super(props);
      this.state = {
          randomNumber: Math.floor(Math.random() *100) + 1 + "",
          guesses: "",
          lastResult: "",
          color:"",
      };

      this.checkGuess = this.checkGuess.bind(this);
    
  }



  componentDidMount(){
      this.guessNumber.focus();
  }

 

  checkGuess(event){
      event.preventDefault();
      let guessValue = event.target.guessNumber.value;
      let randomValue = this.state.randomNumber;
      event.target.guessNumber.value = "";

      if(guessValue !== "") {
          this.setState((prevState) => ({
              guesses: prevState.guesses === "" ? `Previous guesses: ${guessValue}` : `${prevState.guesses}, ${guessValue}`,
          }));
          if (guessValue === randomValue) {
              this.setState({
                  lastResult: "Correct",
                  color:"#008000"
              });

              this.submitGuess.setAttribute("disabled", "disabled");
              this.guessNumber.setAttribute("disabled", "disabled");

          }  
          else if (randomValue<guessValue) {
              this.setState({
                  lastResult: "cold",
                  color:"	#0000ff"
              });
          }
        
          else if ((randomValue-guessValue)<5 ) {
            this.setState({
                lastResult: "Hot", 
                color:"#FF0000"                
            });
        }
       
        else if ((randomValue-guessValue)>5 && (randomValue-guessValue)<16 ) {
            this.setState({
                lastResult: "Warm",
                color:"	#FFFF00"
            });
        }
       
     
        else {
          this.setState({
              lastResult: "Cold",
              color:"#0000FF",
          });
      }

      }
  }

  render(){
      var mystyle={
          height:50,
          width:150,
          backgroundColor:this.state.color,
      }
      
      return(
          <div>
              <form className="form-inline" onSubmit={this.checkGuess}>
                      <label className="m-2">Enter a guess:</label>
                      <input name="guessNumber" type="number" min="1" max="100" ref={(input) => {this.guessNumber = input;}} className="form-control m-2"/>
                      <button type="submit" ref={(button) => {this.submitGuess = button;}} className="btn btn-primary m-2">Submit guess</button>
              </form>
              <div>
                  <p className="m-2">{this.state.guesses}</p>
                  <h1 style={mystyle}>{this.state.lastResult}</h1>
                  <button onClick={() => window.location.reload(false)}>New Game</button>
                 </div>
              </div>              
          
      );
  }
}

export default App;
