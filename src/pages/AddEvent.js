import React, { Component } from "react";
//components
import Header from "../components/Header";
import Footer from "../components/Footer";
//redux
import { connect } from "react-redux";
import { getCategories } from "../_actions/categories";
//material - ui
import { Grid, Button, TextField, MenuItem } from "@material-ui/core";
//config
import { addEvent } from "../config/api";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      categoryId: 0,
      starTime: "",
      endTime: "",
      price: 0,
      description: "",
      address: "",
      urlmaps: "",
      image: ""
    };
  }

  componentDidMount() {
    this.props.getCategories();
  }
  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  onChangeCategory = e => {
    this.setState({ categoryId: e.target.value });
  };
  onChangeStarTime = e => {
    this.setState({ starTime: e.target.value });
  };
  onChangeEndTime = e => {
    this.setState({ endTime: e.target.value });
  };
  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  onChangeAddress = e => {
    this.setState({ address: e.target.value });
  };
  onChangeUrlMap = e => {
    this.setState({ urlmaps: e.target.value });
  };
  onChangeImage = e => {
    this.setState({ image: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const event = {
      title: this.state.title,
      categoryId: this.state.categoryId,
      starTime: this.state.starTime,
      endTime: this.state.endTime,
      price: this.state.price,
      description: this.state.description,
      address: this.state.address,
      urlmaps: this.state.urlmaps,
      image: this.state.image
    };
    addEvent(event);
  };

  render() {
    const { data, isLoading, error } = this.props.categories;
    const checkToken = localStorage.getItem("token");
    if (!checkToken) {
      window.location = "/login";
    } else {
      if (isLoading) {
        return (
          <div>
            <h1>ini loading</h1>
          </div>
        );
      }
      if (error) {
        return (
          <div>
            <h1>eror</h1>
          </div>
        );
      }

      return (
        <div>
          <Header />
          <div style={{ margin: "auto", width: "75%" }}>
            <h1 style={{ color: "#ff5252" }}> Add Event </h1>
            <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
              <Grid item style={{ width: "90%", marginTop: "5%", margin: "auto" }}>
                <form>
                  <TextField name="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    label="Title Event"
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="categoryId"
                    select
                    label="Select"
                    value={this.state.categoryId}
                    onChange={this.onChangeCategory}
                    helperText="Select Category"
                    fullWidth
                    style={{ marginBottom: "30px" }}
                  >
                    {data.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <TextField
                    name="starTime"
                    label="Start Time"
                    value={this.state.starTime}
                    onChange={this.onChangeStarTime}
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true
                    }}
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="endTime"
                    label="End Time"
                    value={this.state.endTime}
                    onChange={this.onChangeEndTime}
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true
                    }}
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="rice"
                    label="Price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="description"
                    label="Description Event"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="address"
                    label="Adress Event"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    required
                    fullWidth
                  />
                  <br />
                  <TextField
                    name="urlmaps"
                    label="URL Map"
                    value={this.state.urlmaps}
                    onChange={this.onChangeUrlMap}
                    required
                    fullWidth
                  />
                  <iframe src={`${this.state.urlmaps}`} width="300" height="300" />
                  <br />
                  <TextField
                    name="image"
                    label="Upload Pamflet"
                    value={this.state.image}
                    onChange={this.onChangeImage}
                    required
                    fullWidth
                  />
                  <br />
                  <img src={this.state.image} style={{ width: "100%", marginTop: "5%" }} />
                  <div style={{ width: "100%", marginTop: "5%" }}>
                    <Button variant="contained" onClick={this.onSubmit} style={{ backgroundColor: "#ff5252", color: "white" }}>
                      Publish
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
