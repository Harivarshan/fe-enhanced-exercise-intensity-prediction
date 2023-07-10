import {Component} from 'react'
import UserService from "../../../service/UserService.jsx";
import './viewUser.css'
import {getGender} from "../../util/dataHelper.js";
import AuthService from "../../../service/AuthService.jsx";
import Loading from "../../common/misc/loading.jsx";

class ListUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [], isAuthorized: false, isLoading: true, // history: useHistory(),
        }
        this.deleteUser = this.deleteUser.bind(this);

    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
            this.setState({
                users: this.state.users.filter(user => user["Person ID"] !== id)
            });
        });

    }

    // viewUser(id) {
    //     this.props.history.push(`/view-user/${id}`);
    // }
    // editUser(id) {
    //     this.props.history.push(`/add-user/${id}`);
    // }
    //

    // addUser() {
    //     //     this.props.history.push('/add-user/_add');
    //     // }
    componentDidMount() {

        this.checkLogin().then(() => {
                this.setState({isAuthorized: true})
            }
        )

        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        });

    }

    checkLogin = async () => {
        try {
            const response = await AuthService.validate();
            if (response.status === 200) {
                this.setState({isAuthorized: true});
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                this.setState({isAuthorized: false});
            }
        } finally {
            this.setState({isLoading: false});
        }
    };


    render() {
        if (this.state.isLoading) {
            return <Loading/>
        } else {
            return (<>
                <h2 className="text-center">Users 🧑‍🤝‍🧑</h2>
                <br></br>
                <div className="shadow p-3 rounded-4 mx-auto" style={{width: "fit-content"}}>
                    <div className="row table-responsive">
                        <div className="container">
                            <table className="table scroll-table mb-2">
                                <thead>
                                <tr>
                                    <th className="border-end"> Person ID</th>
                                    <th className="border-end"> Age</th>
                                    <th className="border-end"> Gender</th>
                                    <th className="border-end"> Daily Steps</th>
                                    <th className="border-end"> BMI Category</th>
                                    <th className="border-end"> Pressure</th>
                                    <th className="border-end"> VO<sub>2</sub><sup>MAX</sup></th>
                                    <th> Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map(user => <tr key={user.id}>
                                    <td className="border-end"> {user["Person ID"]}</td>
                                    <td className="border-end"> {user["Age"]} </td>
                                    <td className="border-end"> {getGender(user["encoded_gender"])}</td>
                                    <td className="border-end"> {user["Daily Steps"]} </td>
                                    <td className="border-end"> {user["encoded_BMI_Category"]} </td>
                                    <td className="border-end"> {user["systolic_preasure"]}/{user["diastolic_preasure"]} </td>
                                    <td className="border-end"> {user["VO2_Max"]} </td>
                                    <td className="button-container">
                                        <button className="btn button3 ">
                                            <i className="bi bi-pencil-square text-white"></i>
                                        </button>
                                        <button className="btn button2 "
                                                onClick={() => this.deleteUser(user["Person ID"])}>
                                            <i className="bi bi-x-square-fill text-white"></i>
                                        </button>
                                        <button className="btn button1 ">
                                            <i className="bi bi-zoom-in text-white"></i>
                                        </button>
                                    </td>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </>);
        }
    }

}

export default ListUserComponent