import React from "react";
//assets
import logo from "../assets/logo1.png";

const PrivaryPolicies = () => {
  return (
    <div id="privaryPolicies">
      {" "}
      <div className="topDiv">
        <span className="span1">
          <img src={logo} alt="" className="logoIcon" />
          <p className="span1p">Cam</p>
        </span>

        <h1>Privacy Policy</h1>
        <p>
          Please, read our Service Privacy Policies carefully before using the
          site
        </p>
      </div>
      <div className="middleDiv">
        <p className="middleDivP">
          From Floorfy we are committed to the privacy of our users. That is why
          we want to offer you clear and transparent information about the way
          in which we treat your personal data, with the objective that you can
          freely determine if you wish to provide us with your data.
        </p>
      </div>
      <div className="pointsDiv">
        <h1>Introduction</h1>
        <p>
          In accordance with the provisions of Organic Law 15/1999, of December
          13, Protection of Personal Data ("LOPD") and Royal Decree 1720/2007,
          of December 21, which approves the Regulation of development of the
          LOPD ("RLOPD"), we inform you that by providing personal data, you
          give your consent for your data to be treated and incorporated into a
          file duly registered in the Registry of the Spanish Agency for Data
          Protection entitlement of Floorfy, SL (hereinafter, "Floorfy", "us" or
          "we"), with registered office at C / Sabino Arana 46, 2-2, Barcelona,
          Spain. We will treat your data in order to manage, manage and provide
          the relationship with Floorfy, as well as to expand and improve the
          services you choose to contract.
        </p>
        <h1>What data do we deal with about you?</h1>
        <h2>1. Data provided by you</h2>
        <p>
          Depending on the service you are using (publish an ad, save a search,
          contact, recommend / discard real estate or buy a service for a
          property) and in order to provide the service you need we store and
          treat one or more of the following personal information
        </p>
        <h2>2. Cookies</h2>
        <p>
          When you browse the Floorfy Website you are providing us with some
          information about the pages you are consulting (for example, your
          search preferences). To know how we use "cookies" in Floorfy you can
          consult our Cookies Policy (section 2.1). In Floorfy we will strictly
          respect the confidentiality of the personal data that you provide us.
          We will not share your personal information with anyone, except in the
          terms described in this Privacy Policy. To protect your data, we have
          implemented the corresponding security measures to prevent
          unauthorized access, alteration or loss of your personal data. In
          addition, the only information that will be accessible through the
          Internet when you publish your ad is your name and the telephone
          number of the contact person. Optionally, you can also allow your
          email address to be visible.
        </p>
        <h1>What can we do with your email address?</h1>
        <p>
          When you provide your email address (email) to Floorfy, it is used to
          inform you about the properties that are of interest to you (in the
          case you are looking for) and to contact the advertisers. You can also
          receive communications about services that may be of use to you from
          our investee companies (for example about mortgages if you are looking
          for a property or if you already have one). In any case Floorfy will
          not provide your email to third parties unless under your previous
          authorization. Floorfy does not have access to the emails you can
          receive at the email address that you have provided, nor can you
          access your private area on Floorfy with your password.
        </p>
        <h1>
          How to request access, rectification or cancellation of the use of
          your data?
        </h1>
        <p>
          You can do it at any time and for free in the following ways: By
          written and signed request to our registered office at the address
          provided at the beginning of this document, indicating on the envelope
          "cancellation of personal data". The communication must contain:
        </p>
        <ul>
          <li>Name and surname of the applicant</li>
          <li>Petition in which the request is specified</li>
          <li>Email address with which you signed up (email)</li>
          <li>Postal address and phone number</li>
          <li>
            By email (email) to info@floorfy.com, with the same data and
            documentation indicated in the above point, and with the subject
            "cancellation of personal data".
          </li>
        </ul>
        <h1>With whom does Floorfy share your data?</h1>
        <p>
          Advertiser: By using the contact form with the advertiser, you are
          aware and accept that your name, email, phone number, navigation data
          or any other information you voluntarily provide when filling in the
          form, including fields and filters Search used (among others, price
          range, size etc.), will be received by the advertiser to enable and
          facilitate the contact.
        </p>

        <h1>Storage and Security</h1>
        <p>
          We take robust measures to ensure the secure storage and protection of
          the collected information. This includes encryption, access controls,
          and regular security audits to safeguard against unauthorized access
          or data breaches.
        </p>
        <h1>User Controls and Choices</h1>
        <p>
          You have the option to manage and control the access and usage of your
          data through the settings provided within the API Client.
          Additionally, you can revoke or limit access to your YouTube data at
          any time.
        </p>
        <h1>Sharing of Information</h1>

        <p>
          Floorfy does not sell or share your personal information, including
          API data, with third parties unless required by law or as necessary
          for the provision of our services.
        </p>
        <h1>Google Privacy Policy</h1>
        <p>
          Please consult Google's Privacy Policy at{" "}
          <a href="https://policies.google.com/privacy">
            https://policies.google.com/privacy{" "}
          </a>{" "}
          for additional information on how your data may be handled by Google.
        </p>
        <h1>Updates to this Privacy Policy</h1>
        <p>
          This Privacy Policy may be updated periodically to reflect changes in
          our practices or for legal compliance. Users are encouraged to review
          this policy regularly for any updates.
          <br />
          By using our API Client, you acknowledge and agree to the terms
          outlined in this Privacy Policy.
          <br />
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at info@floorfy.com.
        </p>
      </div>
      {/* <Link to="/signup" className="gobackLink">
  Go back to homepage
</Link> */}
    </div>
  );
};

export default PrivaryPolicies;
