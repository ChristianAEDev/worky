import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import TaskCard from './TaskCard';
import { loadTasks } from '../actions';

class TaskList extends Component {
  componentDidMount = () => {
    this.props.loadTasks();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <ul>{_.map(this.props.tasks, task => <TaskCard key={task.id} task={task} />)}</ul>
        </div>
        <Button variant="fab" className={classes.fab}>
          <AddIcon />
        </Button>
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
const styles = theme => ({
  container: {
    'margin-top': '1em',
    'margin-bottom': '1em',
    'margin-left': '10px',
    'margin-right': '10px',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, { loadTasks }))(TaskList);
