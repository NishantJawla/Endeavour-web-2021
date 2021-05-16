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
                ENDVR_ID: ''
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}



    return (
        <React.Fragment>

            <form>
                <div>
                    <button className = "btn btn-primary py-5 px-5" onClick={displayRazorpay}>Buy Pass</button>
                </div>
            </form>

        </React.Fragment>
    );
}

export default EventPass;