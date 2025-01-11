import React, { Component } from "react";

import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

const ShareUrl=window.location.href;

const shareExample=()=>{
    return(
        <div className="App">
            <WhatsappShareButton url={ShareUrl}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
        </div>
    );
}


export default shareExample;