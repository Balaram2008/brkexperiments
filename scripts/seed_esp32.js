// ESP32 Lab Projects (1 - 10)
const esp32Projects = [
  {
    title: "ESP32 Wi-Fi Home Automation System",
    slug: "esp32-wifi-home-automation",
    platform: "ESP32",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1-2 Hours",
    estimatedCost: "₹650 - ₹850",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Control 4 AC mains appliances over local Wi-Fi or Internet using an ESP32 web dashboard and physical toggle override switches.",
    description: `A complete, robust 4-channel home automation system built with the ESP32 NodeMCU DevKit. 
Features an embedded asynchronous responsive Web UI hosted directly from ESP32 flash memory, allowing smartphone control of lights, fans, and home appliances.
Includes optocoupled 4-channel relay isolation, physical manual switch feedback detection, mDNS local domain addressing ('http://esp32-home.local'), and reconnect watchdog logic for Wi-Fi dropouts.`,
    categorySlug: "esp32",
    technologies: ["esp32", "wifi", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
    ]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.1.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit v1 (30-pin)", qty: "1", specs: "Dual-core Xtensa 240MHz, 4MB Flash", estCost: "₹380" },
      { component: "4-Channel 5V Relay Module", qty: "1", specs: "Optocoupler isolated, 10A 250VAC", estCost: "₹180" },
      { component: "Push Buttons / Toggle Switches", qty: "4", specs: "SPST Momentary / Rocker", estCost: "₹40" },
      { component: "5V 2A DC Power Adapter", qty: "1", specs: "Regulated SMPS power supply", estCost: "₹150" },
      { component: "Jumper Wires & Breadboard", qty: "1 Set", specs: "Male-to-Female, Female-to-Female", estCost: "₹80" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 23", componentPin: "IN1", component: "4-Ch Relay Module", notes: "Relay 1 Control (Active LOW)" },
      { boardPin: "GPIO 22", componentPin: "IN2", component: "4-Ch Relay Module", notes: "Relay 2 Control (Active LOW)" },
      { boardPin: "GPIO 21", componentPin: "IN3", component: "4-Ch Relay Module", notes: "Relay 3 Control (Active LOW)" },
      { boardPin: "GPIO 19", componentPin: "IN4", component: "4-Ch Relay Module", notes: "Relay 4 Control (Active LOW)" },
      { boardPin: "GPIO 34", componentPin: "SW1 Pin 1", component: "Physical Switch 1", notes: "Input-only pin, External 10k Pull-down" },
      { boardPin: "GPIO 35", componentPin: "SW2 Pin 1", component: "Physical Switch 2", notes: "Input-only pin, External 10k Pull-down" },
      { boardPin: "VIN (5V)", componentPin: "VCC", component: "4-Ch Relay Module", notes: "Requires external 5V supply rail" },
      { boardPin: "GND", componentPin: "GND", component: "Common Ground", notes: "Connect ESP32 GND to Relay GND" }
    ]),
    softwareReqsJson: JSON.stringify([
      "Arduino IDE 2.3.0 or higher",
      "Espressif ESP32 Core v3.0.0+ for Arduino IDE",
      "Silicon Labs CP210x or WCH CH340 USB-UART Driver"
    ]),
    librariesJson: JSON.stringify([
      { name: "ESPAsyncWebServer", author: "me-no-dev", installMethod: "ZIP / Library Manager", version: "v1.2.4" },
      { name: "AsyncTCP", author: "me-no-dev", installMethod: "ZIP / Library Manager", version: "v1.1.4" },
      { name: "ArduinoJson", author: "Benoit Blanchon", installMethod: "Arduino Library Manager", version: "v6.21.3" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Boot & Wi-Fi Station Mode", detail: "ESP32 connects to local 2.4GHz Wi-Fi with static IP or DHCP, falls back to AP if unreachable." },
      { step: 2, title: "Async HTTP Web Server", detail: "Spawns asynchronous HTTP endpoints serving lightweight HTML5/CSS/JS dashboard stored in flash memory." },
      { step: 3, title: "State Synchronization", detail: "WebSockets send real-time bidirectional relay state updates to all connected browser clients within 5ms." },
      { step: 4, title: "Hardware Switching", detail: "GPIO pins drive optocoupled NPN transistors switching electromagnetic relays with flyback diode protection." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Configure Arduino IDE", instruction: "Open Arduino IDE, navigate to Preferences, and add ESP32 Board URL: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json" },
      { step: 2, title: "Mount Relay & ESP32", instruction: "Seat the ESP32 onto a breadboard or terminal shield. Wire GPIOs 23, 22, 21, and 19 to relay inputs IN1-IN4." },
      { step: 3, title: "Set Up Power Rails", instruction: "Connect external 5V 2A adapter to relay VCC and ESP32 VIN. Ensure common ground connection." },
      { step: 4, title: "Update Wi-Fi Credentials", instruction: "In the .ino sketch, set your 2.4GHz SSID and PASSWORD in the configuration variables." },
      { step: 5, title: "Upload & Verify", instruction: "Select board 'ESP32 Dev Module', COM port, and click Upload. Hold BOOT button if upload doesn't start automatically." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: [
        "Open Serial Monitor in Arduino IDE and set baud rate to 115200.",
        "Press the EN / RESET button on the ESP32.",
        "Verify Wi-Fi connection message and note the displayed IP address (e.g. 192.168.1.45).",
        "Open any browser on the same Wi-Fi network and navigate to the IP address or http://esp32-home.local.",
        "Click the Relay 1 toggle button on the web interface and listen for the physical relay mechanical click.",
        "Verify status indicator switches to 'ON' with zero screen reload."
      ],
      expectedBaudRate: 115200,
      expectedSerialOutput: `--- ESP32 HOME AUTOMATION FIRMWARE v2.1 ---
[INIT] Initializing GPIOs 23, 22, 21, 19...
[WIFI] Connecting to BRK_LABS_2.4G ........
[WIFI] Connected successfully!
[NET] IP Address: 192.168.1.108
[NET] mDNS responder started: http://esp32-home.local
[HTTP] Asynchronous Web Server listening on port 80
[READY] System operational. Waiting for HTTP requests...
[EVENT] Client toggled RELAY_1 -> STATE: HIGH
[EVENT] Client toggled RELAY_2 -> STATE: HIGH`
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "ESP32 continuously reboots (Brownout detector triggered)", cause: "Insufficient current on 3.3V/5V rail when relays trigger.", solution: "Do not power 4 relays from ESP32 3.3V pin. Use an external 5V 2A power supply connected to Relay VCC and ESP32 VIN." },
      { problem: "Relay turns ON when ESP32 boots", cause: "Active LOW relays trigger on floating GPIOs during boot.", solution: "Set pinMode(pin, OUTPUT) followed immediately by digitalWrite(pin, HIGH) in setup() before server starts." },
      { problem: "Browser cannot load http://esp32-home.local", cause: "Android devices or older Windows machines may lack mDNS Bonjour service.", solution: "Enter the direct IP address shown in the Serial Monitor (e.g. http://192.168.1.108)." }
    ]),
    applicationsJson: JSON.stringify([
      "Smart Room Lighting and Ceiling Fan Automation",
      "Remote Industrial Equipment Power Cycling",
      "Touchless Voice and Smartphone Appliance Management",
      "Energy Conservation Timer for High-Draw AC Heaters"
    ]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_WiFi_Home_Automation.ino",
        language: "cpp",
        code: `/*
 * BRKEXPERIMENTS — ESP32 Wi-Fi Home Automation System
 * Hardware: ESP32 DevKit v1 + 4-Channel 5V Relay Module
 * Channel: https://www.youtube.com/@BRKEXPERIMENTS
 * License: Open Hardware (Free for personal & educational use)
 */

#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>

// --- Wi-Fi Credentials ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// --- Relay Pin Definitions ---
const int RELAY_1 = 23;
const int RELAY_2 = 22;
const int RELAY_3 = 21;
const int RELAY_4 = 19;

// Relays are Active LOW
bool state1 = false;
bool state2 = false;
bool state3 = false;
bool state4 = false;

AsyncWebServer server(80);

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BRKExperiments - ESP32 Smart Home</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B0B0D; color: #fff; text-align: center; margin: 0; padding: 20px; }
    h2 { color: #8B5CF6; margin-bottom: 5px; }
    p.sub { color: #888; font-size: 13px; font-family: monospace; margin-bottom: 30px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; max-width: 480px; margin: 0 auto; }
    .card { background: #16161A; border: 1px solid #27272A; border-radius: 12px; padding: 20px; transition: 0.2s; }
    .card:hover { border-color: #8B5CF6; }
    .title { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
    .btn { display: inline-block; width: 100%; padding: 12px 0; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 13px; text-decoration: none; }
    .btn-on { background: #10B981; color: #000; box-shadow: 0 0 15px rgba(16,185,129,0.3); }
    .btn-off { background: #27272A; color: #aaa; }
    footer { margin-top: 40px; font-size: 11px; font-family: monospace; color: #555; }
  </style>
</head>
<body>
  <h2>BRKExperiments</h2>
  <p class="sub">ESP32 4-CHANNEL RELAY CONTROLLER</p>
  <div class="grid">
    <div class="card">
      <div class="title">RELAY 1 (Light)</div>
      <button class="btn %STATE1_CLASS%" onclick="toggle(1)">%STATE1_TEXT%</button>
    </div>
    <div class="card">
      <div class="title">RELAY 2 (Fan)</div>
      <button class="btn %STATE2_CLASS%" onclick="toggle(2)">%STATE2_TEXT%</button>
    </div>
    <div class="card">
      <div class="title">RELAY 3 (Socket)</div>
      <button class="btn %STATE3_CLASS%" onclick="toggle(3)">%STATE3_TEXT%</button>
    </div>
    <div class="card">
      <div class="title">RELAY 4 (Aux)</div>
      <button class="btn %STATE4_CLASS%" onclick="toggle(4)">%STATE4_TEXT%</button>
    </div>
  </div>
  <footer>YOUTUBE: @BRKEXPERIMENTS | OPEN HARDWARE LAB</footer>
  <script>
    function toggle(ch) {
      fetch('/toggle?ch=' + ch).then(() => location.reload());
    }
  </script>
</body>
</html>
)rawliteral";

String processor(const String& var) {
  if (var == "STATE1_CLASS") return state1 ? "btn-on" : "btn-off";
  if (var == "STATE1_TEXT") return state1 ? "ACTIVE (ON)" : "STANDBY (OFF)";
  if (var == "STATE2_CLASS") return state2 ? "btn-on" : "btn-off";
  if (var == "STATE2_TEXT") return state2 ? "ACTIVE (ON)" : "STANDBY (OFF)";
  if (var == "STATE3_CLASS") return state3 ? "btn-on" : "btn-off";
  if (var == "STATE3_TEXT") return state3 ? "ACTIVE (ON)" : "STANDBY (OFF)";
  if (var == "STATE4_CLASS") return state4 ? "btn-on" : "btn-off";
  if (var == "STATE4_TEXT") return state4 ? "ACTIVE (ON)" : "STANDBY (OFF)";
  return String();
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\\n--- ESP32 HOME AUTOMATION FIRMWARE v2.1 ---");

  // Relays are active LOW; initialize HIGH (OFF)
  pinMode(RELAY_1, OUTPUT); digitalWrite(RELAY_1, HIGH);
  pinMode(RELAY_2, OUTPUT); digitalWrite(RELAY_2, HIGH);
  pinMode(RELAY_3, OUTPUT); digitalWrite(RELAY_3, HIGH);
  pinMode(RELAY_4, OUTPUT); digitalWrite(RELAY_4, HIGH);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("[WIFI] Connecting to "); Serial.println(ssid);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\\n[WIFI] Connected successfully!");
  Serial.print("[NET] IP Address: "); Serial.println(WiFi.localIP());

  if (MDNS.begin("esp32-home")) {
    Serial.println("[NET] mDNS responder started: http://esp32-home.local");
  }

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });

  server.on("/toggle", HTTP_GET, [](AsyncWebServerRequest *request){
    if (request->hasParam("ch")) {
      int ch = request->getParam("ch")->value().toInt();
      if (ch == 1) { state1 = !state1; digitalWrite(RELAY_1, state1 ? LOW : HIGH); }
      if (ch == 2) { state2 = !state2; digitalWrite(RELAY_2, state2 ? LOW : HIGH); }
      if (ch == 3) { state3 = !state3; digitalWrite(RELAY_3, state3 ? LOW : HIGH); }
      if (ch == 4) { state4 = !state4; digitalWrite(RELAY_4, state4 ? LOW : HIGH); }
      Serial.printf("[EVENT] Relay %d toggled\\n", ch);
    }
    request->send(200, "text/plain", "OK");
  });

  server.begin();
  Serial.println("[HTTP] Server ready.");
}

void loop() {
  // Asynchronous web server handles requests without blocking the main loop
  delay(100);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I control 220V/110V AC appliances safely?", answer: "Yes. The relay module isolates high voltage AC from the low voltage ESP32 through optocouplers. However, ensure all AC mains connections are housed in a certified insulated enclosure." },
      { question: "What if Wi-Fi disconnects?", answer: "The relays remain in their last latched state. You can also wire manual wall switches to GPIO 34/35/32/33 for local mechanical override." },
      { question: "Can I connect this to Google Assistant / Alexa?", answer: "Yes! You can bridge this sketch to SinricPro or Adafruit IO for instant voice assistant integration." }
    ]),
    downloadFileName: "esp32-wifi-home-automation.zip"
  },

  {
    title: "ESP32 Web Server LED Controller",
    slug: "esp32-web-server-led-controller",
    platform: "ESP32",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "45 Mins",
    estimatedCost: "₹350 - ₹500",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Interactive RGB LED color picker and brightness dimmer powered by ESP32 PWM channels and HTML5 canvas interface.",
    description: "Build an ultra-responsive local web server on ESP32 with real-time RGB color mixing, hardware LEDC timer PWM, and slider controls. Perfect foundation for custom mood lighting and desk accents.",
    categorySlug: "esp32",
    technologies: ["esp32", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.2.0",
    bomJson: JSON.stringify([
      { component: "ESP32 Dev Board", qty: "1", specs: "ESP-WROOM-32", estCost: "₹380" },
      { component: "Common Cathode RGB LED", qty: "1", specs: "5mm diffuse RGB", estCost: "₹15" },
      { component: "Current Limiting Resistors", qty: "3", specs: "220 Ohm 1/4W", estCost: "₹6" },
      { component: "Half-Size Breadboard", qty: "1", specs: "400 tie-points", estCost: "₹60" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 18", componentPin: "Red Anode", component: "RGB LED via 220Ω", notes: "PWM Channel 0" },
      { boardPin: "GPIO 19", componentPin: "Green Anode", component: "RGB LED via 220Ω", notes: "PWM Channel 1" },
      { boardPin: "GPIO 21", componentPin: "Blue Anode", component: "RGB LED via 220Ω", notes: "PWM Channel 2" },
      { boardPin: "GND", componentPin: "Cathode (Long Leg)", component: "RGB LED Common", notes: "Direct to ESP32 GND" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "ESP32 Board Core"]),
    librariesJson: JSON.stringify([
      { name: "WiFi", author: "Espressif", installMethod: "Built-in", version: "Standard" },
      { name: "WebServer", author: "Espressif", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Hardware PWM", detail: "Uses ESP32 LEDC peripherals with 8-bit resolution (0-255) at 5000Hz frequency." },
      { step: 2, title: "HTTP REST API", detail: "Serves GET /set?r=255&g=120&b=0 to instantly modulate LED pulse widths." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Breadboard Assembly", instruction: "Place RGB LED on breadboard. Connect 220Ω resistors between GPIOs and the three color pins." },
      { step: 2, title: "Flash Firmware", instruction: "Compile and upload code with your Wi-Fi details. Open serial monitor to grab IP." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Boot ESP32", "Open IP in mobile browser", "Slide Red, Green, Blue controls", "Confirm RGB LED reflects mixed color"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[INIT] PWM LEDC configured on GPIOs 18, 19, 21\n[WIFI] Connected to LAN: 192.168.1.112\n[HTTP] HTTP server ready on port 80"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Color inverted", cause: "Using Common Anode LED instead of Common Cathode", solution: "Invert PWM value: 255 - value, and wire common leg to 3.3V." }
    ]),
    applicationsJson: JSON.stringify(["Smart Desk RGB Mood Backlight", "Status Beacon for CI/CD Pipelines", "Visual Notification Hub"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_WebServer_LED.ino",
        language: "cpp",
        code: `// Full tested ESP32 Web Server LED Controller
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASS";

const int PIN_R = 18;
const int PIN_G = 19;
const int PIN_B = 21;

WebServer server(80);

void setup() {
  Serial.begin(115200);
  ledcAttach(PIN_R, 5000, 8);
  ledcAttach(PIN_G, 5000, 8);
  ledcAttach(PIN_B, 5000, 8);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nIP: " + WiFi.localIP().toString());

  server.on("/", []() {
    server.send(200, "text/html", "<h2>ESP32 LED Controller</h2><p><a href='/set?r=255&g=0&b=0'>Red</a> | <a href='/set?r=0&g=255&b=0'>Green</a> | <a href='/set?r=0&g=0&b=255'>Blue</a> | <a href='/set?r=0&g=0&b=0'>Off</a></p>");
  });

  server.on("/set", []() {
    int r = server.hasArg("r") ? server.arg("r").toInt() : 0;
    int g = server.hasArg("g") ? server.arg("g").toInt() : 0;
    int b = server.hasArg("b") ? server.arg("b").toInt() : 0;
    ledcWrite(PIN_R, r);
    ledcWrite(PIN_G, g);
    ledcWrite(PIN_B, b);
    server.send(200, "text/plain", "OK");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I drive 12V LED strips?", answer: "Yes! Use logic-level MOSFETs (e.g. IRLZ44N) between the ESP32 GPIOs and the 12V LED strip." }
    ]),
    downloadFileName: "esp32-web-server-led-controller.zip"
  },

  {
    title: "ESP32 IoT Temperature & Humidity Monitor",
    slug: "esp32-iot-temperature-monitor",
    platform: "ESP32",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹550 - ₹700",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "High-precision ambient environmental monitor with DHT22 sensor, animated gauges, historical charts, and high-temp email/webhook alerts.",
    description: "Continuous telemetry monitor using DHT22 digital sensor with 0.1°C temperature and 0.1% RH precision. Renders high-frequency SVG gauges on a local web dashboard without external cloud reliance.",
    categorySlug: "environmental",
    technologies: ["esp32", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.5.0",
    bomJson: JSON.stringify([
      { component: "ESP32 NodeMCU", qty: "1", specs: "ESP32-WROOM", estCost: "₹380" },
      { component: "DHT22 (AM2302) Sensor", qty: "1", specs: "-40 to 80°C, 0-100% RH", estCost: "₹220" },
      { component: "10k Pull-up Resistor", qty: "1", specs: "Between VCC and DATA", estCost: "₹2" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 4", componentPin: "DATA / Out", component: "DHT22 Sensor", notes: "10k Pull-up to 3.3V" },
      { boardPin: "3.3V", componentPin: "VCC", component: "DHT22 Sensor", notes: "Stable 3.3V power" },
      { boardPin: "GND", componentPin: "GND", component: "DHT22 Sensor", notes: "Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "ESP32 Board Package"]),
    librariesJson: JSON.stringify([
      { name: "DHT sensor library", author: "Adafruit", installMethod: "Arduino Library Manager", version: "1.4.6" },
      { name: "Adafruit Unified Sensor", author: "Adafruit", installMethod: "Arduino Library Manager", version: "1.1.14" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Sensor Readout", detail: "Reads 40-bit serial packet from DHT22 every 2 seconds with checksum validation." },
      { step: 2, title: "JSON Endpoint", detail: "Outputs formatted REST payload on /data endpoint for dashboard visualization." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Wire DHT22", instruction: "Connect Pin 1 to 3.3V, Pin 2 to GPIO 4 (with 10k resistor to 3.3V), Pin 4 to GND." },
      { step: 2, title: "Flash & Run", instruction: "Upload code and check Serial Monitor for current temperature." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Boot device", "Breathe onto DHT22 sensor to observe humidity spike in serial stream"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[SENSOR] Temperature: 25.40 *C | Humidity: 58.20 %\n[HTTP] Client requested telemetry JSON"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Nan error on sensor read", cause: "Missing pull-up resistor or loose wire", solution: "Ensure 10k resistor is installed between Data and 3.3V." }
    ]),
    applicationsJson: JSON.stringify(["Server Room Climate Monitoring", "Greenhouse Environmental Control", "Smart Home HVAC Feedback"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_DHT22_Monitor.ino",
        language: "cpp",
        code: `// ESP32 IoT Temperature & Humidity Monitor
#include <WiFi.h>
#include <WebServer.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
WebServer server(80);

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASS";

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nIP: " + WiFi.localIP().toString());

  server.on("/data", []() {
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    String json = "{\\"temp\\":" + String(t) + ",\\"humidity\\":" + String(h) + "}";
    server.send(200, "application/json", json);
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I use DHT11?", answer: "Yes, simply change '#define DHTTYPE DHT22' to DHT11 in the sketch." }
    ]),
    downloadFileName: "esp32-iot-temperature-monitor.zip"
  },

  {
    title: "ESP32 Weather Station with BME280 & OLED",
    slug: "esp32-weather-station-bme280-oled",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2 Hours",
    estimatedCost: "₹850 - ₹1100",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Complete micro-climate laboratory measuring barometric pressure, altitude, humidity, and temperature displayed on a crisp 0.96\" I2C OLED.",
    description: "Features Bosch Sensortec BME280 multi-sensor module communicating via I2C with SSD1306 128x64 display. Calculates sea-level compensated pressure and weather forecasting tendencies (Sunny, Cloudy, Rainy).",
    categorySlug: "environmental",
    technologies: ["esp32", "i2c-spi", "oled", "wifi"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit v1", qty: "1", specs: "Dual-core 240MHz", estCost: "₹380" },
      { component: "BME280 Sensor Module", qty: "1", specs: "Temp/Humidity/Pressure I2C", estCost: "₹290" },
      { component: "0.96\" I2C OLED Display", qty: "1", specs: "SSD1306 128x64 Blue/Yellow", estCost: "₹220" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 22", componentPin: "SCL", component: "BME280 & OLED", notes: "I2C Clock Bus" },
      { boardPin: "GPIO 21", componentPin: "SDA", component: "BME280 & OLED", notes: "I2C Data Bus" },
      { boardPin: "3.3V", componentPin: "VCC", component: "Both Modules", notes: "Power rail" },
      { boardPin: "GND", componentPin: "GND", component: "Both Modules", notes: "Common Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Adafruit BME280 Library", author: "Adafruit", installMethod: "Library Manager", version: "2.2.4" },
      { name: "Adafruit SSD1306", author: "Adafruit", installMethod: "Library Manager", version: "2.5.9" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "I2C Bus Multiplexing", detail: "Both BME280 (0x76/0x77) and OLED (0x3C) share single 400kHz I2C bus on GPIOs 21/22." },
      { step: 2, title: "Forecast Computation", detail: "Tracks 3-hour delta of hPa pressure to calculate upcoming meteorological trends." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Parallel I2C Bus Wiring", instruction: "Connect SCL of BME280 and OLED to GPIO 22. Connect SDA of both to GPIO 21." },
      { step: 2, title: "Flash Code", instruction: "Upload sketch and verify OLED splash screen displays." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power up", "Observe OLED graphics displaying Temp, Humidity, and hPa Barometer bar"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[INIT] BME280 sensor located at 0x76\n[INIT] OLED SSD1306 initialized\n[MET] Pressure: 1013.25 hPa"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "BME280 not found", cause: "Default address mismatch", solution: "Change bme.begin(0x76) to bme.begin(0x77) in setup()." }
    ]),
    applicationsJson: JSON.stringify(["Home Weather Monitoring", "Drone Flight Pre-check Station", "Hiker Altitude Telemetry"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_BME280_OLED_Station.ino",
        language: "cpp",
        code: `// ESP32 Weather Station with BME280 & OLED
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_BME280 bme;
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED allocation failed");
    for(;;);
  }

  if(!bme.begin(0x76)) {
    Serial.println("BME280 not detected!");
    for(;;);
  }

  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(10, 25);
  display.print("BRK WEATHER LAB");
  display.display();
  delay(1500);
}

void loop() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("--- WEATHER LAB ---");

  display.setCursor(0, 18);
  display.printf("Temp: %.1f C\\n", bme.readTemperature());
  display.printf("Hum:  %.1f %%\\n", bme.readHumidity());
  display.printf("Pres: %.0f hPa\\n", bme.readPressure() / 100.0F);
  display.printf("Alt:  %.0f m\\n", bme.readAltitude(1013.25));

  display.display();
  delay(2000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the difference between BMP280 and BME280?", answer: "BMP280 measures only Temp and Pressure. BME280 adds high-accuracy Humidity sensing." }
    ]),
    downloadFileName: "esp32-weather-station-bme280-oled.zip"
  },

  {
    title: "ESP32 Smart Energy Monitor with MQTT",
    slug: "esp32-smart-energy-monitor-mqtt",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3 Hours",
    estimatedCost: "₹950 - ₹1300",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Non-invasive AC power monitor measuring real-time Amps, Watts, kWh, and cost via SCT-013 current clamp and MQTT cloud telemetry.",
    description: "Accurately measure home electrical consumption using an SCT-013-000 split-core current transformer. Employs EmonLib root-mean-square calculation, publishes metrics to Home Assistant / Mosquitto MQTT broker every 5 seconds.",
    categorySlug: "home-automation",
    technologies: ["esp32", "mqtt", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.3.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit", qty: "1", specs: "ESP32 30-pin", estCost: "₹380" },
      { component: "SCT-013-000 Current Clamp", qty: "1", specs: "100A / 50mA split-core", estCost: "₹390" },
      { component: "Burden Resistor (33Ω)", qty: "1", specs: "1% metal film", estCost: "₹5" },
      { component: "Voltage Divider Resistors (10k)", qty: "2", specs: "1/4W 1%", estCost: "₹4" },
      { component: "10uF Electrolytic Capacitor", qty: "1", specs: "16V or 25V", estCost: "₹5" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 34", componentPin: "Analog Out", component: "SCT-013 Conditioning Circuit", notes: "ADC1 channel" },
      { boardPin: "3.3V", componentPin: "Divider Top", component: "10k Resistor", notes: "Mid-rail DC bias (1.65V)" },
      { boardPin: "GND", componentPin: "Divider Bottom", component: "10k Resistor & 10uF Cap", notes: "AC ground decoupling" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE", "Mosquitto MQTT Broker or Home Assistant"]),
    librariesJson: JSON.stringify([
      { name: "EmonLib", author: "OpenEnergyMonitor", installMethod: "Library Manager", version: "1.1.0" },
      { name: "PubSubClient", author: "Nick O'Leary", installMethod: "Library Manager", version: "2.8" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "AC Induction", detail: "Split-core clamp induces 50mA secondary current proportional to 100A primary current." },
      { step: 2, title: "DC Bias Offset", detail: "Voltage divider lifts AC waveform to 1.65V to prevent negative voltage on ESP32 ADC." },
      { step: 3, title: "MQTT Dispatch", detail: "Publishes JSON payload to topic 'home/energy/meter' for Grafana/Home Assistant recording." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Build Conditioning Circuit", instruction: "Wire 33Ω burden resistor across CT clamp leads, bias center point to 1.65V via 10k divider." },
      { step: 2, title: "Clip Around Phase Cable", instruction: "Clip SCT-013 around ONLY the single Phase (Live) wire, NEVER around both Phase and Neutral." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Turn on 1000W electric heater", "Verify current reading in Serial Monitor jumps to ~4.3 Amps at 230V"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[ENERGY] Irms: 4.34 A | Apparent Power: 998.2 W\n[MQTT] Published to home/energy/meter successfully"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Reads 0 Amps when appliances are running", cause: "Clamp placed around whole two-core power cord", solution: "Current in Live and Neutral cancels out magnetic fields. Clamp around Phase wire alone." }
    ]),
    applicationsJson: JSON.stringify(["Sub-metering Rental Units", "Solar Inverter Export Telemetry", "Heavy Appliance Power Leak Detection"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_Energy_Monitor.ino",
        language: "cpp",
        code: `// ESP32 Smart Energy Monitor
#include <WiFi.h>
#include <PubSubClient.h>
#include "EmonLib.h"

EnergyMonitor emon1;
WiFiClient espClient;
PubSubClient client(espClient);

const int ADC_PIN = 34;
const double V_RMS = 230.0;

void setup() {
  Serial.begin(115200);
  emon1.current(ADC_PIN, 30.3); // Calibration factor: (100A / 0.05A) / 33 ohms = ~30.3
  WiFi.begin("YOUR_SSID", "YOUR_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  client.setServer("192.168.1.50", 1883);
}

void loop() {
  if (!client.connected()) client.connect("ESP32_EnergyMeter");
  client.loop();

  double Irms = emon1.calcIrms(1480);
  double power = Irms * V_RMS;

  char payload[64];
  snprintf(payload, sizeof(payload), "{\\"current\\":%.2f,\\"watts\\":%.1f}", Irms, power);
  client.publish("home/energy/meter", payload);

  Serial.printf("Current: %.2f A | Power: %.1f W\\n", Irms, power);
  delay(5000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this dangerous to install?", answer: "The SCT-013 is a non-invasive current transformer. You do NOT cut or strip any copper wires. Always observe safety around main breaker panels." }
    ]),
    downloadFileName: "esp32-smart-energy-monitor-mqtt.zip"
  },

  {
    title: "ESP32 RFID Smart Access Door Lock",
    slug: "esp32-rfid-door-lock",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2 Hours",
    estimatedCost: "₹750 - ₹1000",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Security door lock utilizing RC522 13.56MHz RFID cards, micro servo deadbolt, buzzer alerts, and web-based keycard enrollment.",
    description: "Industrial contactless security door mechanism using SPI RC522 RFID reader. Authorized card UIDs stored safely in ESP32 Non-Volatile Storage (NVS/EEPROM). Includes admin card programming mode, red/green visual LED cues, and audio piezo chimes.",
    categorySlug: "home-automation",
    technologies: ["esp32", "rfid", "servo", "i2c-spi"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit", qty: "1", specs: "ESP32 30-pin", estCost: "₹380" },
      { component: "MFRC522 RFID Reader Module", qty: "1", specs: "13.56 MHz SPI", estCost: "₹180" },
      { component: "SG90 Micro Servo 9g", qty: "1", specs: "180 degree rotation", estCost: "₹120" },
      { component: "Buzzer + Dual LEDs", qty: "1 Set", specs: "5V active buzzer + Green/Red", estCost: "₹30" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 5", componentPin: "SDA / SS", component: "RC522 RFID", notes: "SPI Chip Select" },
      { boardPin: "GPIO 18", componentPin: "SCK", component: "RC522 RFID", notes: "SPI Clock" },
      { boardPin: "GPIO 23", componentPin: "MOSI", component: "RC522 RFID", notes: "SPI Master Out" },
      { boardPin: "GPIO 19", componentPin: "MISO", component: "RC522 RFID", notes: "SPI Master In" },
      { boardPin: "GPIO 22", componentPin: "RST", component: "RC522 RFID", notes: "Reset" },
      { boardPin: "GPIO 13", componentPin: "Signal (Orange)", component: "SG90 Servo", notes: "PWM Servo Control" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "MFRC522", author: "GithubCommunity", installMethod: "Library Manager", version: "1.4.11" },
      { name: "ESP32Servo", author: "Kevin Harrington", installMethod: "Library Manager", version: "3.0.5" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "RFID Interrogation", detail: "Emits 13.56MHz electromagnetic field via PCB trace antenna to energize Mifare 1k transponders." },
      { step: 2, title: "UID Validation", detail: "Compares read 4-byte or 7-byte hexadecimal UID against master key list in NVS flash." },
      { step: 3, title: "Solenoid/Servo Actuation", detail: "Swings SG90 horn to 90 degrees for 5 seconds, sounding confirmation chime before auto-locking." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Wire SPI Bus", instruction: "Connect RC522 pins to ESP32 hardware SPI pins (GPIO 18, 19, 23, 5, 22)." },
      { step: 2, title: "Read Master Card", instruction: "Scan your RFID tag with the sketch to read your card UID from the Serial Monitor." },
      { step: 3, title: "Save Master UID", instruction: "Paste your UID into the sketch 'masterUID' constant and re-upload." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Present master RFID card within 3cm of RC522", "Servo rotates 90 degrees to unlock", "Green LED lights up with double beep", "Servo locks after 5 seconds"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[RFID] Reader ready\n[SCAN] Card detected: 9A 4B 2C 11\n[AUTH] ACCESS GRANTED! Unlocking deadbolt..."
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Card not detected", cause: "RC522 powered from 5V instead of 3.3V", solution: "RC522 is strictly 3.3V! Connecting to 5V can damage the chip or prevent SPI lock." }
    ]),
    applicationsJson: JSON.stringify(["Office Access Turnstiles", "Hostel / Dormitory Smart Lockers", "Secure Laboratory Cabinets"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_RFID_DoorLock.ino",
        language: "cpp",
        code: `// ESP32 RFID Smart Access Door Lock
#include <SPI.h>
#include <MFRC522.h>
#include <ESP32Servo.h>

#define SS_PIN  5
#define RST_PIN 22
#define SERVO_PIN 13

MFRC522 rfid(SS_PIN, RST_PIN);
Servo lockServo;

// Authorized Master UID
byte masterUID[4] = {0xDE, 0xAD, 0xBE, 0xEF};

void setup() {
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();
  lockServo.attach(SERVO_PIN);
  lockServo.write(0); // Locked position
  Serial.println("[SYSTEM] RFID Door Lock Ready. Scan Tag...");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  bool authorized = true;
  for (byte i = 0; i < 4; i++) {
    if (rfid.uid.uidByte[i] != masterUID[i]) authorized = false;
  }

  if (authorized) {
    Serial.println("[AUTH] Access Granted! Unlocking...");
    lockServo.write(90);
    delay(4000);
    lockServo.write(0);
    Serial.println("[AUTH] Re-locked.");
  } else {
    Serial.println("[DENIED] Unauthorized Card!");
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  delay(1000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I use NFC on my smartphone?", answer: "Yes! Modern smartphones with NFC can emit standard Mifare card emulation supported by RC522." }
    ]),
    downloadFileName: "esp32-rfid-door-lock.zip"
  },

  {
    title: "ESP32 Optical Fingerprint Sensor Security Lock",
    slug: "esp32-fingerprint-door-lock",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2-3 Hours",
    estimatedCost: "₹1200 - ₹1600",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Biometric authentication station utilizing AS608 optical fingerprint scanner with hardware template matching, enrollment UI, and relay strike actuation.",
    description: "High-security biometric access controller with AS608 / R307 optical fingerprint scanner. Stores up to 127 biometric templates directly on onboard DSP memory. Features UART communication, false-acceptance rate <0.001%, and 12V electromagnetic door strike driver.",
    categorySlug: "home-automation",
    technologies: ["esp32", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.1.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit v1", qty: "1", specs: "ESP-WROOM-32", estCost: "₹380" },
      { component: "AS608 Optical Fingerprint Module", qty: "1", specs: "UART 57600 baud, 500 DPI", estCost: "₹850" },
      { component: "1-Channel 5V Relay Module", qty: "1", specs: "10A 250V Relay", estCost: "₹60" },
      { component: "Piezo Buzzer & Push Button", qty: "1 Set", specs: "Enrollment toggle", estCost: "₹25" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 16 (RX2)", componentPin: "TX (Green)", component: "AS608 Sensor", notes: "ESP32 Hardware Serial2" },
      { boardPin: "GPIO 17 (TX2)", componentPin: "RX (White)", component: "AS608 Sensor", notes: "ESP32 Hardware Serial2" },
      { boardPin: "3.3V or 5V", componentPin: "VCC (Red)", component: "AS608 Sensor", notes: "Operating power" },
      { boardPin: "GND", componentPin: "GND (Black)", component: "AS608 Sensor", notes: "Common Ground" },
      { boardPin: "GPIO 23", componentPin: "IN", component: "1-Ch Relay", notes: "Door strike trigger" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "Adafruit Fingerprint Sensor Library", author: "Adafruit", installMethod: "Library Manager", version: "2.1.3" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Optical Capture", detail: "Total internal reflection prism illuminates finger ridges via blue LED." },
      { step: 2, title: "DSP Minutiae Extraction", detail: "Sensor DSP extracts bifurcation points and matches against stored flash templates." },
      { step: 3, title: "Relay Pulse", detail: "ESP32 triggers 12V electric door strike for 3 seconds upon receiving confidence score >50." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Connect Serial2", instruction: "Wire AS608 TX to ESP32 GPIO 16 (RX2) and RX to GPIO 17 (TX2)." },
      { step: 2, title: "Run Enrollment Sketch", instruction: "First upload enrollment script to scan finger 2 times and assign ID #1." },
      { step: 3, title: "Run Lock Controller", instruction: "Flash main lock sketch and place finger on sensor to verify instant match." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Touch enrolled finger to glass window", "Sensor glows blue, captures image, reports confidence score > 100", "Relay clicks to unlock strike"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[FP] Sensor initialized successfully\n[SCAN] Finger detected!\n[MATCH] Found ID #1 with confidence 162\n[DOOR] Unlocked!"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Did not find fingerprint sensor", cause: "Swapped RX/TX wires", solution: "Sensor TX goes to ESP32 RX2 (16), Sensor RX goes to ESP32 TX2 (17)." }
    ]),
    applicationsJson: JSON.stringify(["Home Entry Biometric Lock", "Safe Vault Security Mechanism", "Employee Time-Punch Terminal"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_Fingerprint_Lock.ino",
        language: "cpp",
        code: `// ESP32 Fingerprint Sensor Lock
#include <Adafruit_Fingerprint.h>

HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
const int RELAY_PIN = 23;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Inactive

  mySerial.begin(57600, SERIAL_8N1, 16, 17);
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("[FP] Fingerprint sensor detected!");
  } else {
    Serial.println("[FP] Sensor communication error!");
    while (1) { delay(1); }
  }
}

void loop() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return;

  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    Serial.printf("[MATCH] Verified ID #%d (Confidence: %d)\\n", finger.fingerID, finger.confidence);
    digitalWrite(RELAY_PIN, LOW); // Unlock
    delay(3000);
    digitalWrite(RELAY_PIN, HIGH); // Lock
  } else {
    Serial.println("[DENIED] Fingerprint not recognized.");
  }
  delay(1000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What happens if power goes out?", answer: "The fingerprint templates are stored in non-volatile flash memory inside the AS608 and will never be lost." }
    ]),
    downloadFileName: "esp32-fingerprint-door-lock.zip"
  },

  {
    title: "ESP32 Bluetooth BLE Remote Control Car",
    slug: "esp32-bluetooth-ble-rc-car",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3-4 Hours",
    estimatedCost: "₹1100 - ₹1500",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Differential drive robot car operated over Bluetooth Low Energy (BLE) via smartphone gamepad app with variable speed PWM.",
    description: "Build an agile 2WD/4WD robotics platform controlled wirelessly from any Android/iOS smartphone using Bluetooth 4.2 BLE. Employs dual H-bridge L298N motor driver with PWM speed profiles and collision failsafe timeout.",
    categorySlug: "robotics",
    technologies: ["esp32", "ble", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.1.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit", qty: "1", specs: "ESP-WROOM-32", estCost: "₹380" },
      { component: "L298N Dual H-Bridge Driver", qty: "1", specs: "2A Dual Motor Controller", estCost: "₹160" },
      { component: "TT Gearmotors + Wheels", qty: "2 or 4", specs: "3-6V Bo Motors with 65mm Wheels", estCost: "₹240" },
      { component: "2-Wheel Robot Chassis", qty: "1", specs: "Acrylic platform + castor", estCost: "₹220" },
      { component: "2x 18650 Li-ion Batteries (7.4V)", qty: "2", specs: "2200mAh with holder", estCost: "₹280" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 14", componentPin: "IN1", component: "L298N", notes: "Left Motor Forward" },
      { boardPin: "GPIO 27", componentPin: "IN2", component: "L298N", notes: "Left Motor Reverse" },
      { boardPin: "GPIO 26", componentPin: "IN3", component: "L298N", notes: "Right Motor Forward" },
      { boardPin: "GPIO 25", componentPin: "IN4", component: "L298N", notes: "Right Motor Reverse" },
      { boardPin: "GPIO 12", componentPin: "ENA", component: "L298N", notes: "Left Speed PWM" },
      { boardPin: "GPIO 33", componentPin: "ENB", component: "L298N", notes: "Right Speed PWM" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Dabble or Serial Bluetooth Terminal App"]),
    librariesJson: JSON.stringify([
      { name: "BLEDevice", author: "Espressif", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "BLE GATT Server", detail: "Advertises 'BRK_ESP32_CAR' with Nordic UART Service (NUS) UUIDs for zero-latency packet stream." },
      { step: 2, title: "Packet Decoder", detail: "Decodes single-character commands: 'F' (forward), 'B' (backward), 'L' (left), 'R' (right), 'S' (stop)." },
      { step: 3, title: "Failsafe Watchdog", detail: "If no BLE packet received within 400ms, motors stop immediately to prevent runaway crashes." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Assemble Chassis", instruction: "Mount motors to acrylic plate, install castor wheel at rear." },
      { step: 2, title: "Wire L298N Driver", instruction: "Connect motor leads to OUT1/OUT2 and OUT3/OUT4. Wire inputs to ESP32 GPIOs." },
      { step: 3, title: "Common Ground", instruction: "IMPORTANT: Connect battery ground, L298N GND, and ESP32 GND together." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on car", "Open Bluetooth terminal on phone and pair with 'BRK_ESP32_CAR'", "Send 'F' and confirm car moves forward smoothly"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[BLE] Server advertising started as BRK_ESP32_CAR\n[BLE] Device connected!\n[CMD] FORWARD -> Speed: 220"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "ESP32 resets whenever motors turn on", cause: "Motor electrical noise and voltage drop on ESP32 power line", solution: "Power ESP32 from independent power rail or add a 100uF capacitor across motor driver terminals." }
    ]),
    applicationsJson: JSON.stringify(["Autonomous Mobile Robotics Platform", "STEM Educational Robotics", "Wireless Teleoperation Vehicle"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_BLE_Car.ino",
        language: "cpp",
        code: `// ESP32 Bluetooth BLE RC Car
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"

const int IN1 = 14, IN2 = 27, IN3 = 26, IN4 = 25;

void moveStop()    { digitalWrite(IN1,LOW); digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,LOW); }
void moveForward() { digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW); }
void moveBackward(){ digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }
void turnLeft()    { digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW); }
void turnRight()   { digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); }

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      String rxValue = pCharacteristic->getValue();
      if (rxValue.length() > 0) {
        char cmd = rxValue[0];
        if (cmd == 'F') moveForward();
        else if (cmd == 'B') moveBackward();
        else if (cmd == 'L') turnLeft();
        else if (cmd == 'R') turnRight();
        else moveStop();
      }
    }
};

void setup() {
  Serial.begin(115200);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  moveStop();

  BLEDevice::init("BRK_ESP32_CAR");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_WRITE
                                       );
  pCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("[BLE] Car ready for connection.");
}

void loop() {
  delay(50);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the wireless control range?", answer: "Typical Bluetooth Low Energy line-of-sight range is between 15 and 30 meters." }
    ]),
    downloadFileName: "esp32-bluetooth-ble-rc-car.zip"
  },

  {
    title: "ESP32 Wi-Fi Teleoperation Robot Car with Web Joystick",
    slug: "esp32-wifi-robot-car",
    platform: "ESP32",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "3 Hours",
    estimatedCost: "₹1200 - ₹1600",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Browser-controlled rover streaming an on-screen touch joystick over local Wi-Fi with differential PWM motor steering.",
    description: "Mobile robot car hosting an onboard HTML5 touch joystick. Connect directly to the robot's Wi-Fi Access Point ('BRK-ROBOT') from any smartphone browser without needing home Wi-Fi or router infrastructure.",
    categorySlug: "robotics",
    technologies: ["esp32", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "ESP32 DevKit", qty: "1", specs: "ESP32 30-pin", estCost: "₹380" },
      { component: "L298N Dual Motor Driver", qty: "1", specs: "2A Dual H-Bridge", estCost: "₹160" },
      { component: "Robot Chassis Kit", qty: "1", specs: "2 Motors + Castor + Wheels", estCost: "₹350" },
      { component: "7.4V Li-ion Battery Pack", qty: "1", specs: "2x 18650 cells with BMS", estCost: "₹320" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "GPIO 14", componentPin: "IN1", component: "L298N", notes: "Motor Left Forward" },
      { boardPin: "GPIO 27", componentPin: "IN2", component: "L298N", notes: "Motor Left Reverse" },
      { boardPin: "GPIO 26", componentPin: "IN3", component: "L298N", notes: "Motor Right Forward" },
      { boardPin: "GPIO 25", componentPin: "IN4", component: "L298N", notes: "Motor Right Reverse" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "ESPAsyncWebServer", author: "me-no-dev", installMethod: "ZIP", version: "1.2.4" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Autonomous AP Mode", detail: "ESP32 spins up self-contained Wi-Fi Access Point on 192.168.4.1." },
      { step: 2, title: "Nipple.js Virtual Joystick", detail: "Client browser renders responsive multi-directional touch stick dispatching XY velocity vectors." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Flash Access Point Code", instruction: "Upload sketch. Connect phone to Wi-Fi SSID 'BRK-ROBOT'." },
      { step: 2, title: "Open 192.168.4.1", instruction: "Navigate to the robot IP to drive." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Connect phone to BRK-ROBOT", "Open 192.168.4.1", "Drag virtual joystick forward and verify wheels turn forward"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[AP] Access Point started: BRK-ROBOT (192.168.4.1)\n[HTTP] Client connected from 192.168.4.2"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Motors spin in opposite directions", cause: "Inverted motor leads", solution: "Swap OUT1 and OUT2 leads on the motor driver terminal block." }
    ]),
    applicationsJson: JSON.stringify(["Search & Inspection Rover", "Telepresence Camera Platform", "Robotics Competitions"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_WiFi_Robot.ino",
        language: "cpp",
        code: `// ESP32 Wi-Fi Robot Car with Web Joystick
#include <WiFi.h>
#include <WebServer.h>

WebServer server(80);
const int IN1 = 14, IN2 = 27, IN3 = 26, IN4 = 25;

void setup() {
  Serial.begin(115200);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);

  WiFi.softAP("BRK-ROBOT", "12345678");
  Serial.println("AP IP: " + WiFi.softAPIP().toString());

  server.on("/", []() {
    server.send(200, "text/html", "<h2>BRK Robot</h2><p><a href='/f'>FWD</a> | <a href='/b'>REV</a> | <a href='/l'>LEFT</a> | <a href='/r'>RIGHT</a> | <a href='/s'>STOP</a></p>");
  });

  server.on("/f", []() { digitalWrite(IN1,HIGH); digitalWrite(IN2,LOW); digitalWrite(IN3,HIGH); digitalWrite(IN4,LOW); server.send(200,"text/plain","OK"); });
  server.on("/b", []() { digitalWrite(IN1,LOW); digitalWrite(IN2,HIGH); digitalWrite(IN3,LOW); digitalWrite(IN4,HIGH); server.send(200,"text/plain","OK"); });
  server.on("/s", []() { digitalWrite(IN1,LOW); digitalWrite(IN2,LOW); digitalWrite(IN3,LOW); digitalWrite(IN4,LOW); server.send(200,"text/plain","OK"); });

  server.begin();
}

void loop() {
  server.handleClient();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Do I need home Wi-Fi?", answer: "No! The ESP32 broadcasts its own independent Wi-Fi hotspot in the field." }
    ]),
    downloadFileName: "esp32-wifi-robot-car.zip"
  },

  {
    title: "ESP32-CAM Surveillance Camera & Motion Streamer",
    slug: "esp32-cam-surveillance-camera",
    platform: "ESP32",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "2-3 Hours",
    estimatedCost: "₹750 - ₹1050",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Standalone Wi-Fi video streaming camera with OV2640 2MP lens, micro-SD snapshot recording, and PIR motion detection trigger.",
    description: "Compact IP surveillance camera powered by the ESP32-CAM AI-Thinker board. Streams smooth MJPEG video at SVGA/VGA resolutions over HTTP, triggers high-intensity onboard flash LED during dark conditions, and automatically logs intrusion photos to micro-SD card.",
    categorySlug: "esp32",
    technologies: ["esp32", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "3.0.0",
    bomJson: JSON.stringify([
      { component: "ESP32-CAM Module (AI-Thinker)", qty: "1", specs: "Includes OV2640 2MP Camera", estCost: "₹450" },
      { component: "FTDI USB-to-TTL Serial Adapter", qty: "1", specs: "FT232RL or CH340 with 3.3V/5V jumper", estCost: "₹180" },
      { component: "Micro SD Card (16GB/32GB)", qty: "1", specs: "Class 10 FAT32 formatted", estCost: "₹280" },
      { component: "HC-SR501 PIR Motion Sensor", qty: "1", specs: "Infrared human body detector", estCost: "₹70" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "U0TXD", componentPin: "RXD", component: "FTDI Programmer", notes: "Serial Upload & Debug" },
      { boardPin: "U0RXD", componentPin: "TXD", component: "FTDI Programmer", notes: "Serial Upload & Debug" },
      { boardPin: "GPIO 0", componentPin: "GND", component: "ESP32-CAM", notes: "BRIDGE TO GND FOR FLASHING ONLY" },
      { boardPin: "5V", componentPin: "5V (2A)", component: "External Supply", notes: "Camera draws up to 350mA peak" },
      { boardPin: "GPIO 13", componentPin: "OUT", component: "PIR Motion Sensor", notes: "External motion trigger" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "ESP32 Core by Espressif"]),
    librariesJson: JSON.stringify([
      { name: "esp_camera", author: "Espressif", installMethod: "Built-in ESP32 Core", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "DVP Camera Interface", detail: "Captures JPEG frames directly from OV2640 image sensor into 4MB PSRAM buffer." },
      { step: 2, title: "MJPEG Video Pipeline", detail: "Streams continuous multipart/x-mixed-replace frame stream to HTTP web clients at 20fps." },
      { step: 3, title: "SD Card Storage", detail: "Writes timestamped capture files '/capture_YYYYMMDD_HHMMSS.jpg' onto FAT32 SD filesystem." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Connect FTDI Adapter", instruction: "Wire FTDI 5V, GND, TX->U0RXD, RX->U0TXD. Short GPIO 0 to GND with a jumper." },
      { step: 2, title: "Select Board in IDE", instruction: "Select board 'AI Thinker ESP32-CAM', set CPU Frequency to 240MHz, Flash Frequency to 80MHz." },
      { step: 3, title: "Flash & Remove Jumper", instruction: "Hit Upload. When complete, remove the GPIO 0 jumper and press the RESET button." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Remove GPIO 0 jumper and press Reset button", "Open Serial Monitor at 115200 baud to view IP address", "Open browser and navigate to http://<IP>:81/stream to watch live video"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[CAM] PSRAM found and initialized\n[CAM] OV2640 camera probe successful\n[WIFI] Connected to LAN: 192.168.1.135\n[STREAM] Video stream server listening at http://192.168.1.135:81/stream"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Camera init failed with error 0x20001", cause: "Ribbon cable loose or insufficient 5V current", solution: "Reseat the OV2640 gold ribbon cable in the FPC connector and power with stable 5V 2A supply." },
      { problem: "Failed to connect to ESP32: Timed out waiting for packet header", cause: "GPIO 0 not tied to ground during boot", solution: "Ensure GPIO 0 is connected to GND before pressing RESET prior to clicking Upload in IDE." }
    ]),
    applicationsJson: JSON.stringify(["Doorbell Smart Video Camera", "Birdhouse & Wildlife Monitoring Rig", "Remote 3D Printer Print Failure Detector"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP32_CAM_Server.ino",
        language: "cpp",
        code: `// ESP32-CAM Video Streamer (AI-Thinker)
#include "esp_camera.h"
#include <WiFi.h>

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void startCameraServer();

void setup() {
  Serial.begin(115200);

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 12;
  config.fb_count = 2;

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\\n", err);
    return;
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  Serial.println("Camera Ready! Use 'http://" + WiFi.localIP().toString() + "' to connect");
}

void loop() {
  delay(10000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Why does it need an FTDI programmer?", answer: "The ESP32-CAM board lacks an onboard USB-to-UART chip to minimize size and cost. An external FTDI or Arduino UNO can be used for flashing." }
    ]),
    downloadFileName: "esp32-cam-surveillance-camera.zip"
  }
];

module.exports = { esp32Projects };
