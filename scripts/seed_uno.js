// Arduino UNO Lab Projects (11 - 20)
const arduinoUnoProjects = [
  {
    title: "Arduino Obstacle Avoiding Autonomous Robot",
    slug: "arduino-obstacle-avoiding-robot",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "2 Hours",
    estimatedCost: "₹850 - ₹1200",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Self-navigating rover utilizing HC-SR04 ultrasonic sonar mounted on a panning SG90 servo with obstacle mapping algorithm.",
    description: "Build a classic intelligent rover powered by the ATmega328P Arduino UNO. Sweeps an ultrasonic sensor 180 degrees when an obstacle is detected within 25cm, evaluates left vs right clearance distances, and reverses/turns toward the open path.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "ultrasonic", "servo", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO R3", qty: "1", specs: "ATmega328P with USB Cable", estCost: "₹420" },
      { component: "HC-SR04 Ultrasonic Sensor", qty: "1", specs: "2cm to 400cm range", estCost: "₹80" },
      { component: "SG90 Micro Servo", qty: "1", specs: "9g 180-degree rotation", estCost: "₹120" },
      { component: "L298N Motor Driver Module", qty: "1", specs: "Dual H-bridge 2A", estCost: "₹160" },
      { component: "2WD Robot Chassis", qty: "1", specs: "2 DC Geared Motors + Castor Wheel", estCost: "₹250" },
      { component: "2x 18650 Battery Holder", qty: "1", specs: "7.4V Output with Switch", estCost: "₹60" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Digital Pin 9", componentPin: "TRIG", component: "HC-SR04", notes: "10us trigger pulse" },
      { boardPin: "Digital Pin 10", componentPin: "ECHO", component: "HC-SR04", notes: "Pulse width measurement" },
      { boardPin: "Digital Pin 11", componentPin: "Signal (Orange)", component: "SG90 Servo", notes: "PWM Servo Sweep" },
      { boardPin: "Digital Pin 5", componentPin: "IN1", component: "L298N Driver", notes: "Left Motor Forward" },
      { boardPin: "Digital Pin 6", componentPin: "IN2", component: "L298N Driver", notes: "Left Motor Reverse" },
      { boardPin: "Digital Pin 7", componentPin: "IN3", component: "L298N Driver", notes: "Right Motor Forward" },
      { boardPin: "Digital Pin 8", componentPin: "IN4", component: "L298N Driver", notes: "Right Motor Reverse" },
      { boardPin: "5V", componentPin: "VCC", component: "HC-SR04 & SG90", notes: "From 5V regulated rail" },
      { boardPin: "GND", componentPin: "GND", component: "Common Ground", notes: "UNO GND tied to L298N GND" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Servo", author: "Michael Margolis", installMethod: "Built-in", version: "Standard" },
      { name: "NewPing", author: "Tim Eckel", installMethod: "Library Manager", version: "1.9.7" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Forward Cruise", detail: "Rover drives forward while continuously probing forward distance every 50ms." },
      { step: 2, title: "Obstacle Detection", detail: "When distance < 25cm, rover stops and brakes motors immediately." },
      { step: 3, title: "Environment Scanning", detail: "Servo rotates ultrasonic sensor to 30 degrees (Right) and 150 degrees (Left), logging distances." },
      { step: 4, title: "Optimal Path Turn", detail: "Steers toward direction with largest free space clearance, re-centers servo to 90 degrees." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Chassis Assembly", instruction: "Bolt DC motors to acrylic baseplate and fit wheels." },
      { step: 2, title: "Mount Ultrasonic Turret", instruction: "Hot glue or screw the SG90 servo to front edge. Mount HC-SR04 onto servo horn." },
      { step: 3, title: "Connect Driver & Logic", instruction: "Wire pins 5,6,7,8 to L298N. Tie Battery (-) to L298N GND and Arduino GND." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Hold rover elevated above ground", "Power on battery switch", "Place hand 15cm in front of ultrasonic sensor", "Verify servo pans right then left and motors reverse/turn"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[INIT] Obstacle Avoiding Rover Ready\n[DIST] Front: 42 cm -> CRUISING\n[DIST] Front: 18 cm -> OBSTACLE DETECTED!\n[SCAN] Right: 55 cm | Left: 12 cm\n[ACTION] Turning RIGHT towards open pathway"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Robot moves backwards instead of forwards", cause: "Motor leads reversed on terminal blocks", solution: "Swap wires for the inverted motor on L298N OUT1/OUT2 or OUT3/OUT4." }
    ]),
    applicationsJson: JSON.stringify(["Autonomous Vacuum Cleaning Base", "Warehouse Inventory Transport Bot", "STEM Robotics Curriculum"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Obstacle_Avoidance.ino",
        language: "cpp",
        code: `// Arduino UNO Obstacle Avoiding Robot
#include <Servo.h>

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int SERVO_PIN = 11;

const int IN1 = 5, IN2 = 6, IN3 = 7, IN4 = 8;
Servo scanServo;

long readDistance() {
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 25000);
  if (duration == 0) return 200;
  return duration * 0.034 / 2;
}

void forward()  { digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW); }
void backward() { digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }
void turnRight(){ digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }
void turnLeft() { digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW); }
void halt()     { digitalWrite(IN1,LOW); digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,LOW); }

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);

  scanServo.attach(SERVO_PIN);
  scanServo.write(90);
  delay(1000);
  Serial.println("[INIT] Rover Ready.");
}

void loop() {
  long d = readDistance();
  if (d > 25) {
    forward();
  } else {
    halt();
    backward(); delay(300); halt();

    scanServo.write(30); delay(400);
    long rightDist = readDistance();

    scanServo.write(150); delay(400);
    long leftDist = readDistance();

    scanServo.write(90); delay(200);

    if (rightDist > leftDist) {
      turnRight(); delay(400);
    } else {
      turnLeft(); delay(400);
    }
  }
  delay(40);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Why does it detect false obstacles?", answer: "HC-SR04 has sound cones reflecting off angled or cloth surfaces. Ensure sensor is mounted perpendicular to ground." }
    ]),
    downloadFileName: "arduino-obstacle-avoiding-robot.zip"
  },

  {
    title: "Arduino Precision Line Follower Robot",
    slug: "arduino-line-follower-robot",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1-2 Hours",
    estimatedCost: "₹750 - ₹1000",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "High-speed line tracking vehicle using dual optical IR reflectance sensors with proportional differential steering control.",
    description: "Autonomous robotic ground vehicle programmed to track black electrical tape lines on white surfaces. Features TCRT5000 dual optical infrared emitter-phototransistor pairs with sensitivity potentiometers.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "IR Line Tracking Sensors (TCRT5000)", qty: "2", specs: "Digital Output", estCost: "₹60" },
      { component: "L298N Motor Driver", qty: "1", specs: "Dual H-Bridge", estCost: "₹160" },
      { component: "2WD Chassis + Motors", qty: "1", specs: "Plastic Geared Motors", estCost: "₹250" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Digital Pin 2", componentPin: "OUT", component: "Left IR Sensor", notes: "LOW on Black, HIGH on White" },
      { boardPin: "Digital Pin 3", componentPin: "OUT", component: "Right IR Sensor", notes: "LOW on Black, HIGH on White" },
      { boardPin: "Pin 5, 6", componentPin: "IN1, IN2", component: "L298N Driver", notes: "Left Motor" },
      { boardPin: "Pin 9, 10", componentPin: "IN3, IN4", component: "L298N Driver", notes: "Right Motor" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Reflectance Differential", detail: "Infrared beams reflect off white surface into photodiode (HIGH). Black line absorbs light (LOW)." },
      { step: 2, title: "Differential Steering", detail: "If left sensor hits black, right motor speeds forward to realign car onto center line." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Mount IR Sensors", instruction: "Mount sensors under front bumper ~5mm above floor surface." },
      { step: 2, title: "Calibrate Potentiometers", instruction: "Turn onboard blue trimpots until onboard indicator LED lights up only when over black tape." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Lay oval track with 1-inch black tape on white floor", "Place robot on line and power up", "Verify smooth tracking around curves"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[TRACK] Left: 1 | Right: 1 -> STRAIGHT\n[TRACK] Left: 0 | Right: 1 -> CORRECTION LEFT"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Robot spins in circles", cause: "Sensors too far from floor or trimpot sensitivity incorrect", solution: "Adjust sensors to 5mm height and tune sensitivity pot." }
    ]),
    applicationsJson: JSON.stringify(["Automated Guided Vehicles (AGV) in Factories", "Hospital Medication Delivery Carts", "Robotics Race Competitions"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Line_Follower.ino",
        language: "cpp",
        code: `// Arduino UNO Line Follower Robot
const int S_LEFT = 2;
const int S_RIGHT = 3;

const int IN1 = 5, IN2 = 6, IN3 = 9, IN4 = 10;

void setup() {
  pinMode(S_LEFT, INPUT);
  pinMode(S_RIGHT, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
}

void loop() {
  int leftVal = digitalRead(S_LEFT);
  int rightVal = digitalRead(S_RIGHT);

  // 0 = Black Line, 1 = White Surface
  if (leftVal == 0 && rightVal == 0) {
    // Both on black - move forward
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  } else if (leftVal == 0 && rightVal == 1) {
    // Veer Left
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  } else if (leftVal == 1 && rightVal == 0) {
    // Veer Right
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW);
  } else {
    // Both off line - halt or creep forward
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
  }
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can it follow colored lines?", answer: "No, TCRT5000 is calibrated for high-contrast difference between matte black and reflective white." }
    ]),
    downloadFileName: "arduino-line-follower-robot.zip"
  },

  {
    title: "Arduino Touchless Smart Ultrasonic Dustbin",
    slug: "arduino-smart-dustbin",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹500 - ₹750",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Hygienic hands-free trash can lid opening automatically using HC-SR04 sonar proximity and SG90 servo motor actuator.",
    description: "An automated hygiene station that detects hands or trash approached within 20cm. Automatically lifts the lid to 90 degrees, waits 3 seconds for disposal, and smoothly closes back to seal odors.",
    categorySlug: "smart-home",
    technologies: ["arduino-uno", "ultrasonic", "servo", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO / Nano", qty: "1", specs: "ATmega328P", estCost: "₹380" },
      { component: "HC-SR04 Ultrasonic Sensor", qty: "1", specs: "2-400cm", estCost: "₹80" },
      { component: "SG90 Micro Servo", qty: "1", specs: "9g Micro Servo", estCost: "₹120" },
      { component: "Small Desktop Dustbin", qty: "1", specs: "Flap/Lid Trash Can", estCost: "₹100" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 6", componentPin: "TRIG", component: "HC-SR04", notes: "Sonar Trigger" },
      { boardPin: "Pin 5", componentPin: "ECHO", component: "HC-SR04", notes: "Sonar Echo" },
      { boardPin: "Pin 9", componentPin: "Signal (Orange)", component: "SG90 Servo", notes: "Lid Actuation PWM" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Servo", author: "Michael Margolis", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Proximity Detection", detail: "Measures distance every 100ms. If distance < 20cm, enters OPEN state." },
      { step: 2, title: "Lid Lifting", detail: "Commands servo to rotate from 0 deg to 90 deg, holds for 3000ms, then smoothly restores to 0 deg." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Attach Servo to Hinge", instruction: "Hot-glue servo body to trash can rim, tie servo arm to lid using stiff wire link." },
      { step: 2, title: "Mount Ultrasonic Eyes", instruction: "Drill two 16mm holes in front face of dustbin and seat HC-SR04 transducers." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Wave hand above sensor", "Lid opens smoothly to 90 degrees", "Holds open for 3 seconds", "Lid closes tightly"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[INIT] Smart Dustbin Initialized\n[TRIGGER] Hand detected at 12cm -> Opening Lid\n[ACTION] Closing Lid after timeout"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Lid flaps repeatedly", cause: "Sensor detecting lid edge as it opens", solution: "Angle ultrasonic sensor slightly outward so lid does not enter ultrasonic beam." }
    ]),
    applicationsJson: JSON.stringify(["Hygienic Hospital Biohazard Bins", "Kitchen Hands-Free Waste Disposal", "Smart Office Sanitization Hubs"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Smart_Dustbin.ino",
        language: "cpp",
        code: `// Arduino Touchless Smart Dustbin
#include <Servo.h>

const int TRIG = 6;
const int ECHO = 5;
const int SERVO_PIN = 9;

Servo lidServo;

long getDistance() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long dur = pulseIn(ECHO, HIGH, 20000);
  if (dur == 0) return 100;
  return dur * 0.034 / 2;
}

void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  lidServo.attach(SERVO_PIN);
  lidServo.write(0); // Closed
  Serial.println("[INIT] Smart Dustbin Online.");
}

void loop() {
  long d = getDistance();
  if (d > 0 && d <= 20) {
    Serial.println("[TRIGGER] Opening Lid...");
    lidServo.write(90);
    delay(3000);
    lidServo.write(0);
    Serial.println("[ACTION] Closed.");
    delay(500);
  }
  delay(100);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I power this from a 9V battery?", answer: "Yes, connect the 9V battery clip to Arduino VIN and GND." }
    ]),
    downloadFileName: "arduino-smart-dustbin.zip"
  },

  {
    title: "Arduino Digital Clock & Calendar with RTC DS3231 & 16x2 LCD",
    slug: "arduino-digital-clock-rtc-ds3231",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹550 - ₹750",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Ultra-accurate battery-backed real-time desktop clock with temperature readout and date on an I2C 16x2 LCD display.",
    description: "Extremely accurate timekeeper using the DS3231 temperature-compensated crystal oscillator (TCXO). Maintains second-level precision with coin cell CR2032 battery backup during power outages. Shows Hours, Minutes, Seconds, Day, Date, and Ambient Temperature.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "i2c-spi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "DS3231 High Precision RTC Module", qty: "1", specs: "I2C with CR2032 Battery", estCost: "₹140" },
      { component: "16x2 LCD with I2C Backpack (PCF8574)", qty: "1", specs: "HD44780 compatible", estCost: "₹180" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A4 (SDA)", componentPin: "SDA", component: "DS3231 & LCD I2C", notes: "Parallel I2C Data" },
      { boardPin: "A5 (SCL)", componentPin: "SCL", component: "DS3231 & LCD I2C", notes: "Parallel I2C Clock" },
      { boardPin: "5V", componentPin: "VCC", component: "Both Modules", notes: "5V Rail" },
      { boardPin: "GND", componentPin: "GND", component: "Both Modules", notes: "Common Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "RTClib", author: "Adafruit", installMethod: "Library Manager", version: "2.1.3" },
      { name: "LiquidCrystal I2C", author: "Frank de Brabander", installMethod: "Library Manager", version: "1.1.2" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "I2C Master Interrogation", detail: "Arduino interrogates DS3231 register at address 0x68 once per second." },
      { step: 2, title: "LCD Display Update", detail: "Writes formatted HH:MM:SS on Row 0 and DD/MM/YYYY + Temp on Row 1 at address 0x27." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Insert CR2032 Battery", instruction: "Seat coin cell into DS3231 holder to preserve time across unplugging." },
      { step: 2, title: "Connect I2C Pins", instruction: "Wire SDA to A4 and SCL to A5 on the Arduino UNO." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on UNO", "LCD backlight lights up", "Time updates every second", "Unplug USB for 1 minute, plug back in: verify time remains accurate"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[RTC] DS3231 found\n[TIME] 14:32:05 | Date: 04/10/2026 | Temp: 26.25 C"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "LCD shows solid white blocks", cause: "Contrast potentiometer needs adjustment", solution: "Use a small screwdriver to rotate blue trimpot on the back of the I2C backpack." }
    ]),
    applicationsJson: JSON.stringify(["Desktop Lab Timekeeper", "Industrial Shift Clock", "Automated School/Factory Bell Timer"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_DS3231_Clock.ino",
        language: "cpp",
        code: `// Arduino Digital Clock with DS3231 & 16x2 I2C LCD
#include <Wire.h>
#include <RTClib.h>
#include <LiquidCrystal_I2C.h>

RTC_DS3231 rtc;
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();

  if (!rtc.begin()) {
    lcd.print("RTC Not Found!");
    while (1);
  }

  if (rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }
}

void loop() {
  DateTime now = rtc.now();

  lcd.setCursor(0, 0);
  lcd.printf("TIME: %02d:%02d:%02d", now.hour(), now.minute(), now.second());

  lcd.setCursor(0, 1);
  lcd.printf("%02d/%02d/%02d %0.0fC", now.day(), now.month(), now.year() % 100, rtc.getTemperature());

  delay(1000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "How accurate is the DS3231?", answer: "Accuracy is within ±2 parts-per-million (less than 1 minute of drift per year!)." }
    ]),
    downloadFileName: "arduino-digital-clock-rtc-ds3231.zip"
  },

  {
    title: "Arduino Ultrasonic Radar Detection System",
    slug: "arduino-ultrasonic-radar-system",
    platform: "Arduino UNO",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2-3 Hours",
    estimatedCost: "₹700 - ₹950",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "180-degree sweep sonar radar visualizing object range and bearings in real-time on a graphical desktop radar scope.",
    description: "Military-inspired sonar radar rig built with Arduino UNO, HC-SR04, and SG90 servo motor. Sweeps smoothly from 15 to 165 degrees, transmits polar coordinate frames (Angle, Distance) over Serial to a custom Processing / Python GUI visualizing sonar sweeps in glowing green phosphors.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "ultrasonic", "servo", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.1.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO R3", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "HC-SR04 Ultrasonic Sensor", qty: "1", specs: "Sonar Module", estCost: "₹80" },
      { component: "SG90 Micro Servo 9g", qty: "1", specs: "180-degree sweep", estCost: "₹120" },
      { component: "Acrylic Turret Bracket", qty: "1", specs: "Laser-cut mount", estCost: "₹90" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 10", componentPin: "TRIG", component: "HC-SR04", notes: "Radar Transmit Pulse" },
      { boardPin: "Pin 11", componentPin: "ECHO", component: "HC-SR04", notes: "Radar Echo Receive" },
      { boardPin: "Pin 12", componentPin: "Signal", component: "SG90 Servo", notes: "Turret Rotation" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Processing 4 IDE for Graphical Scope"]),
    librariesJson: JSON.stringify([
      { name: "Servo", author: "Michael Margolis", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Angular Incrementation", detail: "Steps servo by 1 degree per 30ms between 15° and 165°." },
      { step: 2, title: "Serial Protocol", detail: "Emits polar frame string '<Angle>,<Distance>.' at 9600 baud for Processing UI render." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Assemble Radar Turret", instruction: "Mount servo upright, press HC-SR04 bracket firmly onto horn." },
      { step: 2, title: "Run Processing GUI", instruction: "Open included Radar.pde in Processing IDE, select your COM port, hit Run." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Servo begins oscillating left and right", "Place object at 20cm at 90 degrees", "Processing radar screen renders glowing red blip at 20cm center arc"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "90,20.\n91,20.\n92,21.\n93,40."
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Processing GUI throws NullPointerException", cause: "Wrong COM port name in Processing script", solution: "Check Arduino IDE COM port number and update Serial.list()[0] index in Processing sketch." }
    ]),
    applicationsJson: JSON.stringify(["Perimeter Security Breach Detection", "Blind Spot Sonar Monitor for Vehicles", "Interactive Science Fair Showcase"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Radar.ino",
        language: "cpp",
        code: `// Arduino Ultrasonic Radar Sweep
#include <Servo.h>

const int trigPin = 10;
const int echoPin = 11;
const int servoPin = 12;

Servo myServo;

int calculateDistance(){ 
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 30000);
  int distance = duration * 0.034 / 2;
  return (distance > 40 || distance == 0) ? 40 : distance;
}

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
  myServo.attach(servoPin);
}

void loop() {
  for(int i=15; i<=165; i++){  
    myServo.write(i);
    delay(30);
    int distance = calculateDistance();
    Serial.print(i);
    Serial.print(",");
    Serial.print(distance);
    Serial.print(".");
  }
  for(int i=165; i>=15; i--){  
    myServo.write(i);
    delay(30);
    int distance = calculateDistance();
    Serial.print(i);
    Serial.print(",");
    Serial.print(distance);
    Serial.print(".");
  }
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the maximum detection range?", answer: "Reliable detection on small objects is approximately 40cm - 150cm." }
    ]),
    downloadFileName: "arduino-ultrasonic-radar-system.zip"
  },

  {
    title: "Arduino IR Remote Controlled 4-Channel Home Automation",
    slug: "arduino-ir-remote-home-automation",
    platform: "Arduino UNO",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "1-2 Hours",
    estimatedCost: "₹650 - ₹900",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Control 4 AC electrical appliances with any standard TV/DVD infrared remote control and 4-relay opto-isolated board.",
    description: "Offline, zero-internet smart home lighting and fan switcher using TSOP1738 / VS1838B 38kHz infrared receiver. Decodes NEC protocol hex codes from TV remote number buttons (1, 2, 3, 4) to independently toggle latching relays.",
    categorySlug: "home-automation",
    technologies: ["arduino-uno", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1558002038-1055907df827?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.2.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "TSOP1738 / VS1838B IR Receiver", qty: "1", specs: "38kHz demodulator", estCost: "₹25" },
      { component: "IR Remote Control (Mini or TV)", qty: "1", specs: "21-key NEC transmitter", estCost: "₹70" },
      { component: "4-Channel 5V Relay Module", qty: "1", specs: "10A 250VAC", estCost: "₹180" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Digital Pin 11", componentPin: "OUT", component: "IR Receiver", notes: "Demodulated IR Signal" },
      { boardPin: "Pin 4, 5, 6, 7", componentPin: "IN1-IN4", component: "4-Ch Relay", notes: "Relay control outputs" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "IRremote", author: "Armin Joachimsmeyer", installMethod: "Library Manager", version: "4.3.1" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "38kHz Carrier Demodulation", detail: "TSOP filter strips 38kHz carrier wave and passes pulse-distance modulated NEC bytes to Pin 11." },
      { step: 2, title: "Relay Flip-Flop", detail: "When keycode '1' is received, state of Relay 1 inverts and writes to pin." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Decode Remote Codes", instruction: "Run IRrecvDump sketch to see your specific remote hex keys in Serial Monitor." },
      { step: 2, title: "Wire Relays", instruction: "Connect relay inputs to digital pins 4 through 7." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Aim remote at TSOP sensor", "Press '1' on remote", "Relay 1 clicks ON", "Press '1' again", "Relay 1 clicks OFF"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[IR] Initialized. Awaiting signals...\n[IR] Received Code: 0xFFA25D -> Toggled Relay 1 (ON)"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "No response from remote", cause: "Dead CR2025 battery or wrong pin assignment", solution: "Verify remote emits IR by looking at remote LED through phone camera screen (shows purple glow)." }
    ]),
    applicationsJson: JSON.stringify(["Bedside Appliance Remote", "Elderly Friendly Lamp Controller", "Classroom Projector Power Switch"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_IR_Automation.ino",
        language: "cpp",
        code: `// Arduino IR Remote Controlled Home Automation
#include <IRremote.hpp>

const int IR_RECEIVE_PIN = 11;
const int R1 = 4, R2 = 5, R3 = 6, R4 = 7;

bool s1 = false, s2 = false, s3 = false, s4 = false;

void setup() {
  Serial.begin(9600);
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
  pinMode(R1, OUTPUT); digitalWrite(R1, HIGH);
  pinMode(R2, OUTPUT); digitalWrite(R2, HIGH);
  pinMode(R3, OUTPUT); digitalWrite(R3, HIGH);
  pinMode(R4, OUTPUT); digitalWrite(R4, HIGH);
}

void loop() {
  if (IrReceiver.decode()) {
    uint32_t cmd = IrReceiver.decodedIRData.decodedRawData;
    Serial.printf("Raw: 0x%08X\\n", cmd);

    // Common NEC Keycodes for 1, 2, 3, 4
    if (cmd == 0xE916FF00 || cmd == 0xF30CFF00) { s1 = !s1; digitalWrite(R1, s1 ? LOW : HIGH); }
    if (cmd == 0xE619FF00) { s2 = !s2; digitalWrite(R2, s2 ? LOW : HIGH); }
    if (cmd == 0xF20DFF00) { s3 = !s3; digitalWrite(R3, s3 ? LOW : HIGH); }
    if (cmd == 0xE718FF00) { s4 = !s4; digitalWrite(R4, s4 ? LOW : HIGH); }

    IrReceiver.resume();
  }
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I use any TV remote?", answer: "Yes! Any Sony, LG, Samsung, or generic remote working on NEC/RC5 standard can be mapped." }
    ]),
    downloadFileName: "arduino-ir-remote-home-automation.zip"
  },

  {
    title: "Arduino Smart Soil Moisture Automatic Plant Watering System",
    slug: "arduino-plant-watering-system",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1-2 Hours",
    estimatedCost: "₹600 - ₹850",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Automated greenhouse drip irrigation pump triggered when soil moisture level falls below adjustable threshold.",
    description: "Save house plants from drought with continuous capacitive/resistive soil moisture telemetry. When soil dryness crosses the calibrated threshold, Arduino activates a mini 5V submersible water pump for 5 seconds and logs moisture stats to Serial.",
    categorySlug: "environmental",
    technologies: ["arduino-uno", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.1.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "Soil Moisture Sensor Module", qty: "1", specs: "Capacitive / Resistive probe", estCost: "₹90" },
      { component: "Mini 5V Submersible Water Pump + Tube", qty: "1", specs: "120L/H flow rate", estCost: "₹110" },
      { component: "1-Channel 5V Relay Module", qty: "1", specs: "10A Relay", estCost: "₹60" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Analog A0", componentPin: "AOUT", component: "Soil Moisture Probe", notes: "Measures 0-1023 ADC" },
      { boardPin: "Digital Pin 8", componentPin: "IN", component: "1-Ch Relay", notes: "Submersible Pump Control" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "ADC Voltage Sampling", detail: "Dry soil exhibits high resistance (ADC ~800). Saturated soil exhibits low resistance (ADC ~300)." },
      { step: 2, title: "Watering Routine", detail: "If Moisture < 35%, pulse relay for 4 seconds then wait 20 seconds for moisture diffusion." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Insert Probe in Soil", instruction: "Push probe into plant root zone up to marked depth line." },
      { step: 2, title: "Set Up Water Reservoir", instruction: "Submerge mini pump in water bottle with silicone tube directed into plant pot." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Pull probe out of soil into dry air", "Pump turns on after 2 seconds", "Dip probe into glass of water", "Pump shuts off immediately"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[SOIL] Raw ADC: 840 (Dry: 82%) -> WATERING ACTIVE\n[PUMP] Pumping water for 4000ms...\n[SOIL] Raw ADC: 340 (Wet: 33%) -> SOIL SATISFIED"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Resistive sensor prongs corroding rapidly", cause: "Electrolysis from continuous DC voltage", solution: "Power the sensor VCC from an Arduino digital pin, only setting HIGH during the 20ms read interval." }
    ]),
    applicationsJson: JSON.stringify(["Vacation Plant Self-Waterer", "Rooftop Organic Garden Automation", "Hydroponics Nutrient Solution Doser"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Plant_Waterer.ino",
        language: "cpp",
        code: `// Arduino Smart Plant Watering System
const int SOIL_PIN = A0;
const int RELAY_PUMP = 8;
const int DRY_THRESHOLD = 600; // Calibrate for your soil

void setup() {
  Serial.begin(9600);
  pinMode(RELAY_PUMP, OUTPUT);
  digitalWrite(RELAY_PUMP, HIGH); // Off
}

void loop() {
  int sensorVal = analogRead(SOIL_PIN);
  Serial.print("Soil Moisture Value: ");
  Serial.println(sensorVal);

  if (sensorVal > DRY_THRESHOLD) {
    Serial.println("Soil is DRY! Starting pump...");
    digitalWrite(RELAY_PUMP, LOW); // Turn on pump
    delay(4000);                   // Water for 4 seconds
    digitalWrite(RELAY_PUMP, HIGH);// Turn off pump
    Serial.println("Pump stopped. Waiting for water absorption...");
    delay(20000);                  // Wait 20 seconds
  }

  delay(2000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is capacitive sensor better than resistive?", answer: "Yes, capacitive probes (V1.2) have no exposed copper and resist corrosion indefinitely." }
    ]),
    downloadFileName: "arduino-plant-watering-system.zip"
  },

  {
    title: "Arduino Smart Traffic Light Controller with 7-Segment Countdown",
    slug: "arduino-traffic-light-controller",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹450 - ₹650",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "4-way intersection traffic sequencing system with Red/Yellow/Green LED clusters and pedestrian countdown timer display.",
    description: "Simulate a real-world municipal road intersection with state-machine traffic logic. Features Red, Yellow, Green LED signals, pedestrian push-button override for crosswalk safety, and 7-segment display countdown timer.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "LEDs (Red, Yellow, Green)", qty: "6", specs: "5mm Bright", estCost: "₹15" },
      { component: "Current Limiting Resistors (220Ω)", qty: "6", specs: "1/4W", estCost: "₹10" },
      { component: "Push Button", qty: "1", specs: "Pedestrian Crosswalk Request", estCost: "₹5" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 10", componentPin: "Anode", component: "Red LED", notes: "Stop Phase" },
      { boardPin: "Pin 9", componentPin: "Anode", component: "Yellow LED", notes: "Caution Phase" },
      { boardPin: "Pin 8", componentPin: "Anode", component: "Green LED", notes: "Go Phase" },
      { boardPin: "Pin 2", componentPin: "Terminal 1", component: "Pedestrian Button", notes: "Hardware Interrupt Pin" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Finite State Machine", detail: "Transitions smoothly: GREEN (10s) -> YELLOW (3s) -> RED (10s)." },
      { step: 2, title: "Pedestrian Interrupt", detail: "Attaches interrupt to Pin 2; button press expedites Green-to-Yellow transition." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Wire LEDs with Resistors", instruction: "Always connect 220Ω resistors in series with each LED anode." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Observe automatic cycling", "Press crosswalk button while Green is lit", "Watch light switch to Yellow within 2 seconds"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[TRAFFIC] STATE: GREEN (Clearway)\n[EVENT] Pedestrian button pressed!\n[TRAFFIC] STATE: YELLOW (Prepare to Stop)"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "LED does not illuminate", cause: "LED reversed polarity", solution: "Long lead is positive Anode; short lead with flat rim edge is negative Cathode." }
    ]),
    applicationsJson: JSON.stringify(["Smart City Traffic Simulation", "School Crossing Safety System", "STEM Electronics Education"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Traffic_Lights.ino",
        language: "cpp",
        code: `// Arduino Smart Traffic Light Controller
const int RED_LED = 10;
const int YEL_LED = 9;
const int GRN_LED = 8;
const int BTN_PIN = 2;

volatile bool crosswalkRequested = false;

void requestCrosswalk() {
  crosswalkRequested = true;
}

void setup() {
  pinMode(RED_LED, OUTPUT);
  pinMode(YEL_LED, OUTPUT);
  pinMode(GRN_LED, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(BTN_PIN), requestCrosswalk, FALLING);
}

void loop() {
  // Green Phase
  digitalWrite(RED_LED, LOW); digitalWrite(YEL_LED, LOW); digitalWrite(GRN_LED, HIGH);
  for (int i = 0; i < 100; i++) {
    delay(100);
    if (crosswalkRequested && i > 30) break; // Expedite if requested
  }

  // Yellow Phase
  digitalWrite(GRN_LED, LOW); digitalWrite(YEL_LED, HIGH);
  delay(3000);

  // Red Phase (Crosswalk safe)
  digitalWrite(YEL_LED, LOW); digitalWrite(RED_LED, HIGH);
  crosswalkRequested = false;
  delay(8000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I expand this to 4-way intersection?", answer: "Yes! Simply duplicate the LED sets on pins 4, 5, 6 for the cross street." }
    ]),
    downloadFileName: "arduino-traffic-light-controller.zip"
  },

  {
    title: "Arduino RFID Student Attendance & Time Logging System",
    slug: "arduino-rfid-attendance-system",
    platform: "Arduino UNO",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3 Hours",
    estimatedCost: "₹950 - ₹1300",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Contactless student card reader recording timestamps and student roll numbers directly onto an SD card in Excel CSV format.",
    description: "Automated classroom attendance kiosk using MFRC522 RFID reader, DS3231 RTC clock, and Micro-SD card logging shield. When students tap their ID badge, the system beeps, confirms name on LCD, and logs 'RollNumber, Date, Time' into ATTEND.CSV.",
    categorySlug: "arduino-uno",
    technologies: ["arduino-uno", "rfid", "i2c-spi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "MFRC522 RFID Reader", qty: "1", specs: "13.56 MHz SPI", estCost: "₹180" },
      { component: "Micro SD Card Module (SPI)", qty: "1", specs: "FAT32 formatting", estCost: "₹110" },
      { component: "DS3231 RTC Module", qty: "1", specs: "I2C Clock", estCost: "₹140" },
      { component: "I2C 16x2 LCD Display", qty: "1", specs: "Blue Backlight", estCost: "₹180" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Pin 10", componentPin: "SDA / CS", component: "RC522 RFID", notes: "RFID Chip Select" },
      { boardPin: "Pin 4", componentPin: "CS", component: "SD Card Module", notes: "SD Card Chip Select" },
      { boardPin: "Pin 11", componentPin: "MOSI", component: "Shared SPI Bus", notes: "Master Out" },
      { boardPin: "Pin 12", componentPin: "MISO", component: "Shared SPI Bus", notes: "Master In" },
      { boardPin: "Pin 13", componentPin: "SCK", component: "Shared SPI Bus", notes: "Clock" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "MFRC522", author: "GithubCommunity", installMethod: "Library Manager", version: "1.4.11" },
      { name: "SD", author: "Arduino", installMethod: "Built-in", version: "Standard" },
      { name: "RTClib", author: "Adafruit", installMethod: "Library Manager", version: "2.1.3" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Badge Interrogation", detail: "Reads 4-byte card UID on SPI bus when student taps card." },
      { step: 2, title: "Database Lookup", detail: "Matches UID against student roster lookup table." },
      { step: 3, title: "CSV Append", detail: "Opens 'ATTEND.CSV' on SD card and appends row: StudentName, Date, Time." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Wire Dual SPI Slaves", instruction: "Ensure RC522 uses CS Pin 10 and SD module uses CS Pin 4." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Tap student card", "Buzzer beeps, LCD shows student name", "Remove SD card, insert in PC: verify new CSV entry"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[RFID] Tag scanned: 4A 2F 11 8C\n[ROSTER] Matched: Rahul Verma (Roll #24)\n[LOG] Appended to ATTEND.CSV"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "SD Card init failed", cause: "Card not formatted as FAT32 or size > 32GB", solution: "Use a 16GB or 32GB SD card formatted in FAT32 format." }
    ]),
    applicationsJson: JSON.stringify(["College Classrooms", "Corporate Office Turnstiles", "Gym / Fitness Club Member Logging"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_RFID_Attendance.ino",
        language: "cpp",
        code: `// Arduino RFID Attendance Logger to SD Card
#include <SPI.h>
#include <MFRC522.h>
#include <SD.h>

#define RFID_CS 10
#define RFID_RST 9
#define SD_CS   4

MFRC522 rfid(RFID_CS, RFID_RST);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  if (!SD.begin(SD_CS)) {
    Serial.println("SD Card initialization failed!");
    return;
  }
  Serial.println("System Ready. Scan Card...");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  String uidStr = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    uidStr += String(rfid.uid.uidByte[i], HEX);
  }
  uidStr.toUpperCase();

  Serial.println("Logged Card: " + uidStr);

  File file = SD.open("ATTEND.CSV", FILE_WRITE);
  if (file) {
    file.println(uidStr + ",PRESENT");
    file.close();
    Serial.println("Wrote to SD Card.");
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  delay(1500);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "How many attendance records can be stored?", answer: "A 16GB micro-SD card can store over 50 million attendance logs." }
    ]),
    downloadFileName: "arduino-rfid-attendance-system.zip"
  },

  {
    title: "Arduino Alcohol Breathalyzer Detector with Audio Alarm",
    slug: "arduino-alcohol-detector-alert",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹500 - ₹750",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Real-time Blood Alcohol Concentration (BAC) breathalyzer using MQ-3 gas sensor, visual warning LEDs, and high-pitch buzzer alarm.",
    description: "Personal and vehicle safety alcohol detection unit built around the MQ-3 tin-dioxide (SnO2) semiconductor gas sensor. Features pre-heat stabilization routine, analog PPM ethanol vapor quantification, and audible alarm when BAC threshold is breached.",
    categorySlug: "environmental",
    technologies: ["arduino-uno", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino UNO", qty: "1", specs: "ATmega328P", estCost: "₹420" },
      { component: "MQ-3 Alcohol Gas Sensor Module", qty: "1", specs: "High sensitivity to ethanol", estCost: "₹140" },
      { component: "Active Piezo Buzzer", qty: "1", specs: "5V 85dB", estCost: "₹20" },
      { component: "Red & Green 5mm LEDs", qty: "2", specs: "Status indicators", estCost: "₹10" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "Analog Pin A0", componentPin: "AOUT", component: "MQ-3 Sensor", notes: "Analog Voltage 0-5V" },
      { boardPin: "Digital Pin 8", componentPin: "Positive", component: "Buzzer", notes: "High alarm tone" },
      { boardPin: "Digital Pin 9", componentPin: "Anode", component: "Red LED", notes: "DANGER indicator" },
      { boardPin: "Digital Pin 10", componentPin: "Anode", component: "Green LED", notes: "SAFE indicator" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Sensor Heating", detail: "Internal heater element raises SnO2 mesh to ~200°C for optimal ethanol vapor absorption." },
      { step: 2, title: "Resistance Drop", detail: "Ethanol gas molecules donate electrons, lowering sensor resistance and raising ADC voltage." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Sensor Burn-In", instruction: "Allow MQ-3 to stay powered for 5 minutes during first power-up to burn off protective factory flux." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power device and wait 20s for warm up (Green LED on)", "Expose swab with rubbing alcohol near sensor", "Red LED turns on and buzzer sounds continuous tone"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[MQ3] Preheating complete\n[READ] Alcohol ADC: 180 -> STATUS: NORMAL\n[ALERT] Alcohol ADC: 720 -> ALCOHOL DETECTED! SOUNDING ALARM"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Sensor reads high immediately when turned on", cause: "MQ sensor heater takes 20-30 seconds to reach thermal equilibrium", solution: "Wait for the 20-second startup warm-up loop to finish." }
    ]),
    applicationsJson: JSON.stringify(["Vehicle Ignition Interlock Simulation", "Workplace Safety Inspection Stations", "Educational Chemistry Demos"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Arduino_Alcohol_Detector.ino",
        language: "cpp",
        code: `// Arduino MQ-3 Alcohol Detector with Buzzer Alert
const int MQ3_PIN = A0;
const int BUZZER = 8;
const int RED_LED = 9;
const int GRN_LED = 10;
const int ALCOHOL_THRESHOLD = 400; // Calibrate for ambient baseline

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GRN_LED, OUTPUT);

  // Pre-heating indicator
  digitalWrite(GRN_LED, LOW);
  digitalWrite(RED_LED, HIGH);
  Serial.println("Preheating MQ-3 sensor (15s)...");
  delay(15000);
  digitalWrite(RED_LED, LOW);
  digitalWrite(GRN_LED, HIGH);
  Serial.println("Sensor Ready!");
}

void loop() {
  int sensorValue = analogRead(MQ3_PIN);
  Serial.print("Alcohol Level: ");
  Serial.println(sensorValue);

  if (sensorValue > ALCOHOL_THRESHOLD) {
    digitalWrite(RED_LED, HIGH);
    digitalWrite(GRN_LED, LOW);
    digitalWrite(BUZZER, HIGH);
    Serial.println("!!! DANGER: ALCOHOL DETECTED !!!");
  } else {
    digitalWrite(RED_LED, LOW);
    digitalWrite(GRN_LED, HIGH);
    digitalWrite(BUZZER, LOW);
  }

  delay(500);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this calibrated for medical or police use?", answer: "No, this is an educational / prototype grade detector. Certified breathalyzers require laboratory calibration." }
    ]),
    downloadFileName: "arduino-alcohol-detector-alert.zip"
  }
];

module.exports = { arduinoUnoProjects };
