import React from 'react'
import CreateUserForm from '../components/CreateUserForm'
import UserList from '../components/UserList'

const Dashboard = () => {
  return (
    <div>
        <CreateUserForm/>
        <UserList/>
    </div>
  )
}

export default Dashboard