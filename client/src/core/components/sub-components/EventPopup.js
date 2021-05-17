//jshint esversion: 8
import React, { useState ,useEffect,useRef} from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import closeIcon from "./../../../assets/img/icons/cancel.png";
import {isAuthenticated, registerEvent, getUserData} from "../../../auth/helper/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API} from '../../../backend'
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

const EventPopup = (props) => {

    const [userData, setUserData] = useState({
        member2: "",
        member3: "",
        error: "",
        success: false,
    });

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserData(setUserInfo);
    }, []);
    
    const {member2,member3,error,success} = userData;

    const handleChange = (name) => (event) => {
        setUserData({ ...userData, error: false, [name]: event.target.value });
    };

    const  startHidePopup = (event) => {
        event.preventDefault();
        props.hidePopup();
    }

    // function register(event){
    //     event.preventDefault();
    //     registerEvent(props.eventId, userData);
    // }
    const onSubmit = (event) => {
        event.preventDefault();
        setUserData({ ...userData, error: false });
        var Sendingdata = {
            
        };
        if(member2 !== ""){
            Sendingdata.member2 = member2;
        }
        if(member3 !== ""){
            Sendingdata.member3 = member3;
        }
        registerEvent(props.id, Sendingdata)
        .then((data) => {
            console.log(data);
            if (data.error) {
            errorMessage()
            setUserData({ ...userData, error: data.error, success: false });
            } else {
            successMessage()
            setUserData({
                ...userData,
                member2: "",
                member3: "",
                error: "",
                success: true,
            });
            }
        })
        .catch( () =>{
            errorMessage()
            console.log("Failed!")
        }
            );
    };


    const successMessage = () => {
        toast.success('Registration Successfull', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
            });
    };

    const errorMessage = () => {
        if(error){
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    };

    const showSlowly = {
        opacity: "1",
        zIndex: "100",
        width: "auto",
        height:"auto",
        transition: "all ease-in",
        transitionDuration: "0.5s",
    };

    const hideSlowly = {
        opacity: "0",
        zIndex: "-1",
        width: "0px !important",
        height: "0px !important",
        transition: "all ease-out",
        transitionDuration:" 0.5s",
    };

    const formfill = () => ( 
    <form className=" py-3">
    <div className="row py-2 ls-1 fs-6 my-2">
        <div className="col-lg-4">
                <label for="Username">Leader: </label>
        </div>
        <div className="col-lg-8">
            <input  className="form-control p-3 border-0" type="text" autoComplete="off" value={user.endvrid} readonly />
        </div>
    </div>

    {
        props.memberCount.toString() === "2" ? 
        <div className="row py-2 ls-1 fs-6 my-2">
            <div className="col-lg-4">
                    <label for="Username">EndvrId 2: </label>
            </div>
            <div className="col-lg-8">
                <input onChange={handleChange("member2")} className="form-control p-3 border-0" type="text" autoComplete="off" value={member2} />
            </div>
        </div>
        : 
        null
    }

    {
        props.memberCount.toString() === "3" ? 
        <div className="row py-2 ls-1 fs-6 my-2">
            <div className="col-lg-4">
                <label for="Username">EndvrId 3: </label>
            </div>
            <div className="col-lg-8">
                <input onChange={handleChange("member3")} className="form-control p-3 border-0"  name="member3" 
                autoComplete="off" value={member3} />
            </div>
        </div>
        : 
        null
    }
    {
        isAuthenticated() && (
            <React.Fragment>
                
                <div className="d-flex justify-space-between">
                {
                    !userInfo.eventPass ?
                        (<React.Fragment>
                            <div className="register-button py-3">
                                <Link to="/geteventpass" className="bg-primary border-0 hbg-dark py-3 px-3 ls-1 rounded-3 color-white">Get Event Pass</Link>
                            </div>
                        </React.Fragment>)
                     : props.id !== "60a0d441a45a7705fc059d89" ?
                    (<div className="register-button py-3 px-5">
                        <button onClick={onSubmit} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Register</button>
                    </div>) : !userInfo.internship ?
                    (<div className="register-button py-3 px-5">
                        <button onClick={displayRazorpay} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Pay {props.data.price}</button>
                    </div>) : 
                    (<div className="register-button py-3 px-5">
                        <button onClick={(event) => {event.preventDefault()}} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Already Registered</button>
                    </div>)
                }
                {/* {
                    props.id !== "60a0d441a45a7705fc059d89" ? 
                    <div className="register-button py-3 px-5">
                        <button onClick={onSubmit} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Register</button>
                    </div> : ""
                }
                {
                    props.id === "60a0d441a45a7705fc059d89" ? 
                    <div className="register-button py-3 px-5">
                        <button onClick={displayRazorpay} className="bg-primary border-0 hbg-dark py-2 px-3 ls-1 rounded-3 color-white">Pay {props.data.price}</button>
                    </div> : ""
                } */}
                
                
            </div>
            </React.Fragment>
        )
    }
    {
        !isAuthenticated() && (
            <React.Fragment>
                <div className="register-button py-3">
                    <Link to="/signin" className="bg-primary border-0 hbg-dark py-3 px-3 ls-1 rounded-3 color-white">SignIn</Link>
                </div>
            </React.Fragment>
        )
    }
    {/* {
        !userInfo.eventPass && (
            <React.Fragment>
                <div className="register-button py-3">
                    <Link to="/geteventpass" className="bg-primary border-0 hbg-dark py-3 px-3 ls-1 rounded-3 color-white">Get Event Pass</Link>
                </div>
            </React.Fragment>
        )
    } */}
</form>)
    
    const {user, token} = isAuthenticated();

    const  displayRazorpay = async (event)=> {
        event.preventDefault();
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch(`${API}payment/orders/internship`, { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: 'rzp_test_sbRY0oc744nz57',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: `${user.name}`,
			description:`${user.endvrid}`,
			image: 'http://localhost:1337/logo.svg',
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
        <div className="event-popup container w-50 h-100 position-fixed m-auto p-0 top-0" style={props.showSlowly ? showSlowly : hideSlowly}>
            <div className="d-flex w-100 h-100 justify-content-center">
                <div className="align-self-center">
                    <div className="popup-main position-relative py-4 px-5 color-white overflow-auto">
                        <div className="position-absolute right-0 px-5">
                            <button onClick={startHidePopup} className="close-button bg-transparent border-0">
                                <img src={closeIcon} width="20px" height="20px" alt="cancel button" />
                            </button>
                        </div>
                        <div className="px-0">
                            <div className="popup-heading fs-5 py-3 fw-bold ls-1"> 
                            {props.data.eventName}
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
                            {formfill()}
                        </div>
                    </div> 
                </div>   
            </div>
        </div>
    );
}

export default EventPopup;