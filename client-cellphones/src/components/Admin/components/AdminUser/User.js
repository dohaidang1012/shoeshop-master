import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../../../../actions/UserAction';
import { DeleteOutlined} from '@ant-design/icons';
import { Switch } from 'antd';
import { axiosClient } from 'services/config.services';

function User(props) {
    const {user, number} = props
    const dispatch = useDispatch()
    const handleDeleteUser = async (user) => {
        await dispatch(deleteUser(user._id))
        dispatch(getAllUser())
    }
    const onChange = async() => {
        const data = await axiosClient.put(`http://localhost:4000/user/changeRule/${user._id}`)
    };
    return (
        <tr>
            <td>{number + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td><Switch defaultChecked={user.isAdmin ? true : false} onChange={onChange}/></td>
            <td className="delete-user"onClick={() => handleDeleteUser(user)}><DeleteOutlined /></td>
        </tr>
    );
}

export default User;