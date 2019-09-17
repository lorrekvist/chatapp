import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from './AuthHelper';

class FriendList extends React.Component {

    state = {
        friendsId: [],
        friends: []
    }

    componentDidMount() {
       this.getFriends();
    }

    getFriends() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/friend/',
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            this.setState({
                friendsId: res.data
            })
            res.data.forEach(
                (element) => 
                {
                    axios({
                    method: 'get',
                    url: 'http://localhost:3001/api/users/' +  element.friend1 + '/' + element.friend2,
                    headers: {
                        authorization: 'Bearer ' + getToken()
                    }
                })
                .then((user) => {
                    this.setState({
                        friends: [...this.state.friends, user.data]
                    })
                })
            })
        });
    }
   
    render() {
        return(
            <div>
                {this.state.friends.map(value => (
                        <Link onClick={this.props.createChat} key={value._id} id={value._id}>{value.displayName}</Link>
                    ))}
            </div>
        );
    }
}

export default FriendList;