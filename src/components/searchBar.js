import React from "react";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { setAllUsers } from "../redux-tools/actions";
import SuggestBox from "./suggestions";
const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: "10px",
    backgroundColor: "#bbdefb"
  },
  searchIcon: {
    width: theme.spacing.unit * 10,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNames: [],
      avatars: [],
      searchTerm: "",
      suggestions:[],
      notFound:false
    };
  }

  async componentDidMount() {
    await this.props.setAllUsers();
  }
  onChange = e => {
    this.setState({ searchTerm: e.target.value,notFound:true}, this.loadSuggestions);
  };
  loadSuggestions = () => {
    let len = this.state.searchTerm.length;
    let suggestions = [];
    let prom = new Promise((resolve,reject)=>{
      suggestions = this.props.users.filter(
        user =>
          (len && user.login.toString().substr(0, len).toLowerCase() ===
          this.state.searchTerm)
      ).map(user=>{
        return {
          userName:user.login,
          avatar:user.avatar_url,
          id:user.id
        }
      })
      resolve();
    })
    prom.then(()=>{
      len === 0 ?this.setState({suggestions,notFound:false}):this.setState({suggestions});
    })    
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={this.onChange}
            placeholder="Search…"
            value={this.state.searchTerm}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </Grid>
        <SuggestBox suggestions={this.state.suggestions} notFound = {this.state.notFound} />
      </Grid>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = {
  setAllUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchAppBar));
