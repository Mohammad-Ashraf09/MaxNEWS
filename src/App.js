import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 10;
  apiKey = "507e96576d214a2aaa9bce0532a0fc30";
  country = "in";

  state ={progress:0};
  setProgress=(progress)=>{
    this.setState({progress:progress})
  };
  
  
  render() {
    return (
      <div>
        <LoadingBar color='#f11946' progress={this.state.progress} height={3}/>
        <Navbar/> 
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="technology"/>} />
        </Routes>
      </div>
    )
  }
}