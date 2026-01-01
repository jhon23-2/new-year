import { useEffect, useState } from "react";

export default function NewYear() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 400);
  }, []);

  return (
    <div className="page">
      
      {/* LEFT SIDE — IMAGE */}
      <div className="image-side">
        <img src="/love.jpeg" alt="My Love" />
      </div>

      {/* RIGHT SIDE — MESSAGE */}
      <div className="content-side">
        <div className={`card ${show ? "show" : ""}`}>
          <h1>🎆 Happy New Year My Love 🎆</h1>

          <p>
            A new year begins, and my favorite place to start it
            is right here with you ❤️
          </p>

          <p className="signature">
            — With all my love 💖
          </p>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: system-ui, sans-serif;
        }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        }

        /* IMAGE SIDE */
        .image-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .image-side img {
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        /* CONTENT SIDE */
        .content-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 32px;
          max-width: 520px;
          width: 100%;
          color: white;
          text-align: center;

          opacity: 0;
          transform: scale(0.95);
          transition: 1s ease;
        }

        .card.show {
          opacity: 1;
          transform: scale(1);
        }

        h1 {
          font-size: clamp(1.6rem, 5vw, 2.4rem);
        }

        p {
          font-size: clamp(1rem, 4vw, 1.2rem);
          line-height: 1.6;
        }

        .signature {
          margin-top: 20px;
          opacity: 0.9;
        }

        /* 📱 MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .page {
            grid-template-columns: 1fr;
          }

          .image-side img {
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
