/**
 * The Contact function is a React component that renders a contact card with personal and work
 * details, including an avatar.
 * @returns The `Contact` component is being returned, which renders the contact information of a user
 * including their name, avatar, phone number, email, address, and work details.
 */
import React from "react";
import "./contact.scss";

import { HomeSVG, MailSvg, PhoneSVG, WorkSVG } from "./svgs.js";

function Contact({ contact, avatar }) {
  return (
    <div className="contact-wrapper">
      <div className="profile-wrapper">
        <div className="profile">
          <img
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${avatar}`}
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="username">
          <small>{contact.username}</small>
        </div>
      </div>
      <div className="personal-details">
        <div className="name">
          <p> {contact.name}</p>
        </div>

        <div className="phone">
          <PhoneSVG />
          <p>{contact.phone}</p>
        </div>

        <div className="mail">
          <MailSvg />
          <p>{contact.email}</p>
        </div>
      </div>
      <div className="other-details">
        <div className="address">
          <div className="title">
            <HomeSVG />
            <p> Address</p>
          </div>
          <div className="address-details">
            <p>
              {contact.address.suite} -
              <span>
                {" "}
                {contact.address.street}, {contact.address.city}{" "}
                {contact.address.zipcode}
              </span>
            </p>
          </div>
        </div>
        <div className="divider">

        </div>
        <div className="company">
          <div className="title">
            <WorkSVG />
            <p>Work</p>
          </div>
          <p className="company-name">{contact.company.name}: <small>{contact.company.catchPhrase}</small></p>
          <p className="company-bs"> • {contact.company.bs}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
