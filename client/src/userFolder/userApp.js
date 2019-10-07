import React from "react"
import NewUserForm from "./NewUserForm"
import { userList } from "../importsFolder/functions"
import Axios from "axios"

export default class UserApp extends React.Component {

    state = {
        currentUser: 1,
        users: [],
        redirectHome: false
    }
    // functon knows about state b/c it lives here
    getUsersFromServer = () => {
        Axios.get("/api/user/") //get prefix
            .then(res => {
                this.setState({ users: res.data })
            })// //create promise
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getUsersFromServer()
        console.log(this.state.users)
    }

    getCurrentUser = () =>
        // will also need to change .map in 
        this.state.users[this.state.currentUser]


    getAllUsers = () =>
        Object.values(this.state.users)


    setCurrentUser = (currentUser) => {
        this.setState({ currentUser })
    }

    render = () => (
        <div className='container'>
            <aside className='sidebar'>
                <NewUserForm 
                    addNewUser={this.addNewUser} 
                    getUsersFromServer={this.getUsersFromServer}
                />
            </aside>
            <article className='mainContent'>
                <div>
                    <h1>Users</h1>
                    {userList(this.getAllUsers(), this.state.currentUser, this.setCurrentUser)}
                </div>
            </article>
        </div>
    )
}
// //  ONLY USE COLON (:id) TO SET SPECIFIC ROUTE