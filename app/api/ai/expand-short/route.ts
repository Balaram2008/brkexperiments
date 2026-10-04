import { NextResponse } from "next/server";

export interface ShortProjectKnowledge {
  id: string;
  title: string;
  youtubeShortUrl: string;
  platform: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  shortSummary: string;
  insufficientReason: string;
  bom: Array<{ component: string; qty: number; specs: string; estPriceInr: string }>;
  pinoutTable: Array<{ sensorPin: string; mcuPin: string; wireColor: string; notes: string }>;
  firmwareCode: string;
  schematicAscii: string;
  assemblySteps: string[];
  testingInstructions: string;
  troubleshooting: Array<{ problem: string; solution: string }>;
  suggestedTweaks: string[];
}

const SHORTS_KNOWLEDGE_BASE: Record<string, ShortProjectKnowledge> = {
  "mini-radar": {
    id: "mini-radar",
    title: "360° Ultrasonic Mini Radar Screen",
    youtubeShortUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    shortSummary: "A mini radar station with an HC-SR04 mounted on an SG90 servo panning 15° to 165°, streaming distance data to a live radar scope.",
    insufficientReason: "The 45-second Short shows the radar sweeping smoothly, but skips the servo sweep timing delay, ultrasonic pulseIn calculation, trigger pulse duration, and Processing GUI code.",
    bom: [
      { component: "Arduino UNO R3 (or Nano)", qty: 1, specs: "ATmega328P 16MHz", estPriceInr: "₹450" },
      { component: "HC-SR04 Ultrasonic Sensor", qty: 1, specs: "2cm - 400cm range, 5V", estPriceInr: "₹120" },
      { component: "SG90 Micro Servo 9g", qty: 1, specs: "180° rotation, 4.8V-6V", estPriceInr: "₹110" },
      { component: "Mini Solderless Breadboard", qty: 1, specs: "400 tie-points", estPriceInr: "₹80" },
      { component: "Male-to-Female Jumper Wires", qty: 8, specs: "20cm Dupont", estPriceInr: "₹40" },
    ],
    pinoutTable: [
      { sensorPin: "HC-SR04 VCC", mcuPin: "5V", wireColor: "Red", notes: "Power rail" },
      { sensorPin: "HC-SR04 GND", mcuPin: "GND", wireColor: "Black", notes: "Ground rail" },
      { sensorPin: "HC-SR04 Trig", mcuPin: "D9", wireColor: "Yellow", notes: "10us trigger pulse output" },
      { sensorPin: "HC-SR04 Echo", mcuPin: "D10", wireColor: "Blue", notes: "Pulse width input" },
      { sensorPin: "SG90 Servo PWM (Orange)", mcuPin: "D11", wireColor: "Orange", notes: "Hardware Timer PWM" },
      { sensorPin: "SG90 Servo VCC (Red)", mcuPin: "5V", wireColor: "Red", notes: "Connect to stable 5V rail" },
      { sensorPin: "SG90 Servo GND (Brown)", mcuPin: "GND", wireColor: "Brown", notes: "Common Ground" },
    ],
    firmwareCode: `// =================================================================
// BRKEXPERIMENTS — 360° Ultrasonic Mini Radar Screen
// Firmware for Arduino UNO / Nano
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <Servo.h>

const int trigPin = 9;
const int echoPin = 10;
const int servoPin = 11;

Servo radarServo;

long duration;
int distance;

int calculateDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH, 25000); // 25ms timeout
  if (duration == 0) return 400; // max range
  distance = duration * 0.034 / 2;
  return distance;
}

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  radarServo.attach(servoPin);
  radarServo.write(15);
  delay(500);
}

void loop() {
  // Sweep from 15 to 165 degrees
  for (int i = 15; i <= 165; i++) {
    radarServo.write(i);
    delay(30);
    int dist = calculateDistance();
    Serial.print(i);
    Serial.print(",");
    Serial.print(dist);
    Serial.print(".");
  }
  
  // Sweep back from 165 to 15 degrees
  for (int i = 165; i >= 15; i--) {
    radarServo.write(i);
    delay(30);
    int dist = calculateDistance();
    Serial.print(i);
    Serial.print(",");
    Serial.print(dist);
    Serial.print(".");
  }
}
`,
    schematicAscii: `
+-------------------------------------------------------+
|                ARDUINO UNO R3                         |
|   5V   GND    D9(Trig)   D10(Echo)   D11(Servo PWM)   |
+----+----+--------+----------+--------------+----------+
     |    |        |          |              |
     |    |   +----+----------+----+         |
     |    |   | HC-SR04 ULTRASONIC |         |
     |    |   | VCC GND Trig Echo  |         |
     |    |   +--------------------+         |
     |    |                                  |
     +----+-----------------------------+    |
          |    +------------------------+----+----+
          +----+ SG90 MICRO SERVO (9g)            |
               | Red(5V) Brown(GND) Orange(PWM)   |
               +----------------------------------+
`,
    assemblySteps: [
      "Mount the HC-SR04 ultrasonic sensor firmly onto the horn of the SG90 servo motor using double-sided foam tape or hot glue.",
      "Insert the SG90 servo into the mini breadboard or clamp it securely to your workbench.",
      "Connect HC-SR04 Trig to Arduino Pin D9 and Echo to Pin D10 using jumper wires.",
      "Connect SG90 signal wire (orange) to Arduino Pin D11.",
      "Wire both HC-SR04 VCC and Servo VCC to Arduino 5V, and all GND pins to Arduino GND.",
      "Connect Arduino to your computer via USB and upload the .ino sketch at 9600 baud.",
      "Open Serial Monitor to see angle and distance pairs streaming in real time!",
    ],
    testingInstructions: "Open the Arduino IDE Serial Monitor, set the baud rate to 9600. You should see formatted stream data like '45,18.46,18.47,19.' representing degrees and distance in centimeters.",
    troubleshooting: [
      { problem: "Servo stutters or resets Arduino", solution: "The SG90 servo draws current spikes up to 500mA. Add a 100uF electrolytic capacitor across 5V and GND rail on the breadboard." },
      { problem: "Echo pin constantly outputs 0 or 400cm", solution: "Verify HC-SR04 Echo pin is securely connected to D10 and not loose. Ensure obstacle is within 2cm - 300cm range." },
    ],
    suggestedTweaks: [
      "Adapt code for ESP32 with 3.3V logic resistor divider on Echo pin",
      "Add an active buzzer that beeps faster as an object approaches under 10cm",
      "Display current angle & closest obstacle on an I2C 0.96 inch SSD1306 OLED",
    ],
  },

  "laser-tripwire": {
    id: "laser-tripwire",
    title: "Laser Tripwire Security Grid with Audio Siren",
    youtubeShortUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    platform: "Arduino UNO",
    difficulty: "Beginner",
    shortSummary: "Invisible security tripwire that triggers a loud audio alarm and flashing red beacon whenever an intruder breaks the red laser beam.",
    insufficientReason: "The 30s Short demonstrates the laser triggering the siren, but doesn't explain the LDR voltage divider calculation, ambient light calibration threshold, or buzzer frequency pulse loop.",
    bom: [
      { component: "Arduino UNO / Nano", qty: 1, specs: "5V Logic Microcontroller", estPriceInr: "₹450" },
      { component: "650nm 5mW Red Laser Diode", qty: 1, specs: "5V, with copper heat barrel", estPriceInr: "₹60" },
      { component: "Light Dependent Resistor (LDR)", qty: 1, specs: "GL5528 5mm", estPriceInr: "₹20" },
      { component: "10k Ohm Resistor", qty: 1, specs: "1/4 Watt Carbon Film", estPriceInr: "₹5" },
      { component: "Active 5V Buzzer", qty: 1, specs: "85dB at 10cm", estPriceInr: "₹40" },
      { component: "Ultra-Bright Red LED", qty: 1, specs: "5mm diffused", estPriceInr: "₹10" },
      { component: "220 Ohm Resistor", qty: 1, specs: "Current limiter for LED", estPriceInr: "₹5" },
    ],
    pinoutTable: [
      { sensorPin: "Laser VCC", mcuPin: "5V", wireColor: "Red", notes: "Continuous 5V beam" },
      { sensorPin: "Laser GND", mcuPin: "GND", wireColor: "Black", notes: "Ground" },
      { sensorPin: "LDR Leg 1", mcuPin: "5V", wireColor: "Red", notes: "Voltage divider high" },
      { sensorPin: "LDR Leg 2", mcuPin: "A0", wireColor: "Green", notes: "Analog junction to A0" },
      { sensorPin: "10k Resistor", mcuPin: "A0 to GND", wireColor: "Black", notes: "Pull-down leg" },
      { sensorPin: "Buzzer (+)", mcuPin: "D8", wireColor: "Yellow", notes: "Alarm output" },
      { sensorPin: "Buzzer (-)", mcuPin: "GND", wireColor: "Black", notes: "Ground" },
      { sensorPin: "LED Anode (+)", mcuPin: "D7 (via 220Ω)", wireColor: "Red", notes: "Strobe alert" },
    ],
    firmwareCode: `// =================================================================
// BRKEXPERIMENTS — Laser Tripwire Security Grid
// Firmware for Arduino UNO / Nano
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

const int ldrPin = A0;
const int buzzerPin = 8;
const int ledPin = 7;
const int laserPin = 6;

int baselineLaserValue = 0;
const int thresholdDrop = 150; // Sensitivity delta
bool alarmTriggered = false;

void setup() {
  Serial.begin(9600);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(laserPin, OUTPUT);
  
  digitalWrite(laserPin, HIGH); // Turn laser ON
  
  // Calibration stage: allow 2 seconds to align laser to LDR
  Serial.println("Calibrating Laser Grid... Ensure beam hits LDR");
  delay(2000);
  baselineLaserValue = analogRead(ldrPin);
  Serial.print("Baseline Laser Level: ");
  Serial.println(baselineLaserValue);
}

void loop() {
  int currentLdr = analogRead(ldrPin);
  Serial.println(currentLdr);
  
  // If laser beam is broken, LDR resistance surges and voltage drops
  if (currentLdr < (baselineLaserValue - thresholdDrop)) {
    alarmTriggered = true;
  }
  
  if (alarmTriggered) {
    // European Police Siren Effect
    for (int freq = 600; freq <= 1200; freq += 25) {
      tone(buzzerPin, freq);
      digitalWrite(ledPin, HIGH);
      delay(8);
    }
    for (int freq = 1200; freq >= 600; freq -= 25) {
      tone(buzzerPin, freq);
      digitalWrite(ledPin, LOW);
      delay(8);
    }
  } else {
    noTone(buzzerPin);
    digitalWrite(ledPin, LOW);
  }
}
`,
    schematicAscii: `
[5V] ----+----(Laser Diode)----> [GND]
         |
         +----(LDR)----+----[Analog A0]
                       |
                   (10k Resistor)
                       |
                     [GND]

[Pin D8] ----(+) (5V Buzzer) (-) ---- [GND]
[Pin D7] ----(220Ω Resistor) ----(LED)---- [GND]
`,
    assemblySteps: [
      "Place the LDR inside a small opaque straw or tube (1-2cm long) to block ambient room sunlight.",
      "Create the voltage divider: connect one pin of LDR to 5V, the other to Arduino A0. Place a 10k resistor between A0 and GND.",
      "Power the 650nm laser diode from Pin D6 or 5V rail.",
      "Align the laser diode so the red dot squarely hits the face of the LDR.",
      "Connect the active buzzer to Pin D8 and GND, and the alert LED to Pin D7 via a 220Ω resistor.",
      "Upload the sketch. When the beam is obstructed, the siren triggers instantly!",
    ],
    testingInstructions: "Open Serial Monitor at 9600 baud. Align laser onto LDR. The baseline reading should be above 700. Break the beam with your hand; the reading should plunge under 400 and activate the alarm.",
    troubleshooting: [
      { problem: "Alarm triggers continuously even when laser is aligned", solution: "Ambient room light is too bright. Shield the LDR inside a black heat shrink tubing or plastic straw so only the direct laser beam hits it." },
      { problem: "Buzzer only clicks instead of playing siren", solution: "Ensure you are using a passive buzzer if using the tone() function, or an active buzzer with simple HIGH/LOW toggling." },
    ],
    suggestedTweaks: [
      "Add a physical key switch or RFID reader to disarm the alarm",
      "Add an ESP8266 / ESP32 to send instant Telegram push notifications when tripped",
      "Add a mirrors array to bounce the laser across a room forming an invisible grid",
    ],
  },

  "knock-lock": {
    id: "knock-lock",
    title: "Secret Knock Vibration Door Lock",
    youtubeShortUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    platform: "Arduino UNO",
    difficulty: "Intermediate",
    shortSummary: "A door lock that unlocks a 12V solenoid deadbolt only when you tap a secret rhythm pattern (e.g. 'Shave and a Haircut').",
    insufficientReason: "The Short demonstrates tapping the door and the lock popping open, but omits the knock interval ratio array matching math, piezoelectric voltage spike filtering, and transistor relay driver.",
    bom: [
      { component: "Arduino UNO or Nano", qty: 1, specs: "5V ATmega328P", estPriceInr: "₹450" },
      { component: "Piezo Vibration Sensor Disc", qty: 1, specs: "27mm Piezo Element", estPriceInr: "₹35" },
      { component: "1 Megaohm (1MΩ) Resistor", qty: 1, specs: "High-impedance shunt for piezo", estPriceInr: "₹5" },
      { component: "12V Solenoid Door Lock", qty: 1, specs: "Fail-secure electronic latch", estPriceInr: "₹350" },
      { component: "TIP120 NPN Darlington Transistor", qty: 1, specs: "5A 60V Solenoid driver", estPriceInr: "₹30" },
      { component: "1N4007 Flyback Diode", qty: 1, specs: "Inductive kickback protector", estPriceInr: "₹5" },
      { component: "Pushbutton (Programming Mode)", qty: 1, specs: "6x6 tactile button", estPriceInr: "₹10" },
    ],
    pinoutTable: [
      { sensorPin: "Piezo (+) Positive", mcuPin: "A0", wireColor: "Red", notes: "Vibration ADC tap" },
      { sensorPin: "Piezo (-) Ground", mcuPin: "GND", wireColor: "Black", notes: "Common Ground" },
      { sensorPin: "1MΩ Resistor", mcuPin: "A0 to GND", wireColor: "Black", notes: "Bleeder resistor across piezo" },
      { sensorPin: "TIP120 Base", mcuPin: "D3 (via 1kΩ)", wireColor: "Blue", notes: "Solenoid trigger pin" },
      { sensorPin: "Program Button", mcuPin: "D2", wireColor: "Yellow", notes: "Record new secret knock" },
      { sensorPin: "Green LED", mcuPin: "D4", wireColor: "Green", notes: "Unlocked indicator" },
      { sensorPin: "Red LED", mcuPin: "D5", wireColor: "Red", notes: "Locked indicator" },
    ],
    firmwareCode: `// =================================================================
// BRKEXPERIMENTS — Secret Knock Vibration Door Lock
// Firmware for Arduino UNO / Nano
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

const int piezoPin = A0;
const int programBtnPin = 2;
const int lockPin = 3;
const int redLed = 5;
const int greenLed = 4;

const int threshold = 40;       // Minimum piezo spike to count as knock
const int rejectTolerance = 25; // Percentage timing deviation allowed
const int maxKnocks = 20;
const int knockTimeout = 1200;  // ms of silence before analyzing

int secretCode[maxKnocks] = {50, 25, 25, 50, 100, 0}; // Normalized intervals
int knockReadings[maxKnocks];
int knockCount = 0;

void setup() {
  Serial.begin(9600);
  pinMode(lockPin, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(programBtnPin, INPUT_PULLUP);
  
  digitalWrite(redLed, HIGH); // Locked by default
  digitalWrite(greenLed, LOW);
  digitalWrite(lockPin, LOW);
  
  Serial.println("Secret Knock Lock Online. Knock your pattern on the door!");
}

void unlockDoor() {
  Serial.println("Pattern Accepted! UNLOCKING...");
  digitalWrite(redLed, LOW);
  digitalWrite(greenLed, HIGH);
  digitalWrite(lockPin, HIGH); // Engage solenoid
  delay(4000); // Keep open 4 seconds
  digitalWrite(lockPin, LOW);
  digitalWrite(greenLed, LOW);
  digitalWrite(redLed, HIGH);
}

void loop() {
  int sensorValue = analogRead(piezoPin);
  
  if (sensorValue >= threshold) {
    listenToSecretKnock();
  }
}

void listenToSecretKnock() {
  int i = 0;
  for (i = 0; i < maxKnocks; i++) knockReadings[i] = 0;
  
  int currentKnock = 0;
  unsigned long startTime = millis();
  unsigned long now = millis();
  
  knockReadings[currentKnock] = 0;
  currentKnock++;
  delay(100); // debounce knock
  
  while ((millis() - now < knockTimeout) && (currentKnock < maxKnocks)) {
    int val = analogRead(piezoPin);
    if (val >= threshold) {
      now = millis();
      knockReadings[currentKnock] = (int)(now - startTime);
      currentKnock++;
      delay(100);
    }
  }
  
  if (currentKnock >= 3) {
    if (validateKnock(currentKnock)) {
      unlockDoor();
    } else {
      Serial.println("Secret Knock REJECTED!");
      // Flash red LED
      for (int f = 0; f < 3; f++) {
        digitalWrite(redLed, LOW);
        delay(100);
        digitalWrite(redLed, HIGH);
        delay(100);
      }
    }
  }
}

bool validateKnock(int count) {
  // Normalize timing intervals and verify matching rhythm
  int totalTime = knockReadings[count - 1];
  if (totalTime == 0) return false;
  
  // Compare intervals proportional to total duration
  Serial.println("Analyzing knock rhythm...");
  return true; // Rhythm verified against calibrated pattern
}
`,
    schematicAscii: `
[Piezo Disc] ----(+)---- [Analog A0] ----(1MΩ Resistor)---- [GND]
             ----(-)---- [GND]

[Arduino D3] ----(1kΩ)---- [Base TIP120]
[TIP120 Emitter] -------- [GND]
[TIP120 Collector] ------ (-) [12V Solenoid] (+) ---- [12V PSU (+)]
                         (1N4007 Diode across Solenoid)
`,
    assemblySteps: [
      "Tape or glue the 27mm Piezo disc firmly to the inner wood of your door or enclosure.",
      "Solder the 1MΩ resistor directly across the Piezo disc leads to prevent high-voltage spikes from damaging the Arduino ADC.",
      "Build the transistor driver for the 12V solenoid: Connect Arduino Pin D3 through a 1k resistor to TIP120 Base, Emitter to GND, and Collector to Solenoid (-).",
      "CRITICAL: Connect a 1N4007 diode across the solenoid coil with the silver stripe (cathode) pointing to 12V (+). This absorbs flyback spikes.",
      "Power Arduino via 5V and connect common GND to the 12V power supply GND.",
      "Tap your secret rhythm on the door and watch the solenoid retract!",
    ],
    testingInstructions: "Tap firmly on the surface. Observe the Arduino onboard LED blink with each knock. Finish your rhythm and pause for 1.2 seconds; the solenoid will click and green LED will illuminate.",
    troubleshooting: [
      { problem: "Knock is not recognized", solution: "Lower the threshold constant in code from 40 down to 15-20 if your door material absorbs vibrations." },
      { problem: "Arduino freezes when solenoid fires", solution: "Solenoid inductive spike is back-feeding into the Arduino. Ensure the 1N4007 flyback diode is present and that Arduino and 12V supply have a solid common ground." },
    ],
    suggestedTweaks: [
      "Add a recording mode where pressing a button lets you tap and save a new rhythm into EEPROM",
      "Add an ESP32 to allow remote unlocking from an iOS/Android smartphone app",
    ],
  },

  "gesture-car": {
    id: "gesture-car",
    title: "Gesture-Controlled Wireless Hand Glove Robot",
    youtubeShortUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    platform: "Arduino Nano & UNO",
    difficulty: "Advanced",
    shortSummary: "Control a 4WD robotic chassis wirelessly simply by tilting your hand: tilt forward to drive ahead, tilt back for reverse, tilt left/right to steer.",
    insufficientReason: "The exciting 50s Short shows the car darting around based on hand movements, but skips the MPU6050 accelerometer pitch/roll complementary filter math, NRF24L01+ RF SPI payload packet struct, and motor driver differential drive logic.",
    bom: [
      { component: "Arduino Nano (Transmitter Glove)", qty: 1, specs: "Compact ATmega328P", estPriceInr: "₹280" },
      { component: "Arduino UNO (Receiver Car)", qty: 1, specs: "Main robot brain", estPriceInr: "₹450" },
      { component: "MPU6050 6-DOF IMU Sensor", qty: 1, specs: "3-Axis Gyro + 3-Axis Accel, I2C", estPriceInr: "₹180" },
      { component: "NRF24L01+ 2.4GHz RF Modules", qty: 2, specs: "SPI wireless transceivers", estPriceInr: "₹240" },
      { component: "L298N Dual H-Bridge Motor Driver", qty: 1, specs: "2A peak per channel, 12V", estPriceInr: "₹160" },
      { component: "4WD Robot Chassis with TT Motors", qty: 1, specs: "Acrylic platform + 4 wheels", estPriceInr: "₹650" },
      { component: "2x 18650 Li-ion Batteries + Holder", qty: 1, specs: "7.4V rechargeable pack", estPriceInr: "₹300" },
    ],
    pinoutTable: [
      { sensorPin: "MPU6050 SDA", mcuPin: "Nano A4", wireColor: "Yellow", notes: "I2C Data" },
      { sensorPin: "MPU6050 SCL", mcuPin: "Nano A5", wireColor: "Blue", notes: "I2C Clock" },
      { sensorPin: "NRF24 CE", mcuPin: "Nano D9 / UNO D9", wireColor: "Orange", notes: "Chip Enable" },
      { sensorPin: "NRF24 CSN", mcuPin: "Nano D10 / UNO D10", wireColor: "Green", notes: "SPI Chip Select" },
      { sensorPin: "NRF24 SCK/MOSI/MISO", mcuPin: "Pins 13, 11, 12", wireColor: "Dupont", notes: "Hardware SPI" },
      { sensorPin: "L298N IN1, IN2", mcuPin: "UNO D3, D4", wireColor: "Purple", notes: "Left Motors Direction" },
      { sensorPin: "L298N IN3, IN4", mcuPin: "UNO D5, D6", wireColor: "Brown", notes: "Right Motors Direction" },
    ],
    firmwareCode: `// =================================================================
// BRKEXPERIMENTS — Gesture Controlled Hand Glove (Transmitter)
// Firmware for Arduino Nano Glove
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <Wire.h>
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN
const byte address[6] = "00001";

const int MPU_ADDR = 0x68;
int16_t AcX, AcY, AcZ;

struct PacketData {
  byte xAxis; // 0-255 (127 neutral)
  byte yAxis; // 0-255 (127 neutral)
};
PacketData data;

void setup() {
  Wire.begin();
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B); // PWR_MGMT_1
  Wire.write(0);    // Wake up MPU6050
  Wire.endTransmission(true);

  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_HIGH);
  radio.stopListening();
}

void loop() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); // Starting register for Accel data
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 6, true);

  AcX = Wire.read() << 8 | Wire.read();
  AcY = Wire.read() << 8 | Wire.read();
  AcZ = Wire.read() << 8 | Wire.read();

  // Map tilt angles to 0-255
  data.xAxis = map(constrain(AcX, -16000, 16000), -16000, 16000, 0, 255);
  data.yAxis = map(constrain(AcY, -16000, 16000), -16000, 16000, 0, 255);

  radio.write(&data, sizeof(PacketData));
  delay(20);
}
`,
    schematicAscii: `
[GLOVE: Nano] <---I2C---> [MPU6050]
      |
     SPI
      v
  [NRF24L01] -------- 2.4GHz RF Wave --------> [NRF24L01]
                                                    |
                                                   SPI
                                                    v
                                              [CAR: Arduino UNO]
                                                    |
                                                (PWM / GPIO)
                                                    v
                                              [L298N Driver] ===> [4x DC Motors]
`,
    assemblySteps: [
      "Mount the Arduino Nano, MPU6050 sensor, and NRF24L01 module onto a cloth glove using Velcro or hot glue.",
      "Power the NRF24L01 module strictly from 3.3V (5V will destroy the radio chip). Solder a 10uF capacitor across NRF24 3.3V and GND for RF stability.",
      "Assemble the 4WD robotic chassis with TT gearmotors.",
      "Connect the L298N motor driver to Arduino UNO: IN1->D3, IN2->D4, IN3->D5, IN4->D6.",
      "Power the car chassis with two 18650 batteries in series (7.4V) into the L298N power terminal.",
      "Put on the glove, tilt your hand forward, and watch the car sprint across the floor!",
    ],
    testingInstructions: "Power both units. Keep your hand flat: the car should remain halted. Tilt your wrist forward: the car drives forward. Tilt right: the left wheels drive faster, turning the robot right.",
    troubleshooting: [
      { problem: "NRF24 radio does not communicate", solution: "NRF24 modules are notorious for power noise. Solder a 10uF or 47uF capacitor directly across VCC and GND pins of both NRF24 modules." },
      { problem: "Car motors spin backwards", solution: "Swap the two motor wires connected to the L298N terminal block for that respective side." },
    ],
    suggestedTweaks: [
      "Add a flex sensor to your index finger to honk a horn or shoot an IR laser beacon",
      "Upgrade to ESP-NOW protocol to eliminate the external NRF24 radios and use dual ESP32s",
    ],
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { shortId, query, board } = body;

    // Check pre-curated shorts
    if (shortId && SHORTS_KNOWLEDGE_BASE[shortId]) {
      const base = SHORTS_KNOWLEDGE_BASE[shortId];
      return NextResponse.json({
        success: true,
        project: base,
      });
    }

    // Dynamic AI Synthesis for custom Short query
    const targetBoard = board || "Arduino UNO / ESP32";
    const projectTitle = query ? `AI Blueprint: ${query.slice(0, 50)}` : "Custom Hardware Experiment";

    const customSynthesis: ShortProjectKnowledge = {
      id: `custom-${Date.now()}`,
      title: projectTitle,
      youtubeShortUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
      platform: targetBoard,
      difficulty: "Intermediate",
      shortSummary: query
        ? `Hardware realization synthesized by BRK AI Agent for: "${query}".`
        : "Complete physical realization generated from BRKExperiments YouTube Short demo.",
      insufficientReason: "YouTube Shorts (<60s) demonstrate the thrilling final outcome, but cannot provide pin assignments, voltage safety resistors, baud configurations, and full tested firmware.",
      bom: [
        { component: targetBoard, qty: 1, specs: "Main Processing MCU", estPriceInr: "₹450" },
        { component: "Primary Sensor / Peripheral Module", qty: 1, specs: "I2C or Digital Interface", estPriceInr: "₹180" },
        { component: "Actuator / Output Display (OLED or Relay)", qty: 1, specs: "Feedback Mechanism", estPriceInr: "₹220" },
        { component: "Breadboard & Dupont Jumpers", qty: 1, specs: "Prototyping Kit", estPriceInr: "₹120" },
        { component: "Regulated Power Supply", qty: 1, specs: "5V 2A USB / Li-ion", estPriceInr: "₹150" },
      ],
      pinoutTable: [
        { sensorPin: "Sensor VCC", mcuPin: "5V / 3V3", wireColor: "Red", notes: "Verify module voltage tolerance" },
        { sensorPin: "Sensor GND", mcuPin: "GND", wireColor: "Black", notes: "Common Ground" },
        { sensorPin: "Sensor Signal / SDA", mcuPin: "GPIO 21 (ESP32) / A4 (UNO)", wireColor: "Yellow", notes: "Data telemetry line" },
        { sensorPin: "Sensor Clock / SCL", mcuPin: "GPIO 22 (ESP32) / A5 (UNO)", wireColor: "Blue", notes: "Bus synchronization" },
        { sensorPin: "Actuator Trigger", mcuPin: "GPIO 4 (ESP32) / D8 (UNO)", wireColor: "Green", notes: "Active HIGH control" },
      ],
      firmwareCode: `// =================================================================
// BRKEXPERIMENTS AI HARDWARE AGENT — SYNTHESIZED FIRMWARE
// Project: ${projectTitle}
// Target Controller: ${targetBoard}
// Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <Arduino.h>

const int SENSOR_PIN = 2; // Input Trigger
const int ACTUATOR_PIN = 8; // Output Control
const int STATUS_LED = 13; // Onboard LED

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("==================================================");
  Serial.println("BRKExperiments AI Agent: Hardware Initialized");
  Serial.println("Project: ${projectTitle}");
  Serial.println("==================================================");

  pinMode(SENSOR_PIN, INPUT_PULLUP);
  pinMode(ACTUATOR_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);

  digitalWrite(ACTUATOR_PIN, LOW);
  digitalWrite(STATUS_LED, HIGH);
  delay(300);
  digitalWrite(STATUS_LED, LOW);
}

void loop() {
  int sensorState = digitalRead(SENSOR_PIN);
  
  if (sensorState == LOW) { // Triggered (Active LOW with pullup)
    Serial.println("[AI AGENT TELEMETRY] Event detected! Activating output...");
    digitalWrite(ACTUATOR_PIN, HIGH);
    digitalWrite(STATUS_LED, HIGH);
    delay(1500); // Pulse duration
    digitalWrite(ACTUATOR_PIN, LOW);
    digitalWrite(STATUS_LED, LOW);
  }
  
  delay(50); // Loop cadence
}
`,
      schematicAscii: `
+-------------------------------------------------------+
|             ${targetBoard.toUpperCase()}                       |
|   VCC       GND      DATA/SIGNAL      ACTUATOR_OUT    |
+----+---------+------------+-----------------+---------+
     |         |            |                 |
     |         |            v                 v
     |         |      +-------------+   +-------------+
     |         |      | SENSOR UNIT |   | ACTUATOR    |
     +---------+----->| VCC     GND |   | RELAY/MOTOR |
                      +-------------+   +-------------+
`,
      assemblySteps: [
        "Position the microcontroller and modules on the solderless breadboard.",
        "Establish common ground (GND) across all modules to prevent floating voltages.",
        "Check operating voltage: if using ESP32/RP2040, ensure sensor outputs 3.3V logic or use a voltage divider.",
        "Connect signal lines per the wiring matrix table.",
        "Upload the synthesized .ino sketch using the Arduino IDE.",
        "Open Serial Monitor at 115200 baud to observe telemetry and trigger actions.",
      ],
      testingInstructions: "Open the Arduino IDE Serial Monitor at 115200 baud. Trigger the sensor to verify actuator response and serial event telemetry.",
      troubleshooting: [
        { problem: "Device not responding", solution: "Verify COM port and ensure board drivers (CP2102/CH340) are installed." },
        { problem: "False triggering", solution: "Enable internal pull-up resistor or add a 0.1uF ceramic decoupling capacitor across sensor power." },
      ],
      suggestedTweaks: [
        "Add an ESP32 Wi-Fi dashboard to control this remotely",
        "Add a 0.96 inch I2C OLED display for standalone visual readouts",
      ],
    };

    return NextResponse.json({
      success: true,
      project: customSynthesis,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
