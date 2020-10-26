import React, { useState } from 'react';
import background_video from './background_video.mp4';
import './contact.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isBrowser } from "react-device-detect";

function Contact() {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className={isBrowser ? "contact" : "contact_mobile"}>
      <div className={isBrowser ? "contact_description" : "contact_mobile_description"}>
        {isBrowser ? <CopyToClipboard text="hello@tximeneafilms.com" onCopy={() => { setIsCopied(true) }}>
          {isCopied ? <h1 onMouseLeave={() => setIsCopied(false)}>COPIED!</h1> : <h1><span>SAY HELLO</span>@TXIMENEAFILMS.COM!</h1>}
        </CopyToClipboard> :
          <div><h2 className="hello_mobile">SAY HELLO TO</h2><div className="mail_icon"></div><h1 className="mail_mobile">HELLO@TXIMENEAFILMS.COM</h1></div>
        }
        <h3>We are always happy when a new project arrives, please tell us all about yours!</h3>
        <h4>ADDRESS: C\Francolí 65 \\ TELEPHONE: +34 647 78 79 06 </h4>
      </div>
      <video autoPlay loop muted className="contact_background">
        <source src={background_video} type='video/mp4' />
      </video>
    </div>
  );
}

export default Contact;
