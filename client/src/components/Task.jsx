import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import { getTask } from '../actions';

class Task extends Component {
  state = {
    isEditMode: false,
  };

  componentDidMount() {
    // Since it is not guaranted that the store already contains this task we will load it.
    const { taskID } = this.props.match.params;
    this.props.getTask(taskID);
  }

  onEdit = () => {
    this.setState({ isEditMode: !this.state.isEditMode });
  };

  render() {
    const { classes, task } = this.props;
    const { isEditMode } = this.state;
    if (!task) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <TextField id="title" label="Title" value={task.title} disabled={!isEditMode} fullWidth />
        <TextField
          id="description"
          label="Description"
          value={task.description}
          disabled={!isEditMode}
          fullWidth
        />
        <Button variant="fab" className={classes.fab} onClick={this.onEdit}>
          {isEditMode ? <SaveIcon /> : <EditIcon />}
        </Button>
      </div>
    );
  }
}

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function mapStateToProps(state, ownProps) {
  // Read task id from URL
  const { taskID } = ownProps.match.params;
  // Get the task from the redux store
  return { task: _.find(state.tasks, ['id', parseInt(taskID, 10)]) };
}

export default compose(connect(mapStateToProps, { getTask }), withStyles(styles))(Task);
