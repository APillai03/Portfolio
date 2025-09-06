import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailData] = useState({ subject: "PORTFOLIO CONTACT REQUEST", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async () => {
    if (submitting) return;
    setSubmitting(true);
    setEmailSent(false);
    setEmailError(false);

    const combinedText = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    const emailPayload = { ...emailData, text: combinedText };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
      if (response.ok) {
        setEmailSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setEmailError(true);
      }
    } catch (err) {
      setEmailError(true);
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setEmailSent(false);
        setEmailError(false);
      }, 4500);
    }
  };

  return (
    <div className="Contact" id="contact">
      <div className="contact-card">
        <div className="title">Contact Me</div>
        <div className="subtitle">I usually reply within 24 hours</div>

        <div className="field">
          <span>Email</span>
          <input
            placeholder="you@example.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <span>Name</span>
          <input
            placeholder="Your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <span>Message</span>
          <textarea
            rows="5"
            cols="30"
            placeholder="How can I help you?"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button className="send-btn" onClick={sendEmail} disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
        </button>

        {emailSent && <div className="status success">Thanks! Your message has been sent.</div>}
        {emailError && (
          <div className="status error">Sorry, something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  );
}

export default Contact;
