import React from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Social Icons */}
        <div className="footer-socials">
          <a
            href="https://discord.com/users/748453728180371496"
            target="_blank"
            className="icon-link"
            title="Discord"
            rel="noreferrer"
          >
            <FaDiscord />
          </a>
          <a
            href="https://github.com/NinoBacaoco"
            target="_blank"
            className="icon-link"
            title="GitHub"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ni%C3%B1o-bacaoco-28600a294/"
            target="_blank"
            className="icon-link"
            title="LinkedIn"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Contact Info */}
        <div className="footer-contacts">
          <span>  <a href="mailto:nino.bacaoco@gmail.com">nino.bacaoco@gmail.com</a></span>
          <span>+63 9955145147</span>
          <span>Cebu City, Philippines</span>
        </div>

        {/* Logo & Rights */}
        <div className="footer-center">
          <img
            src="/ninoBacaocoLogo.svg"
            alt="Niño Bacaoco Logo"
            className="footer-logo"
          />
          <p className="footer-rights">
            © 2025 Niño Bacaoco. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
