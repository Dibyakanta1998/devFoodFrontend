import React from "react";
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy Name",
        bio: "Default",
        avatar_url: "https://dummyphoto.com",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/Dibyakanta1998");
    const jsonData = await data.json();
    this.setState({
      userInfo: jsonData,
    });
  }
  render() {
    // const { name } = this.props;
    return (
      <div className="user-card">
        <UserContext.Consumer>
          {(data) => <h1 className="text-xl font-bold">{data.loggedInuser}</h1>}
        </UserContext.Consumer>
        <img src={this.state.userInfo.avatar_url} />
        <h2>Name : {this.state.userInfo.name}</h2>
        <h3>Bio : {this.state.userInfo.bio}</h3>
        <h4>Contact : dibyakanta9937@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;
