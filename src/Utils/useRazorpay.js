

import Axios from "./Axios";
import Swal from "sweetalert";
export const initPayment = async (order,enrollToTrip,fetchTrip) => {
    const RAZORPAY_KEY_ID = "rzp_test_NBKIQegHCsjMos";

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      handler: async (response) => {

        try {
          const paymentId = response.razorpay_payment_id;
          const signature = response.razorpay_signature;
          const orderId=response.razorpay_order_id;

          const verifyPaymentResponse = await Axios.post("/payment/verify", {
            paymentId,
            signature,
            orderId,
          });
  
          console.log(verifyPaymentResponse.data.signatureIsValid)
          if (verifyPaymentResponse.data.signatureIsValid) {
            // Payment successful, perform necessary actions
            //enrollToTrip is an asynchronous function to strore the user in database
            //fetchTrip is also an asynchronous function to get user from database. so we have to await this
          enrollToTrip().then(()=>{
            fetchTrip()
          })
            
          } else {
            // Payment signature invalid
            Swal("Payment signature invalid")
          }
        } catch (error) {
          Swal("Error verifying payment");

        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


