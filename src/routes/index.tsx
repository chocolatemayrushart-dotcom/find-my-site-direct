import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const UNLOCK_KEY = "perceptve_unlocked_v1";
const PASSWORD = "perceptive";
const LOGO_URL = "/site/images/SITE_LOGO_970c0ca0-3905-4df0-bd69-b899de9083e2.png";
const UNLOCK_LOGO_URL = "/site/images/unlock-logo.webp";

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPill, setShowPill] = useState(true);
  const [phone, setPhone] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (showPwd) inputRef.current?.focus();
  }, [showPwd]);

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
      <div style={{ textAlign: "center", maxWidth: 480, width: "100%" }}>
        {!showPwd ? (
          <>
            <img
              src={UNLOCK_LOGO_URL}
              alt="Perceptve"
              style={{ width: 90, height: "auto", margin: "0 auto 28px", display: "block" }}
            />
            <h1
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "1.5px",
                margin: "0 0 14px",
              }}
            >
              5 MONTH ANNIVERSARY 22/5 5PM EST
            </h1>
            <button
              onClick={() => setShowPwd(true)}
              style={{
                background: "none",
                border: 0,
                padding: 0,
                fontSize: 11,
                letterSpacing: "2px",
                fontWeight: 700,
                cursor: "pointer",
                color: "#000",
              }}
            >
              ENTER USING PASSWORD
            </button>
          </>
        ) : (
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => {
                setShowPwd(false);
                setPwd("");
                setError(false);
              }}
              aria-label="Close"
              style={{
                position: "absolute",
                top: -44,
                right: 0,
                background: "#fff",
                border: "1px solid #000",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                lineHeight: 1,
                color: "#000",
              }}
            >
              ×
            </button>
            <form onSubmit={tryUnlock} style={{ display: "flex", alignItems: "stretch" }}>
              <input
                ref={inputRef}
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password"
                style={{
                  border: `1px solid ${error ? "#c00" : "#000"}`,
                  borderRight: 0,
                  padding: "12px 16px",
                  fontSize: 14,
                  outline: "none",
                  width: 240,
                  background: "#fff",
                  color: "#000",
                  borderRadius: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#000",
                  color: "#fff",
                  border: "1px solid #000",
                  padding: "12px 22px",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  cursor: "pointer",
                  borderRadius: 0,
                }}
              >
                ENTER
              </button>
            </form>
            {error && (
              <p style={{ color: "#c00", fontSize: 11, marginTop: 8, textAlign: "left" }}>
                Incorrect password
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom-left UNLOCK ACCESS pill with × */}
      {showPill && !showSignup && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <button
            onClick={() => setShowPill(false)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: 0,
              fontSize: 14,
              cursor: "pointer",
              color: "#000",
              padding: "0 4px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <button
            onClick={() => setShowSignup(true)}
            style={{
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
        </div>
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
              maxWidth: 380,
              width: "100%",
              padding: "32px 28px 24px",
              borderRadius: 4,
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
                top: 10,
                right: 14,
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
              src={UNLOCK_LOGO_URL}
              alt="Perceptve"
              style={{ width: 60, height: "auto", margin: "0 auto 18px", display: "block" }}
            />
            <h2
              style={{
                fontSize: 42,
                fontWeight: 800,
                margin: "4px 0 0",
                letterSpacing: "1px",
                lineHeight: 1.05,
                color: "#000",
              }}
            >
              EARLY
              <br />
              ACCESS
            </h2>
            <p style={{ fontSize: 18, margin: "10px 0 18px", fontWeight: 500, color: "#000" }}>
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
                    padding: "8px 14px",
                    marginBottom: 14,
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 14 }}>🇺🇸</span>
                  <span
                    style={{
                      fontSize: 13,
                      borderRight: "1px solid #ddd",
                      paddingRight: 8,
                      color: "#000",
                    }}
                  >
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
                <p style={{ fontSize: 9, color: "#333", lineHeight: 1.5, margin: "0 0 16px" }}>
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
                    background: "#111",
                    color: "#fff",
                    border: 0,
                    borderRadius: 40,
                    padding: "16px",
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
