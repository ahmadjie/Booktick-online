import React, { Component } from "react";
//components
import Header from "../components/Header";
import Footer from "../components/Footer";
//material-ui
import { Grid, Card, Button, Divider } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FacebookIcon from "@material-ui/icons/Facebook";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import ShareIcon from "@material-ui/icons/Share";
import CallIcon from "@material-ui/icons/Call";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import EventNoteIcon from "@material-ui/icons/EventNote";
//others
import { withRouter } from "react-router";
import { orderEvent } from "../config/api";
import axios from "axios";

class EventDetails extends Component {
  state = {
    event: [],
    category: [],
    user: [],
    count: 1
  };
  componentDidMount() {
    const { match } = this.props;

    axios
      .get(`https://booktick.herokuapp.com/api/v1/event/${match.params.id}`)
      .then(res => {
        this.setState({ event: res.data });
        this.setState({ category: res.data.category });
        this.setState({ user: res.data.createdBy });
      });
  }
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrementCount = () => {
    if (this.state.count <= 1) {
      this.setState({ count: 1 });
    } else {
      this.setState({ count: this.state.count - 1 });
    }
  };

  orderPost = () => {
    const { match } = this.props;
    const checkToken = localStorage.getItem("token");
    const order = {
      quantity: this.state.count,
      totalPrice: this.state.event.price * this.state.count,
      eventId: match.params.id
    };
    if (checkToken) {
      orderEvent(order).then(() => {
        window.location = "/payment";
      });
    } else {
      window.location = "/login";
    }
  };
  render() {
    return (
      <div>
        <Header />
        <Card
          style={{
            margin: "auto",
            width: "80%",
            marginTop: "10%",
            backgroundColor: "#fbe9e7"
          }}
        >
          <Grid
            style={{
              display: "flex",
              margin: "auto",
              itemAlign: "center",
              justifyContent: "center"
            }}
          >
            <img src={this.state.event.image} style={{ width: "100%" }} />
          </Grid>
          <Grid container style={{ margin: "5%" }}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h4">{this.state.event.title}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4">
                  Rp.{this.state.event.price * this.state.count}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8} style={{ marginTop: "3%" }}>
                <Typography variant="h6" style={{ color: "#ff5252" }}>
                  {this.state.category.name}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "3%" }}>
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    backgroundColor: "white",
                    color: "#ff5252",
                    marginRight: "2%"
                  }}
                  onClick={this.decrementCount}
                >
                  -
                </Button>
                {this.state.count}
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    backgroundColor: "white",
                    color: "#ff5252",
                    marginLeft: "2%"
                  }}
                  onClick={this.incrementCount}
                >
                  +
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    backgroundColor: "#ff5252",
                    color: "white",
                    marginLeft: "2%"
                  }}
                  onClick={this.orderPost}
                >
                  BUY
                </Button>
              </Grid>
            </Grid>
            <Divider style={{ margin: "5%", padding: "1px" }} light />
            <Grid container>
              <Grid item xs={4}>
                <div style={{ width: "90%" }}>
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    Hosted By
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <img
                        src={`${this.state.user.image}`}
                        style={{
                          width: "125px",
                          height: "125px",
                          border: "3px solid #000000",
                          borderRadius: "50%"
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        textAlign: "center"
                      }}
                    >
                      <Typography variant="h6" color="textSecondary">
                        {this.state.user.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Date Time
                </Typography>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <EventNoteIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" color="textSecondary">
                    {this.state.event.starTime}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Contact Person
                </Typography>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <PermContactCalendarIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" color="textSecondary">
                    {this.state.user.name}
                  </Typography>
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <CallIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" color="textSecondary">
                    {this.state.user.phone}
                  </Typography>
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <MailOutlineIcon style={{ marginRight: "10px" }} />
                  <Typography variant="body1" color="textSecondary">
                    {this.state.user.email}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Grid
          container
          style={{
            margin: "auto",
            width: "80%",
            marginTop: "10%",
            backgroundColor: "#fbe9e7"
          }}
        >
          <Grid item xs={6}>
            <div style={{ margin: "auto", width: "90%" }}>
              <h2 style={{ textAlign: "center" }}>Event Description</h2>
              <Typography
                variant="body1"
                style={{ marginTop: "5%", textAlign: "justify" }}
                color="textSecondary"
              >
                {this.state.event.title}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "5%", textAlign: "justify" }}
                color="textSecondary"
              >
                {this.state.event.description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ margin: "auto", width: "90%" }}>
              <h2 style={{ textAlign: "center" }}>Location</h2>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LocationOnIcon style={{ color: "#9e9e9e" }} />
                <Typography variant="body1" color="textSecondary">
                  {this.state.event.address}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "5%"
                }}
              >
                <iframe
                  src={`${this.state.event.urlmaps}`}
                  width="300"
                  height="300"
                />
              </div>
              <h2 style={{ textAlign: "center" }}>Share Event</h2>
              <div style={{display: "flex",justifyContent: "center",margin: "5%"}}>
                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FacebookIcon />}
                    size="small"
                  >
                    Facebook
                  </Button>
                </div>
                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1e88e5", color: "white" }}
                    startIcon={<TwitterIcon />}
                    size="small"
                  >
                    Twitter
                  </Button>
                </div>
                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#616161" }}
                    startIcon={<ShareIcon />}
                    size="small"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default withRouter(EventDetails);
