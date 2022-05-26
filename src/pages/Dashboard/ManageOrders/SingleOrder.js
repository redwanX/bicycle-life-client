import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDoneAll  } from "react-icons/md";

const SingleOrder = (props) => {
    const {image,name,price} = props.item.item;
    const {_id,qty,status} = props.item;
    const {setChangeOrder,setDeleteOrder }= props
    const trans_Id = props.item?.payment_id? props.item.payment_id:"";
    const navigate = useNavigate()
    return (
    <tr>
    <th>{props.index+1}</th>
    <td><img src={image} style={{width:"75px"}} alt="" /></td>
    <td>{name}</td>
    <td>{qty}</td>
    <td>{parseInt(price) * parseInt(qty)}$</td>
    <td>{status==="unpaid"?"N/A":trans_Id}</td>
    <td>{status==="unpaid"?<p className='text-red-400 font-bold'>UNPAID</p>:status==="approved"?<p className='text-primary font-bold'>SHIPPED</p>:<p className='text-secondary font-bold'>PENDING</p>}</td>
    <td>{status ==="unpaid"?<>
        <label onClick={() => setDeleteOrder(_id)} htmlFor="delete-order-modal" className='btn btn-sm btn-error border-0 mb-1'>CANCEL</label>
    
        </>
        :
        status ==="approved"?
        <p className='text-primary font-bold'>
           N/A 
        </p>
        :
        <label onClick={() => setChangeOrder(props.item)} htmlFor="change-order-modal" className='btn btn-sm bg-primary border-0 mb-1'>SHIP</label>}</td>
    
  </tr>
  )
}

export default SingleOrder