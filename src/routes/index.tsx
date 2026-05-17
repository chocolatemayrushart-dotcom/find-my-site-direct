import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const UNLOCK_KEY = "perceptve_unlocked_v1";
const PASSWORD = "perceptive";
const LOGO_URL = "/site/images/SITE_LOGO_970c0ca0-3905-4df0-bd69-b899de9083e2.png";

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [phone, setPhone] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.trim().toLowerCase() === PASSWORD) {
      localStorage.setItem(UNLOCK_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  }

  if (unlocked) {
    return (
      <iframe
        src="/site/index.html"
        title="Site"
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
      />
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 420, width: "100%" }}>
        <img
          src={LOGO_URL}
          alt="Perceptve"
          style={{ width: 80, height: "auto", margin: "0 auto 28px", display: "block" }}
        />
        <h1
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "1.5px",
            margin: "0 0 14px",
          }}
        >
          5 MONTH ANNIVERSARY 22/5 5PM EST
        </h1>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "2px",
            margin: "0 0 18px",
            fontWeight: 600,
          }}
        >
          ENTER USING PASSWORD
        </p>
        <form onSubmit={tryUnlock} style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <input
            ref={inputRef}
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            style={{
              border: `1px solid ${error ? "#c00" : "#000"}`,
              padding: "10px 14px",
              fontSize: 13,
              borderRadius: 30,
              outline: "none",
              width: 200,
              background: "#fff",
              color: "#000",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#000",
              color: "#fff",
              border: 0,
              borderRadius: 30,
              padding: "10px 22px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            ENTER
          </button>
        </form>
        {error && (
          <p style={{ color: "#c00", fontSize: 11, marginTop: 10 }}>Incorrect password</p>
        )}
      </div>

      {/* Bottom-left UNLOCK ACCESS pill */}
      {!showSignup && (
        <button
          onClick={() => setShowSignup(true)}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            background: "#000",
            color: "#fff",
            border: 0,
            borderRadius: 30,
            padding: "12px 22px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "1.5px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,.25)",
          }}
        >
          UNLOCK ACCESS
        </button>
      )}

      {/* Signup modal */}
      {showSignup && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSignup(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#fff",
              maxWidth: 360,
              width: "100%",
              padding: "26px 24px 22px",
              borderRadius: 6,
              position: "relative",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => setShowSignup(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                background: "none",
                border: 0,
                fontSize: 22,
                cursor: "pointer",
                color: "#000",
              }}
            >
              ×
            </button>
            <img
              src={LOGO_URL}
              alt="Perceptve"
              style={{ width: 60, height: "auto", margin: "0 auto 14px", display: "block" }}
            />
            <h2
              style={{
                fontSize: 34,
                fontWeight: 800,
                margin: "4px 0 0",
                letterSpacing: "1px",
                lineHeight: 1.05,
              }}
            >
              EARLY
              <br />
              ACCESS
            </h2>
            <p style={{ fontSize: 16, margin: "8px 0 16px", fontWeight: 500 }}>
              + 10% OFF NEXT DROP
            </p>

            {signedUp ? (
              <p style={{ color: "#0a7d2c", fontSize: 13, margin: "20px 0" }}>
                Thanks! Use code <b>WELCOME10</b> at checkout.
              </p>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #000",
                    borderRadius: 30,
                    padding: "6px 14px",
                    marginBottom: 12,
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 14 }}>🇺🇸</span>
                  <span style={{ fontSize: 13, borderRight: "1px solid #ddd", paddingRight: 8 }}>
                    +1 ▾
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    style={{
                      flex: 1,
                      border: 0,
                      outline: "none",
                      fontSize: 13,
                      padding: "6px 2px",
                      background: "transparent",
                      color: "#000",
                      minWidth: 0,
                    }}
                  />
                </div>
                <p style={{ fontSize: 9, color: "#333", lineHeight: 1.4, margin: "0 0 14px" }}>
                  *By providing your number and clicking the button, you agree to receive recurring
                  auto-dialed marketing SMS (including cart reminders; AI content; artificial or
                  prerecorded voices) and our <b><u>TERMS OF SERVICE</u></b> (including arbitration).
                  Consent is not required to purchase. Msg & data rates may apply. Msg frequency
                  varies. Reply HELP for help; STOP to opt-out. View <b><u>PRIVACY POLICY</u></b>.
                </p>
                <button
                  onClick={() => {
                    if (phone.trim().length >= 6) setSignedUp(true);
                  }}
                  style={{
                    background: "#000",
                    color: "#fff",
                    border: 0,
                    borderRadius: 30,
                    padding: "14px",
                    width: "100%",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    cursor: "pointer",
                  }}
                >
                  UNLOCK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
