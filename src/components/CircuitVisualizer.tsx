import React, { useState } from 'react';
import { Layers, Network, Zap, Eye, Lightbulb, Tv, Cpu } from 'lucide-react';

type ViewMode = 'schematic' | 'architecture';

export default function CircuitVisualizer() {
  const [activeView, setActiveView] = useState<ViewMode>('schematic');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden" id="circuit-visualizer">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h3 className="text-xl font-bold font-display text-white tracking-tight">
            System Design & Blueprints
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Toggle between the physical Fritzing breadboard layout and the system architecture block flow diagram
          </p>
        </div>

        <div className="flex gap-1.5 p-1 bg-slate-950 border border-slate-800/80 rounded-xl">
          <button
            onClick={() => setActiveView('schematic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeView === 'schematic'
                ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Fritzing Breadboard Layout</span>
          </button>
          
          <button
            onClick={() => setActiveView('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeView === 'architecture'
                ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>Block Architecture</span>
          </button>
        </div>
      </div>

      {/* Viewport Area */}
      <div className="bg-slate-950/40 rounded-xl border border-slate-900/80 p-4 md:p-6 min-h-[460px] flex items-center justify-center relative">
        
        {/* 1. Circuit Schematic vector SVG */}
        {activeView === 'schematic' && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* Wiring Diagram Graphic */}
            <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-950 rounded-xl border border-slate-900 p-4 flex flex-col items-center justify-center">
              
              {/* Circuit Title Header inside Schematic */}
              <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-500 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>PHYSICAL WIRING REV 1.5 - ARDUINO LIFI RECEIVER HARDWARE BREADBOARD</span>
              </div>

              {/* Decorative Schematic Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              {/* Vector Fritzing diagram */}
              <svg viewBox="0 0 920 540" className="w-full h-full relative z-10 select-none">
                
                {/* 1. POWER AND GROUND RAILS CONNECTIONS */}
                {/* Red wire 5V Arduino to bottom Breadboard Red rail */}
                <path d="M 255 460 L 255 510 L 415 510" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Black wire GND Arduino to bottom Breadboard Black rail */}
                <path d="M 275 460 L 275 520 L 415 520" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Power Bridge (Bottom rails to Top rails on breadboard right) */}
                <path d="M 855 510 L 880 510 L 880 150 L 855 150" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 855 520 L 890 520 L 890 140 L 855 140" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* 2. LDR MODULE CONNECTION WIRES */}
                {/* +5V Red wire from LDR module to Breadboard Top Power rail */}
                <path d="M 750 250 L 750 150" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* GND Black wire from LDR module to Breadboard Top Ground rail */}
                <path d="M 780 250 L 780 140" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* AO (Analog Out) Signal Blue wire from LDR to Arduino Analog A0 Pin */}
                <path d="M 765 250 L 765 100 L 295 100 L 295 460" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* 3. LCD DATA / SIGNAL WIRES (Arduino Pins 12, 11, 5, 4, 3, 2 to LCD Pins) */}
                {/* Arduino Pin 12 -> LCD RS */}
                <path d="M 195 140 L 195 70 L 465 70 L 465 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arduino Pin 11 -> LCD E */}
                <path d="M 210 140 L 210 60 L 495 60 L 495 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arduino Pin 5 -> LCD D4 */}
                <path d="M 285 140 L 285 50 L 570 50 L 570 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arduino Pin 4 -> LCD D5 */}
                <path d="M 300 140 L 300 40 L 585 40 L 585 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arduino Pin 3 -> LCD D6 */}
                <path d="M 315 140 L 315 30 L 600 30 L 600 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Arduino Pin 2 -> LCD D7 */}
                <path d="M 330 140 L 330 20 L 615 20 L 615 315" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* LCD power local bridges on Breadboard */}
                {/* VSS to GND */}
                <path d="M 420 315 L 420 140" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* VDD to VCC */}
                <path d="M 435 315 L 435 150" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* V0 to GND (For high contrast preset) */}
                <path d="M 450 315 L 450 140" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* RW to GND */}
                <path d="M 480 315 L 480 140" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Backlight Cathode (K) to GND */}
                <path d="M 645 315 L 645 140" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Resistor (220 ohm for backlight LED A) to VCC */}
                <g className="cursor-help" title="220 ohm Resistor for LCD Backlight">
                  {/* Resistor body */}
                  <rect x="625" y="145" width="10" height="25" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
                  {/* Resistor color bands (Red, Red, Brown, Gold) */}
                  <rect x="625" y="149" width="10" height="2.5" fill="#ef4444" />
                  <rect x="625" y="154" width="10" height="2.5" fill="#ef4444" />
                  <rect x="625" y="159" width="10" height="2.5" fill="#78350f" />
                  {/* Pins */}
                  <path d="M 630 145 L 630 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M 630 170 L 630 315" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                </g>


                {/* --- COMPONENT 1: ARDUINO UNO R3 BOARD (Left) --- */}
                <g 
                  className="cursor-pointer group" 
                  onMouseEnter={() => setHoveredNode('mcu')} 
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* PCB Plate */}
                  <rect x="60" y="120" width="280" height="360" rx="12" fill="#006d77" stroke="#0081a7" strokeWidth="3.5" className="group-hover:stroke-cyan-400 transition-colors duration-200" />
                  
                  {/* USB Port B Connector */}
                  <rect x="35" y="150" width="60" height="75" rx="4" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
                  <rect x="42" y="158" width="46" height="59" fill="#1e293b" />
                  
                  {/* Power Barrel Connector */}
                  <rect x="40" y="340" width="65" height="95" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                  
                  {/* Main IC MCU ATmega328P Chip */}
                  <rect x="180" y="270" width="120" height="35" rx="3" fill="#1e293b" stroke="#000000" strokeWidth="2" />
                  <text x="240" y="292" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATMEGA328P-PU</text>
                  {/* Small gold legs */}
                  {Array.from({ length: 14 }).map((_, i) => (
                    <g key={i}>
                      <rect x={185 + i * 8} y="266" width="3" height="4" fill="#fbbf24" />
                      <rect x={185 + i * 8} y="305" width="3" height="4" fill="#fbbf24" />
                    </g>
                  ))}

                  {/* Header Rails */}
                  {/* Digital Pins Header Row */}
                  <rect x="140" y="125" width="185" height="15" rx="2" fill="#0f172a" />
                  <text x="232" y="117" fill="#8ecae6" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DIGITAL (PWM ~)</text>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <circle key={i} cx={148 + i * 13} cy="132.5" r="3.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
                  ))}
                  <text x="312" y="137" fill="#ffffff" fontSize="7" fontFamily="monospace">8</text>
                  <text x="146" y="137" fill="#ffffff" fontSize="7" fontFamily="monospace">RX</text>

                  {/* Power / Analog Rails */}
                  <rect x="145" y="445" width="180" height="15" rx="2" fill="#0f172a" />
                  <text x="185" y="473" fill="#8ecae6" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">POWER</text>
                  <text x="285" y="473" fill="#8ecae6" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ANALOG IN</text>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <circle key={i} cx={153 + i * 14} cy="452.5" r="3.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
                  ))}
                  <text x="249" y="442" fill="#ef4444" fontSize="7" fontFamily="monospace">5V</text>
                  <text x="263" y="442" fill="#94a3b8" fontSize="7" fontFamily="monospace">GND</text>
                  <text x="291" y="442" fill="#22d3ee" fontSize="7" fontFamily="monospace">A0</text>

                  {/* RESET BUTTON */}
                  <rect x="75" y="420" width="30" height="30" rx="4" fill="#334155" />
                  <circle cx="90" cy="435" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
                  <text x="90" y="415" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RESET</text>

                  {/* Printed Logo text */}
                  <text x="240" y="210" fill="#ffffff" fontSize="18" fontFamily="sans-serif" fontWeight="900" letterSpacing="1" textAnchor="middle">Arduino</text>
                  <text x="240" y="226" fill="#8ecae6" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">UNO R3</text>
                  <circle cx="170" cy="210" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <path d="M 162 210 L 178 210 M 170 202 L 170 218" stroke="#ffffff" strokeWidth="2.5" />
                </g>


                {/* --- COMPONENT 2: PHYSICAL SOLDERLESS BREADBOARD (Center-Right) --- */}
                <g>
                  {/* Breadboard Base plate */}
                  <rect x="380" y="110" width="500" height="425" rx="14" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4" />
                  
                  {/* Power Rail Lines */}
                  {/* Top Rails */}
                  <line x1="400" y1="140" x2="840" y2="140" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="400" y1="150" x2="840" y2="150" stroke="#ef4444" strokeWidth="2.5" />
                  
                  {/* Bottom Rails */}
                  <line x1="400" y1="510" x2="840" y2="510" stroke="#ef4444" strokeWidth="2.5" />
                  <line x1="400" y1="520" x2="840" y2="520" stroke="#2563eb" strokeWidth="2.5" />

                  {/* Power connection dots (Columns of holes) */}
                  {Array.from({ length: 25 }).map((_, i) => {
                    const cx = 410 + i * 17.5;
                    return (
                      <g key={i}>
                        {/* Top Rail Holes */}
                        <circle cx={cx} cy="140" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="150" r="2.5" fill="#1e293b" />
                        {/* Bottom Rail Holes */}
                        <circle cx={cx} cy="510" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="520" r="2.5" fill="#1e293b" />
                      </g>
                    );
                  })}

                  {/* Terminal Strip Columns of Holes (A-E and F-J) */}
                  {/* 30 Columns, 5 holes each section */}
                  {Array.from({ length: 26 }).map((_, col) => {
                    const cx = 415 + col * 16.5;
                    return (
                      <g key={col}>
                        {/* Row A-E holes */}
                        <circle cx={cx} cy="180" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="195" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="210" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="225" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="240" r="2.5" fill="#1e293b" />

                        {/* Row F-J holes */}
                        <circle cx={cx} cy="390" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="405" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="420" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="435" r="2.5" fill="#1e293b" />
                        <circle cx={cx} cy="450" r="2.5" fill="#1e293b" />
                      </g>
                    );
                  })}

                  {/* Breadboard Labels */}
                  <text x="390" y="184" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">A</text>
                  <text x="390" y="199" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">B</text>
                  <text x="390" y="214" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">C</text>
                  <text x="390" y="229" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">D</text>
                  <text x="390" y="244" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">E</text>

                  <text x="390" y="394" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">F</text>
                  <text x="390" y="409" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">G</text>
                  <text x="390" y="424" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">H</text>
                  <text x="390" y="439" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">I</text>
                  <text x="390" y="454" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="bold">J</text>

                  {/* Divider strip */}
                  <rect x="395" y="260" width="460" height="10" fill="#cbd5e1" />
                </g>


                {/* --- COMPONENT 3: 16X2 LCD CHARACTER DISPLAY (Mounted in Rows F-J) --- */}
                <g 
                  className="cursor-pointer group" 
                  onMouseEnter={() => setHoveredNode('lcd')} 
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* PCB backing */}
                  <rect x="400" y="295" width="265" height="145" rx="6" fill="#14532d" stroke="#166534" strokeWidth="3" className="group-hover:stroke-cyan-400 transition-colors duration-200" />
                  
                  {/* Metallic display frame */}
                  <rect x="415" y="315" width="235" height="95" rx="3" fill="#111827" stroke="#4b5563" strokeWidth="2.5" />
                  
                  {/* LCD Screen Glass Backlit Panel */}
                  <rect x="425" y="325" width="215" height="75" rx="1" fill="#002b2d" stroke="#004d40" strokeWidth="2" className="glow-cyan" />
                  
                  {/* Character simulation grid text */}
                  <text x="435" y="352" fill="#22d3ee" fontSize="13" fontFamily="monospace" letterSpacing="0.5" className="glow-text-cyan font-bold">LDR Val: 642 High</text>
                  <text x="435" y="380" fill="#22d3ee" fontSize="13" fontFamily="monospace" letterSpacing="0.5" className="glow-text-cyan font-bold">MSG: LIFI ACTIVE</text>

                  {/* Screw Holes on LCD board */}
                  <circle cx="408" cy="303" r="4.5" fill="#e2e8f0" stroke="#4b5563" strokeWidth="1" />
                  <circle cx="657" cy="303" r="4.5" fill="#e2e8f0" stroke="#4b5563" strokeWidth="1" />
                  <circle cx="408" cy="432" r="4.5" fill="#e2e8f0" stroke="#4b5563" strokeWidth="1" />
                  <circle cx="657" cy="432" r="4.5" fill="#e2e8f0" stroke="#4b5563" strokeWidth="1" />

                  {/* 16 Pins connector array at top of LCD */}
                  {Array.from({ length: 16 }).map((_, i) => {
                    const rx = 420 + i * 14.5;
                    return (
                      <g key={i}>
                        <rect x={rx - 4} y="295" width="8" height="15" fill="#d97706" />
                        <circle cx={rx} cy="300" r="2" fill="#000000" />
                      </g>
                    );
                  })}
                  {/* LCD Label */}
                  <text x="532" y="425" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">16X2 PARALLEL ALPHANUMERIC LCD</text>
                </g>


                {/* --- COMPONENT 4: LDR PHOTOSENSITIVE MODULE (Right Vertical Blue Board) --- */}
                <g 
                  className="cursor-pointer group" 
                  onMouseEnter={() => setHoveredNode('ldr')} 
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Module Blue PCB */}
                  <rect x="735" y="250" width="75" height="165" rx="6" fill="#1e3a8a" stroke="#2563eb" strokeWidth="3" className="group-hover:stroke-cyan-400 transition-colors duration-200" />
                  
                  {/* 4 Pin Header labels on LDR module */}
                  <text x="750" y="270" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VCC</text>
                  <text x="765" y="270" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A0</text>
                  <text x="780" y="270" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GND</text>
                  <text x="795" y="270" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D0</text>

                  {/* Metallic header solder pins */}
                  <circle cx="750" cy="256" r="3.5" fill="#94a3b8" />
                  <circle cx="765" cy="256" r="3.5" fill="#94a3b8" />
                  <circle cx="780" cy="256" r="3.5" fill="#94a3b8" />
                  <circle cx="795" cy="256" r="3.5" fill="#94a3b8" />

                  {/* Trimpot Contrast Potentiometer (Orange round knob) */}
                  <circle cx="772" cy="315" r="14" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
                  <circle cx="772" cy="315" r="6" fill="#ffffff" />
                  <path d="M 768 315 L 776 315 M 772 311 L 772 319" stroke="#9a3412" strokeWidth="2" />
                  <text x="772" y="340" fill="#93c5fd" fontSize="7" fontFamily="monospace" textAnchor="middle">THRESHOLD</text>

                  {/* Comparator Logic IC (LM393) */}
                  <rect x="752" y="350" width="40" height="25" rx="1.5" fill="#0f172a" />
                  <text x="772" y="365" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">LM393</text>

                  {/* --- ACTUAL PHOTO DETECTOR SENSOR (LDR) AT BOTTOM OF BOARD --- */}
                  {/* Dual sensor mounting pads */}
                  <rect x="760" y="405" width="6" height="10" fill="#94a3b8" />
                  <rect x="778" y="405" width="6" height="10" fill="#94a3b8" />

                  {/* Flexible Solder Leads of LDR */}
                  <path d="M 763 415 Q 763 445 765 460" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 781 415 Q 781 445 779 460" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

                  {/* LDR Head Cell */}
                  <circle cx="772" cy="470" r="13" fill="#ea580c" stroke="#9a3412" strokeWidth="2" className="glow-cyan" />
                  <circle cx="772" cy="470" r="10" fill="#fddf47" />
                  {/* Photoresistor cadmium sulfide track wavy snake lines */}
                  <path d="M 766 468 Q 770 464 772 473 T 778 468" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 766 473 Q 770 469 772 478 T 778 473" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Ambient Light Ray Indicators */}
                  <path d="M 752 495 L 762 483" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                  <polygon points="762,483 756,483 762,489" fill="#facc15" />
                  <path d="M 792 495 L 782 483" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                  <polygon points="782,483 782,489 788,483" fill="#facc15" />

                  <text x="772" y="392" fill="#60a5fa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">LDR MODULE</text>
                </g>

              </svg>

              {/* Interconnection Descriptions inside visualizer */}
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-400 bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-900/60 z-20">
                {hoveredNode === 'mcu' && <span className="text-cyan-400">Arduino Uno R3: Controls power distribution, and samples analog photon signals on Pin A0</span>}
                {hoveredNode === 'ldr' && <span className="text-amber-400">LDR Photodiode Module: Receives optical transmissions and triggers voltage comparator peaks</span>}
                {hoveredNode === 'lcd' && <span className="text-emerald-400">16x2 Character LCD: Interfaces with 4-bit bus (pins 2, 3, 4, 5, 11, 12) for dynamic terminal outputs</span>}
                {!hoveredNode && <span>Hover over any Fritzing node (Arduino, LCD, LDR) to inspect component roles</span>}
              </div>

            </div>

            {/* Explanatory notes under schematic */}
            <div className="mt-4 text-xs text-slate-300 leading-relaxed text-center font-sans max-w-3xl">
              <strong>Interactive Fritzing Breadboard Architecture:</strong> This high-fidelity physical schematic maps exactly to the LiquidCrystal parallel bus driver configuration (RS=12, E=11, D4=5, D5=4, D6=3, D7=2). The LDR sensor module receives 5V and GND directly from the top breadboard power rail, while its <strong>Analog Out (A0) pin</strong> is routed to Arduino's A0 channel to track real-time light pulse intensity changes.
            </div>

          </div>
        )}

        {/* 2. Block Architecture diagram */}
        {activeView === 'architecture' && (
          <div className="w-full max-w-2xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Transmitter Block */}
              <div className="bg-slate-950/80 rounded-xl p-5 border border-cyan-950/60 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl bg-cyan-500/10 text-cyan-400 font-mono text-[9px] uppercase border-l border-b border-cyan-500/20">
                  Transmitter Section
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-sm text-white font-display">Optical Modulator Block</h4>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Converts binary streams into light intensity modulations. Uses precompiled Arduino clock frequencies to sequence flashes.
                  </p>

                  {/* Flow items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">01.</span>
                      <span className="text-slate-300">Message Input Payload</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">02.</span>
                      <span className="text-slate-300">Binary Character Encoding</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">03.</span>
                      <span className="text-slate-300">LED Intensity Pulsing [ON/OFF]</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  Transmitter: Pre-packaged / Handheld Led Torch
                </div>
              </div>

              {/* Receiver Block */}
              <div className="bg-slate-950/80 rounded-xl p-5 border border-cyan-950/60 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl bg-cyan-500/10 text-cyan-400 font-mono text-[9px] uppercase border-l border-b border-cyan-500/20">
                  Receiver Section
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-sm text-white font-display">Optical Demodulator Block</h4>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Captures photons on the photodiode plane, measures changing internal voltage outputs, filters interference, and prints output.
                  </p>

                  {/* Flow items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold">04.</span>
                      <span className="text-slate-300">LDR Photovoltaic Light Sensing</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold">05.</span>
                      <span className="text-slate-300">Arduino Dynamic Voltage Decoding</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded border border-slate-900 text-[11px] font-mono">
                      <span className="text-emerald-400 font-bold">06.</span>
                      <span className="text-slate-300">LCD Alphanumeric Message Display</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  Receiver Core: Arduino UNO R3 + LCD 1602 Display
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
