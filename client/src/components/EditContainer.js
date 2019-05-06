import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './EditContainer.style';

class EditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      success: false
    }
  }
  static contextTypes = {
    router: () => null,
  }

  handleEdit = (e) => {
    e.preventDefault();
    const newTitle = this.getTitle.value;
    const newBody = this.getBody.value;
    const data = {
      newTitle,
      newBody
    };
    this.props.dispatch({ type: 'UPDATE', id: this.props.match.params.postId, data: data });
    this.setState({ success: true });
  }
  render() {
    if(this.props.items.length === 0){
      return <Redirect to='/' />
    }
    return (
      <div style={styles.editContainer}>
        <form onSubmit={this.handleEdit} >
          <div className="form-group">
            <label><p>Edit Title for post id: {this.props.match.params.postId} &nbsp; </p></label>
              <input
                className="form-control"
                type="text"
                name="title"
                defaultValue={this.props.items[this.props.match.params.postId-1].title}
                ref={(input) => this.getTitle = input}
                placeholder="Enter new Post Title"
              />
            <br />
            <label><p>Edit Body for post id: {this.props.match.params.postId} &nbsp; </p></label>
              <textarea
                rows='3'
                className="form-control"
                name="body"
                defaultValue={this.props.items[this.props.match.params.postId-1].body}
                ref={(input) => this.getBody= input}
                placeholder="Enter new Post Body"
              />
            <br />
            <label>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </label>
          </div>
        </form>
        {this.state.success && <p>Success!</p>}
        <br />
        <button
          className="btn btn-outline-primary"
          onClick={this.context.router.history.goBack}>
          Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.records.items,
  loading: state.records.loading,
  error: state.records.error
});
export default connect(mapStateToProps)(EditContainer);