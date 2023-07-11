import {useEffect, useState} from 'react';
import UserService from '../../../service/UserService';
import './viewUser.css';
import {getGender} from '../../util/dataHelper';
import AuthService from '../../../service/AuthService';
import Loading from '../../common/misc/loading';
import {useNavigate} from 'react-router-dom';

const ListUserComponent = () => {
    const [users, setUsers] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            await checkLogin();
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkLogin = async () => {
        try {
            const response = await AuthService.validate();
            if (response.status === 200) {
                console.log("data", response.data)
                setIsAuthorized(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setIsAuthorized(false);
                navigate('/home');
            }
        }
    };

    const deleteUser = (id) => {
        UserService.deleteUser(id).then((res) => {
            setUsers((prevUsers) => prevUsers.filter((user) => user['Person ID'] !== id));
        });
    };

    if (isLoading) {
        return <Loading/>;
    } else {
        return (
            <>
                <h2 className="text-center">Users 🧑‍🤝‍🧑</h2>
                <br></br>
                <div className="shadow p-3 rounded-4 mx-auto" style={{width: 'fit-content'}}>
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
                                    <th className="border-end">
                                        {' '}
                                        VO<sub>2</sub>
                                        <sup>MAX</sup>
                                    </th>
                                    <th> Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user['Person ID']}>
                                        <td className="border-end"> {user['Person ID']}</td>
                                        <td className="border-end"> {user['Age']} </td>
                                        <td className="border-end"> {getGender(user['encoded_gender'])}</td>
                                        <td className="border-end"> {user['Daily Steps']} </td>
                                        <td className="border-end"> {user['encoded_BMI_Category']} </td>
                                        <td className="border-end"> {`${user['systolic_preasure']}/${user['diastolic_preasure']}`} </td>
                                        <td className="border-end"> {user['VO2_Max']} </td>
                                        <td className="button-container">
                                            <button className="btn button3 ">
                                                <i className="bi bi-pencil-square text-white"></i>
                                            </button>
                                            <button className="btn button2 "
                                                    onClick={() => deleteUser(user['Person ID'])}>
                                                <i className="bi bi-x-square-fill text-white"></i>
                                            </button>
                                            <button className="btn button1 ">
                                                <i className="bi bi-zoom-in text-white"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default ListUserComponent;
