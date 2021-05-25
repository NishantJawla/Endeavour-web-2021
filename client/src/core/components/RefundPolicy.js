//jshint esversion: 8
import React,{useEffect} from "react";

function RefundPolicy () {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <div className="privacy-policy bg-sec-pattern bg-norepeat py-5">
            <div className="container py-5">
                <div className="heading-font pt-5 pb-3 text-center color-white fw-bold">Refund Policy</div>
                <div className="privacy-policy-content color-white py-3 text-justify">
                Registrants are required to pay <strong>NON-REFUNDABLE REGISTRATION</strong> fee as prescribed in the respective conference registration fee details. The fee once paid normally will NOT be refunded on any account nor would this fee be held in reserve for future conferences / events. <br />
                In case of any registrant found to have paid more fee than prescribed, due to technical reason and on receiving the communication from the said applicant, the said extra payment, if found, shall be refunded to the same account from which the payment has been received.<br/>
                There is no provision for cancellation and request for refund of registration fees including transaction charges, etc. will not be entertained in any conditions, except in the case of failed transaction which will be settled solely by the bank with the applicants/customers.<br/>
                In exceptional circumstances, cancellation of any paid registration for which payment has been successfully made and an invoice number has been generated, we must be notified of the same in writing – by an email at ecell@kiet.edu, cancellation policy will be applicable for determining whether cancellations will be allowed for the particular registration. The final decision for the acceptance towards such cancellation will be as per the guidelines of the club.<br/>
                If the event registration is successful but post-payment due to unexpected and extenuating circumstances, the event stands cancelled; refund policy will be applicable for determining whether refunds will be granted for the particular registration, and the time-frame for processing refunds will be determined by the club.<br/>
                It is mandatory for the users to maintain unique invoice and Transaction ID numbers, which would be provided at the time of placing a request. This number would be required to address any problems, if any. <br/>
                In the majority of cases, there is NO other situation under which we will provide a refund. In exceptional circumstances, team will work with you to reach a mutually acceptable solution. <br/>
                e-Cell KIET intends to be objective, fair and reasonable in resolving such situations in order to maintain a positive and harmonious relationship with its participants.<br/>

                For any more queries, reach us at: <strong>ecell@kiet.edu</strong>

                </div>
            </div>
        </div>
    );
}

export default RefundPolicy;