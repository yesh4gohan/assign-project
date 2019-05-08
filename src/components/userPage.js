import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

class UserPage extends React.Component {
  render() {
    const { classes, repos } = this.props;
    console.log(repos)
    return (
      <Grid item xs={12} sm={6}>
      
        {repos.map((repo, index) => {
          return (
            
            <Paper className={classes.paper}>
            <Card className={classes.card} key = {index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={repo.owner.avatar_url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography component="p">
                    {repo.description?repo.description.substr(0,40):"No Description found"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Paper>
            
            
          );
        })}
        </Grid>
  
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
  )(withStyles(styles)(UserPage))
);
