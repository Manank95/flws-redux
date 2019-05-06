import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from './actions/itemsAction';
import { Link } from 'react-router-dom';
import {Typeahead} from 'react-bootstrap-typeahead';
import './App.css';

class HomePage extends Component {
  state = {
    title:'',
    display: false,
    list: this.props.items
  }
  submit = (e) => {
    let newItems = [];
    let marr = this.props.items;
    for (let i of marr){
      if (i.title.includes(this.state.title ? this.state.title : '')) newItems.push(i);
    }
    this.setState({
      display: true,
      list: newItems
    });
    
  }
  onhandleChange = async (e) => {
    if(e.length===0) return;
    await this.setState({title: e[0].title});
    await this.submit();
    console.log(e[0].title);
  }
  onhandleInputChange = async (e) => {
      // console.log(e);
      await this.setState({title: e});
  }
  async componentDidMount() {
    if(this.props.items.length>0) console.log("hello");
    else{
        this.props.dispatch(fetchItems());
    } 
  }
  handleKeyChange = async (e) => {
      if(e.key === 'Enter') await this.submit();
  }
  handleDelete = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    await this.props.dispatch({ type: 'DELETE', id: e.target.id });
    await this.setState({list: this.props.items})
  }

  render() {
    const { loading, error, items } = this.props;
    if(error) {
      return <div>Error: {error.message}</div>
    } 
    if(loading) {
      return <div>Loading....</div>
    }
    else if(items===undefined) {
      return <div>undefined</div>
    } else {
      // console.log(items)
      return (
        <div className='mainBody'>
        <form>
            <div className='searchBox'>
            <Typeahead
                labelKey="title"
                multiple={false}
                options={this.props.items}
                placeholder="Search a Title"
                id='typeahead'
                onInputChange={this.onhandleInputChange}
                ref={(input) => this.getTitle = input}
                onChange={this.onhandleChange}
                onKeyDown={this.handleKeyChange}
            />
            </div>
        </form>
          <div className="container">
            {this.state.display && this.state.list.map(item =>
                <div key={`key-`+item.id} className='row'>
                    <div className="ItemsDiv col-9">
                        <div className="ItemsTitle">{item.title}</div>
                        <div className="ItemsBody">{item.body}</div>
                    </div>
                    <div className="col-3 edit">
                        <Link to={`/edit/${item.id}`}><button type="button" className="btn btn-outline-primary">Edit</button></Link> &nbsp;
                        <button type="button" id={item.id} onClick={this.handleDelete} className="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
            )}
          </div>
        </div>
      )
    } 
  }
}

const mapStateToProps = state => ({
  items: state.records.items,
  loading: state.records.loading,
  error: state.records.error
});

export default connect(mapStateToProps)(HomePage);
