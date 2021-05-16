//jshint esversion: 8
import React from "react";
import {API} from '../../backend'
import {isAuthenticated, registerEvent} from "../../auth/helper/index";
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

    const  displayRazorpay = async (event)=> {
        event.preventDefault();
        const {user, token} = isAuthenticated();
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch(`${API}payment/orders/eventpass`, { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_sbRY0oc744nz57' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: `${user.name}`,
			description:`${user.endvrid}`,
			image: `${API}logo.svg`,
			handler: function (response) {
				alert("Please wait while we are processing the payment")
			},
			prefill: {
				name : user.name,
				email: user.email,
				phone_number: user.phoneNumber,
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}



    return (
        <React.Fragment>
            <div className="event-pass pb-5 bg-main-pattern bg-norepeat">
                <div className="container">
                    {/* <div className="heading-font text-center color-white pt-5 pb-3 fw-bold">Event Pass</div> */}
                    <div className="d-flex w-100 pb-5 h-100 justify-content-center">
                        <div className="each-event-pass w-50 align-self-center ">
                            {/* <div className="w-75 m-auto p-5">
                                <div className="heading-font color-primary text-center fw-bold">Event Pass</div>
                                <div className="passbenefits py-2">
                                    <div className="fs-5 fw-bold pb-3 ls-1">Benefits</div>
                                    <ul>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 1</li>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 2</li>
                                        <li className="ls-1 fs-6 fw-bold color-primary">This is benefit 3</li>
                                    </ul>
                                </div>
                                <div className="getpassbutton">
                                    <button className="p">Buy Pass</button>
                                </div>
                            </div> */}
                            <div className="position-relative card">
                                <div className="position-absolute m-auto card-strip bg-secondary">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                <div>
                    <button className = "btn btn-primary py-5 px-5" onClick={displayRazorpay}>Buy Pass</button>
                </div>
            </form>

        </React.Fragment>
    );
}

export default EventPass;