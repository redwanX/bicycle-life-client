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
        const price = parseInt(ordersById?.qty)*parseInt(ordersById?.item?.price);
        setProcessing(true);
        axios.post('https://serene-meadow-57507.herokuapp.com/create-payment-intent',{price},{
            headers:{
              authorization: `Bearer ${localStorage.getItem('authToken')}`}}
          )
            .then(data => {
                if (data?.data?.clientSecret) {
                    setClientSecret(data.data.clientSecret);
                }
                setProcessing(false);
            })
            .catch(err=>{
              setProcessing(false);
              signOut(auth)
              return <Navigate to="/login" state={{ from: location }} replace />
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
        else{
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
          setSuccess(true);
          setTransId(paymentIntent.id);
          const authToken = localStorage.getItem('authToken');
          const payment_id=paymentIntent.id;
          const email =ordersById?.email
          let body = {email,status:"paid",payment_id} 
          axios.put(`https://serene-meadow-57507.herokuapp.com/updateOrder/${ordersById._id}`,body,{
              headers:{authorization: `Bearer ${authToken}`}
            })
            .then(res=>{
              console.log(res);
              toast.success('PAYMENT SUCCESSFULL');
              toast.success('YOU CAN ALWAYS GET YOUR PAYMENT_ID ON ORDER PAGE!');
              setProcessing(false);
            })
            .catch(err=>{
              if(err.response.status ===401 || err.response.status ===403){
                toast("YOU ARE NOT AUTHORIZED!");
                setProcessing(false);
                signOut(auth)
                return <Navigate to="/login" state={{ from: location }} replace />
              }
            })
          setProcessing(false);
        }
        
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
    {transId ? <div  className="btn lg:border-2 border-0 hover:bg-accent w-full text-primary bg-accent">Transaction ID  : <span className='text-secondary'>{transId}</span></div>:""}
    </h1>
  </form>

  )
}

export default CheckoutForm