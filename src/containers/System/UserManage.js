import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    state = {

    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    render() {
        console.log('check', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="text-center">
                <div className="users-container">
                    <div className='title text-center'>Manage Users</div>
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="thead-dark">
                            <tr className="table bg-info">
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {arrUsers && arrUsers.map((item, index) => {
                                console.log('checkkk', item, index);
                                return (
                                    <tr>
                                        {/* <th scope="row">1</th> */}
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit2 px-3'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete2'><i className="fas fa-trash-alt"></i></button>
                                        </td>

                                    </tr>
                                )
                            })
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
