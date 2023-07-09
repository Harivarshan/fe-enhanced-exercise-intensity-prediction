import {Component} from 'react'
import UserService from "../../../service/UserService.jsx";

class ListUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }

    }

    // deleteUser(id) {
    //     UserService.deleteUser(id).then(res => {
    //         this.setState({ users: this.state.users.
    //             filter(user => user.id !== id) });
    //     });
    // }
    // viewUser(id) {
    //     this.props.history.push(`/view-user/${id}`);
    // }
    // editUser(id) {
    //     this.props.history.push(`/add-user/${id}`);
    // }
    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        });
    }

    // addUser() {
    //     this.props.history.push('/add-user/_add');
    // }
    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">

                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> User First Name</th>
                            <th> User Last Name</th>
                            <th> User Email Id</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td> {user.Age} </td>
                                        <td> {user.encoded_gender}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListUserComponent