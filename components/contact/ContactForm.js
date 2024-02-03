import { useEffect, useState } from "react";
import classes from "./ContactFrm.module.css";
import Notification from "../ui/Notification";

async function sendContactData(enteredEmail, enteredName, enteredMessage) {
  const response = await fetch("./api/contact", {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = response.data;

  if (!response.ok) {
    new Error(data.message || "Something went wrong.");
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData(enteredEmail, enteredName, enteredMessage);
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification = null;

  if (requestStatus === "pending") {
    notification = {
      status: requestStatus,
      title: "Sending message...",
      message: "Your message is on its way.",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: requestStatus,
      title: "Success!",
      message: "Your message was sent successfully.",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: requestStatus,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.control}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              rows="5"
              required
              value={enteredMessage}
              onChange={(e) => setEnteredMessage(e.target.value)}
            ></textarea>
          </div>

          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
    </section>
  );
}
