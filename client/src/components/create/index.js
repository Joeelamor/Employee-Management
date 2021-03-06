import React from "react";
import { connect } from "react-redux";
import { createEmployee, getManager } from "../../redux/actions";
import Loading from "../loading";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import image from "../data/image";

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

const styles = theme => ({
  layout: {
    padding: `0 ${theme.spacing.unit * 3}px`,
    maxWidth: 600,
    margin: "0 auto"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2
  },
  textField: {
    width: 300
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
    borderRadius: 0,
    background: "white"
  }
});

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      title: "",
      sex: "",
      startDate: "",
      officePhone: "",
      cellPhone: "",
      sms: "",
      email: "",
      managerId: "",
      managerName: "",
      emailError: "",
      officePhoneError: "",
      cellPhoneError: "",
      smsError: ""
    };
  }

  componentDidMount() {
    this.props.getManagerList();
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleEmail = event => {
    if (event.target.value.match(/\S+@\S+\.\S+/)) {
      this.setState({ emailError: "", email: event.target.value });
    } else {
      this.setState({
        emailError: "Invalid format: xxxxxx@xxxx.xxx",
        email: event.target.value
      });
    }
  };

  handleOfficePhone = event => {
    if (event.target.value.match(/^\d{10}$/)) {
      this.setState({ officePhoneError: "", officePhone: event.target.value });
    } else {
      this.setState({
        officePhoneError: "Invalid format: XXXXXXXXXX",
        officePhone: event.target.value
      });
    }
  };

  handleCellPhone = event => {
    if (event.target.value.match(/^\d{10}$/)) {
      this.setState({ cellPhoneError: "", cellPhone: event.target.value });
    } else {
      this.setState({
        cellPhoneError: "Invalid format: XXXXXXXXXX",
        cellPhone: event.target.value
      });
    }
  };

  handleSms = event => {
    if (event.target.value.match(/^\d{10}$/)) {
      this.setState({ smsError: "", sms: event.target.value });
    } else {
      this.setState({
        smsError: "Invalid format: XXXXXXXXXX",
        sms: event.target.value
      });
    }
  };

  handleAvatar = e => {
    if (e.target.value) {
      let file = e.target.files[0];
      getBase64(file).then(base64 => {
        this.setState({ avatar: base64 });
      });
    }
  };

  handleChangeManager = e => {
    this.setState({
      managerId: e.target[e.target.selectedIndex].id,
      managerName: e.target.value
    });
  };

  handleBack = () => {
    this.props.history.push("/");
  };

  onSubmit = e => {
    e.preventDefault();
    let employee = {
      avatar: this.state.avatar,
      name: this.state.name,
      title: this.state.title,
      sex: this.state.sex,
      startDate: this.state.startDate,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      sms: this.state.sms,
      email: this.state.email,
      managerId: this.state.managerId,
      managerName: this.state.managerName
    };
    this.props.createNewEmployee(employee, this.props.history);
  };

  render() {
    const { isLoading, err, classes, managers } = this.props;
    if (err) throw err;
    return isLoading ? (
      <Loading />
    ) : (
      <form className={classes.layout}>
        <h1>New Employee</h1>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              {this.state.avatar === "" ? (
                <Avatar
                  alt={this.state.name}
                  src={image}
                  className={classes.bigAvatar}
                />
              ) : (
                <Avatar
                  alt={this.state.name}
                  src={this.state.avatar}
                  className={classes.bigAvatar}
                />
              )}

              <p style={{ fontSize: "12px" }}>
                Please select a photo as avatar
              </p>
              <input
                accept=".jpg, .jpeg, .png"
                className={classes.input}
                id="icon-button-photo"
                onChange={this.handleAvatar}
                type="file"
              />
            </Grid>
            <Grid item xs={6}>
              <div style={{ margin: "10px" }}>
                <TextField
                  placeholder="name"
                  label="Name"
                  id="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                />
              </div>
              <div style={{ margin: "10px", marginTop: "-10px" }}>
                <TextField
                  select
                  label="Title"
                  id="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select your title"
                  margin="normal"
                >
                  {["", "CEO", "CFO", "COO", "VP", "Senior VP", "AVP"].map(
                    option => (
                      <option key={option + "2122"} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </TextField>
              </div>
              <div style={{ margin: "10px", marginTop: "-30px" }}>
                <TextField
                  select
                  label="Sex"
                  id="sex"
                  value={this.state.sex}
                  onChange={this.handleChange}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select your sex"
                  margin="normal"
                >
                  {["", "Male", "Female"].map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </div>
              <div style={{ margin: "10px" }}>
                <TextField
                  type="date"
                  placeholder="start date"
                  label="Start Date"
                  id="startDate"
                  onChange={this.handleChange}
                  value={this.state.startDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div style={{ margin: "10px" }}>
                <TextField
                  placeholder="office phone"
                  label="Office Phone"
                  id="officePhone"
                  error={!!this.state.officePhoneError}
                  helperText={this.state.officePhoneError}
                  onChange={this.handleOfficePhone}
                  value={this.state.officePhone}
                />
              </div>
              <div style={{ margin: "10px" }}>
                <TextField
                  placeholder="cell phone"
                  label="Cell Phone"
                  id="cellPhone"
                  error={!!this.state.cellPhoneError}
                  helperText={this.state.cellPhoneError}
                  onChange={this.handleCellPhone}
                  value={this.state.cellPhone}
                />
              </div>
              <div style={{ margin: "10px" }}>
                <TextField
                  placeholder="sms"
                  label="SMS"
                  id="sms"
                  error={!!this.state.smsError}
                  helperText={this.state.smsError}
                  onChange={this.handleSms}
                  value={this.state.sms}
                />
              </div>
              <div style={{ margin: "10px" }}>
                <TextField
                  placeholder="email"
                  label="Email"
                  id="email"
                  error={!!this.state.emailError}
                  helperText={this.state.emailError}
                  onChange={this.handleEmail}
                  value={this.state.email}
                />
              </div>
              <div style={{ margin: "10px", marginTop: "-15px" }}>
                <TextField
                  select
                  label="Manager"
                  id="managerId"
                  value={this.state.managerName}
                  onChange={this.handleChangeManager}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select your manager"
                  margin="normal"
                >
                  {[{ _id: "", name: "" }, ...managers].map(manager => (
                    <option
                      key={manager._id}
                      value={manager.name}
                      id={manager._id}
                    >
                      {manager.name}
                    </option>
                  ))}
                </TextField>
              </div>
              <div>
                <Tooltip title="Back">
                  <IconButton
                    aria-label="Back"
                    color="primary"
                    onClick={this.handleBack}
                  >
                    Back
                  </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                  <IconButton
                    aria-label="Save"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Save
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    employees: state.employeeList.employees,
    managers: state.managerList.managers,
    isLoading: state.employeeList.isLoading,
    err: state.employeeList.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewEmployee: (employee, history) => {
      dispatch(createEmployee(employee, history));
    },
    getManagerList: () => {
      dispatch(getManager());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Create));
