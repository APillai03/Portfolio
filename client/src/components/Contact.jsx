import React, { useState } from "react";
import "./contact.css";

function Contact() {
    const [buttonClicked, setButtonClicked] = useState(false); // Tracks if the button is clicked
    const [emailSent, setEmailSent] = useState(false); // Tracks if the email is sent successfully
    const [emailError, setEmailStatus] = useState(false);
    const [emailData, setEmailData] = useState({
        subject: "PORTFOLIO CONTACT REQUEST",
        text: "",
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = async () => {
        setButtonClicked(true);

        // Combine name, email, and message into the text field
        const combinedText = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
        const emailPayload = { ...emailData, text: combinedText };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailPayload),
            });
            if (response.ok) {
                console.log("SUCCESS");
                setEmailSent(true);
                setTimeout(() => {
                    setButtonClicked(false);
                    setEmailSent(false);
                }, 5000);
            } else {
                console.log("FAIL");
                setEmailStatus(true);
                setTimeout(() => {
                    setButtonClicked(false);
                    setEmailSent(false);
                    setEmailStatus(false);
                }, 5000);
            }
        } catch (error) {
            console.error("ERROR-> ", error);
            setEmailStatus(true);
            setTimeout(() => {
                setButtonClicked(false);
                setEmailSent(false);
                setEmailStatus(false);
            }, 5000);
        }
    };

    return (
        <div className="Contact" id="contact">
            <div
                className="contact-card"
                style={buttonClicked ? { border: "2px solid transparent" } : {}}
            >
                {buttonClicked ? (
                    <div className="checkmark">
                        <input
                            type="checkbox"
                            id="check"
                            checked={emailSent || emailError}
                            readOnly
                        />
                        {emailSent || !emailError ? (
                            <label htmlFor="check">
                                <div className="check-icon"></div>
                            </label>
                        ) : (
                            <label htmlFor="check">
                                <div className="exclam-icon1"></div>
                                <div className="exclam-icon2"></div>
                            </label>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="title">Contact Me</div>
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <textarea
                            rows="5"
                            cols="30"
                            placeholder="Message"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button onClick={sendEmail}>Send</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Contact;
