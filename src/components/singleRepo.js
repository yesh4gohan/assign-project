import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import {editRepo} from '../redux-tools/actions';


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
  state = {
    edit: false,
    name:"",
    desc:"",
    language:"",
    customAlert:false
  };
  handleChange = e => {
    this.setState({[e.target.id]:e.target.value})
  }
  toggleEdit = e => {
    this.setState({ edit: !this.state.edit });
  };
  onSubmit = async (e,username,id) => {
  
    e.preventDefault();
    let {name,desc,language} = this.state;
    let editObj = {name,desc,language};
    
    await this.props.editRepo(username,editObj,id);
    this.setState({customAlert:true});
    setTimeout(()=>{
      this.setState({customAlert:false});
    },1000);
  }
  validate = () =>(this.state.name && this.state.desc && this.state.language)
  normalView = (classes, repo) => (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <label htmlFor="rep">
              <b>Repository</b>
            </label>
            <h2 id="rep">{repo.name}</h2>
          </Paper>
          <Paper className={classes.paper}>
            <label htmlFor="desc">
              <b>Description</b>
            </label>
            <div id="desc">
              {repo.description ? repo.description : "No description found"}
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <label htmlFor="lang">
              <b>Language used</b>
            </label>
            <div id="lang">
              {repo.language ? repo.language : "No language specified"}
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <label htmlFor="cre">
              <b>Created on</b>
            </label>
            <div id="cre">{repo.created_at.toString().substr(0, 10)}</div>
          </Paper>
          <Paper className={classes.paper}>
            <Button color="primary" onClick={this.toggleEdit}>
              Edit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  EditView = (classes, repo) => (
    <div className={classes.root}>
        <form onSubmit={(e)=>{this.onSubmit(e,repo.owner.login,repo.id)}}>
          <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="name">Repo Name</InputLabel>
            <Input
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="language">language used</InputLabel>
            <Input
              id="language"
              value={this.state.language}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="desc">Description</InputLabel>
            <Input
              id="desc"
              value={this.state.desc}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button color="primary" type = "submit" disabled = {!this.validate()}> Submit</Button>
          <Button color="secondary" onClick={this.toggleEdit}>
            {" "}
            Cancel
          </Button>
          {this.state.customAlert?<h3 style = {{"color":"green"}}>Edit successful</h3>:null}
        </form>
      </div>
  );
  render() {
    const { classes, repo } = this.props;
    {
      return this.state.edit ? (
        <div>{this.EditView(classes, repo)}</div>
      ) : (
        <div>{this.normalView(classes, repo)}</div>
      );
    }
  }
}

const mapStateToProps = state => ({
  repos: state.repos.repos
});

const mapDispatchToProps = {
  editRepo
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SingleRepo))
);

{
  /* <div className={classes.root}>
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
      </div> */
}
