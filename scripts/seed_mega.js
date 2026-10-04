// Arduino Mega Lab Projects (26 - 30)
const arduinoMegaProjects = [
  {
    title: "Arduino Mega 16-Channel Smart Industrial Controller with RS485 & Modbus",
    slug: "mega-16-channel-industrial-controller",
    platform: "Arduino Mega",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "4-5 Hours",
    estimatedCost: "₹2200 - ₹2800",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "High-density PLC replacement with 16 opto-isolated industrial relays, MAX485 differential bus, and Modbus RTU telemetry.",
    description: "Enterprise-grade industrial automation controller utilizing the 54 I/O pins of the ATmega2560. Manages 16 isolated power relays, RS485 serial fieldbus communication using industrial Modbus RTU standard, hardware watchdog timer, and optical status indicators.",
    categorySlug: "arduino-mega",
    technologies: ["arduino-mega", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.5.0",
    bomJson: JSON.stringify([
      { component: "Arduino Mega 2560 R3", qty: "1", specs: "ATmega2560 54 I/O pins, 256KB Flash", estCost: "₹850" },
      { component: "16-Channel 5V Relay Board", qty: "1", specs: "Optocoupler isolated, 10A 250VAC", estCost: "₹680" },
      { component: "MAX485 Transceiver Module", qty: "1", specs: "RS-485 Differential Half-Duplex", estCost: "₹60" },
      { component: "DIN Rail Mounting Bracket", qty: "1", specs: "35mm standard electrical panel", estCost: "₹180" },
      { component: "Mean Well 5V 5A Power Supply", qty: "1", specs: "DIN Rail Mount SMPS", estCost: "₹650" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Digital Pin 22 - 37", componentPin: "IN1 - IN16", component: "16-Ch Relay Board", notes: "16 consecutive Port A/C pins" },
      { boardPin: "Serial1 RX1 (Pin 19)", componentPin: "RO", component: "MAX485 Module", notes: "RS485 Receiver Out" },
      { boardPin: "Serial1 TX1 (Pin 18)", componentPin: "DI", component: "MAX485 Module", notes: "RS485 Driver In" },
      { boardPin: "Digital Pin 3", componentPin: "DE / RE", component: "MAX485 Module", notes: "Transmit / Receive Direction Control" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Modbus Poll or QModMaster on PC"]),
    librariesJson: JSON.stringify([
      { name: "Modbus-Serial", author: "Alexander Emelianov", installMethod: "Library Manager", version: "2.0.5" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Modbus RTU Slave Listener", detail: "Listens on RS485 differential bus (Slave ID: 1) at 19200 baud for coil write commands." },
      { step: 2, title: "Hardware Direct Port Manipulation", detail: "Writes to PORTA and PORTC directly in 1 clock cycle for instant 16-channel latching." },
      { step: 3, title: "Watchdog Safety Loop", detail: "ATmega2560 internal watchdog resets processor if bus communications lock up for >2 seconds." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Connect Ribbon Cable", instruction: "Wire 16-pin IDC ribbon cable from Mega digital pins 22-37 to Relay IN1-IN16." },
      { step: 2, title: "External 5V Relay Power", instruction: "Remove JD-VCC jumper on relay board. Connect 5V 5A external supply to JD-VCC and GND." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Connect USB-to-RS485 dongle to PC", "Send Modbus command 'Write Multiple Coils (FC15)'", "Observe all 16 relays toggle with synchronous mechanical clicks"],
      expectedBaudRate: 19200,
      expectedSerialOutput: "[PLC] Modbus RTU Slave #1 Ready on RS485\n[CMD] Received FC15: Coils 0-15 set to 0xFFFF\n[STATUS] All 16 Relays Active"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "RS485 bus errors or missed packets", cause: "Missing 120Ω bus termination resistor", solution: "Install a 120Ω resistor between lines A and B at both physical ends of the RS485 cable run." }
    ]),
    applicationsJson: JSON.stringify(["Factory Floor Automation PLC", "Commercial Greenhouse Irrigation Matrix", "Stage Lighting & Pyrotechnics Sequencer"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Mega_16Ch_Industrial_PLC.ino",
        language: "cpp",
        code: `// Arduino Mega 16-Channel Industrial Modbus Controller
#include <ModbusRTU.h>

ModbusRTU mb;
const int TXEN = 3;
const int RELAY_START_PIN = 22; // Pins 22 to 37 (16 relays)

void setup() {
  Serial.begin(115200);
  Serial1.begin(19200, SERIAL_8N1);

  // Initialize 16 relay pins
  for (int i = 0; i < 16; i++) {
    pinMode(RELAY_START_PIN + i, OUTPUT);
    digitalWrite(RELAY_START_PIN + i, HIGH); // Active LOW -> OFF
  }

  mb.begin(&Serial1, TXEN);
  mb.slave(1); // Modbus Slave ID 1

  // Add 16 coils
  for (int i = 0; i < 16; i++) {
    mb.addCoil(i);
  }

  Serial.println("[PLC] Mega 16-Channel Controller Active.");
}

void loop() {
  mb.task();

  // Sync Coils to Physical Relays
  for (int i = 0; i < 16; i++) {
    bool state = mb.Coil(i);
    digitalWrite(RELAY_START_PIN + i, state ? LOW : HIGH);
  }

  yield();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Why use Arduino Mega instead of UNO for this?", answer: "Arduino UNO has only 14 digital pins (not enough for 16 relays + RS485). Mega provides 54 I/O pins and 4 independent hardware UART serial ports." }
    ]),
    downloadFileName: "mega-16-channel-industrial-controller.zip"
  },

  {
    title: "Arduino Mega Multi-Zone Automated Greenhouse Lab with TFT Touch",
    slug: "mega-multizone-greenhouse-tft",
    platform: "Arduino Mega",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "5 Hours",
    estimatedCost: "₹2400 - ₹3200",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "4-quadrant environmental climate hub managing soil valves, mist nozzles, exhaust fans, and 3.5\" color touchscreen dashboard.",
    description: "Comprehensive agricultural control laboratory. Monitors 4 distinct plant zones with dedicated capacitive moisture sensors, DHT22 atmospheric telemetry, light intensity LDRs, and an interactive 3.5\" 320x480 color TFT touch shield for setting threshold targets.",
    categorySlug: "environmental",
    technologies: ["arduino-mega", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.1.0",
    bomJson: JSON.stringify([
      { component: "Arduino Mega 2560", qty: "1", specs: "ATmega2560", estCost: "₹850" },
      { component: "3.5\" TFT LCD Touch Shield", qty: "1", specs: "ILI9486 480x320 SPI/Parallel", estCost: "₹850" },
      { component: "Capacitive Soil Moisture Sensors", qty: "4", specs: "Corrosion resistant v1.2", estCost: "₹360" },
      { component: "12V 1/2\" Solenoid Water Valves", qty: "4", specs: "Normally Closed brass/plastic", estCost: "₹800" },
      { component: "4-Channel Relay Module + 12V SMPS", qty: "1", specs: "Valve and Fan Drivers", estCost: "₹450" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Analog A8 - A11", componentPin: "AOUT", component: "4x Soil Moisture Probes", notes: "Zones 1, 2, 3, 4" },
      { boardPin: "Digital Pin 42 - 45", componentPin: "IN1 - IN4", component: "Solenoid Relay Valves", notes: "Independent drip irrigation" },
      { boardPin: "Digital Pin 46", componentPin: "IN", component: "Misting Nozzle Relay", notes: "Humidity management" },
      { boardPin: "Digital Pin 47", componentPin: "IN", component: "Exhaust Fan Relay", notes: "High temp ventilation" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "MCUFRIEND_kbv", author: "David Prentice", installMethod: "Library Manager", version: "2.9.9" },
      { name: "TouchScreen", author: "Adafruit", installMethod: "Library Manager", version: "1.1.5" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Multi-Quadrant Telemetry", detail: "Reads 4 soil moisture sensors, 2 DHT22 air sensors, and 1 LDR every 3 seconds." },
      { step: 2, title: "Closed-Loop PID/Bang-Bang", detail: "Independently pulses Zone 1-4 valves when zone moisture drops below user target." },
      { step: 3, title: "TFT Touch UI", detail: "Renders bar graphs, real-time gauges, and responds to touch buttons for manual watering." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Plug TFT Shield", instruction: "Mount 3.5\" TFT shield directly on top of Arduino Mega 2560 header pins." },
      { step: 2, title: "Wire Sensors to Double Row", instruction: "Use Mega's extended back header (pins 22-53 and A8-A15) which remain completely exposed." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power up Mega", "TFT displays 4 colorful zone quadrants", "Touch 'ZONE 1 WATER' button on glass: Valve 1 opens immediately for 5s"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[GREENHOUSE] System booted\n[TELEMETRY] Zone1: 42% | Zone2: 68% | Zone3: 21% | Zone4: 55%\n[ACTION] Zone 3 too dry (<30%)! Opening Solenoid Valve #3..."
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "TFT screen remains blank white", cause: "Controller chip ID not passed", solution: "Read ID via tft.readID() and pass into tft.begin(0x9486)." }
    ]),
    applicationsJson: JSON.stringify(["Commercial Hydroponic Facility", "Botanical Research Greenhouses", "High-Value Mushroom Cultivation Chamber"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Mega_Greenhouse_Hub.ino",
        language: "cpp",
        code: `// Arduino Mega Multi-Zone Greenhouse Controller
const int SOIL_PINS[4] = {A8, A9, A10, A11};
const int VALVE_PINS[4] = {42, 43, 44, 45};
const int FAN_PIN = 47;

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 4; i++) {
    pinMode(VALVE_PINS[i], OUTPUT);
    digitalWrite(VALVE_PINS[i], HIGH); // Relays OFF
  }
  pinMode(FAN_PIN, OUTPUT);
  digitalWrite(FAN_PIN, HIGH);
  Serial.println("[AGRI] Mega Multi-Zone Hub Ready.");
}

void loop() {
  for (int z = 0; z < 4; z++) {
    int val = analogRead(SOIL_PINS[z]);
    int moisturePercent = map(val, 750, 300, 0, 100);
    moisturePercent = constrain(moisturePercent, 0, 100);

    Serial.printf("Zone %d Moisture: %d%%\\n", z + 1, moisturePercent);

    if (moisturePercent < 30) {
      Serial.printf("Watering Zone %d...\\n", z + 1);
      digitalWrite(VALVE_PINS[z], LOW); // Open Valve
      delay(3000);
      digitalWrite(VALVE_PINS[z], HIGH);
    }
  }
  delay(5000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I log historical data to SD card?", answer: "Yes! The 3.5\" TFT shield includes an onboard micro-SD slot connected to SPI." }
    ]),
    downloadFileName: "mega-multizone-greenhouse-tft.zip"
  },

  {
    title: "Arduino Mega 4-Axis Robotic Arm Controller with Inverse Kinematics",
    slug: "mega-4-axis-robotic-arm",
    platform: "Arduino Mega",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "4 Hours",
    estimatedCost: "₹2800 - ₹3800",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Multi-joint articulated robotic manipulator using 4x metal gear MG996R servos, dual thumbsticks, and Cartesian coordinate kinematics.",
    description: "Precision 4-degree-of-freedom robotic arm manipulator. Features Base Pan, Shoulder Pitch, Elbow Pitch, and Gripper Roll/Claw. Controlled via dual analog thumbstick joysticks or automated Cartesian XYZ point-to-point trajectory playback.",
    categorySlug: "robotics",
    technologies: ["arduino-mega", "servo", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Mega 2560", qty: "1", specs: "ATmega2560", estCost: "₹850" },
      { component: "MG996R Metal Gear Servos", qty: "4", specs: "11 kg/cm torque high power", estCost: "₹1400" },
      { component: "Aluminum Robotic Arm Mechanical Frame", qty: "1", specs: "4-DOF bracket kit with gripper", estCost: "₹1100" },
      { component: "Dual Axis Analog Thumbstick Joysticks", qty: "2", specs: "Potentiometer + Button", estCost: "₹120" },
      { component: "External 5V 10A UBEC / Power Adapter", qty: "1", specs: "Essential for 4x MG996R servos", estCost: "₹450" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 2 (PWM)", componentPin: "Signal", component: "Base Servo (MG996R)", notes: "Yaw Rotation (0-180°)" },
      { boardPin: "Pin 3 (PWM)", componentPin: "Signal", component: "Shoulder Servo (MG996R)", notes: "Arm Elevation (0-180°)" },
      { boardPin: "Pin 4 (PWM)", componentPin: "Signal", component: "Elbow Servo (MG996R)", notes: "Forearm Reach (0-180°)" },
      { boardPin: "Pin 5 (PWM)", componentPin: "Signal", component: "Gripper Servo (SG90/MG996R)", notes: "Claw Clamp" },
      { boardPin: "A0, A1", componentPin: "VRX, VRY", component: "Left Joystick", notes: "Base & Shoulder" },
      { boardPin: "A2, A3", componentPin: "VRX, VRY", component: "Right Joystick", notes: "Elbow & Gripper" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Servo", author: "Michael Margolis", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Deadband Filtering", detail: "Cleans thumbstick analog jitter within ±30 points of center 512." },
      { step: 2, title: "Smooth Slew Rate Limiting", detail: "Angles increment at controlled 0.5 degrees per 20ms frame to prevent arm violent jerking." },
      { step: 3, title: "Inverse Kinematics / Record Playback", detail: "Stores sequences of pick-and-place poses in flash memory for automated repeating." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Assemble Aluminum Brackets", instruction: "Mount MG996R servos into shoulder, elbow, and base brackets." },
      { step: 2, title: "Dedicated Servo Power", instruction: "CRITICAL: Power servos from 5V 10A supply. Connecting 4x MG996R to Arduino 5V will instantly destroy the onboard regulator." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power external 5V supply, then power Mega", "Move left joystick: Base pans smoothly left and right", "Move right joystick: Gripper pinches and releases cleanly"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[ARM] 4-Axis Controller Active\n[POS] Base: 90° | Shoulder: 45° | Elbow: 110° | Gripper: 30°"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Servos buzz loudly and twitch", cause: "Insufficient current or voltage drop under load", solution: "Ensure power supply provides at least 5V 5A-10A and all grounds are tied together." }
    ]),
    applicationsJson: JSON.stringify(["Pick-and-Place Factory Sorting", "Hazardous Material Sample Handling", "Mechatronics University Kinematics Lab"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Mega_Robotic_Arm_Controller.ino",
        language: "cpp",
        code: `// Arduino Mega 4-Axis Robotic Arm Controller
#include <Servo.h>

Servo baseServo, shoulderServo, elbowServo, gripperServo;

int basePos = 90, shoulderPos = 90, elbowPos = 90, gripperPos = 40;

void setup() {
  Serial.begin(115200);
  baseServo.attach(2);
  shoulderServo.attach(3);
  elbowServo.attach(4);
  gripperServo.attach(5);

  baseServo.write(basePos);
  shoulderServo.write(shoulderPos);
  elbowServo.write(elbowPos);
  gripperServo.write(gripperPos);
}

void loop() {
  int joy1X = analogRead(A0);
  int joy1Y = analogRead(A1);
  int joy2X = analogRead(A2);
  int joy2Y = analogRead(A3);

  // Smooth slew rate steering
  if (joy1X < 400 && basePos > 0)   basePos--;
  if (joy1X > 620 && basePos < 180) basePos++;

  if (joy1Y < 400 && shoulderPos > 20)  shoulderPos--;
  if (joy1Y > 620 && shoulderPos < 160) shoulderPos++;

  if (joy2X < 400 && elbowPos > 10)  elbowPos--;
  if (joy2X > 620 && elbowPos < 170) elbowPos++;

  if (joy2Y < 400 && gripperPos > 10)  gripperPos--;
  if (joy2Y > 620 && gripperPos < 80)  gripperPos++;

  baseServo.write(basePos);
  shoulderServo.write(shoulderPos);
  elbowServo.write(elbowPos);
  gripperServo.write(gripperPos);

  delay(20);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the lifting capacity of this arm?", answer: "With MG996R servos, safe payload capacity is approximately 250 - 350 grams at full arm extension." }
    ]),
    downloadFileName: "mega-4-axis-robotic-arm.zip"
  },

  {
    title: "Arduino Mega RepRap 3D Printer Motion Controller (RAMPS 1.4)",
    slug: "mega-3d-printer-controller-ramps",
    platform: "Arduino Mega",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "6 Hours",
    estimatedCost: "₹3500 - ₹4800",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Complete CNC & 3D printer motherboard running Marlin 2.x firmware with 5x A4988 stepper drivers, heated bed, and hotend PID.",
    description: "The gold standard open-source additive manufacturing controller. Combines Arduino Mega 2560 with RAMPS 1.4 shield driving X, Y, Z, and Extruder NEMA17 stepper motors. Features dual thermistor PID temperature control, SD card autonomous printing, and LCD12864 graphic display.",
    categorySlug: "arduino-mega",
    technologies: ["arduino-mega", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.1.2",
    bomJson: JSON.stringify([
      { component: "Arduino Mega 2560", qty: "1", specs: "ATmega2560", estCost: "₹850" },
      { component: "RAMPS 1.4 Interface Shield", qty: "1", specs: "Pololu Stepper Footprints", estCost: "₹380" },
      { component: "A4988 / TMC2208 Stepper Drivers", qty: "4 or 5", specs: "1/16 microstepping with heatsinks", estCost: "₹450" },
      { component: "Full Graphic Smart Controller LCD 12864", qty: "1", specs: "With SD card slot & rotary encoder", estCost: "₹650" },
      { component: "NTC 100K Thermistors (3950)", qty: "2", specs: "Hotend and Heated Bed", estCost: "₹90" },
      { component: "12V 30A SMPS Power Supply", qty: "1", specs: "360W Switching Power Supply", estCost: "₹1200" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 10 (PWM)", componentPin: "D10 Heat", component: "Hotend Heater Cartridge", notes: "MOSFET Q1 (Up to 5A)" },
      { boardPin: "Pin 8 (PWM)", componentPin: "D8 Heat", component: "Heated Bed MK3", notes: "MOSFET Q3 (Up to 11A)" },
      { boardPin: "Analog A13", componentPin: "T0", component: "Extruder Thermistor", notes: "100k NTC" },
      { boardPin: "Analog A14", componentPin: "T1", component: "Bed Thermistor", notes: "100k NTC" },
      { boardPin: "Digital Pin 3", componentPin: "X-MIN", component: "Microswitch Endstop", notes: "Homing trigger" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Marlin 2.1.x Firmware", "Pronterface / Cura"]),
    librariesJson: JSON.stringify([
      { name: "U8glib", author: "oliver", installMethod: "Library Manager", version: "1.19.1" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "G-Code Parser", detail: "Decodes standard RS-274 G-Code commands (G0, G1, G28, M104, M109) streaming over USB Serial." },
      { step: 2, title: "Bresenham Stepper Timing", detail: "Timer 1 interrupt generates multi-axis synchronized step pulses with trapezoidal acceleration ramps." },
      { step: 3, title: "PID Thermal Loop", detail: "Pulse-width modulates MOSFETs to hold hotend within ±0.5°C of target print temperature." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Seat RAMPS Shield", instruction: "Carefully press RAMPS 1.4 shield pins down into Mega 2560 sockets." },
      { step: 2, title: "Set Driver Jumpers", instruction: "Place 3 jumpers under each driver socket on RAMPS for 1/16 microstepping." },
      { step: 3, title: "Adjust Driver VREF", instruction: "Tune A4988 trimpot with multimeter to ~0.60V for standard NEMA17 motors." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Connect Pronterface on PC via USB at 250000 baud", "Send 'G28' home command: axes seek endstops", "Send 'M104 S200': observe hotend temperature climb to 200°C"],
      expectedBaudRate: 250000,
      expectedSerialOutput: "start\necho:Marlin 2.1.2\necho: Last Updated: 2026-10-04\necho:Free RAM: 3842\nok T:24.5 /0.0 B:23.8 /0.0"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Motors make high pitched screeching but do not rotate", cause: "VREF current too low or phase wiring crossed", solution: "Swap center two motor wire pins (Phase A2 and B1) or increase trimpot VREF slightly." }
    ]),
    applicationsJson: JSON.stringify(["Desktop 3D Printing Machines", "PCB CNC Milling Routers", "Laser Engraving Cutters"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Configuration_Extract.h",
        language: "cpp",
        code: `// Marlin 2.x RAMPS 1.4 Board Definition Extract for Arduino Mega
#define SERIAL_PORT 0
#define BAUDRATE 250000

#define MOTHERBOARD BOARD_RAMPS_14_EFB // Hotend, Fan, Bed

#define TEMP_SENSOR_0 1
#define TEMP_SENSOR_BED 1

#define DEFAULT_AXIS_STEPS_PER_UNIT   { 80, 80, 4000, 93 }
#define DEFAULT_MAX_FEEDRATE          { 300, 300, 5, 25 }
#define DEFAULT_MAX_ACCELERATION      { 3000, 3000, 100, 10000 }

#define REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can this run 32-bit firmware?", answer: "No, Arduino Mega 2560 is an 8-bit AVR micro. However, Marlin 2.x is highly optimized and prints flawlessly up to 100mm/s." }
    ]),
    downloadFileName: "mega-3d-printer-controller-ramps.zip"
  },

  {
    title: "Arduino Mega Complete Meteorological Weather Lab & SD Data Logger",
    slug: "mega-weather-lab-data-logger",
    platform: "Arduino Mega",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "4 Hours",
    estimatedCost: "₹2600 - ₹3400",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Professional meteorological logging station with cup anemometer, wind direction vane, tipping bucket rain gauge, and UV index sensor.",
    description: "Industrial weather telemetry logging instrument. Interrogates an optical cup anemometer (wind velocity), 8-point magnetic reed wind vane, tipping bucket precipitation gauge (0.2794mm/tip), BME280 barometric pressure/humidity, and ML8511 UV sensor. Writes formatted CSV records to SD card every 60 seconds.",
    categorySlug: "environmental",
    technologies: ["arduino-mega", "i2c-spi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Mega 2560", qty: "1", specs: "ATmega2560", estCost: "₹850" },
      { component: "Cup Anemometer + Wind Vane + Rain Gauge Kit", qty: "1 Set", specs: "Argent-style weather meter assembly", estCost: "₹1850" },
      { component: "BME280 Atmospheric Sensor", qty: "1", specs: "I2C Pressure/Temp/Humidity", estCost: "₹290" },
      { component: "DS3231 RTC Module + SD Card Module", qty: "1 Set", specs: "Battery-backed logger", estCost: "₹250" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Digital Pin 2 (INT4)", componentPin: "Reed Switch", component: "Cup Anemometer", notes: "Hardware interrupt pulse counter" },
      { boardPin: "Digital Pin 3 (INT5)", componentPin: "Reed Switch", component: "Rain Gauge", notes: "Hardware interrupt tip counter" },
      { boardPin: "Analog A0", componentPin: "Divider Out", component: "Wind Direction Vane", notes: "16-resistor ladder" },
      { boardPin: "Pin 20, 21 (SDA/SCL)", componentPin: "I2C Bus", component: "BME280 & RTC", notes: "Mega dedicated I2C header" },
      { boardPin: "Pin 50 - 53", componentPin: "SPI Bus", component: "Micro SD Card Shield", notes: "Mega hardware SPI" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Adafruit BME280", author: "Adafruit", installMethod: "Library Manager", version: "2.2.4" },
      { name: "RTClib", author: "Adafruit", installMethod: "Library Manager", version: "2.1.3" },
      { name: "SD", author: "Arduino", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Interrupt Pulse Counting", detail: "Anemometer magnet closes reed switch twice per revolution; interrupt routine tallies pulses." },
      { step: 2, title: "Wind Direction Decoding", detail: "Measures analog voltage from 8-switch resistor network to determine 16 compass headings (N, NNE, NE, etc.)." },
      { step: 3, title: "SD Card Journaling", detail: "Buffers 60-second summary averages and commits row to 'WEATHER.CSV' with micro-power sleep between reads." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Outdoor Mast Assembly", instruction: "Mount weather instruments on high mast away from roof eddy currents." },
      { step: 2, title: "True North Alignment", instruction: "Align wind vane arm with true geographic north using a compass." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Spin anemometer cups by hand", "Tip rain bucket manually once", "Check Serial Monitor: confirms 1.2 km/h wind burst and 0.28mm rain recorded"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[WEATHER] Logging session started\n[RECORD] 2026-10-04 15:42:00 | Wind: 14.2 km/h (NNW) | Rain: 1.4 mm | Temp: 24.8 C | Pres: 1012.4 hPa"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Wind speed counts erratic high values", cause: "Switch bouncing on mechanical reed contacts", solution: "Implement 15ms software debounce inside the interrupt service routine (ISR)." }
    ]),
    applicationsJson: JSON.stringify(["Agricultural Microclimate Research", "Solar Farm Wind Load Telemetry", "Off-Grid Remote Weather Station"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Mega_Weather_Logger.ino",
        language: "cpp",
        code: `// Arduino Mega Weather Station & SD Logger
#include <Wire.h>
#include <SPI.h>
#include <SD.h>
#include <RTClib.h>
#include <Adafruit_BME280.h>

volatile unsigned long windPulses = 0;
volatile unsigned long lastWindTime = 0;
void countWind() {
  if (millis() - lastWindTime > 15) {
    windPulses++;
    lastWindTime = millis();
  }
}

Adafruit_BME280 bme;
RTC_DS3231 rtc;
const int SD_CS = 53;

void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), countWind, FALLING);

  Wire.begin();
  bme.begin(0x76);
  rtc.begin();
  SD.begin(SD_CS);

  Serial.println("[MET] Mega Weather Station Ready.");
}

void loop() {
  delay(10000); // 10-second sampling window

  float windSpeedKmh = (windPulses / 10.0) * 2.4; // 1 pulse/sec = 2.4 km/h
  windPulses = 0;

  float temp = bme.readTemperature();
  float pres = bme.readPressure() / 100.0F;

  File f = SD.open("LOG.CSV", FILE_WRITE);
  if (f) {
    f.printf("%.1f,%.1f,%.1f\\n", windSpeedKmh, temp, pres);
    f.close();
  }

  Serial.printf("Wind: %.1f km/h | Temp: %.1f C | Pres: %.1f hPa\\n", windSpeedKmh, temp, pres);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "How long can this run on solar power?", answer: "Equipped with a 10W solar panel and 12V 7Ah lead-acid battery, it operates indefinitely." }
    ]),
    downloadFileName: "mega-weather-lab-data-logger.zip"
  }
];

module.exports = { arduinoMegaProjects };
