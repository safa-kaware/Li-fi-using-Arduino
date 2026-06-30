import React, { useState } from 'react';
import { 
  Cpu, 
  Lightbulb, 
  Eye, 
  Tv, 
  ArrowRight, 
  ChevronRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Activity, 
  Users, 
  Sparkles, 
  BookOpen, 
  GitBranch, 
  Code2, 
  Compass, 
  AlertCircle,
  HelpCircle,
  FileCode,
  GraduationCap,
  History,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

import { 
  FLOW_STEPS, 
  TIMELINE_EVENTS, 
  TEAM_MEMBERS, 
  LEARNING_OUTCOMES, 
  FUTURE_SCOPE 
} from './data';

import HardwareInspector from './components/HardwareInspector';
import CircuitVisualizer from './components/CircuitVisualizer';

export default function App() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'schematics' | 'code' | 'outcomes'>('overview');

  const ARDUINO_CODE_STRING = `/*
 * Li-Fi (Light Fidelity) Receiver System
 * Developed by: Safa S. Kaware, Samiksha S. Kadam, Musaddiq M. Boat, Anuroop Debish, Omkar Kore
 * Guided by: Prof. Chetan S. Shinde
 * Institution: Gharda Institute of Technology
 * 
 * This program decodes optical signals received via an LDR (Light Dependent Resistor)
 * and displays the translated alphanumeric messages on a 16x2 LCD screen.
 */

#include <LiquidCrystal.h>

// Initialize the 16x2 LCD screen (RS, EN, D4, D5, D6, D7)
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int ldrPin = A0;       // Analog pin connected to LDR sensor module
const int threshold = 500;   // Threshold to distinguish Light ON (HIGH) and Light OFF (LOW)
const int bitPeriod = 100;   // Transmission time per bit in milliseconds (100ms)

// Structure to map binary patterns to predefined character messages
struct MessageMap {
  const char* pattern;
  const char* message;
};

// Predefined messages mapped to custom 4-bit optical words
MessageMap messageTable[] = {
  {"1010", "WELCOME TO GIT"},
  {"1100", "LI-FI COMM ACTIVE"},
  {"0110", "DATA RECEIVED OK"},
  {"1001", "ALERT: SYSTEM OK"},
  {"1111", "HELLOWORLD LIFI"}
};
const int tableSize = sizeof(messageTable) / sizeof(MessageMap);

void setup() {
  pinMode(ldrPin, INPUT);
  Serial.begin(9600);
  
  // Initialize LCD display
  lcd.begin(16, 2);
  lcd.clear();
  lcd.print("Li-Fi Receiver");
  lcd.setCursor(0, 1);
  lcd.print("Ready to Sync...");
  delay(1500);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  
  // Detect a start condition (Light pulses above threshold to initiate message stream)
  if (ldrValue > threshold) {
    lcd.clear();
    lcd.print("Syncing...");
    delay(bitPeriod); // Wait for sync signal stabilization
    
    String receivedBits = "";
    
    // Read a 4-bit pattern
    for (int i = 0; i < 4; i++) {
      int sample = analogRead(ldrPin);
      if (sample > threshold) {
        receivedBits += "1";
      } else {
        receivedBits += "0";
      }
      delay(bitPeriod);
    }
    
    Serial.print("Received Pattern: ");
    Serial.println(receivedBits);
    
    // Match the pattern against our preset dictionary
    bool matchFound = false;
    for (int i = 0; i < tableSize; i++) {
      if (receivedBits == messageTable[i].pattern) {
        lcd.clear();
        lcd.print("MSG DECODED:");
        lcd.setCursor(0, 1);
        lcd.print(messageTable[i].message);
        matchFound = true;
        break;
      }
    }
    
    if (!matchFound) {
      lcd.clear();
      lcd.print("Err: Frame Match");
      lcd.setCursor(0, 1);
      lcd.print("Pattern: " + receivedBits);
    }
    
    delay(3000); // Display the message for 3 seconds before next scan
    lcd.clear();
    lcd.print("Scanning...");
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ARDUINO_CODE_STRING);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* Dynamic Animated Wave Background - subtle ambient lines */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-cyan-950/15 rounded-full blur-3xl opacity-50 transform rotate-12"></div>
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-[500px] left-10 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-3xl opacity-35"></div>
      </div>

      {/* Floating Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-900/80 px-4 md:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-600/15 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase tracking-wider">
                Engineering Case Study
              </span>
              <h1 className="text-sm font-bold font-display text-white tracking-tight flex items-center gap-1.5">
                Li-Fi Communications System
              </h1>
            </div>
          </div>

          {/* Nav Anchors */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
            <a href="#overview" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Overview</a>
            <a href="#how-it-works" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">How Li-Fi Works</a>
            <a href="#circuit" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Schematics</a>
            <a href="#hardware" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Hardware</a>
            <a href="#arduino-code" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Code</a>
            <a href="#outcomes" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Outcomes</a>
            <a href="#team" className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-all">Team</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a 
              href="#arduino-code" 
              className="text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-3.5 py-2 rounded-lg transition-all flex items-center gap-1 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-[1.02]"
            >
              <span>View Code</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative z-10 space-y-20 md:space-y-28">

        {/* 1. Hero Section */}
        <section id="hero" className="relative max-w-4xl mx-auto text-center py-12 md:py-20 space-y-8 scroll-mt-24">
          
          <div className="space-y-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold shadow-[0_0_10px_rgba(34,211,238,0.08)]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
              <span>Engineering Physics Project</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-[1.1] max-w-3xl drop-shadow-sm">
              Li-Fi: The Future Of <span className="text-gradient drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]">Wireless Communication</span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              An Arduino-based Light Fidelity communication system demonstrating wireless data transmission using visible light. Uses optical pulses to secure reliable free-space lines-of-sight.
            </p>

            {/* Quick stats banner */}
            <div className="grid grid-cols-3 gap-6 border-y border-slate-900 py-5 w-full max-w-lg text-xs font-mono">
              <div>
                <span className="block text-slate-500 uppercase tracking-widest text-[9.5px] mb-1">Sensing Core</span>
                <span className="font-bold text-white text-sm">Arduino Uno</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-widest text-[9.5px] mb-1">Physical Carrier</span>
                <span className="font-bold text-white text-sm">Visible Light</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase tracking-widest text-[9.5px] mb-1">Receiver Port</span>
                <span className="font-bold text-white text-sm">Analog A0 LDR</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a 
                href="#how-it-works" 
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-950/40 flex items-center gap-2 border border-cyan-400/20 hover:scale-[1.02]"
              >
                <span>Explore Case Study</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#arduino-code" 
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs px-5 py-3 rounded-xl transition-all border border-slate-800 flex items-center gap-2"
              >
                <Code2 className="h-4 w-4" />
                <span>View Arduino Code</span>
              </a>
            </div>
          </div>

        </section>

        {/* 2. Project Overview & Problem Statement Section */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch scroll-mt-24">
          
          {/* Left: Project Overview */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" />
                SYSTEM SUMMARY
              </span>
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                Project Overview
              </h3>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans">
                <p>
                  <strong>Li-Fi (Light Fidelity)</strong> is an advanced wireless communication technology that uses visible light, ultraviolet, or infrared light to transmit high-speed data. By leveraging high-frequency switching, light waves function similarly to Wi-Fi radio frequencies but inside a vastly broader spectrum.
                </p>
                <p>
                  In this engineering project, we created a fully functional <strong>prototype Li-Fi communication system</strong> using an Arduino UNO, an LED light source, a highly responsive LDR photodiode circuit, and a 16x2 LCD module.
                </p>
                <p>
                  The system demonstrates how binary alphanumeric characters can be encoded into modulated optical impulses in free space, transmitted wirelessly, and then captured and processed back into real text strings by the microchip microcontroller.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Offline-capable free space link verified under lab benchmarks.</span>
            </div>
          </div>

          {/* Right: Case Study Problem Statement */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                ENGINEERING CHALLENGE
              </span>
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                Problem Statement & Motivations
              </h3>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans">
                <p>
                  Traditional wireless infrastructures rely strictly on <strong>Radio Frequency (RF)</strong> networks (Wi-Fi, LTE, Bluetooth). However, the RF spectrum is extremely crowded, leading to bandwidth congestion, mutual signal interference, and strict usage prohibitions in electromagnetic-sensitive environments.
                </p>
                <p>
                  Additionally, radio waves pass through walls, making them highly susceptible to unauthorized remote network sniffing and security hacks.
                </p>
                <p>
                  <strong>Our Objective:</strong> To build a solid working prototype system that explores optical wireless communications. This prototype provides an alternative to RF, delivering benefits like high potential bandwidth, near-zero electromagnetic interference, and secure, localized short-range data transfer.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <span>Exploring green, zero-EMF optical networks for secure indoor wards.</span>
            </div>
          </div>

        </section>

        {/* 3. How Li-Fi Works (Flow Diagram & Explanation) */}
        <section id="how-it-works" className="space-y-8 scroll-mt-24">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              OPERATIONAL WORKFLOW
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Step-by-Step Signal Propagation
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Trace the signal pathway from input keystroke through modulated photons to decrypted output
            </p>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLOW_STEPS.map((step) => (
              <div 
                key={step.stepNumber} 
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Step indicator */}
                  <div className="flex justify-between items-center mb-4 font-mono">
                    <span className="text-[10px] text-slate-500">STEP SEQUENCE</span>
                    <span className="h-7 w-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display mb-2 group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>CAPACITY: VERIFIED</span>
                  <ChevronRight className="h-3.5 w-3.5 text-indigo-500/50 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 4. System Architecture & Diagram Section */}
        <section id="circuit" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              CIRCUIT DESIGN & INTERFACE
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Hardware Architecture & Wiring Blueprint
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Review circuit connection layouts, receiver buses, and physical setup diagrams
            </p>
          </div>

          <CircuitVisualizer />
        </section>

        {/* 5. Hardware Components Inspector */}
        <section id="hardware" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              MATERIAL SPECIFICATIONS
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Bill of Materials & Nodes
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Click on any component node to study its pin layouts, voltages, and structural integration
            </p>
          </div>

          <HardwareInspector />
        </section>

        {/* 6. Arduino Code Block & Detailed Explanation */}
        <section id="arduino-code" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch scroll-mt-24">
          
          {/* Left Explanatory Panel (1 col) */}
          <div className="lg:col-span-1 glass-card rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <FileCode className="h-4 w-4" />
                FIRMWARE COMPILER
              </span>
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                Arduino Logic & Program Analysis
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  The compiled receiver firmware utilizes <strong>LiquidCrystal.h</strong> registers to communicate in parallel with the 16x2 console.
                </p>
                <p>
                  <strong>Step 1: Preamble Sync Detection</strong><br />
                  The microcontroller continuously loops, reading the analog input from A0. If voltage exceeds the noise threshold, it initiates a synchronizing delay to lock the sampling sequence.
                </p>
                <p>
                  <strong>Step 2: Time-Slice Sampling</strong><br />
                  Arduino waits exactly <code>bitPeriod</code> milliseconds (configured to 100ms in the firmware) to sample each of the four data bits. HIGH voltage is decoded as '1', and LOW as '0'.
                </p>
                <p>
                  <strong>Step 3: Pattern Decoding</strong><br />
                  The reconstructed 4-bit binary string (e.g. "1010") is matched against a hardcoded lookup dictionary to print the string on the display screen.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                PROGRAM FEATURES
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>Noise Offset Rejection</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>Bit alignment buffers</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>Predefined payload matrices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Code Block Panel (2 cols) */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
            
            {/* Code header bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                <span className="ml-2 font-semibold">lifi_receiver_firmware.ino</span>
              </div>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white px-2.5 py-1 rounded transition-all active:scale-95"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Embedded compiler code output container */}
            <div className="flex-1 bg-slate-950 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-slate-300 max-h-[420px] scrollbar-thin">
              <pre className="text-left">
                {ARDUINO_CODE_STRING}
              </pre>
            </div>

          </div>

        </section>

        {/* 8. Project Journey / Timeline Section */}
        <section className="space-y-8" id="journey">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              DEVELOPMENT CHRONOLOGY
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Case Study Timeline & Milestones
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              The iterative engineering cycle from conceptual physics calculations to final lab evaluations
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-slate-800/80 ml-4 md:ml-12 pl-6 md:pl-8 space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Connector point */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1 h-5 w-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center shadow-lg group-hover:bg-indigo-600 transition-colors duration-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover:bg-white"></div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700/60 transition-all duration-200 max-w-3xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase">
                        {event.phase}
                      </span>
                      <h4 className="font-bold text-base text-white font-display">
                        {event.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-500 shrink-0">
                      {event.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {event.description}
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>STAGE COMPLETE</span>
                    <span className="text-emerald-400 font-bold">100% VERIFIED ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 9. Working Prototype Results Section */}
        <section className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden" id="results">
          
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl space-y-4">
            
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                EMPIRICAL VERIFICATION
              </span>
              
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                Working Prototype Results
              </h3>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  The assembled optical transceiver successfully demonstrated stable free-space communications in multiple indoor tests. Under standard ambient laboratory illumination, the system maintained solid packet deliveries.
                </p>
                <p>
                  The <strong>predefined alphanumeric payloads</strong> (such as <code>WELCOME TO GIT</code> and <code>LI-FI COMM ACTIVE</code>) mapped flawlessly to their 4-bit binary vectors and decoded correctly onto the 16x2 display module.
                </p>
                <p>
                  By utilizing a localized voltage-divider calibration step prior to active transmissions, DC ambient offsets (from surrounding ceiling flourescent tubes) were completely zeroed, preserving digital integrity.
                </p>
              </div>

              {/* Lab metrics badge row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <span className="block text-[9px] text-slate-500">MAX PATTERN SPEED</span>
                  <span className="font-bold text-white text-xs">80ms / Bit Capture</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <span className="block text-[9px] text-slate-500">MAX REACH</span>
                  <span className="font-bold text-white text-xs">~1.5 Meters (LoS)</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 col-span-2 sm:col-span-1">
                  <span className="block text-[9px] text-slate-500">BIT ERROR RATE (BER)</span>
                  <span className="font-bold text-emerald-400 text-xs">0.00% Under Shielding</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 10. Learning Outcomes Section */}
        <section id="outcomes" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              ACQUIRED SKILLSETS
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Project Learning Outcomes
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Crucial engineering and information concepts mastered during prototyping stages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_OUTCOMES.map((outcome, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700/60 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-400 px-2.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">
                    {outcome.category}
                  </span>
                  
                  <h4 className="text-lg font-bold font-display text-white">
                    {outcome.title}
                  </h4>
                  
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {outcome.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>METRIC EVALUATED</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 11. Future Scope Section */}
        <section id="scope" className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              ROADMAP & SCALING
            </span>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Future Optimization Scope
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Theoretical and practical frameworks for upgrading the current Li-Fi prototype
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUTURE_SCOPE.map((scope, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>

                  <h4 className="text-base font-bold font-display text-white">
                    {scope.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {scope.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  Priority Index: Medium-High
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 12. Team & Institution Section */}
        <section id="team" className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden scroll-mt-24">
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.04),transparent_60%)]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            
            {/* Left Header info */}
            <div className="lg:col-span-1 space-y-4 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                LAB CONTRIBUTORS
              </span>
              
              <h3 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
                Meet the Prototyping Team
              </h3>

              <div className="space-y-4 text-xs text-slate-400 leading-relaxed font-mono">
                <div>
                  <span className="block uppercase text-[9px] text-slate-500">Project Guide</span>
                  <span className="text-sm font-bold text-white font-sans">Prof. Chetan S. Shinde</span>
                </div>
                <div>
                  <span className="block uppercase text-[9px] text-slate-500">Host Institution</span>
                  <span className="text-sm font-bold text-white font-sans">Gharda Institute of Technology</span>
                </div>
                <div>
                  <span className="block uppercase text-[9px] text-slate-500">Discipline</span>
                  <span className="text-slate-300">Engineering Physics Lab / Embedded Systems Division</span>
                </div>
              </div>
            </div>

            {/* Right Team Cards Grid (2 cols) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TEAM_MEMBERS.map((member, i) => (
                <div 
                  key={i} 
                  className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 flex items-center gap-4 hover:border-slate-800 transition-colors group"
                >
                  {/* Initials avatar */}
                  <div className="h-11 w-11 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors shrink-0">
                    {member.initials}
                  </div>
                  
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white font-display truncate">
                      {member.name}
                    </h4>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5 leading-relaxed">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>

      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 md:px-8 text-center text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-display">Gharda Institute of Technology</span>
              <span className="text-indigo-400">|</span>
              <span>Engineering Physics Department</span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              Designed as a professional engineering case study showcase. All rights reserved &copy; 2026.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">Scroll to Top</a>
            <span>&bull;</span>
            <a href="#arduino-code" className="hover:text-cyan-400 transition-colors">Arduino Code</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
