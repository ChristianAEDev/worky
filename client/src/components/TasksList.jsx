import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { loadTasks } from '../actions';

class TasksList extends Component {
  componentDidMount = () => {
    this.props.loadTasks();
  };

  render() {
    return (
      <div>
        <Typography variant="display1">Tasks</Typography>
        <ul>{_.map(this.props.tasks, task => <li key={task.id}>{task.title}</li>)}</ul>
      </div>
    );
  }
}

TasksList.propTypes = {
  loadTasks: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

export default connect(mapStateToProps, { loadTasks })(TasksList);
