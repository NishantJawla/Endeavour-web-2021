//jshint esversion: 8
import React from 'react';
import facebookIcon from "./../../../assets/img/icons/facebook.png";
import linkedinIcon from "./../../../assets/img/icons/linkedin.png";
import instagramIcon from "./../../../assets/img/icons/instagram.png";
import youtubeIcon from "./../../../assets/img/icons/youtube.png";


function SocialLinks() {
    return (
        <div className="social-media">
            <div className="fs-4 color-white py-3 fw-bold ls-1">Social Links</div>
            <div className="d-flex">
                <a href="https://www.facebook.com/ecellkiet/" className="facebook pe-5" >
                    <img src={facebookIcon} width="20px" height="20px" alt="facebook link" />
                </a>
                <a href="https://www.linkedin.com/company/e-cell-kiet/" className="linkedin pe-5" >
                    <img src={linkedinIcon} width="20px" height="20px" alt="linkedin link" />
                </a>
                <a href="https://www.instagram.com/kietecell/?igshid=lbrt09aprj0l" className="instagram pe-5" >
                    <img src={instagramIcon} width="20px" height="20px" alt="instagram link" />
                </a>
                <a href="https://www.youtube.com/channel/UCpKWoJOSPr3rxTbPHx_kbaw" className="youtube pe-5" >
                    <img src={youtubeIcon} width="24px" height="24px" alt="youtube link" />
                </a>
            </div>
        </div>
    );
}

export default SocialLinks;