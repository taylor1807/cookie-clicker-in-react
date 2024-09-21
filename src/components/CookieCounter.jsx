import "../Styles/CookieCounter.css";
export default function CookieCounter({ cookies, cookiesPerSecond }) {
  return (
    <div className="cookie-counter">
      <h1 id="cookies">🍪: {cookies}</h1>
      <h2 id="cps">🍪 Per Second: {cookiesPerSecond}</h2>
    </div>
  );
}
