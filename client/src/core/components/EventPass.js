//jshint esversion: 8
import React, { useEffect, useState } from "react";
import {API} from '../../backend'
import {isAuthenticated, getUserData} from "../../auth/helper/index";
import eventImg from "./../../assets/img/eventpass.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

	const __DEV__ = document.domain === 'localhost'


function EventPass() {

	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserData(setUserData);
	}, []);

	const successMessage = (success) => {
        toast.success(`${success}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };

    const errorMessage = (error) => {
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
	
	const  displayRazorpay = async (event)=> {

		if(isAuthenticated() && !userData.eventPass){
			// const options = {
			// 	key: 'rzp_live_bW2H9hmho7861f',
			// 	currency: data.currency,
			// 	amount: data.amount.toString(),
			// 	order_id: data.id,
			// 	name: `${user.name}`,
			// 	description:`${user.endvrid}`,
			// 	image: `${API}logo.svg`,
			// 	handler: function (response) {
			// 		alert("Please wait while we are processing the payment")
			// 	},
			// 	prefill: {
			// 		name : user.name,
			// 		email: user.email,
			// 		phone_number: user.phoneNumber,
			// 	}
			// }
	
			const data = await fetch(`${API}payment/orders/eventpass`, { method: 'POST' }).then((t) =>
				t.json()
			)
	
			const {user, token} = isAuthenticated();
			// console.log(data)
	
			const options = {
				key: 'rzp_live_bW2H9hmho7861f',
				currency: data.currency,
				amount: data.amount.toString(),
				order_id: data.id,
				name: `${user.name}`,
				description:`${user.endvrid}`,
				image: 'https://firebasestorage.googleapis.com/v0/b/endeavour-21.appspot.com/o/ssdfa.png?alt=media&token=4e2a19a3-8e14-4108-9bb5-5d23a7efeac6',
				handler: function (response) {
					successMessage2();
				},
				prefill: {
					name : user.name,
					email: user.email,
					phone_number: user.phoneNumber,
				}
			}
			const paymentObject = new window.Razorpay(options)
			paymentObject.open();
		} else if(isAuthenticated() && userData.eventPass) {
			successMessage("You already have event pass");
		} else {
			errorMessage("Please Login to continue");
		}
	}

	const successMessage2 = () => {
    
        toast.success('Please wait while we are processing the payment & check your mail for receipt. Please refresh too', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
};

    return (
        <React.Fragment>
            <div className="event-pass py-5 bg-sec-pattern bg-norepeat">
                <div className="container py-5 mt-4">
                    {/* <div className="heading-font text-center color-white pt-5 fw-bold">Event Pass</div> */}
                    <div className="w-75 m-auto pt-5 h-100">
                        <div className="d-flex event-pass-outer-box justify-content-center w-75 m-auto h-50 rounded-3 overflow-hidden">
                            <div className="bg-primary event-pass-img w-50 p-5 d-none d-sm-block rounded-3 overflow-hidden">
                                <img src={eventImg} alt="event img" width="100%" height="100%" />
                            </div>
                            <div className="content position-relative w-50 py-4 my-3 me-3 px-5 bg-white rounded-3">
                                <div className="position-absolute price-ribbon color-white bg-primary"><div className="fs-3 color-white px-5 mx-5 py-1 ls-1">&#8377;150</div></div>
                                <div className="fw-bold fs-4 text-center ls-1">Event Pass</div>
                                <div className="event-pass-data">
                                    <div className="event-pass-subhead fs-5 py-2 fw-bold">Benefits</div>
                                    <ul>
                                        <li>Access to all Corporate and fun events <span className="color-primary fs-7"> (Excluding Hackathon and Internship Fair)</span></li>
                                        <li>Free pass of all workshops and speaker sessions.</li>
                                        <li>Entertain yourself in the entertainment eve.</li>
                                    </ul>
                                    <div className="getPassButton text-center">
                                        <button className="py-2 px-3 fs-6 border-0 color-white rounded-3 bg-primary" onClick={displayRazorpay}>Get Your Pass</button>
                                    </div>
									<ToastContainer
									position="top-right"
									autoClose={5000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
									/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                <div>
                </div>
            </form>

        </React.Fragment>
    );
}

export default EventPass;