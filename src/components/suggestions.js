import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {setUserRepos} from '../redux-tools/actions';
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {withRouter} from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "50%",
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper
  }
});

class SuggestionBox extends React.Component {
  onClick = async name => {
    await this.props.setUserRepos(name);
    this.props.history.push('/user');
  }
  render() {
    console.log(this.props);
    const { classes } = this.props;
    const { suggestions, notFound } = this.props;
    return suggestions.length ? (
      <List dense className={classes.root}>
        {suggestions.map((suggestion, value) => (
          <ListItem key={value} button onClick = {(e)=>{this.onClick(suggestion.userName)}}>
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${value + 1}`} src={suggestion.avatar} />
            </ListItemAvatar>
            <ListItemText primary={suggestion.userName} />
          </ListItem>
        ))}
      </List>
    ) : notFound ? (
      <List dense className={classes.root} style={{ "border-radius": "10px" }}>
        <ListItem button>
          <ListItemText primary="No results found" />
        </ListItem>
      </List>
    ) : null;
  }
}


const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = {
  setUserRepos
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SuggestionBox)));



