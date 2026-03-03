import React from 'react';

const CheckItem = ({ text, checked }: { text: string, checked?: boolean }) => (
    <li className="flex items-center gap-3">
        {checked ? (
            <div className="w-[18px] h-[18px] rounded-full bg-[#F9452D] flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(248,68,45,0.35)]">
                <svg width="10" height="8" viewBox="0 0 8 6" fill="black"><path d="M2.5 6L0 3.5L0.71 2.79L2.5 4.58L7.29 0L8 0.71L2.5 6Z"/></svg>
            </div>
        ) : (
             <div className="w-[18px] h-[18px] rounded-full border border-[#E5E5E5] shrink-0 bg-white"></div>
        )}
        <span className={`text-[14px] font-medium tracking-tight ${checked ? 'text-black/40 line-through' : 'text-black'}`}>{text}</span>
    </li>
);

// Exact SVGs from the snippet
const IconFolder = () => (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" className="text-white"><path d="M224,64H154.67L126.93,43.2a16.12,16.12,0,0,0-9.6-3.2H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H192.89A15.13,15.13,0,0,0,208,200.89V184h16.89A15.13,15.13,0,0,0,240,168.89V80A16,16,0,0,0,224,64ZM192,200H40V88H85.33l29.87,22.4A8,8,0,0,0,120,112h72Zm32-32H208V112a16,16,0,0,0-16-16H122.67L94.93,75.2a16.12,16.12,0,0,0-9.6-3.2H72V56h45.33L147.2,78.4A8,8,0,0,0,152,80h72Z"></path></svg>
);
const IconPen = () => (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" className="text-white"><path d="M224,67.3a35.79,35.79,0,0,0-11.26-25.66c-14-13.28-36.72-12.78-50.62,1.13L142.8,62.2a24,24,0,0,0-33.14.77l-9,9a16,16,0,0,0,0,22.64l2,2.06-51,51a39.75,39.75,0,0,0-10.53,38l-8,18.41A13.68,13.68,0,0,0,36,219.3a15.92,15.92,0,0,0,17.71,3.35L71.23,215a39.89,39.89,0,0,0,37.06-10.75l51-51,2.06,2.06a16,16,0,0,0,22.62,0l9-9a24,24,0,0,0,.74-33.18l19.75-19.87A35.75,35.75,0,0,0,224,67.3ZM97,193a24,24,0,0,1-24,6,8,8,0,0,0-5.55.31l-18.1,7.91L57,189.41a8,8,0,0,0,.25-5.75A23.88,23.88,0,0,1,63,159l51-51,33.94,34ZM202.13,82l-25.37,25.52a8,8,0,0,0,0,11.3l4.89,4.89a8,8,0,0,1,0,11.32l-9,9L112,83.26l9-9a8,8,0,0,1,11.31,0l4.89,4.89a8,8,0,0,0,11.33,0l24.94-25.09c7.81-7.82,20.5-8.18,28.29-.81a20,20,0,0,1,.39,28.7Z"></path></svg>
);
const IconImage = () => (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" className="text-white"><path d="M208,32H80A16,16,0,0,0,64,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V192h16a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM80,48H208v69.38l-16.7-16.7a16,16,0,0,0-22.62,0L93.37,176H80Zm96,160H48V80H64v96a16,16,0,0,0,16,16h96Zm32-32H116l64-64,28,28v36Zm-88-64A24,24,0,1,0,96,88,24,24,0,0,0,120,112Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,120,80Z"></path></svg>
);
const IconType = () => (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" className="text-white"><path d="M87.24,52.59a8,8,0,0,0-14.48,0l-64,136a8,8,0,1,0,14.48,6.81L39.9,160h80.2l16.66,35.4a8,8,0,1,0,14.48-6.81ZM47.43,144,80,74.79,112.57,144ZM200,96c-12.76,0-22.73,3.47-29.63,10.32a8,8,0,0,0,11.26,11.36c3.8-3.77,10-5.68,18.37-5.68,13.23,0,24,9,24,20v3.22A42.76,42.76,0,0,0,200,128c-22.06,0-40,16.15-40,36s17.94,36,40,36a42.73,42.73,0,0,0,24-7.25,8,8,0,0,0,16-.75V132C240,112.15,222.06,96,200,96Zm0,88c-13.23,0-24-9-24-20s10.77-20,24-20,24,9,24,20S213.23,184,200,184Z"></path></svg>
);

const PrioritySection: React.FC = () => {
  return (
    <section id="benefits" className="w-full bg-white py-24 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-6">
          Your goals, our priority
        </h2>
        <p className="text-[#0C0C0C]/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          From concept to launch, we're committed to your success with rapid response times and personalized attention to detail.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Card 1: 24/7 Care */}
        <div className="bg-white border border-gray-100 p-8 flex flex-col justify-between h-[540px] relative overflow-hidden group" data-border="true">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 z-0 opacity-40" 
                 style={{ backgroundImage: 'url("https://framerusercontent.com/images/febsTulDmLM5GKKVYjsE85lLAk.svg?width=911&height=475")', backgroundRepeat: 'repeat', backgroundSize: '856.5px auto', backgroundPosition: 'left top' }}>
            </div>
            
            {/* Hands Image Container - Positioned to float in the upper area */}
            <div className="absolute top-0 left-0 right-0 h-[70%] z-10 pointer-events-none flex items-center justify-center overflow-hidden">
                 <img src="https://framerusercontent.com/images/Lpb2prDXL2p8hnnWcYXnIO6f0Q.png?width=671&height=534" 
                      className="w-full h-full object-contain object-top scale-110" 
                      alt="Two hands in an elegant gesture" />
            </div>

            <div className="mt-auto relative z-20">
                <h3 className="text-xl font-bold text-black mb-3 tracking-tight">24/7 priority care</h3>
                <p className="text-[#0C0C0C]/60 text-sm leading-relaxed">
                    Receive priority treatment for urgent tasks, with an <span className="text-[#0C0C0C] font-normal">average response time of 24 hours</span> for high-priority clients.
                </p>
            </div>
        </div>

        {/* Card 2: Tailored Tweaks */}
        <div className="bg-[#F5F5F5] p-8 flex flex-col h-[540px] relative overflow-hidden">
             {/* Red accent corner */}
             <div className="absolute top-6 right-6 text-[#F9452D]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1H11V11" stroke="currentColor" strokeWidth="1.5"/></svg>
             </div>

             <div className="mb-6 z-10">
                <h3 className="text-xl font-bold text-black mb-2 tracking-tight">Tailored tweaks<br/>for perfection</h3>
                <p className="text-[#0C0C0C]/60 text-sm leading-relaxed mb-5">
                    Request custom revisions at any time. We provide <span className="text-black font-normal">up to 5 minor revisions</span> post-launch to keep things looking fresh.
                </p>
                {/* Avatars */}
                <div className="flex -space-x-2 pl-1">
                    {[
                        "https://framerusercontent.com/images/2AYuIsYxoyH0AB4UH3OZXNPNbAo.jpg?width=63&height=63",
                        "https://framerusercontent.com/images/o8dFjBzWHUDItoXVX8r1Ndzlk.jpg?width=63&height=63",
                        "https://framerusercontent.com/images/0pDtIhqRHGNuPAzd4BSRF7WMlXk.jpg?width=63&height=63",
                        "https://framerusercontent.com/images/EagZOs8hT2OPs3zEGfOxlGf3Bc8.jpg?width=63&height=63"
                    ].map((src, i) => (
                        <div key={i} className={`w-[42px] h-[42px] rounded-full border-2 border-[#F5F5F5] overflow-hidden bg-gray-300 relative ${i > 0 ? 'opacity-30' : ''}`}>
                             <img src={src} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
             </div>

             {/* Inner Card */}
             <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mt-auto flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="text-[18px] font-medium text-black tracking-tight mb-4">Post-Launch requests</h4>
                    <ul className="space-y-3">
                        <CheckItem text="Align text margins properly" checked />
                        <CheckItem text="Increase mobile menu font size" checked />
                        <CheckItem text="Replace images" checked />
                        <CheckItem text="Fix button color: #F9452D" />
                        <CheckItem text="Speed up page loading" />
                    </ul>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-[13px] font-medium text-black">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="black"><path d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0ZM9,16.51A7.51,7.51,0,1,1,16.51,9,7.52,7.52,0,0,1,9,16.51ZM4.8,7.49,3.74,8.55l3.85,3.86L14.26,5.74,13.2,4.68,7.59,10.29Z"/></svg>
                    Valid for 3 months after launch
                </div>
             </div>
        </div>

        {/* Card 3: Brand Kit */}
        <div className="bg-[#0A0A0A] p-8 flex flex-col justify-between h-[540px] relative overflow-hidden">
             {/* Grid Lines Overlay */}
             <div className="absolute inset-0 opacity-100 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
             </div>

             <div className="relative z-10 text-center w-full mt-8 flex flex-col items-center">
                 <span className="text-[13px] text-white font-medium mb-6 block tracking-tight">Download brand kit</span>
                 <div className="flex justify-center gap-6 text-white mb-16 opacity-100">
                     <IconFolder />
                     <IconPen />
                     <IconImage />
                     <IconType />
                 </div>
                 
                 {/* Red Circle Button */}
                 <div className="w-[85px] h-[85px] mx-auto bg-[#F9452D] rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(249,69,45,0.3)] group cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="absolute -top-1 right-0 bg-white text-[#F9452D] text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">6</div>
                      <svg width="34" height="26" viewBox="0 0 34 26" fill="black"><path d="M19.38,18.57h-4.76v-7.23h-6.28l8.66-8.66,8.66,8.66h-6.28v7.23ZM1.54,24.52h30.93v-4.76H1.54v4.76Z"/></svg>
                 </div>
             </div>

             <div className="relative z-10 text-center mb-2">
                 <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Brand kit at your fingertips</h3>
                 <p className="text-white/60 text-sm leading-relaxed px-2">
                    Receive a full branding toolkit, from logos to color schemes and typography, <span className="text-white font-normal">download all assets</span> or share them with your team.
                 </p>
             </div>
        </div>

        {/* Card 4: Phone Mockup */}
        <div className="h-[540px] relative overflow-hidden group bg-black">
             {/* Background Portrait */}
             <img src="https://framerusercontent.com/images/Ttm9L1HJZLgD0GMqwHKZ0YOw.jpg?width=537&height=748" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Background Portrait" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

            {/* Phone Mockup Frame */}
            <div className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 w-[280px] h-[550px] z-10">
                 <img src="https://framerusercontent.com/images/zqhjvenuB6JlWRw3MCGzn16Xs.png?width=525&height=845" 
                      className="w-full h-full object-contain drop-shadow-2xl" alt="Phone Frame" />
                 
                 {/* Screen Content - Positioned absolutely over the phone frame image area */}
                 <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] rounded-[35px] overflow-hidden z-[-1]">
                      {/* Background matching the design */}
                      <div className="w-full h-full bg-[#FF8A65] relative">
                            <img src="https://framerusercontent.com/images/Ttm9L1HJZLgD0GMqwHKZ0YOw.jpg?width=537&height=748" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                            
                            {/* Lock Screen Time */}
                            <div className="absolute top-12 left-0 right-0 text-center text-white/95 z-20">
                                <div className="text-[62px] font-medium tracking-[-0.07em] leading-[1.1]">10:45</div>
                            </div>

                            {/* Notification */}
                            <div className="absolute top-36 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl flex items-start gap-3 z-20">
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                    <img src="https://framerusercontent.com/images/IOGg7ZpaneY0TlHE5oJ2WoVALk4.jpg?width=320&height=480" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="text-[12px] font-semibold text-[#0B0B0C]">Designer</span>
                                        <span className="text-[11px] font-medium text-[#111112]">Today 09:17</span>
                                    </div>
                                    <p className="text-[13px] text-black/60 leading-tight">Logo update complete, ready for your review!</p>
                                </div>
                            </div>

                             {/* Bottom Branding */}
                            <div className="absolute bottom-20 left-0 right-0 text-center text-white/90 z-20">
                                <div className="font-bebas text-[30px] leading-[0.85em] tracking-[-0.04em] mb-4">DRIX MEDIA<sup className="text-[12px]">®</sup></div>
                                <div className="text-[14px] font-medium tracking-tight leading-[1.4] opacity-100">Real-Time<br/>Support</div>
                            </div>
                      </div>
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default PrioritySection;