import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(value, { stiffness: 75, damping: 15, mass: 0.8 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Helper to calculate price based on cycle
  const getPrice = (price: number) => {
    return billingCycle === 'annual' ? Math.round(price * 0.7) : price;
  };

  const plans = [
    {
      name: "Basic",
      price: 799,
      description: "For small businesses or startups building their first digital presence.",
      features: [
        "Competitor analysis",
        "Design of homepage + up to 4 inner pages",
        "Creation of custom page prototypes",
        "Basic analytics setup (e.g., Google Analytics)",
        "Setup of a basic contact form",
        "Bug fixing and testing support"
      ],
      isHighlight: false,
      badge: null
    },
    {
      name: "Pro",
      price: 1999,
      oldPrice: 2599,
      description: "For growing businesses needing more features and flexibility.",
      features: [
        "Everything in the Basic Plan",
        "Up to 10 pages, fully customized",
        "Social media integration",
        "Optimized mobile and tablet versions",
        "Enhanced SEO for core pages",
        "Custom email template design for leads",
        "Priority support for 6 months post-launch"
      ],
      isHighlight: true,
      badge: { text: "Most popular", bg: "bg-[#AFFF00]/10", textCol: "text-[#476D07]", icon: "fire" }
    },
    {
      name: "Max",
      price: 3999,
      description: "For established brands looking for a fully tailored experience.",
      features: [
        "Everything in the Professional Plan",
        "Custom blog design + setup",
        "Monthly analytics + performance reporting",
        "E-commerce functionality (if needed)",
        "Unlimited revisions during the design phase"
      ],
      isHighlight: false,
      badge: { text: "Premium", bg: "bg-[#0C0C0C]", textCol: "text-white", icon: "diamond" }
    }
  ];

  return (
    <section id="pricing" className="w-full bg-[#F5F5F5] py-24 px-4 md:px-8 text-[#0C0C0C] poppins-regular">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl mona-sans-condensed-bold tracking-tighter mb-6">Flexible pricing</h2>
        <p className="text-[#0C0C0C]/60 text-base md:text-lg max-w-lg mx-auto leading-relaxed poppins-medium">
          Choose the plan that best fits your needs.<br className="hidden md:block" />
          From a solid foundation to a fully optimized solution
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-20 select-none">
        <span
          className={`text-sm poppins-medium transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-[#0C0C0C]/60' : 'text-[#0C0C0C]/60'} cursor-pointer hover:text-black`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </span>

        <button
          onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
          className="w-[50px] h-[30px] bg-[#AFFF00] rounded-full p-[3px] relative transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          <div className={`w-[24px] h-[24px] bg-white rounded-full shadow-sm transition-transform duration-300 ${billingCycle === 'annual' ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
        </button>

        <span
          className={`text-sm poppins-medium transition-colors duration-300 ${billingCycle === 'annual' ? 'text-[#0C0C0C]' : 'text-[#0C0C0C]'} cursor-pointer hover:text-black`}
          onClick={() => setBillingCycle('annual')}
        >
          Annual
        </span>

        <div className="bg-[#AFFF00]/10 text-[#476D07] text-xs poppins-bold px-3 py-1.5 rounded-full ml-1">
          Save 30%
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`
                    relative p-8 md:p-10 flex flex-col h-full transition-all duration-300
                    ${plan.isHighlight ? 'bg-white shadow-xl scale-100 z-10' : 'bg-transparent'}
                `}
          >
            {/* Pro Card Accent Corner (Top Right) */}
            {plan.isHighlight && (
              <div className="absolute top-0 right-0 p-4">
                <div className="w-3 h-3 border-t-[2px] border-r-[2px] border-[#AFFF00]"></div>
              </div>
            )}

            {/* Header Row: Name + Badge */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#0C0C0C] text-[17px] poppins-medium tracking-tight">{plan.name}</h3>
              {plan.badge && (
                <div className={`${plan.badge.bg} ${plan.badge.textCol} px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] poppins-bold uppercase tracking-wide`}>
                  {plan.badge.icon === "fire" && (
                    <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor"><path d="M216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Z"></path></svg>
                  )}
                  {plan.badge.icon === "diamond" && (
                    <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM74.58,112l30.13,75.33L34.41,112Zm89.6,0L128,202.46,91.82,112ZM96,96l32-42.67L160,96Zm85.42,16h40.17l-70.3,75.33ZM75.63,48H112L76,96H33.63Z"></path></svg>
                  )}
                  {plan.badge.text}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2">
              {plan.oldPrice && (
                <span className="text-[#0C0C0C]/30 text-2xl poppins-bold line-through decoration-1">
                  $<AnimatedCounter value={getPrice(plan.oldPrice)} />
                </span>
              )}
              <span className="text-[56px] poppins-bold tracking-tighter text-[#0B0B0C] leading-none flex items-baseline">
                $<AnimatedCounter value={getPrice(plan.price)} />
              </span>
              <span className="text-[#0B0B0C]/40 poppins-medium text-[17px]">/month</span>
            </div>

            {/* Description */}
            <p className="text-[#0C0C0C]/60 text-[15px] leading-relaxed mb-10 min-h-[60px] poppins-regular max-w-[280px]">
              {plan.description}
            </p>

            {/* Button */}
            <a href="#" className={`
                    w-full h-[64px] flex items-center justify-center gap-3 poppins-semibold text-[16px] transition-transform hover:scale-[1.02] mb-10 shadow-sm
                    ${plan.isHighlight ? 'bg-[#AFFF00] text-black shadow-lg' : 'bg-white text-[#0C0C0C]'}
                `}>
              {/* Icon */}
              <div className={`w-5 h-5 ${plan.isHighlight ? 'text-black' : 'text-[#476D07]'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                  <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
                </svg>
              </div>
              Choose this plan
            </a>

            {/* What's Included */}
            <div className="mb-4">
              <span className="text-[#0C0C0C] poppins-semibold text-sm">What's Included:</span>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  {/* L-Shape Bullet (Top-Left Bracket Style) */}
                  <div className="w-2.5 h-2.5 border-t-[2px] border-l-[2px] border-[#588B00] mt-1.5 shrink-0"></div>
                  <span className="text-[#0C0C0C]/60 poppins-medium text-[15px] leading-snug">{feature}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;