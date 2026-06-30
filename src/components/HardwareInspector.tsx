import React, { useState } from 'react';
import { HARDWARE_COMPONENTS } from '../data';
import { Cpu, Eye, Lightbulb, Tv, Grid, Zap, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import { HardwareComponent } from '../types';

export default function HardwareInspector() {
  const [selectedId, setSelectedId] = useState<string>('arduino_uno');

  const activeComp = HARDWARE_COMPONENTS.find(c => c.id === selectedId) || HARDWARE_COMPONENTS[0];

  // Helper to map icon names to Lucide icon components
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Grid': return <Grid className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  // Helper to get specialized info based on component
  const getSpecializedDetails = (id: string) => {
    switch (id) {
      case 'arduino_uno':
        return {
          voltage: '5V DC regulated (via USB or external barrel jack)',
          role: 'Primary demodulation CPU. Samples analog LDR signals at up to 10kHz frequencies.',
          pins: 'Analog Pin A0 (LDR voltage divider input), Digital Pins 2-5, 11-12 (LCD registers)',
          symbol: 'MCU (ATmega328P)'
        };
      case 'ldr_sensor':
        return {
          voltage: '3.3V - 5V DC',
          role: 'Optical receiver. Changes physical internal resistance relative to incoming photons.',
          pins: 'VCC (5V), GND (GND), OUT (Analog output to Arduino Pin A0)',
          symbol: 'R_LDR / Photoresistor'
        };
      case 'led_source':
        return {
          voltage: '3.0V - 3.4V DC',
          role: 'Optical transmitter. Rapidly pulses state according to the driving signal from digital pin.',
          pins: 'Anode (+) connected to signal gate, Cathode (-) to common ground',
          symbol: 'LED / Laser Diode'
        };
      case 'lcd_display':
        return {
          voltage: '5V DC with register potentiometer contrast control',
          role: 'User Output console. Automatically updates when Arduino parses valid frames.',
          pins: 'RS (12), EN (11), D4 (5), D5 (4), D6 (3), D7 (2), VCC/GND/contrast',
          symbol: 'HD44780 1602 LCD'
        };
      case 'breadboard_wires':
        return {
          voltage: 'Up to 30V / 3A maximum structural routing limits',
          role: 'System interconnect backbone. Bridges the power rail distribution for LDR and LCD.',
          pins: 'Unified positive and negative routing strips, solderless socket rows',
          symbol: 'Protoboard Bus'
        };
      default:
        return {
          voltage: '5V',
          role: 'Interconnect',
          pins: 'Standard IO',
          symbol: 'Module'
        };
    }
  };

  const extra = getSpecializedDetails(activeComp.id);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch" id="hardware-inspector">
      
      {/* Component Navigation List (Left) */}
      <div className="w-full lg:w-2/5 flex flex-col gap-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Component Inventory ({HARDWARE_COMPONENTS.length})
        </span>
        <div className="flex flex-col gap-2.5">
          {HARDWARE_COMPONENTS.map((comp) => {
            const isSelected = comp.id === selectedId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`group flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-950/40 to-slate-900/60 border-indigo-500 shadow-md shadow-indigo-950/20'
                    : 'bg-slate-900/30 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Icon wrapper */}
                <div className={`p-3 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-500/20 border-indigo-400/50 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'bg-slate-950 border-slate-800 text-slate-500 group-hover:text-slate-300 group-hover:border-slate-700'
                }`}>
                  {renderIcon(comp.iconName, 'h-5 w-5')}
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`block text-xs font-mono mb-0.5 ${
                    isSelected ? 'text-indigo-400' : 'text-slate-500'
                  }`}>
                    {isSelected ? 'ACTIVE SELECTION' : 'HARDWARE NODE'}
                  </span>
                  <h4 className={`text-base font-bold font-display truncate ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {comp.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Component Specification Inspector (Right) */}
      <div className="flex-1 glass-card rounded-2xl p-6 md:p-8 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
        
        {/* Subtle background circuit traces */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent_45%)] pointer-events-none"></div>

        <div className="space-y-6 relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-semibold uppercase">
                  Spec-Sheet
                </span>
                <span className="text-slate-500 text-xs font-mono">ID: {activeComp.id.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                {activeComp.name}
              </h3>
            </div>
            
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              {renderIcon(activeComp.iconName, 'h-6 w-6')}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeComp.description}
            </p>
          </div>

          {/* Technical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-900">
              <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                Pinout & Wiring Scheme
              </span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {extra.pins}
              </p>
            </div>

            <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-900">
              <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target Voltage limits
              </span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {extra.voltage}
              </p>
            </div>

            <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-900 md:col-span-2">
              <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                Demodulation Node Role
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {extra.role}
              </p>
            </div>

          </div>

          {/* Sourced Parameters list */}
          {activeComp.specs && (
            <div className="space-y-2">
              <span className="block text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Electrical Tolerances & Properties
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeComp.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 bg-slate-900/40 px-3 py-2 rounded-lg border border-slate-800/50">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info line */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono relative z-10">
          <span>SCHEMATIC SYMBOL: <strong className="text-slate-400">{extra.symbol}</strong></span>
          <span className="text-indigo-400/80">LAB VERIFIED ✓</span>
        </div>

      </div>

    </div>
  );
}
