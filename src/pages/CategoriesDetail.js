import React, { Component } from "react";
//components
import Header from "../components/Header";
import Footer from "../components/Footer";
//material-ui
import {
  CardMedia,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

//others
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class CategoriesDetails extends Component {
  state = {
    events: [],
    category: "",
    error: false
  };
  componentDidMount() {
    const { match } = this.props;
    axios
      .get(`https://booktick.herokuapp.com/api/v1/category/${match.params.id}/events`)
      .then(responses => {
        if (responses.data.length > 0) {
          this.setState({ events: responses.data });
        }
      });
    axios
      .get(`https://booktick.herokuapp.com/api/v1/category/${match.params.id}`)
      .then(responses => {
        this.setState({ category: responses.data.name });
      });
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fbe9e7",
          width: "100%",
          height: "100%",
          position: "fixed",
          overflow: "auto",
          top: 0,
          bottom: 0
        }}
      >
        <Header />
        <div style={{ margin: "auto", width: "80%" }}>
          <h1 style={{ color: "#ff5252", marginTop: "5%" }}>
            {this.state.category}
          </h1>
          <Grid container>
            {this.state.events.map(event => {
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
                            backgroundColor: "white",
                            padding: "10px"
                          }}
                        >
                          <Typography variant="body1" color="textSecondary" style={{ color: "#ff5252" }}>
                            {event.price}
                          </Typography>
                        </Button>
                        <CardMedia
                          component="img"
                          height="250px"
                          image={event.image}
                        />
                        <CardContent>
                          <Grid container style={{ display: "flex" }}>
                            <Grid item xs={11}>
                              <Link to={`/event/${event.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                  {event.title.substring(0, 30)}
                                </Typography>
                              </Link>
                            </Grid>
                            <Grid item xs={1}>
                              <FavoriteIcon style={{ color: "salmon" }} />
                            </Grid>
                          </Grid>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {event.description.substring(0, 60)}
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

export default withRouter(CategoriesDetails);
