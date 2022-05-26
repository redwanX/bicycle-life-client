import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDoneAll  } from "react-icons/md";

const Order = (props) => {
    const {image,name,price} = props.item.item;
    const {_id,qty,status} = props.item;
    const {setDeleteOrder }= props
    const trans_Id = props.item?.payment_id? props.item.payment_id:"";
    const navigate = useNavigate()
    return (
    <tr>
    <th>{props.index+1}</th>
    <td><img src={image} style={{width:"75px"}} alt="" /></td>
    <td>{name}</td>
    <td>{qty}</td>
    <td>{price}$</td>
    <td>{parseInt(price) * parseInt(qty)}$</td>
    <td>{status==="unpaid"?"N/A":trans_Id}</td>
    <td>{status ==="unpaid"? <div className='flex flex-col'><button onClick={()=>navigate(`/dashboard/payment/${_id}`)} className='btn btn-sm bg-primary border-0 mb-1'>Pay</button><label onClick={() => setDeleteOrder(_id)} htmlFor="delete-modal" className='btn btn-sm btn-error border-0 mb-1'>Cancel</label></div>:status==="approved"?<button  className='font-bold text-lime-600 border-0 w-full'><MdDoneAll className='inline text-2xl'></MdDoneAll>SHIPPED</button>:<button  className='font-bold text-primary border-0 w-full'>PENDING</button>}</td>
    
  </tr>
  )
}

export default Order