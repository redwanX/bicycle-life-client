import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDoneAll  } from "react-icons/md";

const Order = (props) => {
    const {image,name,price} = props.item.item;
    const {_id,qty,status} = props.item;
    const {setDeleteOrder }= props
    return (
    <tr>
    <th>{props.index+1}</th>
    <td><img src={image} style={{width:"75px"}} alt="" /></td>
    <td>{name}</td>
    <td>{qty}</td>
    <td>{price}$</td>
    <td>{parseInt(price) * parseInt(qty)}$</td>
    <td>{status==="unpaid"?"unpaid":"39435835jc"}</td>
    <td>{status ==="unpaid"? <div className='flex flex-col'><button className='btn btn-sm bg-primary border-0 mb-1'>Pay</button><label onClick={() => setDeleteOrder(_id)} htmlFor="delete-modal" className='btn btn-sm btn-error border-0 mb-1'>Delete</label></div>:<button  className='font-bold text-lime-600 border-0 w-full'><MdDoneAll className='inline text-2xl'></MdDoneAll>PAID</button>}</td>
    
  </tr>
  )
}

export default Order