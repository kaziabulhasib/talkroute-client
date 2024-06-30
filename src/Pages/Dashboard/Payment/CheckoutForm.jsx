import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useMembership } from "../../../providers/MembershipContext";

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { isMember, setIsMember } = useMembership();

  const totalPrice = 5;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setIsMember(true); // Update membership status
        // console.log("memebership status", isMember);
        console.log("transaction id", paymentIntent.id);
        toast.success("Payment Successful!");
        setTransactionId(paymentIntent.id);
      }
    }
  };

  useEffect(() => {
    console.log("Membership status changed:", isMember);
  }, [isMember]);

  return (
    <div className='mt-24 w-2/3 mx-auto p-6 space-y-8'>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className='btn btn-sm btn-primary my-6'
          type='submit'
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className='text-xl text-red-500'>{error}</p>
        {transactionId && (
          <p className='text-green-600 ml-6 text-center text-xl'>
            Payment is successful. <br /> Your transaction id is :{" "}
            {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
