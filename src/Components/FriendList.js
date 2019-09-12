import React from 'react';
import axios from 'axios';
import { getToken } from './AuthHelper';

class FriendList extends React.Component {

    state = {
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
            console.log(res.data);
            this.setState({
                friends: res.data
            })
        });
    }

    getUserFromId(id) {
        console.log(id)
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/users/' + id,
            headers: {
                authorization: 'Bearer ' + getToken()
            }
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        });
    }

    render() {
        return(
            <div>
                {this.state.friends.map(value => (
                    <p>{this.getUserFromId(value.friend1).displayName}</p>
                    ))}
            </div>
        );
    }
}

export default FriendList;