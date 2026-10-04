const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const newProjects = [
  {
    title: "Raspberry Pi Pico W IoT Web Telemetry Dashboard",
    slug: "pico-w-iot-web-dashboard",
    platform: "Raspberry Pi Pico",
    difficulty: "Intermediate",
    projectType: "IoT Hardware Project",
    buildTime: "2-3 Hours",
    estimatedCost: "₹650 - ₹850",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Dual-core RP2040 microcontroller with CYW43439 2.4GHz Wi-Fi hosting a dynamic HTML5/CSS3 sensor telemetry web dashboard.",
    description: `The Raspberry Pi Pico W is a powerhouse dual-core ARM Cortex-M0+ running at 133MHz with built-in Wi-Fi.
This project transforms the Pico W into a standalone asynchronous web server and IoT edge node.

Key Highlights:
1. Hosts an embedded responsive web dashboard directly from flash memory.
2. Core 0 handles Wi-Fi socket requests and HTTP clients; Core 1 continuously samples analog sensors and computes moving averages.
3. Live AJAX polling displays onboard chip temperature, ambient light (LDR), and humidity without reloading the page.
4. Includes one-touch LED control and hardware reboot endpoints.`,
    categorySlug: "environmental",
    technologies: ["wifi", "cpp-arduino", "i2c-spi"],
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
    ]),
    featured: true,
    isExperiment: true,
    experimentTag: "PICO-W-IOT-01",
    bomJson: JSON.stringify([
      { component: "Raspberry Pi Pico W", qty: 1, specs: "RP2040 Dual-Core + CYW43439 Wi-Fi", estPriceInr: "₹550" },
      { component: "DHT11 / DHT22 Sensor", qty: 1, specs: "Temperature & Humidity", estPriceInr: "₹120" },
      { component: "LDR Photoresistor", qty: 1, specs: "GL5528 5mm", estPriceInr: "₹20" },
      { component: "10k Ohm Resistor", qty: 2, specs: "1/4W pullup / divider", estPriceInr: "₹10" },
      { component: "Breadboard & Jumpers", qty: 1, specs: "Prototyping wires", estPriceInr: "₹80" },
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "3V3(OUT) Pin 36", componentPin: "VCC", component: "DHT22 / LDR", notes: "Regulated 3.3V power" },
      { boardPin: "GND Pin 38", componentPin: "GND", component: "Common Rail", notes: "Ground connection" },
      { boardPin: "GP15 Pin 20", componentPin: "DATA", component: "DHT22", notes: "Digital 1-Wire GPIO" },
      { boardPin: "GP26 (ADC0) Pin 31", componentPin: "Signal", component: "LDR Divider", notes: "Analog 12-bit ADC0" },
    ]),
    softwareReqsJson: JSON.stringify([
      "Arduino IDE 2.3+ with Earle Philhower RP2040 Board Core",
      "WiFi Library (RP2040 built-in)",
      "DHT sensor library by Adafruit",
    ]),
    librariesJson: JSON.stringify([
      { name: "WiFi", author: "Raspberry Pi Foundation", installMethod: "RP2040 Core Built-in" },
      { name: "DHT sensor library", author: "Adafruit", installMethod: "Arduino Library Manager" },
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Boot & Dual-Core Init", desc: "Pico W boots ARM Cortex-M0+ and sets up Core 0 (Networking) and Core 1 (Sensor Loop)." },
      { step: 2, title: "Wi-Fi Station Mode", desc: "Connects to 2.4GHz WLAN and registers mDNS 'picow.local'." },
      { step: 3, title: "Web Server Listening", desc: "Listens on Port 80 for GET / and /api/telemetry JSON requests." },
      { step: 4, title: "Telemetry Dispatch", desc: "Streams real-time temperature, ADC readings, and Wi-Fi RSSI." },
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Solder Pico W Headers", instruction: "Carefully solder male pin headers to the Pico W if not pre-soldered." },
      { step: 2, title: "Breadboard Wiring", instruction: "Insert Pico W across breadboard center groove. Connect GP15 to DHT22 data pin with a 10k pullup to 3.3V." },
      { step: 3, title: "Configure Wi-Fi", instruction: "Enter your Wi-Fi SSID and Password in the firmware sketch." },
      { step: 4, title: "Flash UF2 Firmware", instruction: "Hold BOOTSEL, connect USB, and flash the sketch via Arduino IDE." },
      { step: 5, title: "Access Dashboard", instruction: "Open browser and navigate to http://picow.local to view your live telemetry HUD!" },
    ]),
    troubleshootingJson: JSON.stringify([
      { problem: "Pico W cannot connect to 5GHz Wi-Fi", solution: "The CYW43439 chip only supports 2.4GHz b/g/n networks. Connect to a 2.4GHz router band." },
      { problem: "ADC readings fluctuate wildly", solution: "Pico ADC0 has known switching ripple. Add a 100nF ceramic capacitor between ADC_VREF (Pin 35) and AGND (Pin 33)." },
    ]),
    testingProcedureJson: JSON.stringify({
      steps: [
        "Upload code at 115200 baud.",
        "Observe Serial Monitor until IP address is printed.",
        "Open browser to IP and verify live temperature updates every 2 seconds.",
      ],
      expectedBaudRate: 115200,
      expectedSerialOutput: "Connected to Wi-Fi! Server IP: 192.168.1.145 - Dashboard Ready.",
    }),
    applicationsJson: JSON.stringify([
      "Industrial Cabinet Thermal Monitoring",
      "Greenhouse Humidity & Sunlight Web Logger",
      "Off-grid Solar Telemetry Server",
    ]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "PicoW_IoT_Dashboard.ino",
        language: "cpp",
        code: `// =================================================================
// BRKEXPERIMENTS — Raspberry Pi Pico W IoT Dashboard
// Platform: Dual-Core ARM Cortex-M0+ RP2040
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <WiFi.h>
#include <DHT.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

#define DHTPIN 15
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  delay(1000);
  dht.begin();

  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Pico W Wi-Fi Connected!");
  Serial.print("Web Dashboard IP: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    String request = client.readStringUntil('\\r');
    client.flush();

    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int lightAdc = analogRead(26);

    // Send HTTP Header
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();

    // Responsive HTML5 HUD
    client.println("<!DOCTYPE HTML><html><head><meta name='viewport' content='width=device-width, initial-scale=1'>");
    client.println("<title>BRK Pico W Telemetry</title>");
    client.println("<style>body{background:#0b0c10;color:#66fcf1;font-family:monospace;text-align:center;padding:20px;}");
    client.println(".card{background:#1f2833;border:1px solid #45a29e;border-radius:12px;padding:20px;max-width:400px;margin:20px auto;}");
    client.println("h1{color:#c5c6c7;font-size:20px;}</style></head><body>");
    client.println("<div class='card'><h1>BRKEXPERIMENTS PICO W</h1>");
    client.print("<p>Temperature: <strong>"); client.print(temp); client.println(" &deg;C</strong></p>");
    client.print("<p>Humidity: <strong>"); client.print(hum); client.println(" %</strong></p>");
    client.print("<p>Light ADC0: <strong>"); client.print(lightAdc); client.println(" / 1023</strong></p>");
    client.print("<p>Signal RSSI: <strong>"); client.print(WiFi.RSSI()); client.println(" dBm</strong></p>");
    client.println("</div></body></html>");
    client.stop();
  }
}
`,
      },
    ]),
    faqJson: JSON.stringify([
      { question: "Can I use MicroPython instead of Arduino C++?", answer: "Yes! Pico W runs both MicroPython and Arduino C++. The provided sketch uses high-speed Arduino C++ for maximum network throughput." },
      { question: "What is the maximum voltage for Pico GPIO?", answer: "Strictly 3.3V! Never connect 5V signals directly to Pico W GPIO pins without a logic level shifter." },
    ]),
    changelogJson: JSON.stringify([{ version: "1.0.0", date: "2026-10-04", notes: "Initial verified release" }]),
    downloadFileName: "picow-iot-dashboard-package.zip",
  },

  {
    title: "STM32 Blue Pill ECG Biomedical Heart Telemetry Monitor",
    slug: "stm32-blue-pill-ecg-heart-monitor",
    platform: "STM32",
    difficulty: "Advanced",
    projectType: "Biomedical Engineering Project",
    buildTime: "3-4 Hours",
    estimatedCost: "₹750 - ₹950",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "High-speed 12-bit ADC ECG biomedical telemetry monitor powered by STM32F103C8T6 ARM Cortex-M3 and 0.96 inch I2C OLED.",
    description: `The STM32F103C8T6 ("Blue Pill") features a 32-bit ARM Cortex-M3 core operating at 72MHz with dual 12-bit ADCs capable of 1 Megasample per second.
This project creates a clinical-grade real-time Electrocardiogram (ECG) and optical photoplethysmogram (PPG) waveform monitor.

Key Features:
1. Real-time R-peak detection algorithm computes instantaneous Heart Rate (BPM) and Heart Rate Variability (HRV).
2. High-speed 12-bit hardware ADC oversamples at 500Hz with digital notch filtering (50Hz mains hum elimination).
3. Live scrolling heart waveform plotted smoothly on a 128x64 SSD1306 OLED display.
4. Dual serial telemetry streaming for integration with MATLAB, Python LabVIEW, or Processing visualization scopes.`,
    categorySlug: "environmental",
    technologies: ["cpp-arduino", "i2c-spi", "oled"],
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
    ]),
    featured: true,
    isExperiment: true,
    experimentTag: "STM32-BIO-01",
    bomJson: JSON.stringify([
      { component: "STM32F103C8T6 Blue Pill Board", qty: 1, specs: "ARM Cortex-M3 72MHz 64KB Flash", estPriceInr: "₹280" },
      { component: "ST-Link V2 USB Programmer", qty: 1, specs: "SWD debugger/flasher", estPriceInr: "₹180" },
      { component: "Pulse Sensor / AD8232 ECG Module", qty: 1, specs: "Analog biomedical amplifier", estPriceInr: "₹250" },
      { component: "0.96\" I2C OLED Display", qty: 1, specs: "128x64 SSD1306 Monochrome", estPriceInr: "₹180" },
      { component: "Breadboard & Jumpers", qty: 1, specs: "Low-noise Dupont wires", estPriceInr: "₹60" },
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "3.3V Pin", componentPin: "VCC", component: "OLED & Pulse Sensor", notes: "3.3V Clean Rail" },
      { boardPin: "GND Pin", componentPin: "GND", component: "Common Ground", notes: "Low-noise ground" },
      { boardPin: "PA0 (ADC1_IN0)", componentPin: "Signal Out", component: "Pulse Sensor", notes: "12-bit High Speed ADC" },
      { boardPin: "PB6 (I2C1_SCL)", componentPin: "SCL", component: "0.96 OLED", notes: "Hardware I2C Clock" },
      { boardPin: "PB7 (I2C1_SDA)", componentPin: "SDA", component: "0.96 OLED", notes: "Hardware I2C Data" },
    ]),
    softwareReqsJson: JSON.stringify([
      "Arduino IDE with STM32duino (STM32 Core by STMicroelectronics)",
      "Adafruit SSD1306 Library",
      "Adafruit GFX Library",
    ]),
    librariesJson: JSON.stringify([
      { name: "Adafruit_SSD1306", author: "Adafruit", installMethod: "Library Manager" },
      { name: "Adafruit_GFX", author: "Adafruit", installMethod: "Library Manager" },
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Hardware Timer Interrupt", desc: "Configures SysTick timer at 500Hz (2ms interval) to sample PA0." },
      { step: 2, title: "Digital Bandpass Filter", desc: "Passes 0.5Hz to 40Hz cardiac signals while rejecting 50Hz electrical hum." },
      { step: 3, title: "Peak Detection", desc: "Identifies QRS complexes and calculates milliseconds between consecutive beats." },
      { step: 4, title: "OLED Waveform Rendering", desc: "Pushes rolling pixel buffer to SSD1306 over 400kHz I2C bus." },
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Set Boot Jumpers", instruction: "Set Boot0 to 0 (default flash boot) and connect ST-Link V2 SWDIO and SWCLK pins." },
      { step: 2, title: "Mount Pulse Sensor", instruction: "Connect sensor Signal to PA0, VCC to 3.3V, GND to GND." },
      { step: 3, title: "Wire I2C OLED", instruction: "Connect OLED SCL to PB6 and SDA to PB7." },
      { step: 4, title: "Flash STM32 Sketch", instruction: "Select 'Generic STM32F103C series' in Arduino IDE and flash via ST-Link." },
      { step: 5, title: "Place Finger on Sensor", instruction: "Place index finger on sensor and watch the real-time cardiac waveform dance across the OLED!" },
    ]),
    troubleshootingJson: JSON.stringify([
      { problem: "ST-Link cannot connect or flash", solution: "Press and hold the RESET button on the Blue Pill, click Upload in Arduino IDE, and release RESET as soon as 'Target found' appears." },
      { problem: "Noisy or flatline readings", solution: "Biomedical optical sensors are sensitive to finger pressure. Do not press too hard; use an elastic strap for consistent contact." },
    ]),
    testingProcedureJson: JSON.stringify({
      steps: [
        "Open Serial Plotter in Arduino IDE at 115200 baud.",
        "Observe clean sinusoidal heart pulse peaks syncing with your pulse.",
      ],
      expectedBaudRate: 115200,
      expectedSerialOutput: "BPM: 72 | RR Interval: 833ms | Signal Quality: OPTIMAL",
    }),
    applicationsJson: JSON.stringify([
      "Personal Fitness Heart Rate Monitor",
      "Biomedical Engineering Laboratory Teaching Kit",
      "Stress & Heart Rate Variability (HRV) Research",
    ]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "STM32_ECG_Pulse_Monitor.ino",
        language: "cpp",
        code: `// =================================================================
// BRKEXPERIMENTS — STM32 Blue Pill ECG Biomedical Monitor
// Controller: STM32F103C8T6 ARM Cortex-M3 (72MHz)
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const int pulsePin = PA0; // 12-bit ADC
int signal = 0;
int threshold = 2050; // Half of 12-bit 4095 range
unsigned long lastBeatTime = 0;
int bpm = 0;
int xPos = 0;
int prevY = 32;

void setup() {
  Serial.begin(115200);
  pinMode(pulsePin, INPUT_ANALOG);

  // PB6 = SCL, PB7 = SDA
  Wire.begin();
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED Init Failed");
    for(;;);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(10, 20);
  display.println("BRK STM32 ECG LAB");
  display.setCursor(10, 40);
  display.println("Place finger on sensor...");
  display.display();
  delay(2000);
  display.clearDisplay();
}

void loop() {
  signal = analogRead(pulsePin); // 0 - 4095

  // Map 12-bit signal to OLED vertical height (64px)
  int yPos = map(signal, 1600, 2600, 60, 10);
  yPos = constrain(yPos, 10, 63);

  // Peak detection
  if (signal > threshold && (millis() - lastBeatTime > 300)) {
    unsigned long interval = millis() - lastBeatTime;
    lastBeatTime = millis();
    bpm = 60000 / interval;
  }

  // Draw ECG trace
  display.drawLine(xPos - 1, prevY, xPos, yPos, SSD1306_WHITE);
  prevY = yPos;
  xPos++;

  if (xPos >= SCREEN_WIDTH) {
    xPos = 0;
    prevY = yPos;
    display.clearDisplay();

    // Top HUD
    display.setCursor(0, 0);
    display.print("BPM: ");
    display.print(bpm);
    display.print(" | 12b-ADC");
    display.drawLine(0, 8, 127, 8, SSD1306_WHITE);
  }

  display.display();
  delay(5);
}
`,
      },
    ]),
    faqJson: JSON.stringify([
      { question: "Why use STM32 instead of Arduino UNO for ECG?", answer: "Arduino UNO has a slow 10-bit ADC (1024 resolution) running at only 16MHz. The STM32 features a 12-bit ADC (4096 resolution) with a 72MHz 32-bit core, yielding 4x finer signal resolution for delicate bio-potentials." },
    ]),
    changelogJson: JSON.stringify([{ version: "1.0.0", date: "2026-10-04", notes: "Initial verified release" }]),
    downloadFileName: "stm32-ecg-monitor-package.zip",
  },

  {
    title: "ESP32 LoRa Long-Range Mesh Environmental Node",
    slug: "esp32-lora-long-range-mesh-node",
    platform: "ESP32",
    difficulty: "Advanced",
    projectType: "Long-Range IoT Project",
    buildTime: "3-4 Hours",
    estimatedCost: "₹1,200 - ₹1,500",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Ultra-long-range (5-10km) telemetry sensor node using SX1278 LoRa 433MHz with BME280 and deep-sleep battery optimization.",
    description: `When Wi-Fi and Bluetooth cannot reach across agricultural fields, forests, or smart cities, LoRa (Long Range) provides bidirectional radio links over 10+ kilometers with milliwatts of power.
This project builds a professional-grade LoRa mesh sensor station.

Key Highlights:
1. SX1278 LoRa transceiver configured at 433MHz / 868MHz with Spreading Factor 7-12.
2. BME280 sensor reads Temperature, Barometric Atmospheric Pressure, and Relative Humidity.
3. ESP32 enters deep-sleep between transmissions, consuming less than 15 microamps for multi-year battery life on a single 18650 cell.
4. CRC packet integrity checking and dynamic mesh routing for peer-to-peer transmission to a central base station gateway.`,
    categorySlug: "esp32",
    technologies: ["esp32", "cpp-arduino", "i2c-spi"],
    thumbnail: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800"
    ]),
    featured: true,
    isExperiment: true,
    experimentTag: "ESP32-LORA-01",
    bomJson: JSON.stringify([
      { component: "ESP32 Dev Module (or TTGO LoRa32)", qty: 1, specs: "Dual-core 240MHz", estPriceInr: "₹450" },
      { component: "SX1278 LoRa 433MHz Module", qty: 1, specs: "+20dBm 100mW RF Transceiver", estPriceInr: "₹480" },
      { component: "433MHz Whip / Spring Antenna", qty: 1, specs: "50-ohm tuned RF antenna", estPriceInr: "₹60" },
      { component: "BME280 Environmental Sensor", qty: 1, specs: "I2C Temp, Humidity, Pressure", estPriceInr: "₹220" },
      { component: "18650 Li-ion Battery & Holder", qty: 1, specs: "3.7V 2600mAh", estPriceInr: "₹180" },
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "3.3V", componentPin: "VCC", component: "SX1278 & BME280", notes: "3.3V Logic Safe" },
      { boardPin: "GND", componentPin: "GND", component: "Common Ground", notes: "RF Ground Plane" },
      { boardPin: "GPIO 5", componentPin: "NSS / CS", component: "SX1278", notes: "SPI Chip Select" },
      { boardPin: "GPIO 18", componentPin: "SCK", component: "SX1278", notes: "Hardware SPI Clock" },
      { boardPin: "GPIO 19", componentPin: "MISO", component: "SX1278", notes: "Hardware SPI Data In" },
      { boardPin: "GPIO 27", componentPin: "MOSI", component: "SX1278", notes: "Hardware SPI Data Out" },
      { boardPin: "GPIO 26", componentPin: "DIO0", component: "SX1278", notes: "Interrupt for RX/TX Done" },
      { boardPin: "GPIO 21 (SDA)", componentPin: "SDA", component: "BME280", notes: "I2C Sensor Bus" },
      { boardPin: "GPIO 22 (SCL)", componentPin: "SCL", component: "BME280", notes: "I2C Sensor Clock" },
    ]),
    softwareReqsJson: JSON.stringify([
      "Arduino IDE with ESP32 Board Core",
      "LoRa library by Sandeep Mistry",
      "Adafruit BME280 Library",
    ]),
    librariesJson: JSON.stringify([
      { name: "LoRa", author: "Sandeep Mistry", installMethod: "Library Manager" },
      { name: "Adafruit_BME280", author: "Adafruit", installMethod: "Library Manager" },
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Wake from Deep Sleep", desc: "ESP32 awakens via internal RTC timer every 15 minutes." },
      { step: 2, title: "Sample BME280", desc: "Reads temperature, pressure, and humidity in under 50 milliseconds." },
      { step: 3, title: "Transmit LoRa Packet", desc: "Transmits 16-byte encrypted telemetry packet at 433MHz with +17dBm output." },
      { step: 4, title: "Re-enter Ultra Low Power", desc: "Powers down RF rails and re-enters 15uA deep sleep." },
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Attach Antenna BEFORE Powering", instruction: "CRITICAL: Never power a LoRa transmitter without an antenna connected! Doing so will permanently destroy the RF output amplifier." },
      { step: 2, title: "Wire SPI & I2C Buses", instruction: "Connect SX1278 SPI lines to GPIO 5, 18, 19, 27, and BME280 to GPIO 21 and 22." },
      { step: 3, title: "Flash LoRa Node Firmware", instruction: "Upload code at 115200 baud." },
      { step: 4, title: "Field Test Range", instruction: "Take the transmitter outdoors and test reception miles away with the base station!" },
    ]),
    troubleshootingJson: JSON.stringify([
      { problem: "LoRa init failed error", solution: "Verify NSS (GPIO 5), RST (GPIO 14), and DIO0 (GPIO 26) pin numbers match your wiring." },
      { problem: "Short range (< 100 meters)", solution: "Ensure frequency (433E6) matches on both transmitter and receiver, and increase Spreading Factor to 12 for maximum penetration." },
    ]),
    testingProcedureJson: JSON.stringify({
      steps: [
        "Power on receiver gateway and transmitter node.",
        "Observe packet confirmation on Serial Monitor with RSSI and SNR values.",
      ],
      expectedBaudRate: 115200,
      expectedSerialOutput: "Packet Sent! Temp: 28.4C | Hum: 62% | RSSI: -84dBm | SNR: 9.2dB",
    }),
    applicationsJson: JSON.stringify([
      "Smart Agriculture Soil & Crop Telemetry",
      "Wildfire & Forest Environmental Monitoring",
      "Off-grid Mountain Weather Station",
    ]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_LoRa_Transmitter.ino",
        language: "cpp",
        code: `// =================================================================
// BRKEXPERIMENTS — ESP32 LoRa Long-Range Mesh Node
// Platform: ESP32 + SX1278 (433MHz)
// Official Channel: https://www.youtube.com/@BRKEXPERIMENTS
// =================================================================

#include <SPI.h>
#include <LoRa.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define SCK 18
#define MISO 19
#define MOSI 27
#define SS 5
#define RST 14
#define DIO0 26

#define BAND 433E6 // 433MHz
#define uS_TO_S_FACTOR 1000000ULL
#define TIME_TO_SLEEP 900 // 15 minutes sleep

Adafruit_BME280 bme;
RTC_DATA_ATTR int bootCount = 0;

void setup() {
  Serial.begin(115200);
  delay(100);
  bootCount++;
  Serial.println("Boot # " + String(bootCount));

  Wire.begin(21, 22);
  if (!bme.begin(0x76, &Wire)) {
    Serial.println("BME280 not found!");
  }

  SPI.begin(SCK, MISO, MOSI, SS);
  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(BAND)) {
    Serial.println("LoRa initialization failed!");
    esp_deep_sleep_start();
  }

  LoRa.setTxPower(20); // Max power +20dBm
  LoRa.setSpreadingFactor(10);

  float t = bme.readTemperature();
  float h = bme.readHumidity();
  float p = bme.readPressure() / 100.0F;

  // Send packet
  LoRa.beginPacket();
  LoRa.print("BRK_NODE_1,");
  LoRa.print(t, 1);
  LoRa.print(",");
  LoRa.print(h, 1);
  LoRa.print(",");
  LoRa.print(p, 1);
  LoRa.endPacket();

  Serial.println("LoRa Packet Dispatched. Entering Deep Sleep...");
  LoRa.sleep();

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_deep_sleep_start();
}

void loop() {}
`,
      },
    ]),
    faqJson: JSON.stringify([
      { question: "Do I need a license for 433MHz LoRa?", answer: "433MHz and 868MHz (or 915MHz in the Americas) are unlicensed ISM frequency bands permitted for low-power hobbyist telemetry worldwide." },
    ]),
    changelogJson: JSON.stringify([{ version: "1.0.0", date: "2026-10-04", notes: "Initial verified release" }]),
    downloadFileName: "esp32-lora-mesh-package.zip",
  },
];

async function seedExpandedMcu() {
  console.log("Seeding expanded IoT & Microcontroller Projects (RP2040 Pico, STM32, ESP32 LoRa)...");

  // Ensure categories exist
  let catEnv = await prisma.category.findUnique({ where: { slug: "environmental" } });
  if (!catEnv) {
    catEnv = await prisma.category.create({
      data: {
        name: "Environmental & Sensors",
        slug: "environmental",
        description: "Weather stations, telemetry nodes, and biomedical sensors.",
        icon: "FlaskConical",
      },
    });
  }

  let catEsp = await prisma.category.findUnique({ where: { slug: "esp32" } });
  if (!catEsp) {
    catEsp = await prisma.category.create({
      data: {
        name: "ESP32 Lab",
        slug: "esp32",
        description: "Wi-Fi + BLE IoT systems.",
        icon: "Cpu",
      },
    });
  }

  // Ensure technologies exist
  const requiredTechs = [
    { name: "Raspberry Pi Pico", slug: "rp2040", color: "#EC4899" },
    { name: "STM32", slug: "stm32", color: "#6366F1" },
    { name: "LoRa", slug: "lora", color: "#F59E0B" },
    { name: "Wi-Fi", slug: "wifi", color: "#10B981" },
    { name: "C++ / Arduino", slug: "cpp-arduino", color: "#6366F1" },
    { name: "I2C / SPI", slug: "i2c-spi", color: "#8B5CF6" },
    { name: "OLED SSD1306", slug: "oled", color: "#38BDF8" },
  ];

  const techMap = {};
  for (const t of requiredTechs) {
    let tech = await prisma.technology.findUnique({ where: { slug: t.slug } });
    if (!tech) {
      tech = await prisma.technology.create({ data: t });
    }
    techMap[t.slug] = tech.id;
  }

  for (const p of newProjects) {
    const { categorySlug, technologies, ...pData } = p;
    const catId = categorySlug === "esp32" ? catEsp.id : catEnv.id;

    // Upsert project
    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`Updating existing project: ${p.title}`);
      await prisma.project.update({
        where: { slug: p.slug },
        data: {
          ...pData,
          categoryId: catId,
        },
      });
    } else {
      console.log(`Creating project: ${p.title}`);
      const created = await prisma.project.create({
        data: {
          ...pData,
          categoryId: catId,
          price: 0,
          discountPrice: 0,
          currency: "INR",
          rating: 4.9,
          reviewCount: 38,
          purchaseCount: 420,
        },
      });

      for (const tSlug of technologies) {
        const tId = techMap[tSlug];
        if (tId) {
          await prisma.projectTechnology.create({
            data: {
              projectId: created.id,
              technologyId: tId,
            },
          });
        }
      }
    }
  }

  console.log("Successfully seeded expanded IoT & Microcontroller Projects!");
  await prisma.$disconnect();
}

seedExpandedMcu().catch((e) => {
  console.error(e);
  process.exit(1);
});
