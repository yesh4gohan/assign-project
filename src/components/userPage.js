import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SingleRepo from "./singleRepo";
import { deleteRepo } from "../redux-tools/actions";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class UserPage extends React.Component {
  state = {
    viewDetails: false,
    repo: {}
  };
  setRepoDetails = repo => {
    this.setState({ repo }, this.toggleDetailVeiw);
  };
  toggleDetailVeiw = () => {
    this.setState({ viewDetails: !this.state.viewDetails });
  };
  delete = async repo => {
    
    await this.props.deleteRepo(repo.owner.login, repo.id);
    alert("successfully deleted");
  };

  render() {
    const { classes, repos } = this.props;
    {
      return this.state.viewDetails ? (
        <div>
          <Button size="small" color="primary" onClick={this.toggleDetailVeiw}>
            back
          </Button>
          <SingleRepo repo={this.state.repo} />
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={24}>
            {repos.map((repo, index) => {
              return (
                <Grid container item xs={12} sm={6} key={index}>
                  <Paper className={classes.paper}>
                    <Card
                      className={classes.card}
                      key={index}
                      onClick={() => {
                        this.setRepoDetails(repo);
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {repo.name}
                          </Typography>
                          <Typography component="p">
                            {repo.description
                              ? repo.description.substr(0, 40)
                              : "No Description found"}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions />
                    </Card>
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                      this.delete(repo);
                    }}
                  >
                    delete
                  </Button>
                  </Paper>

                  
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  repos: state.repos.repos
});

const mapDispatchToProps = {
  deleteRepo
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(UserPage))
);

{
  /* <div className={classes.root}>
        <Grid container spacing={24}>
          {repos.map((repo, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper className={classes.paper}>
                  <Card className={classes.card} key={index} onClick = {()=>{this.viewDetails(repo.id)}}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {repo.name}
                        </Typography>
                        <Typography component="p">
                          {repo.description
                            ? repo.description.substr(0, 40)
                            : "No Description found"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick = {()=>{this.edit(repo)}}>
                        edit 
                      </Button>
                      <Button size="small" color="secondary" onClick = {()=>{this.delete(repo)}}>
                        delete
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div> */
}
