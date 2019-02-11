import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], detail: null };
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

  onClickHandler = login => {
    axios({ method: "get", url: "https://api.github.com/users/" + login })
      .then(response => {
        console.log(response);
        this.setState({ detail: response.data });
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  render() {
    const { data, detail } = this.state;
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
                <tr
                  key={index}
                  onClick={() => this.onClickHandler(value.login)}
                >
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
        <div className="detail">
          <h1>Detail: </h1>
          <div className="detailContent">
            {detail ? (
              <div>
                <p>name: {detail.name}</p>
                <p>location: {detail.location}</p>
                <p>Following: {detail.following}</p>
                <p>followers: {detail.followers}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
