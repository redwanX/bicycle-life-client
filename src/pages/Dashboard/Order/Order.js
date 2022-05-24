import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDoneAll  } from "react-icons/md";

const Order = (props) => {
    const {image,name,price} = props.item.item;
    const {qty,status} = props.item;
    return (
    <tr>
    <th>{props.index+1}</th>
    <td><img src={image} style={{width:"75px"}} alt="" /></td>
    <td>{name}</td>
    <td>{qty}</td>
    <td>{price}$</td>
    <td>{parseInt(price) * parseInt(qty)}$</td>
    <td>{status==="unpaid"?"unpaid":"39435835jc"}</td>
    <td>{status ==="unpaid"? <><button className='btn btn-primary border-0 w-full'>Pay</button><button className='btn btn-primary border-0 w-full'>Pay</button></>:<button  className='font-bold text-lime-600 border-0 w-full'><MdDoneAll className='inline text-2xl'></MdDoneAll>PAID</button>}</td>
    
  </tr>
  )
}

export default Order