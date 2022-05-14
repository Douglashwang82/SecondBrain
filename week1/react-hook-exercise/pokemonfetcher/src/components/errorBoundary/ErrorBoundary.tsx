import React, { Component, ErrorInfo } from 'react'
import {GenerateCard} from "../getPokemon/GetPokemon";
import { MyInput } from '../searchBar/SearchBarElements';
import { MyButton } from '../searchBar/SearchBarElements';
import SearchBar from '../searchBar/SearchBar';
const initialSpecial: Attack = {
  name: "-",
  type: "-",
  damage: "-"
}
const initialAttacks: Attacks = {
  special: [initialSpecial]

}
const initialState: DataState = {
  name: "No Pokemon Yet!",
  number: "xxx",
  image: "",
  attacks: initialAttacks,
}
const ErrorState: DataState = {
  name: "Error! :(",
  number: "",
  image: "error",
  attacks: initialAttacks,
}
const LoadingState: DataState = {
  name: "Loading",
  number: "xxx",
  image: "",
  attacks: initialAttacks,
}


type Props = {
    children: JSX.Element;
    handleReset: any;
    handleTarget:any;
    handleOnChange:any;
}

type State = {
    error:Error | any,
    errorInfo: ErrorInfo | any,
}


class ErrorBoundary extends Component<Props, State> {
    state = {
        error:"",
        errorInfo:{ componentStack:""},
    }
  handleErrorReset(){
    this.setState({
      error:"",
      errorInfo:{ componentStack:""},
    })
  }
  componentDidCatch(error:Error, errorinfo:ErrorInfo) {
    this.setState({
      error: error.message,
      errorInfo: errorinfo
    })
    this.props.handleReset();
  }

  handleOnClick(){
    
  }
  render(){
    // if (this.state.errorInfo.componentStack !== "") {
    //   // Error path
    //   return (
    //     <div>
    //      <h2>Something went wrong.</h2>
    //       <details style={{ whiteSpace: 'pre-wrap' }}>
    //         {this.state.error && this.state.error.toString()}
    //         <br />
    //         {this.state.errorInfo.componentStack}
    //       </details>
    //     </div>
    //   );
    // }
    if (this.state.errorInfo.componentStack !== ""){
      return (
      <> 
      
      <SearchBar handleOnClick= {this.props.handleTarget}/>
      <GenerateCard {...ErrorState} name ={this.state.error} handleRest={this.handleErrorReset.bind(this)}></GenerateCard>
      </>  
      )
    }
    return this.props.children;
  }  
}

export default ErrorBoundary