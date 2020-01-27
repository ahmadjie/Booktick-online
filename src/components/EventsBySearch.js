import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { CardMedia, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { favorite } from "../config/api";
import axios from "axios";
import { withRouter } from "react-router";

class EventsBySearch extends Component {
  state = {
    favoriteEventId: 0,
    events: [],
    isNotFound: false
  };
  componentDidMount() {
    const { match } = this.props;
    axios
      .get(`https://booktick.herokuapp.com/api/v1/event/?title=${match.params.keyword}`)
      .then(res => {
        if (!res.data.length) {
          this.setState({ isNotFound: true });
        }

        this.setState({ events: res.data });
      });
  }

  handleLikeClick = id => () => {
    //change state after click
    this.setState({ favoriteEventId: id });
  };

  render() {
    //get state favoriteEventId
    const favoriteEvent = {
      eventId: this.state.favoriteEventId
    };
    favorite(favoriteEvent);

    if (this.state.isNotFound === true) {
      const { match } = this.props;

      return (
        <div>
          <Header />
          <div style={{ width: "75%", margin: "auto", marginTop: "5%" }}>
            <h1 style={{ marginTop: "2%", color: "#ff5252" }}>Search </h1>
            <Grid container style={{ marginTop: "2%" }}>
              <h2 style={{ color: "#ff5252" }}>
                {match.params.keyword} Not Found
              </h2>
            </Grid>
          </div>
          <Footer />
        </div>
      );
    }
    const { match } = this.props;
    return (
      <div>
        <Header />
        <div
          style={{
            width: "75%",
            margin: "auto",
            backgroundColor: "#fbe9e7",
            marginTop: "5%"
          }}
        >
          <h1 style={{ marginTop: "2%", color: "#ff5252" }}>
            Search {match.params.keyword}
          </h1>
          <Grid container style={{ marginTop: "2%" }}>
            {this.state.events.map(item => {
              return (
                <Grid item xs={4} style={{ marginBottom: "2%" }}>
                  <div style={{ margin: "5px" }}>
                    <Card>
                      <CardActionArea>
                        <Button
                          disabled
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#ff5252",
                            padding: "10px"
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            style={{
                              color: "white",
                              fontSize: "14px"
                            }}
                          >
                            Rp. {item.price}
                          </Typography>
                        </Button>
                        <CardMedia
                          component="img"
                          height="250px"
                          image={item.image}
                        />
                        <CardContent>
                          <Grid container style={{ display: "flex" }}>
                            <Grid item xs={10}>
                              <Link
                                to={`/event/${item.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black"
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {item.title.substring(0, 30)}
                                </Typography>
                              </Link>
                            </Grid>
                            <Grid item xs={1} style={{ marginTop: "2%" }}>
                              <FavoriteIcon
                                style={{ color: "salmon" }}
                                onClick={this.handleLikeClick(item.id)}
                              />
                            </Grid>
                          </Grid>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {item.description.substring(0, 60)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(EventsBySearch);
