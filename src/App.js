import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

const Home = () => {
  return <h1>Home Page</h1>;
};

const InvalidPath = () => {
  return <h1>Invalid path</h1>;
};

const UserList = props => {
  const data = props.data;

  return (
    <div className="outer">
      <div>
        <h1>List</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>username</td>
              <td>image</td>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.login}</td>
                <td>
                  <img
                    className="avatar"
                    src={value.avatar_url}
                    alt={value.avatar_url}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const login = this.props.login;

    axios({ method: "get", url: "https://api.github.com/users/" + login })
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }

  backHandler() {
    // this.setState({ data: { login: "Back" } });
    this.props.history.push("/users");
  }

  render() {
    const { data } = this.state;

    return (
      <div className="detail">
        <h1>Detail: </h1>
        <div className="detailContent">
          <p>name: {data.login}</p>
          <p>location: {data.location}</p>
          <p>Following: {data.following}</p>
          <p>followers: {data.followers}</p>
        </div>
        <button onClick={() => this.backHandler()}>Back</button>
      </div>
    );
  }
}

const WithRouterDetail = withRouter(Detail);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], back: false };
  }

  componentDidMount() {
    axios({ method: "get", url: "https://api.github.com/users?per_page=100" })
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }

  render() {
    const { data } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" render={() => <UserList data={data} />} />
          <Route
            exact
            path="/users/:login"
            render={props => (
              <WithRouterDetail login={props.match.params.login} />
            )}
          />
          <Route path="/:invalidPath" component={InvalidPath} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
