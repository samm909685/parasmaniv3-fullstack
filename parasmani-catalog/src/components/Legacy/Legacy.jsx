import { Link } from "react-router-dom";

export default function Legacy() {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Manrope:wght@400;500;600&display=swap");

        .pm-legacy,
        .pm-legacy * {
          box-sizing: border-box;
        }

        .pm-legacy {
          --pm-cream: #f8f0e3;
          --pm-green: #1f3332;
          --pm-gold: #a4803e;
          --pm-band-gold: #d0a35a;

          width: 100%;
          background: var(--pm-cream);
          color: var(--pm-green);
          font-family: "Manrope", sans-serif;
        }

        .pm-legacy__inner {
          width: 100%;
          max-width: 1440px;
          margin-inline: auto;
          padding: 48px clamp(24px, 4vw, 72px) 0;
        }

        .pm-legacy__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--pm-gold);
        }

        .pm-legacy__top p {
          margin: 0;
          color: #8c682f;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .pm-legacy__top p:last-child {
          text-align: right;
          letter-spacing: 0.17em;
        }

        .pm-legacy__main {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(32px, 4vw, 64px);
          padding-block: clamp(64px, 7.5vw, 112px);
        }

        .pm-legacy__heading-group,
        .pm-legacy__story {
          min-width: 0;
        }

        .pm-legacy__heading {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(46px, 5.8vw, 88px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .pm-legacy__heading span,
        .pm-legacy__heading em {
          display: block;
        }

        .pm-legacy__heading em {
          margin-top: 4px;
          color: var(--pm-gold);
          font-weight: 500;
        }

        .pm-legacy__tagline {
          margin: 28px 0 0;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.9;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .pm-legacy__story > p {
          margin: 0;
          color: var(--pm-green);
          font-size: clamp(16px, 1.45vw, 20px);
          font-weight: 400;
          line-height: 1.85;
        }

        .pm-legacy__button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          max-width: 100%;
          min-height: 52px;
          margin-top: 26px;
          padding: 14px 28px;
          border: 1px solid var(--pm-green);
          border-radius: 999px;
          background: var(--pm-green);
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          text-decoration: none;
          transition: background-color 180ms ease,
                      border-color 180ms ease;
        }

        .pm-legacy__button:hover {
          border-color: #304d47;
          background: #304d47;
          color: #fff;
        }

        .pm-legacy__button:focus-visible {
          outline: 3px solid var(--pm-gold);
          outline-offset: 5px;
        }

        .pm-legacy__arrow {
          flex-shrink: 0;
          width: 17px;
          height: 17px;
        }

        .pm-legacy__band {
          background: var(--pm-green);
        }

        .pm-legacy__pillars {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 48px clamp(24px, 4vw, 72px);
        }

        .pm-legacy__pillar {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          padding: 12px 20px;
          text-align: center;
        }

        .pm-legacy__pillar + .pm-legacy__pillar {
          border-left: 1px solid rgba(208, 163, 90, 0.7);
        }

        .pm-legacy__pillar dt {
          margin: 0;
          color: var(--pm-band-gold);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 3.3vw, 48px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.035em;
        }

        .pm-legacy__pillar dd {
          margin: 12px 0 0;
          color: #f8f0e3;
          font-size: 10px;
          font-weight: 400;
          line-height: 1.9;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        @media (min-width: 1200px) {
          .pm-legacy__heading span,
          .pm-legacy__heading em {
            white-space: nowrap;
          }
        }

        @media (max-width: 1000px) {
          .pm-legacy__main {
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          }

          .pm-legacy__heading {
            font-size: clamp(44px, 5.6vw, 62px);
          }

          .pm-legacy__tagline {
            font-size: 10px;
            letter-spacing: 0.2em;
          }

          .pm-legacy__pillar {
            padding-inline: 14px;
          }

          .pm-legacy__pillar dd {
            letter-spacing: 0.16em;
          }
        }

        @media (max-width: 760px) {
          .pm-legacy__inner {
            padding: 28px 24px 0;
          }

          .pm-legacy__top {
            gap: 12px;
            padding-bottom: 12px;
          }

          .pm-legacy__top p {
            font-size: 9px;
            letter-spacing: 0.16em;
          }

          .pm-legacy__top p:last-child {
            letter-spacing: 0.1em;
          }

          .pm-legacy__main {
            grid-template-columns: minmax(0, 1fr);
            gap: 26px;
            padding-block: 32px 28px;
          }

          .pm-legacy__heading {
            font-size: clamp(40px, 7vw, 58px);
            line-height: 1.06;
          }

          .pm-legacy__heading em {
            margin-top: 2px;
          }

          .pm-legacy__tagline {
            margin-top: 18px;
            font-size: 9px;
            letter-spacing: 0.2em;
          }

          .pm-legacy__story > p {
            max-width: 560px;
            font-size: 15px;
            line-height: 1.8;
          }

          .pm-legacy__button {
            min-height: 48px;
            margin-top: 22px;
            padding: 12px 24px;
            font-size: 14px;
          }

          .pm-legacy__pillars {
            grid-template-columns: minmax(0, 1fr);
            padding: 4px 24px;
          }

          .pm-legacy__pillar {
            padding: 26px 0;
          }

          .pm-legacy__pillar + .pm-legacy__pillar {
            border-left: 0;
            border-top: 1px solid rgba(208, 163, 90, 0.7);
          }

          .pm-legacy__pillar dt {
            font-size: 36px;
          }

          .pm-legacy__pillar dd {
            margin-top: 8px;
            font-size: 9px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-width: 360px) {
          .pm-legacy__inner {
            padding-inline: 18px;
          }

          .pm-legacy__top {
            flex-wrap: wrap;
            gap: 4px 12px;
          }

          .pm-legacy__top p:last-child {
            text-align: left;
          }

          .pm-legacy__heading {
            font-size: 36px;
          }

          .pm-legacy__tagline {
            letter-spacing: 0.14em;
          }

          .pm-legacy__pillars {
            padding-inline: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pm-legacy__button {
            transition: none;
          }
        }
      `}</style>

      <section className="pm-legacy" aria-labelledby="pm-legacy-heading">
        <div className="pm-legacy__inner">
          <div className="pm-legacy__top">
            <p>Our Legacy</p>
            <p>Kolhapur · Since 1965</p>
          </div>

          <div className="pm-legacy__main">
            <div className="pm-legacy__heading-group">
              <h2 id="pm-legacy-heading" className="pm-legacy__heading">
                <span>A legacy of trust.</span>
                <em>Crafted to endure.</em>
              </h2>

              <p className="pm-legacy__tagline">
                Four generations. One commitment.
              </p>
            </div>

            <div className="pm-legacy__story">
              <p>
                Since 1965, Parasmani Jewellers has carried forward the
                art of traditional Maharashtrian gold jewellery.
                Rooted in Kolhapur, our craft brings generations of
                care to every creation.
              </p>

              <Link to="/about" className="pm-legacy__button">
                Discover Our Story
                <svg
                  className="pm-legacy__arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 18 18 6M6 6h12v12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="pm-legacy__band">
          <dl className="pm-legacy__pillars">
            <div className="pm-legacy__pillar">
              <dt>1965</dt>
              <dd>Where our story began</dd>
            </div>

            <div className="pm-legacy__pillar">
              <dt>Four Generations</dt>
              <dd>A tradition carried forward</dd>
            </div>

            <div className="pm-legacy__pillar">
              <dt>Handcrafted</dt>
              <dd>Care in every detail</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}