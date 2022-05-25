import React from 'react'

const User = (props) => {
    const {email} =props.user;
    const role = props?.user?.role ? props?.user?.role :"User";
    const {setToAdmin} = props
    return (
    <tr>
    <th>{props.index+1}</th>
    <td>{email}</td>
    <td>{role}</td>
    <td>{role==='admin'?"ALREADY ADMIN":<label onClick={() => setToAdmin(email)} htmlFor="admin-confirm-modal" className='btn btn-sm btn-primary text-white border-0 mb-1'>Make Admin</label>}</td>
  </tr>
  )
}

export default User