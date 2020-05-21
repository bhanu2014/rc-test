import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import './index.css'

class App extends Component {
  constructor() {
    super();
    this.inpRef = React.createRef()
    this.state = {
      name: 'React',
      names:[],
      disableBtn:true,
      error:""
    };
  }
   onClickHandler = (e) => {
     e.preventDefault()

     if(this.state.names.indexOf(this.inpRef.current.value) < 0) {
      this.setState({names:[...this.state.names, this.inpRef.current.value]},() => {
        this.inpRef.current.value = ''
        this.setState({disableBtn: true, error:""})
       })
     }else {
       this.setState({error:"duplicate name added"})
     }
     
   }


   onChangeHandler = (e) => {
    e.preventDefault()
    if (e?.target?.value.match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]+$/i)) {
      this.setState({disableBtn: false})
    }
   }

  render() {
    const {names, disableBtn, error} = this.state
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
          <div className="nameList">{names && names.map(name => <div className="liEl" style={{color:"#"+((1<<24)*Math.random()|0).toString(16)}}>{name}</div>)}</div>
          <div className="main">
            <label>name</label>
            <input type="tex" ref={this.inpRef} onChange={this.onChangeHandler}/>
            {error && <span className="errtxt">{error}</span>}
            <button disabled={disableBtn} onClick={this.onClickHandler}>Add name</button>
          </div>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
