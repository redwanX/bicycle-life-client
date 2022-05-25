import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../firebase.init'
const CheckoutForm = ({ordersById}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret,setClientSecret] =useState('')
    const [success,setSuccess] =useState(false)
    const [transId,setTransId] =useState('')
    const [processing, setProcessing] = useState(false);
    const location =useLocation();
    useEffect(() => {
      if(ordersById){
        const price = parseInt(ordersById.qty)*parseInt(ordersById.item.price);
        setProcessing(true);
        axios.post('http://localhost:5000/create-payment-intent',{price},{
            headers:{
              authorization: `Bearer ${localStorage.getItem('authToken')}`}}
          )
            .then(data => {
                if (data?.data?.clientSecret) {
                    setClientSecret(data.data.clientSecret);
                }
                setProcessing(false);
            });
      }
    }, [ordersById])
    const handleSubmit = async (event) => {
        event.preventDefault();    
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
          return;
        }
        setProcessing(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
        if (error) {
          toast( error?.message);
          setProcessing(false);
        }
        
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
          clientSecret,
          {
              payment_method: {
                  card: card,
                  billing_details: {
                      name: ordersById?.name,
                      email: ordersById?.email
                  },
              },
          },
        );
      
      if (intentError) {
          toast(intentError?.message);
          setProcessing(false);
        }
      else{
        console.log(paymentIntent)
        setSuccess(true);
        setTransId(paymentIntent.id);
        const authToken = localStorage.getItem('authToken');
        const payment_id=paymentIntent.id;
        const body = {...ordersById,payment_id} 
        console.log(body);
        axios.put(`http://localhost:5000/updateOrder/${body._id}`,body,{
            headers:{authorization: `Bearer ${authToken}`}
          })
          .then(res=>{
            toast('PAYMENT SUCCESSFULL!');
          })
          .catch(err=>{
            if(err.response.status ===401 || err.response.status ===403){
              toast("YOU ARE NOT AUTHORIZED!");
              signOut(auth)
              return <Navigate to="/login" state={{ from: location }} replace />
            }
          })
        setProcessing(false);
      }
      };
  return (
    <form onSubmit={handleSubmit}>
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}
    />
    <button className='btn my-5 w-full bg-secondery' type="submit" disabled={!stripe || !clientSecret ||success ||processing}>
      Pay
    </button>
    <h1>
    {processing?<button disabled className="btn loading w-full">Loading</button>:""}</h1>
    <h1>
    {transId ? transId:""}
    </h1>
  </form>

  )
}

export default CheckoutForm