import React, { Component } from "react";
import { Grid, Button, Avatar, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile } from "../config/api";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      image: ""
    };
  }

  componentDidMount() {
    const { data } = this.props.user;
    this.setState({
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image
    });
  }
  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  onChangePhone = e => {
    this.setState({ phone: e.target.value });
  };

  onChangeImage = e => {
    this.setState({ image: e.target.value });
  };

  onSubmit = e => {
    const newData = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      image: this.state.image
    };

    editProfile(newData);
  };

  render() {
    const { isLoading, eror } = this.props.user;
    if (isLoading) {
      return (
        <div>
          <h1>Mohon Tunggu...</h1>
        </div>
      );
    }
    if (eror) {
      return (
        <div>
          <h1>Something Error</h1>
        </div>
      );
    }

    return (
      <div>
        <div style={{ marginTop: "5%", color: "#ff5252" }}>
          <h1>Edit Profile</h1>
        </div>
        <Grid container>
          <Grid item xs={9}>
            <form>
              <TextField
                label="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChangeName}
                required
                style={{ width: "100%" }}
                key={1}
              />
              <br />
              <TextField
                label="Email"
                name="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                required
                style={{ width: "100%" }}
                key={2}
              />
              <br />
              <TextField
                label="Phone"
                name="Phone"
                value={this.state.phone}
                onChange={this.onChangePhone}
                required
                style={{ width: "100%" }}
                key={3}
              />
              <br />
              <TextField
                label="Image"
                name="Image"
                value={this.state.image}
                onChange={this.onChangeImage}
                required
                style={{ width: "100%" }}
                key={4}
              />
              <br />
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "none" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    backgroundColor: "white",
                    color: "#ff5252",
                    marginTop: "10px"
                  }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "#ff5252",
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "10px"
                }}
                onClick = {this.onSubmit}
              >
                Save
              </Button>
            </form>
          </Grid>
          <Grid item xs={3} style={{ width: 128, height: 128 }}>
            <Avatar
              style={{
                width: 128,
                height: 128,
                marginTop: "6%",
                marginLeft: "75%"
              }}
              src={`${this.state.image}`}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //userDetail dari reducer
    //engga ada dispatch karena udah ada di App
    user: state.userDetail
  };
};

export default connect(mapStateToProps)(EditProfile);
