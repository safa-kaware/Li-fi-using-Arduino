import { 
  HardwareComponent, 
  FlowStep, 
  TimelineEvent, 
  TeamMember, 
  LearningOutcome, 
  FutureScopeItem 
} from './types';

export const HARDWARE_COMPONENTS: HardwareComponent[] = [
  {
    id: 'arduino_uno',
    name: 'Arduino UNO R3',
    description: 'The computational core of the system. It processes the analog signals received from the LDR sensor, executes pattern matching algorithms, and drives the LCD output.',
    specs: ['Microcontroller: ATmega328P', 'Operating Voltage: 5V', 'Analog Input Pins: 6', 'Digital I/O Pins: 14 (6 PWM)'],
    iconName: 'Cpu'
  },
  {
    id: 'ldr_sensor',
    name: 'LDR Sensor Module',
    description: 'Light Dependent Resistor sensor that detects micro-variations in incoming visible light intensity and sends corresponding analog signals to the Arduino input pin.',
    specs: ['Spectral Peak: 540nm', 'Light Resistance: 10-20 KΩ', 'Dark Resistance: 1-2 MΩ', 'Response Time: ~20-30ms'],
    iconName: 'Eye'
  },
  {
    id: 'led_source',
    name: 'LED Light Source',
    description: 'The optical transmitter. Acts by rapidly pulsing/modulating light intensity (on/off states) to carry digital binary signals wirelessly over free space.',
    specs: ['Luminous Intensity: ~15,000 mcd', 'Forward Voltage: 3.2V', 'Modulation capability: Up to 10kHz'],
    iconName: 'Lightbulb'
  },
  {
    id: 'lcd_display',
    name: '16x2 LCD Display',
    description: 'Character liquid crystal display interfaces with Arduino to present the decoded strings and status signals in a human-readable format.',
    specs: ['Grid: 16 characters x 2 lines', 'Backlight: Blue LED', 'Controller: HD44780 compatible'],
    iconName: 'Tv'
  },
  {
    id: 'breadboard_wires',
    name: 'Breadboard & Jumpers',
    description: 'Solderless prototyping platform and premium solid-core jumper wires utilized to establish secure physical connections across modules.',
    specs: ['Breadboard points: 830 tie-points', 'Jumper types: Male-to-Male, Male-to-Female', 'Low resistance pathing'],
    iconName: 'Grid'
  }
];

export const FLOW_STEPS: FlowStep[] = [
  {
    stepNumber: 1,
    title: 'Binary Conversion',
    description: 'The user-input text message is broken down into equivalent binary representation (e.g. custom 4-bit symbols or 8-bit ASCII chunks) in the transmitter system.'
  },
  {
    stepNumber: 2,
    title: 'LED Light Modulation',
    description: 'The transmitter pulses the LED source on and off at micro-speeds. "HIGH" represents binary 1, and "LOW" represents binary 0, establishing an optical carrier.'
  },
  {
    stepNumber: 3,
    title: 'Optical Transmission',
    description: 'The modulated visible light waves travel wirelessly across the free-space channel towards the designated receiver sensor path.'
  },
  {
    stepNumber: 4,
    title: 'LDR Detection & Sync',
    description: 'The highly responsive Light Dependent Resistor (LDR) sensor registers the alternating light intensity, continuously feeding changing voltage metrics.'
  },
  {
    stepNumber: 5,
    title: 'Arduino Processing',
    description: 'Arduino reads the analog values, evaluates them against calibrated thresholds, reconstructs the bitstream, and maps patterns to words.'
  },
  {
    stepNumber: 6,
    title: 'LCD Display Output',
    description: 'The verified message payload is instantly rendered on the 16x2 LCD screen, completing the light-based wireless communication cycle.'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    phase: 'Phase 1',
    title: 'Optical Communications Feasibility Study',
    date: 'Week 1 - 2',
    description: 'Researched light fidelity physical layer principles, calculated optical path losses, and finalized Arduino platform requirements.',
    status: 'completed'
  },
  {
    phase: 'Phase 2',
    title: 'Component Procurement & Testing',
    date: 'Week 3 - 4',
    description: 'Sourced high-speed LDR sensors, ultra-bright white LED matrices, and calibrated threshold limits to reduce ambient noise interference.',
    status: 'completed'
  },
  {
    phase: 'Phase 3',
    title: 'Software & Protocol Formulation',
    date: 'Week 5 - 6',
    description: 'Developed customized synchronization headers and bit-sampling code with calibrated delay margins in Arduino C++ for error-free demodulation.',
    status: 'completed'
  },
  {
    phase: 'Phase 4',
    title: 'Circuit Integration & Hardware Debugging',
    date: 'Week 7 - 8',
    description: 'Assembled the transceiver units on breadboards. Analyzed signal decay under fluctuating ambient classroom lighting and fine-tuned noise tolerance.',
    status: 'completed'
  },
  {
    phase: 'Phase 5',
    title: 'Prototype Evaluation & Metrics Assembly',
    date: 'Week 9 - 10',
    description: 'Demonstrated successful data transmission of predefined phrases with zero packet drop over a 1.5-meter free-space distance.',
    status: 'completed'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Safa Salim Kaware',
    role: 'Lead System Architecture / Firmware Specialist',
    initials: 'SK'
  },
  {
    name: 'Samiksha Surendra Kadam',
    role: 'Optical Hardware Integration Specialist',
    initials: 'SK'
  },
  {
    name: 'Musaddiq Mubeen Boat',
    role: 'Algorithm Engineer / Signal Decoupling',
    initials: 'MB'
  },
  {
    name: 'Anuroop Debish',
    role: 'Hardware Interface / UI Diagnostic Prototyping',
    initials: 'AD'
  },
  {
    name: 'Omkar Kore',
    role: 'Testing & Calibration Engineer',
    initials: 'OK'
  }
];

export const LEARNING_OUTCOMES: LearningOutcome[] = [
  {
    title: 'Optical Wireless Principles',
    description: 'Gained absolute clarity on the physics of light modulation, line-of-sight optical transmission, and free-space propagation models.',
    category: 'Physics & Engineering'
  },
  {
    title: 'Arduino Interfacing Protocols',
    description: 'Mastered physical GPIO manipulation, register timers, precision sampling delays, and 16x2 LCD integration protocols via liquid-crystal registers.',
    category: 'Embedded Systems'
  },
  {
    title: 'Sensor Data Noise Filtering',
    description: 'Designed digital noise reduction routines, custom dynamic calibration thresholds, and Schmitt-trigger emulation logic to bypass ambient light pollution.',
    category: 'Digital Signal Processing'
  },
  {
    title: 'Embedded System Architecture',
    description: 'Coordinated end-to-end signal workflows, managed micro-clock constraints, and handled resource limitations of the ATmega328P processor.',
    category: 'Hardware Design'
  },
  {
    title: 'Signal Encoding & Decoding',
    description: 'Architected structured frames consisting of preamble bits, payload words, and postamble indicators to secure reliable light communication.',
    category: 'Information Theory'
  }
];

export const FUTURE_SCOPE: FutureScopeItem[] = [
  {
    title: 'Giga-speed Laser Transceivers',
    description: 'Upgrading from traditional LED sources to specialized laser diodes to achieve high-frequency modulation and exponential bandwidth throughput.',
    iconName: 'Zap'
  },
  {
    title: 'IPv6 & Internet Backhaul',
    description: 'Interfacing Arduino with Ethernet shields or ESP8266 to establish true IP-packet encapsulation and transport over visible light.',
    iconName: 'Globe'
  },
  {
    title: 'Smart City & Intelligent Grid',
    description: 'Deploying Li-Fi systems inside municipal street lamps to transmit localized navigation information directly to self-driving vehicles.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Medical Ward Zero-EMF Nodes',
    description: 'Implementing high-speed networking in pediatric wards, intensive care, and MRI laboratories where radio waves (RF) are restricted due to hazard interference.',
    iconName: 'HeartPulse'
  },
  {
    title: 'Indoor Military-grade Security',
    description: 'Leveraging light propagation physical limits (light cannot pass through solid walls) to prevent remote network sniffing, creating secure tactical lines.',
    iconName: 'EyeOff'
  }
];
