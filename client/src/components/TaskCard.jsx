import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';

export default class TaskCard extends Component {
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
      </Card>
    );
  }
}
