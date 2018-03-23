import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import { deleteTask } from '../actions';

class TaskCard extends Component {
  onDelete = () => {
    this.props.deleteTask(this.props.task.id);
  };

  render() {
    const { task } = this.props;
    return (
      <Card key={task.id}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {task.title}
          </Typography>
          <Typography color="textSecondary">{task.id}</Typography>
          <Typography component="p">{task.description}</Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={this.onDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

TaskCard.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default connect(null, { deleteTask })(TaskCard);
