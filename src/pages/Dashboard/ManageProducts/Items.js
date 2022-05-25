import React from 'react'
const Items = (props) => {
    const {_id,image,name,price,moq,quantity} = props.item;
    const {setDeleteItem} = props;
    return (
    <tr>
    <th>{props.index+1}</th>
    <td><img src={image} style={{width:"75px"}} alt="" /></td>
    <td>{price}</td>
    <td>{name}</td>
    <td>{moq}</td>
    <td>{quantity}$</td>
    <td><label onClick={() => setDeleteItem(_id)} htmlFor="delete-items-modal" className='btn btn-sm btn-error border-0 mb-1'>Delete</label></td>
    
  </tr>
  )
}

export default Items