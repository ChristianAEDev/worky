import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { getTask } from '../actions';

class Task extends Component {
  componentDidMount() {
    // Since it is not guaranted that the store already contains this task we will load it.
    const { taskID } = this.props.match.params;
    this.props.getTask(taskID);
  }

  render() {
    const { task } = this.props;
    if (!task) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <TextField id="title" label="Title" value={task.title} disabled fullWidth />
        <TextField
          id="description"
          label="Description"
          value={task.description}
          disabled
          fullWidth
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // Read task id from URL
  const { taskID } = ownProps.match.params;
  // Get the task from the redux store
  return { task: _.find(state.tasks, ['id', parseInt(taskID, 10)]) };
}

export default connect(mapStateToProps, { getTask })(Task);
