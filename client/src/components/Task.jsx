import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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

  handleSubmit = () => {
    console.log('onSubmit');
  };

  render() {
    const { isEditMode } = this.state;
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Field
          name="title"
          component={({ input }) => (
            <TextField {...input} label="Title" disabled={!isEditMode} fullWidth />
          )}
        />
        <Field
          name="description"
          component={({ input }) => (
            <TextField {...input} label="Description" disabled={!isEditMode} fullWidth />
          )}
        />
        <Button type="submit" variant="fab" className={classes.fab} onClick={this.onEdit}>
          {isEditMode ? <SaveIcon /> : <EditIcon />}
        </Button>
      </form>
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

function validate(values) {
  console.log(values);
  const errors = {};

  return errors;
}

function mapStateToProps(state, ownProps) {
  // Read task id from URL
  const { taskID } = ownProps.match.params;

  if (taskID) {
    // "initialValues" is used by redux-form to have the initial values...
    const initialValues = _.find(state.tasks, ['id', parseInt(taskID, 10)]);
    return {
      initialValues,
    };
  }

  // Get the task from the redux store
  return {};
}

export default compose(
  connect(mapStateToProps, { getTask }),
  withStyles(styles),
  reduxForm({ validate, form: 'TaskForm' }),
)(Task);
