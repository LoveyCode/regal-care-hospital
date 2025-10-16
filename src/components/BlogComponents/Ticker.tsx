import { tickerMessages } from "../../../data/blog";



export default function Ticker() {
  return (
    <div className="block w-full h-6 mt-0]">
      <div className="w-full h-6 bg-yellow-600 shadow-2xl">
        <div className="ticker-viewport">
          <div className="ticker-track">
            {[...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span key={i} className="ticker-item mx-8">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
