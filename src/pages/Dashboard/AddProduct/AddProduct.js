import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
const { register, formState: { errors }, handleSubmit, reset } = useForm();
const imageStorageKey ='c4bf02963d49b4ff00d8e4ee667bb305'
const onSubmit= async(data)=>{
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
  
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res=>res.json())
    .then(result =>{
        if(result.success){
            const body= {
                name:data.name,
                price:parseInt(data.price),
                moq:parseInt(data.moq),
                desc:data.desc,
                quantity:parseInt(data.quantity),
                image:result.data.url
            }
            axios.post(`http://localhost:5000/addProduct`,body,{
                headers:{authorization: `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res=>{
                console.log(res.data);
                toast("Part Added SuccesFully")
                reset()
            })
              .catch(err=>{toast("Something Went Wrong")})           
        }
    })
}

return (
    <div className=' mb-12 container mx-auto'>
  <div className='text-2xl py-5 font-bold text-secondary text-center '>ADD PRODUCT</div>
      <hr />
        <div className='my-12 flex flex-col justify-center items-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-xs lg:max-w-2xl'>
          
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Parts Name</span>
            </label>
            <input
                    type="text"
                        placeholder="Parts Name"
                        className="input input-bordered w-full max-w-xs lg:max-w-2xl"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
            </div>
            
            <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Price</span>
            </label>
            <input
                    type="number"
                        placeholder="Price"
                        className="input input-bordered w-full max-w-xs lg:max-w-2xl"
                        {...register("price", {
                            required: {
                                value: true,
                                message: 'Price is Required'
                            },
                                min: {
                                value: 0,
                                message: 'Must Be Positive' 
                            }

                        })}
                    />
                    <label className="label">
                        {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                        {errors.price?.type === 'min' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                    </label>
          </div>


          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Minimum Order</span>
            </label>
            <input
                    type="number"
                        placeholder="Minimum Order"
                        className="input input-bordered w-full max-w-xs lg:max-w-2xl"
                        {...register("moq", {
                            required: {
                                value: true,
                                message: 'Minimum Order is Required'
                            },
                                min: {
                                value: 0,
                                message: 'Must Be Positive' 
                            }

                        })}
                    />
                    <label className="label">
                        {errors.moq?.type === 'required' && <span className="label-text-alt text-red-500">{errors.moq.message}</span>}
                        {errors.moq?.type === 'min' && <span className="label-text-alt text-red-500">{errors.moq.message}</span>}
                    </label>
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Available Quantity</span>
            </label>
            <input
                    type="number"
                        placeholder="Available Quantity"
                        className="input input-bordered w-full max-w-xs lg:max-w-2xl"
                        {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Available Quantity is Required'
                            },
                            min: {
                                value: 0,
                                message: 'Must Be Positive' 
                            }

                        })}
                    />
                    <label className="label">
                        {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                        {errors.quantity?.type === 'min' && <span className="label-text-alt text-red-500">{errors.quantity.message}</span>}
                    </label>
          </div>


          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Description</span>
            </label>
            <input
                    type="text"
                        placeholder="Description"
                        className="input input-bordered w-full max-w-xs lg:max-w-2xl"
                        {...register("desc", {
                            required: {
                                value: true,
                                message: 'Description is Required'
                            },

                        })}
                    />
                    <label className="label">
                        {errors.desc?.type === 'required' && <span className="label-text-alt text-red-500">{errors.desc.message}</span>}
                    </label>
            </div>


          <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold text-primary">Image</span>
                    </label>
                    <input
                        type="file"
                        className="input p-1 w-full max-w-xs lg:max-w-2xl"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>
          <button className='btn btn-md bg-secondary mt-4 w-full' type="submit" >Add Product</button>

          </form>
        </div>

    </div>

  )
}

export default AddProduct