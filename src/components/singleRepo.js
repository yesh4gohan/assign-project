import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class SingleRepo extends React.Component {
  render() {
    const { classes, repo } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <label htmlFor="rep"><b>Repository</b></label>
              <h2 id = "rep">{repo.name}</h2>
            </Paper>
            <Paper className={classes.paper}>
            <label htmlFor="desc"><b>Description</b></label>
              <div id = "desc">{repo.description?repo.description:"No description found"}</div>
            </Paper>
            <Paper className={classes.paper}>
            <label htmlFor="lang"><b>Language used</b></label>
              <div id = "lang">{repo.language?repo.language:"No language specified"}</div>
            </Paper>
            <Paper className={classes.paper}>
            <label htmlFor="cre"><b>Created on</b></label>
              <div id = "cre">{repo.created_at.toString().substr(0, 10)}</div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repos.repos
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SingleRepo))
);
