import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import EditContainer from './components/EditContainer';
import AddContainer from './components/AddContainer';

class App extends Component {
  render () {
    return(
      <BrowserRouter>
        <div className='App'>
          <header>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
              <h1 className="my-0 mr-md-auto font-weight-normal title">1800 FLWS</h1>
              <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">
                  Home
                </Link>
                <Link className="p-2 text-dark" to="/add">
                  Add
                </Link>
              </nav>
            </div>
          </header>
          <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/edit/:postId' component={EditContainer}/>
              <Route path='/add' component={AddContainer}/>
              <Route path="/:error" component={()=><h2 style={{color:'orange'}}>Error: 404! Page not found.</h2>} status={404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;