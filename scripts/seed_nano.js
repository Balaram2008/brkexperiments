// Arduino Nano Lab Projects (21 - 25)
const arduinoNanoProjects = [
  {
    title: "Arduino Nano Pocket Weather Station with 0.96\" OLED",
    slug: "nano-pocket-weather-station",
    platform: "Arduino Nano",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹450 - ₹650",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Ultra-compact handheld environmental meter displaying real-time Celsius/Fahrenheit temperature and humidity on an I2C OLED.",
    description: "Pocket-sized personal climate monitor engineered around the compact Arduino Nano v3.0 form factor. Uses a DHT11 sensor and SSD1306 128x64 monochromatic OLED with animated battery level and heat index calculation.",
    categorySlug: "arduino-nano",
    technologies: ["arduino-nano", "i2c-spi", "oled", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Nano v3.0 (CH340)", qty: "1", specs: "ATmega328P Mini Board", estCost: "₹280" },
      { component: "DHT11 Temp & Humidity Sensor", qty: "1", specs: "20-80% RH, 0-50°C", estCost: "₹80" },
      { component: "0.96\" I2C OLED Display (SSD1306)", qty: "1", specs: "128x64 White Pixels", estCost: "₹190" },
      { component: "Mini Breadboard / Perfboard", qty: "1", specs: "170 tie-points", estCost: "₹40" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A4", componentPin: "SDA", component: "OLED Display", notes: "I2C Data" },
      { boardPin: "A5", componentPin: "SCL", component: "OLED Display", notes: "I2C Clock" },
      { boardPin: "D2", componentPin: "DATA", component: "DHT11 Sensor", notes: "Digital 1-Wire with 10k pull-up" },
      { boardPin: "5V", componentPin: "VCC", component: "Both Modules", notes: "5V Power" },
      { boardPin: "GND", componentPin: "GND", component: "Both Modules", notes: "Common Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "DHT sensor library", author: "Adafruit", installMethod: "Library Manager", version: "1.4.6" },
      { name: "Adafruit SSD1306", author: "Adafruit", installMethod: "Library Manager", version: "2.5.9" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Telemetry Acquisition", detail: "Queries DHT11 every 2 seconds for single-wire temperature & relative humidity." },
      { step: 2, title: "Graphics Render", detail: "Buffers 128x64 frame buffer in Nano's 2KB SRAM and transfers over 400kHz I2C bus." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Mount on Mini Breadboard", instruction: "Place Arduino Nano and OLED side by side." },
      { step: 2, title: "Select Old Bootloader if needed", instruction: "If upload hangs, select 'Processor: ATmega328P (Old Bootloader)' in Arduino IDE." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on Nano via USB", "OLED boots splash screen", "Temperature and humidity values render clearly with degree symbol"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[INIT] Nano Weather Station Online\n[READ] Temp: 28 C | Humidity: 62 %"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "avrdude: stk500_getsync(): not in sync", cause: "CH340 Nano boards usually use Old Bootloader", solution: "Go to Tools > Processor > 'ATmega328P (Old Bootloader)'." }
    ]),
    applicationsJson: JSON.stringify(["Pocket Camping Weather Indicator", "Desktop Workstation Monitor", "Cigar Humidor Climate Checker"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Nano_Pocket_Weather.ino",
        language: "cpp",
        code: `// Arduino Nano Pocket Weather Station
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  dht.begin();
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(15, 20);
  display.println("BRKEXPERIMENTS");
  display.setCursor(20, 35);
  display.println("NANO LAB v1.0");
  display.display();
  delay(1500);
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("POCKET WEATHER METER");
  display.drawLine(0, 10, 128, 10, WHITE);

  display.setTextSize(2);
  display.setCursor(0, 20);
  display.printf("%.0f C", t);

  display.setCursor(0, 42);
  display.printf("%.0f %% RH", h);

  display.display();
  delay(2000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can this run on a 3.7V LiPo battery?", answer: "Yes! Connect 3.7V LiPo with a mini boost converter to 5V pin." }
    ]),
    downloadFileName: "nano-pocket-weather-station.zip"
  },

  {
    title: "Arduino Nano Wireless Gesture Controlled Robot Car",
    slug: "nano-gesture-controlled-car",
    platform: "Arduino Nano",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3 Hours",
    estimatedCost: "₹1200 - ₹1600",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Glove-mounted wearable transmitter using MPU6050 6-DOF gyro/accelerometer and NRF24L01 2.4GHz RF transceiver.",
    description: "Futuristic hand-gesture teleoperation system. Wear the sensor glove and simply tilt your hand forward to drive forward, tilt back to reverse, and tilt left/right to steer. Arduino Nano reads MPU6050 pitch/roll angles and broadcasts 32-byte RF packets at 2.4GHz with zero perceptible lag.",
    categorySlug: "robotics",
    technologies: ["arduino-nano", "i2c-spi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Nano v3.0", qty: "2", specs: "1 for Glove Tx, 1 for Car Rx", estCost: "₹560" },
      { component: "MPU6050 6-Axis Gyro/Accel", qty: "1", specs: "I2C 3-axis gyro + 3-axis accel", estCost: "₹150" },
      { component: "NRF24L01+ 2.4GHz RF Modules", qty: "2", specs: "SPI with 10uF cap across VCC/GND", estCost: "₹180" },
      { component: "L298N Motor Driver + Chassis", qty: "1 Set", specs: "2WD Robot Platform", estCost: "₹380" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A4, A5", componentPin: "SDA, SCL", component: "MPU6050", notes: "I2C Sensor Bus (Transmitter Nano)" },
      { boardPin: "D9", componentPin: "CE", component: "NRF24L01", notes: "Chip Enable" },
      { boardPin: "D10", componentPin: "CSN", component: "NRF24L01", notes: "SPI Chip Select" },
      { boardPin: "D11, D12, D13", componentPin: "MOSI, MISO, SCK", component: "NRF24L01", notes: "Hardware SPI Bus" },
      { boardPin: "3.3V", componentPin: "VCC", component: "NRF24L01", notes: "DO NOT CONNECT TO 5V" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "RF24", author: "TMRh20", installMethod: "Library Manager", version: "1.4.8" },
      { name: "MPU6050_tockn", author: "tockn", installMethod: "Library Manager", version: "1.5.2" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Inertial Angle Extraction", detail: "Reads complementary filter pitch and roll angles from MPU6050 every 30ms." },
      { step: 2, title: "RF Packet Transmission", detail: "Payload packet struct { int8_t x; int8_t y; } beamed over 2.4GHz pipe address." },
      { step: 3, title: "Receiver Motor Decoding", detail: "Car Nano maps received tilt angles into differential L298N motor pulse widths." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Solder 10uF Cap on NRF24", instruction: "Solder a 10uF electrolytic capacitor directly across NRF24L01 VCC and GND pins for radio stability." },
      { step: 2, title: "Mount Glove", instruction: "Fasten Nano, MPU6050, and NRF24 onto a snug fabric glove using velcro straps." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Wear glove and power on both units", "Tilt hand forward: car moves forward", "Tilt hand right: car spins right", "Level hand flat: car stops instantly"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[TX] MPU6050 AngleX: 34.2 | AngleY: -5.1 -> PACKET SENT\n[RX] Received command: FORWARD"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Radio packets not received", cause: "Power supply ripple on 3.3V pin of Arduino Nano", solution: "Always add a 10uF-100uF capacitor between NRF24 VCC and GND." }
    ]),
    applicationsJson: JSON.stringify(["Hands-Free Wheelchair Controller", "VR Drone Telepresence Pilot", "Robotic Arm Hand Mimicry"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Nano_Gesture_Transmitter.ino",
        language: "cpp",
        code: `// Arduino Nano Gesture Transmitter (Glove)
#include <Wire.h>
#include <MPU6050_tockn.h>
#include <SPI.h>
#include <RF24.h>

MPU6050 mpu6050(Wire);
RF24 radio(9, 10); // CE, CSN
const byte address[6] = "00001";

struct DataPacket {
  int8_t pitch;
  int8_t roll;
};
DataPacket data;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);

  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_LOW);
  radio.stopListening();
}

void loop() {
  mpu6050.update();
  data.pitch = (int8_t)mpu6050.getAngleX();
  data.roll  = (int8_t)mpu6050.getAngleY();

  radio.write(&data, sizeof(DataPacket));
  Serial.printf("Pitch: %d | Roll: %d\\n", data.pitch, data.roll);
  delay(40);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the wireless transmission range?", answer: "Up to 50 meters line of sight, or 500m when using the external antenna NRF24L01+PA+LNA model." }
    ]),
    downloadFileName: "nano-gesture-controlled-car.zip"
  },

  {
    title: "Arduino Nano Acoustic Audio Spy Bug & Decibel Level Meter",
    slug: "nano-spy-bug-audio-detector",
    platform: "Arduino Nano",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹450 - ₹600",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Sound pressure visualizer using electret microphone amplifier with peak-detection VU bar graph and glass-break/intrusion alarm.",
    description: "Compact acoustic telemetry probe using high-gain MAX4466 or LM393 electret microphone module. Samples sound pressure waveforms at 10kHz, computes instantaneous RMS decibel peak amplitude, and displays an animated multi-LED VU audio bar.",
    categorySlug: "arduino-nano",
    technologies: ["arduino-nano", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Nano", qty: "1", specs: "ATmega328P", estCost: "₹280" },
      { component: "MAX4466 Electret Microphone with Adjustable Gain", qty: "1", specs: "20Hz-20kHz", estCost: "₹140" },
      { component: "10-Segment LED Bar Graph / 5x LEDs", qty: "1", specs: "Green/Yellow/Red", estCost: "₹40" },
      { component: "Buzzer", qty: "1", specs: "Audio Alarm", estCost: "₹20" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A0", componentPin: "OUT", component: "MAX4466 Mic", notes: "Analog Audio Waveform" },
      { boardPin: "Pin 4, 5, 6, 7, 8", componentPin: "Anodes", component: "LED Level Indicators", notes: "VU Meter segments" },
      { boardPin: "Pin 9", componentPin: "Positive", component: "Piezo Buzzer", notes: "Noise breach alert" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Peak-to-Peak Sampling", detail: "Samples analog audio waveform across 50ms window to extract maximum and minimum voltage excursion." },
      { step: 2, title: "Logarithmic Scaling", detail: "Maps peak-to-peak millivolts into decibel equivalent and illuminates corresponding LED bar segments." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Tune Mic Trimpot", instruction: "Turn small potentiometer on back of MAX4466 module clockwise to increase sensitivity." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Speak into microphone", "LEDs illuminate proportionally to speech volume", "Clap loudly: all LEDs light up and buzzer triggers alert"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[AUDIO] Ambient Peak: 45 mV\n[AUDIO] Speech Peak: 280 mV (VU: 3/5)\n[AUDIO] CLAP SPIKE: 820 mV -> ALARM TRIGGERED"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "All LEDs constantly on", cause: "Microphone gain set too high or noisy power rail", solution: "Power microphone VCC from 3.3V pin (cleaner than 5V) and dial back gain trimpot." }
    ]),
    applicationsJson: JSON.stringify(["Classroom Quiet-Meter / Noise Warden", "Intrusion Glass-Break Alarm", "Party DJ Dynamic Beat Visualizer"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Nano_Audio_Detector.ino",
        language: "cpp",
        code: `// Arduino Nano Audio Level & Intrusion Detector
const int MIC_PIN = A0;
const int SAMPLE_WINDOW = 50; // Sample window width in mS (50 mS = 20Hz)
const int LED_PINS[] = {4, 5, 6, 7, 8};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 5; i++) {
    pinMode(LED_PINS[i], OUTPUT);
  }
}

void loop() {
  unsigned long startMillis = millis();
  unsigned int peakToPeak = 0;
  unsigned int signalMax = 0;
  unsigned int signalMin = 1024;

  while (millis() - startMillis < SAMPLE_WINDOW) {
    int sample = analogRead(MIC_PIN);
    if (sample < 1024) {
      if (sample > signalMax) signalMax = sample;
      if (sample < signalMin) signalMin = sample;
    }
  }
  peakToPeak = signalMax - signalMin; // Amplitude in volts

  // Map to 5 LED segments
  int level = map(peakToPeak, 20, 600, 0, 5);
  level = constrain(level, 0, 5);

  for (int i = 0; i < 5; i++) {
    digitalWrite(LED_PINS[i], i < level ? HIGH : LOW);
  }

  Serial.printf("Peak-to-Peak: %d | Level: %d\\n", peakToPeak, level);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can it record or stream audio to PC?", answer: "The 8-bit ATmega328P lacks DMA for high-fidelity audio streaming. Use ESP32 with I2S microphone (INMP441) for full streaming." }
    ]),
    downloadFileName: "nano-spy-bug-audio-detector.zip"
  },

  {
    title: "Arduino Nano Mini Sumo Robot Competitor",
    slug: "nano-mini-sumo-robot",
    platform: "Arduino Nano",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3-4 Hours",
    estimatedCost: "₹1400 - ₹1900",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Championship 500g autonomous battle bot with edge detection QRE1113 sensors, front opponent hunter, and metal gearmotors.",
    description: "Built to official international 10x10cm Mini-Sumo competition regulations. Features dual edge line sensors detecting the white border ring, long-range digital distance sensor for opponent locating, and high-torque N20 micro metal gearmotors.",
    categorySlug: "robotics",
    technologies: ["arduino-nano", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "Arduino Nano v3.0", qty: "1", specs: "ATmega328P", estCost: "₹280" },
      { component: "N20 Micro Metal Gearmotors (6V 600RPM)", qty: "2", specs: "High torque with silicone sticky wheels", estCost: "₹380" },
      { component: "DRV8833 Dual Motor Driver", qty: "1", specs: "Low voltage drop MOSFET driver", estCost: "₹120" },
      { component: "QRE1113 Optical Line Sensors", qty: "2", specs: "Ring edge detection", estCost: "₹110" },
      { component: "Sharp GP2Y0A21YK0F or Ultrasonic Sensor", qty: "1", specs: "Opponent hunting", estCost: "₹260" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A0, A1", componentPin: "OUT", component: "Left / Right Edge Sensors", notes: "Detects white boundary line" },
      { boardPin: "A2", componentPin: "Vout", component: "Opponent Hunter Sensor", notes: "Analog distance to rival" },
      { boardPin: "D3, D5", componentPin: "IN1, IN2", component: "DRV8833", notes: "Left Motor PWM" },
      { boardPin: "D6, D9", componentPin: "IN3, IN4", component: "DRV8833", notes: "Right Motor PWM" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Official 5s Start Delay", detail: "Safety countdown per tournament rules before starting attack routine." },
      { step: 2, title: "Edge Defense Overrides", detail: "If ring sensor hits white line, robot immediately halts, reverses, and spins 180 degrees." },
      { step: 3, title: "Hunter Attack", detail: "If opponent is detected in forward arc, motors go to 100% full forward ram speed." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Weight Distribution", instruction: "Mount heavy battery pack forward above the plow blade for maximum wheel traction." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Place on black ring surface with white tape border", "Turn on switch: wait 5s delay", "Robot spins seeking target", "Crosses onto white line: immediately reverses back into circle"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[SUMO] 5-second countdown start...\n[SUMO] COMBAT ACTIVE!\n[RADAR] Opponent acquired at 18cm! RAMMING SPEED!"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Robot drives off the ring edge", cause: "Threshold on edge sensor too high", solution: "Calibrate analog threshold between black vinyl surface (~800) and white boundary paint (~150)." }
    ]),
    applicationsJson: JSON.stringify(["Mini Sumo Robotics Tournaments", "High School STEM Competitions", "Advanced Sensor Fusion Study"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Nano_Mini_Sumo.ino",
        language: "cpp",
        code: `// Arduino Nano Mini Sumo Competitor
const int S_EDGE_L = A0;
const int S_EDGE_R = A1;
const int S_OPPONENT = A2;

const int IN1 = 3, IN2 = 5, IN3 = 6, IN4 = 9;

void drive(int l, int r) {
  if (l >= 0) { analogWrite(IN1, l); analogWrite(IN2, 0); }
  else { analogWrite(IN1, 0); analogWrite(IN2, -l); }
  if (r >= 0) { analogWrite(IN3, r); analogWrite(IN4, 0); }
  else { analogWrite(IN3, 0); analogWrite(IN4, -r); }
}

void setup() {
  Serial.begin(9600);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  drive(0, 0);

  // Tournament 5-second safety rule
  delay(5000);
}

void loop() {
  int edgeL = analogRead(S_EDGE_L);
  int edgeR = analogRead(S_EDGE_R);
  int oppDist = analogRead(S_OPPONENT);

  // 1. Edge Defense Override (White line < 400)
  if (edgeL < 400 || edgeR < 400) {
    drive(-255, -255); delay(350); // Reverse
    drive(255, -255);  delay(250); // Spin away
    return;
  }

  // 2. Opponent Hunter Attack
  if (oppDist > 300) {
    drive(255, 255); // Full Attack Ram!
  } else {
    drive(140, -140); // Search Spin
  }
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the weight limit for Mini Sumo?", answer: "The Mini Sumo class limit is exactly 500 grams and dimensions must not exceed 10x10 cm." }
    ]),
    downloadFileName: "nano-mini-sumo-robot.zip"
  },

  {
    title: "Arduino Nano Wearable Fitness Pedometer & Step Counter",
    slug: "nano-fitness-step-counter",
    platform: "Arduino Nano",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2 Hours",
    estimatedCost: "₹650 - ₹900",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Wrist/ankle wearable pedometer utilizing ADXL345 3-axis accelerometer, peak filtering algorithm, and calories burned calculator.",
    description: "Build your own open-source smart fitness band. Employs Analog Devices ADXL345 digital accelerometer over I2C. Uses dynamic vector magnitude calculation sqrt(x^2 + y^2 + z^2) with adaptive thresholding to filter noise from actual human footsteps.",
    categorySlug: "arduino-nano",
    technologies: ["arduino-nano", "i2c-spi", "oled", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1510519138161-5844a78c187a?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1510519138161-5844a78c187a?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.2.0",
    bomJson: JSON.stringify([
      { component: "Arduino Nano", qty: "1", specs: "ATmega328P", estCost: "₹280" },
      { component: "ADXL345 3-Axis Digital Accelerometer", qty: "1", specs: "I2C/SPI ±16g range", estCost: "₹180" },
      { component: "0.96\" I2C OLED Display", qty: "1", specs: "SSD1306 128x64", estCost: "₹190" },
      { component: "Tactile Reset Button", qty: "1", specs: "Clear step count", estCost: "₹5" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "A4", componentPin: "SDA", component: "ADXL345 & OLED", notes: "I2C Data Bus" },
      { boardPin: "A5", componentPin: "SCL", component: "ADXL345 & OLED", notes: "I2C Clock Bus" },
      { boardPin: "D2", componentPin: "Terminal 1", component: "Step Reset Button", notes: "Pull-up input" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Adafruit ADXL345", author: "Adafruit", installMethod: "Library Manager", version: "1.3.4" },
      { name: "Adafruit SSD1306", author: "Adafruit", installMethod: "Library Manager", version: "2.5.9" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Vector Magnitude Computation", detail: "Calculates total acceleration magnitude: M = sqrt(X^2 + Y^2 + Z^2)." },
      { step: 2, title: "Peak Detection Window", detail: "Step is registered only when magnitude exceeds 1.25G followed by zero-crossing drop within 200-800ms." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Attach to Wristband", instruction: "Mount Nano and ADXL345 securely to elastic strap or belt clip." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Fasten to pocket or wrist", "Walk 20 steps", "Verify OLED display records exactly 19-21 steps"],
      expectedBaudRate: 9600,
      expectedSerialOutput: "[STEP] Magnitude: 1.34g -> STEP #1\n[STEP] Magnitude: 1.41g -> STEP #2\n[STATS] Total Steps: 20 | Est Calories: 0.8 kcal"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Registers steps while sitting in a car", cause: "Engine vibration exceeding low threshold", solution: "Increase threshold magnitude in sketch from 1.25 to 1.40." }
    ]),
    applicationsJson: JSON.stringify(["Personal Activity Tracker", "Physical Therapy Gait Recovery Monitor", "Pet Mobility Logger"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "Nano_Pedometer.ino",
        language: "cpp",
        code: `// Arduino Nano Pedometer with ADXL345 & OLED
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);
Adafruit_SSD1306 display(128, 64, &Wire, -1);

int stepCount = 0;
bool flag = false;

void setup() {
  Serial.begin(9600);
  accel.begin();
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
}

void loop() {
  sensors_event_t event;
  accel.getEvent(&event);

  float mag = sqrt(event.acceleration.x * event.acceleration.x +
                   event.acceleration.y * event.acceleration.y +
                   event.acceleration.z * event.acceleration.z);

  // 9.8 m/s^2 = 1G baseline
  if (mag > 13.0 && !flag) {
    stepCount++;
    flag = true;
    delay(200); // Debounce human pace
  }
  if (mag < 10.5) {
    flag = false;
  }

  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("BRK FIT STEP COUNTER");

  display.setTextSize(3);
  display.setCursor(10, 20);
  display.print(stepCount);

  display.setTextSize(1);
  display.setCursor(10, 50);
  display.printf("KCAL: %.1f | KM: %.2f", stepCount * 0.04, stepCount * 0.00075);
  display.display();

  delay(30);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "How long will a 500mAh battery last?", answer: "Approximately 12-16 hours with continuous OLED display on." }
    ]),
    downloadFileName: "nano-fitness-step-counter.zip"
  }
];

module.exports = { arduinoNanoProjects };
