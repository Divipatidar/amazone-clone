import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useInsertionEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link,useHistory } from "react-router-dom";
import Checkoutproduct from "./Checkoutproduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { getBaskettotle} from "./reducer";
import axios from "./axios";
// import { db } from "./firebase";
// https://github.com/CleverProgrammers/react-challenge-amazon-clone/issues/11

function Payment(){
    const [{ basket, user }, dispatch] = useStateValue();
    const history =useHistory();
    const stripe=useStripe();
    const elements=useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    // const stringclientSecret=clientSecret.toString();

    useEffect(() =>{
       const getClientSecret =async()=>{
        const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBaskettotle(basket) * 100}`
        });  
        setClientSecret(response.data.clientSecret)
       }
       getClientSecret();
    },[basket])
    console.log("The secret is>>>",clientSecret)

    const handlesubmit = async(event) =>{
        event.preventDefault();
        setProcessing(true)
        const payload =await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replace('/orders')
        })
    }
    const handlechange =event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return(
        <div className="payment">
           <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
              <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                     <p>{user?.email}</p>
                     <p>Hanuman mandir gali,mirjapur</p>
                     <p>Madhya Pradesh,India</p>
                </div>
              </div>
              <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map(item =>(
                        <Checkoutproduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
              </div>
              <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                     <form onSubmit={handlesubmit}>
                        <CardElement onChange={handlechange}/>
                        <div className="payment_pricecontainer">
                                 <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBaskettotle(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                        </div>
                        {error && <div>{error}</div>}
                     </form>
                </div>
              </div>
           </div>
        </div>
    )
}
export default Payment;