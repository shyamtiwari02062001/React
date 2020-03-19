import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                  lastResult: "Cold",
                  color:"	#0000ff"
              });
          }
        
          else if ((randomValue-guessValue)<5 ) {
            this.setState({
                lastResult: "Hot", 
                color:"#FF0000"                
            });
        }
       
        else if ((randomValue-guessValue)>4 && (randomValue-guessValue)<16 ) {
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
      var bac={
          marginTop:100,
          marginRight:500,
          marginLeft:500,
          backgroundColor:"#87ceeb ",
          color:"	#FFFFFF",
      }
      var back={
        marginTop:100,
        marginRight:500,
        marginLeft:500,
        color:"	#000000",
    }
    var mar={
        marginLeft:600,
    }
      
      return(
          <div>
                <div style={bac} class="card">
                <div  class="card-body">
                    
                <form className="form" onSubmit={this.checkGuess}>
                      <label className="m-2">Enter a guess:</label>
                      <input name="guessNumber" type="number" min="1" max="100" ref={(input) => {this.guessNumber = input;}} className="form-control m-2"/>
                      <button type="submit" ref={(button) => {this.submitGuess = button;}} className="btn btn-primary m-2" style={mar}>Submit guess</button >
                      <button onClick={() => window.location.reload(false)} className="btn btn-primary m-2">New Game</button>
              </form>
                </div>
                </div>
              

               
             
              <div>
              <div style={back} class="card">
                <div  class="card-body">
                    
                  <h4 className="m-2">{this.state.guesses}</h4>
                  <h1 style={mystyle}>{this.state.lastResult}</h1>
                  </div>
                </div>
                  
                 </div>
              </div>              
          
      );
  }
}

export default App;
