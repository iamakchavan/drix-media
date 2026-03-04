import React from 'react';

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
];

const TrustBar: React.FC = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <h2 className="text-center text-lg md:text-xl font-semibold text-gray-600">
          Trusted by brands across India and beyond
        </h2>
      </div>
      
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          <div className="flex animate-marquee min-w-full shrink-0 items-center">
            {logos.map((src, i) => (
              <div key={i} className="w-[290px] h-[140px] flex-shrink-0 border-l border-t border-b border-[#E0E0E0] bg-white flex items-center justify-center">
                <div className="relative w-[120px] h-[60px] flex items-center justify-center">
                  <img src={src} alt="Partner Logo" className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee min-w-full shrink-0 items-center">
            {logos.map((src, i) => (
              <div key={`dup-${i}`} className="w-[290px] h-[140px] flex-shrink-0 border-l border-t border-b border-[#E0E0E0] bg-white flex items-center justify-center">
                <div className="relative w-[120px] h-[60px] flex items-center justify-center">
                  <img src={src} alt="Partner Logo" className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
