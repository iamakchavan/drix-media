import React, { useState } from 'react';

const services = [
    {
        id: '01',
        title: 'Creative Production',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
        description: "Films, photography, content creation that captures attention and tells your story."
    },
    {
        id: '02',
        title: 'Branding & Identity',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        description: "Positioning, visual identity, messaging, and brand systems that differentiate you."
    },
    {
        id: '03',
        title: 'Content Strategy & Marketing',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
        description: "Content that connects with your audience and drives them to action."
    },
    {
        id: '04',
        title: 'Digital & Web Design',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop',
        description: "Websites and digital experiences built for performance and usability."
    },
    {
        id: '05',
        title: 'Campaigns & Performance',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
        description: "Integrated campaigns across channels designed to deliver measurable results."
    }
];

const ServicesSection: React.FC = () => {
    const [activeService, setActiveService] = useState(0);

    return (
        <section className="w-full bg-black py-16 md:py-20 px-6 md:px-12 relative overflow-hidden text-white font-sans">
            <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row">

                {/* Left Sidebar / Header Elements */}
                <div className="hidden md:flex flex-col w-[120px] shrink-0 h-full relative">
                    {/* Logo */}
                    <div className="flex items-start mb-32">
                        <span className="font-bebas text-[32px] lg:text-[40px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
                        <span className="font-bebas text-[14px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-1">®</span>
                    </div>

                    {/* Vertical Label */}
                    <div className="relative">
                        {/* Rotate origin top-left to hang downwards */}
                        <div className="flex flex-col gap-2">
                            {/* The 'Category' block from snippet: Corner + Text */}
                            <div className="relative">
                                {/* Red Corner: border-bottom + border-right, rotated -90deg */}
                                <div className="absolute -left-3 top-1 w-2.5 h-2.5 border-r-2 border-b-2 border-[#AFFF00] transform -rotate-90"></div>
                                <span className="text-[13px] font-semibold tracking-[-0.04em] uppercase text-white transform -rotate-90 origin-top-left translate-y-16 block whitespace-nowrap">
                                    Services
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="flex md:hidden items-center justify-between mb-16">
                    <div className="flex items-start">
                        <span className="font-bebas text-[32px] leading-[0.85em] tracking-[-0.04em]">DRIX MEDIA</span>
                        <span className="font-bebas text-[12px] leading-[0.85em] tracking-[-0.04em] ml-0.5 pt-1">®</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold tracking-[-0.04em] uppercase text-white">Services</span>
                        <div className="w-2 h-2 border-r-2 border-b-2 border-[#AFFF00]"></div>
                    </div>
                </div>


                {/* Main Content Grid */}
                <div className="flex flex-col md:flex-row w-full gap-12 lg:gap-24 pl-0 md:pl-8">

                    {/* Image & Description Column */}
                    <div className="w-full md:w-5/12 relative flex flex-col pt-4 md:pt-32 min-h-[500px]">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`absolute inset-0 flex flex-col transition-all duration-700 ease-out ${activeService === index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                            >
                                {/* Image */}
                                <div className="w-full aspect-[4/3] mb-8 overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col gap-4">
                                    <h4 className="text-white/60 text-base font-normal tracking-wide">{service.title}</h4>
                                    <p className="text-white text-base md:text-lg leading-relaxed max-w-md font-medium">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* List Column */}
                    <div className="w-full md:w-7/12 flex flex-col pt-0 md:pt-32">
                        <div className="flex flex-col gap-2">
                            {services.map((service, index) => {
                                const isActive = activeService === index;
                                return (
                                    <div
                                        key={service.id}
                                        className="group flex items-start cursor-pointer transition-all duration-300 select-none"
                                        onMouseEnter={() => setActiveService(index)}
                                    >
                                        <div className="flex items-start justify-between gap-4 w-full">

                                            {/* Title */}
                                            <h3
                                                className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.05em] leading-[1.1] transition-all duration-300 flex-1 min-w-0
                                            ${isActive ? 'text-white' : 'text-white/15 group-hover:text-white/30'}`}
                                            >
                                                {service.title}
                                            </h3>

                                            {/* Number: { 01 } — always right-aligned */}
                                            <div className="flex items-baseline font-bold tracking-[-0.05em] text-lg md:text-xl flex-shrink-0 pt-2 md:pt-3">
                                                <span className={`transition-colors duration-300 ${isActive ? 'text-[#AFFF00]' : 'text-white/20'}`}>{'{'}</span>
                                                <span className={`mx-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>{service.id}</span>
                                                <span className={`transition-colors duration-300 ${isActive ? 'text-[#AFFF00]' : 'text-white/20'}`}>{'}'}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Link */}
                        <div className="mt-16 md:mt-24">
                            <a href="#" className="inline-flex items-center gap-4 group">
                                {/* SVG Icon from snippet */}
                                <div className="w-8 h-8 text-[#AFFF00] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
                                        <path d="M221.66,181.66l-48,48a8,8,0,0,1-11.32-11.32L196.69,184H72a8,8,0,0,1-8-8V32a8,8,0,0,1,16,0V168H196.69l-34.35-34.34a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,221.66,181.66Z"></path>
                                    </svg>
                                </div>
                                <span className="text-white font-medium text-lg">See pricing</span>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ServicesSection;