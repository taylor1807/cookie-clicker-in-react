import "../Styles/CookieCounter.css";
export default function CookieCounter({ cookies, cookiesPerSecond }) {
  return (
    <div className="cookie-counter">
      <h1>🍪: {cookies}</h1>
      <h2>🍪 Per Second: {cookiesPerSecond}</h2>
    </div>
  );
}
