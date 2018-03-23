import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import { loadTasks } from '../actions';

class TaskList extends Component {
  componentDidMount = () => {
    this.props.loadTasks();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <ul>{_.map(this.props.tasks, task => <TaskCard key={task.id} task={task} />)}</ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  loadTasks: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

const styles = {
  container: {
    'margin-top': '1em',
    'margin-bottom': '1em',
    'margin-left': '10px',
    'margin-right': '10px',
  },
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, { loadTasks }))(TaskList);
