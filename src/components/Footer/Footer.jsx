import React from "react";
import "./Footer.css"; 

function Footer() {
  return (
    <div className="footer-container">
      <ul className="footer-links">
        <li>
          <a href="/terms-of-service">Terms of Service</a>
        </li>
        <li>
          <a href="/privacy">Privacy</a>
        </li>
        <li>
          <a href="/content-policy">Content Policy</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
