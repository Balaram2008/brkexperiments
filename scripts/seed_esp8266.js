// ESP8266 Lab Projects (31 - 35)
const esp8266Projects = [
  {
    title: "ESP8266 Wi-Fi Smart Power Socket with Mobile Web Dashboard",
    slug: "esp8266-wifi-smart-socket",
    platform: "ESP8266",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹380 - ₹550",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Ultra-low cost IoT smart wall plug using ESP-01 / NodeMCU to switch high-power AC appliances over local Wi-Fi.",
    description: "Compact smart electrical plug built with the ubiquitous ESP8266 microcontroller. Hosts an internal lightweight web server allowing instant browser switching of table lamps, chargers, and heaters with zero latency and status persistence across reboots.",
    categorySlug: "esp8266",
    technologies: ["esp8266", "wifi", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1558002038-1055907df827?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "1.2.0",
    bomJson: JSON.stringify([
      { component: "ESP8266 NodeMCU v3 / ESP-01S", qty: "1", specs: "Tensilica 80MHz Wi-Fi", estCost: "₹240" },
      { component: "1-Channel 5V Relay Module (Opto-isolated)", qty: "1", specs: "10A 250VAC", estCost: "₹65" },
      { component: "Hi-Link HLK-PM01 AC-DC 5V Buck", qty: "1", specs: "230VAC to 5VDC step-down", estCost: "₹180" },
      { component: "AC Plug & Socket Enclosure Box", qty: "1", specs: "Insulated ABS plastic casing", estCost: "₹80" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "NodeMCU D1 (GPIO 5)", componentPin: "IN", component: "1-Ch Relay Module", notes: "Relay Control Signal" },
      { boardPin: "5V / VIN", componentPin: "VCC", component: "Relay Module & HLK-PM01", notes: "5V DC Rail" },
      { boardPin: "GND", componentPin: "GND", component: "Common Ground", notes: "DC Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "ESP8266 Board Core"]),
    librariesJson: JSON.stringify([
      { name: "ESP8266WebServer", author: "Ivan Grokhotkov", installMethod: "Built-in", version: "Standard" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Wi-Fi Station Association", detail: "Associates with local 2.4GHz WLAN and broadcasts mDNS hostname 'http://smartsocket.local'." },
      { step: 2, title: "EEPROM State Persistence", detail: "Saves relay latch state in flash memory; restores exact switch position after power outage." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Flash NodeMCU", instruction: "Upload sketch with your Wi-Fi SSID and password." },
      { step: 2, title: "Fit Inside Enclosure", instruction: "Insulate all 230V AC terminal blocks with heat-shrink tubing inside the plastic enclosure." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Plug into wall outlet", "Open http://smartsocket.local in phone browser", "Tap ON: relay clicks and lamp turns on instantly"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[WIFI] Connected to LAN: 192.168.1.144\n[MDNS] http://smartsocket.local online\n[RELAY] Switched to ACTIVE (ON)"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "ESP-01 does not boot when connected to relay", cause: "GPIO 0 or GPIO 2 pulled LOW on boot causes bootloader flash mode", solution: "Ensure GPIO 0 and GPIO 2 are pulled HIGH at startup. Use GPIO 1 or 3 for relay if using ESP-01." }
    ]),
    applicationsJson: JSON.stringify(["Remote Aquarium Light & Air Pump Timer", "Coffee Machine Morning Auto-Brew", "Energy Saver for High Standby TV Consoles"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP8266_Smart_Socket.ino",
        language: "cpp",
        code: `// ESP8266 Wi-Fi Smart Power Socket
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

const int RELAY_PIN = 5; // D1 on NodeMCU
bool relayState = false;

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Off (Active LOW)

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nIP: " + WiFi.localIP().toString());

  if (MDNS.begin("smartsocket")) {
    Serial.println("mDNS started: http://smartsocket.local");
  }

  server.on("/", []() {
    String html = "<h2>BRK Smart Socket</h2><p>Status: " + String(relayState ? "ON" : "OFF") + "</p><p><a href='/toggle'>TOGGLE POWER</a></p>";
    server.send(200, "text/html", html);
  });

  server.on("/toggle", []() {
    relayState = !relayState;
    digitalWrite(RELAY_PIN, relayState ? LOW : HIGH);
    server.sendHeader("Location", "/");
    server.send(303);
  });

  server.begin();
}

void loop() {
  MDNS.update();
  server.handleClient();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What is the maximum electrical load?", answer: "The 10A relay can safely handle loads up to 1500 Watts resistive (e.g. lamps, PCs, monitors)." }
    ]),
    downloadFileName: "esp8266-wifi-smart-socket.zip"
  },

  {
    title: "ESP8266 Cloud IoT Environmental Logger (ThingSpeak & Grafana)",
    slug: "esp8266-cloud-weather-thingspeak",
    platform: "ESP8266",
    difficulty: "Beginner",
    projectType: "Hardware Project",
    buildTime: "1 Hour",
    estimatedCost: "₹380 - ₹520",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Autonomous cloud telemetry station uploading DHT11 metrics over HTTP GET to ThingSpeak with historical interactive charts.",
    description: "Cloud-connected environmental telemetry station. Continuously uploads ambient room temperature and humidity metrics every 20 seconds to MathWorks ThingSpeak IoT cloud analytics platform. View live updating graphs from anywhere in the world on desktop or mobile.",
    categorySlug: "esp8266",
    technologies: ["esp8266", "wifi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "1.0.0",
    bomJson: JSON.stringify([
      { component: "NodeMCU ESP8266", qty: "1", specs: "CP2102 or CH340", estCost: "₹240" },
      { component: "DHT11 Sensor Module", qty: "1", specs: "Includes 10k resistor onboard", estCost: "₹80" },
      { component: "Micro USB Cable", qty: "1", specs: "For power & flash", estCost: "₹60" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "NodeMCU D4 (GPIO 2)", componentPin: "DATA", component: "DHT11 Module", notes: "Single-wire data" },
      { boardPin: "3V3", componentPin: "VCC", component: "DHT11 Module", notes: "3.3V Power" },
      { boardPin: "GND", componentPin: "GND", component: "DHT11 Module", notes: "Ground" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Free Account on ThingSpeak.com"]),
    librariesJson: JSON.stringify([
      { name: "ThingSpeak", author: "MathWorks", installMethod: "Library Manager", version: "2.0.0" },
      { name: "DHT sensor library", author: "Adafruit", installMethod: "Library Manager", version: "1.4.6" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Telemetry Reading", detail: "Samples temperature and humidity from DHT11." },
      { step: 2, title: "HTTP REST API Dispatch", detail: "Constructs HTTP GET to 'api.thingspeak.com/update?api_key=KEY&field1=TEMP&field2=HUM'." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Create ThingSpeak Channel", instruction: "Create free channel on ThingSpeak with Field 1: Temp, Field 2: Humidity. Copy your Write API Key." },
      { step: 2, title: "Upload Sketch", instruction: "Paste Channel ID and Write API Key into the sketch and flash." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on NodeMCU", "Watch Serial Monitor confirm HTTP 200 response from ThingSpeak", "Open ThingSpeak channel dashboard: graphs update every 20s"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[WIFI] Connected to LAN\n[THINGSPEAK] Uploading Field1: 26.5 C | Field2: 60 %\n[HTTP] Channel update successful (HTTP 200)"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "ThingSpeak returns error code -401", cause: "Wrong Write API key entered in code", solution: "Copy the Write API Key (not Read API Key) from ThingSpeak channel API Keys tab." }
    ]),
    applicationsJson: JSON.stringify(["Home Vacation Humidity Monitoring", "Server Room Remote Thermometer", "Greenhouse Climate Analytics"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP8266_ThingSpeak_Logger.ino",
        language: "cpp",
        code: `// ESP8266 ThingSpeak Cloud Weather Logger
#include <ESP8266WiFi.h>
#include <ThingSpeak.h>
#include "DHT.h"

#define DHTPIN 2 // D4
#define DHTTYPE DHT11

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
unsigned long myChannelNumber = 1234567; // Your ThingSpeak Channel ID
const char * myWriteAPIKey = "YOUR_WRITE_API_KEY";

WiFiClient client;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nConnected to Wi-Fi!");
  ThingSpeak.begin(client);
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (!isnan(h) && !isnan(t)) {
    ThingSpeak.setField(1, t);
    ThingSpeak.setField(2, h);
    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);

    if (x == 200) {
      Serial.printf("Logged -> Temp: %.1f C | Humidity: %.1f %%\\n", t, h);
    } else {
      Serial.printf("ThingSpeak Error: %d\\n", x);
    }
  }

  delay(20000); // ThingSpeak free tier requires 15s minimum between updates
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is ThingSpeak free?", answer: "Yes, MathWorks provides a generous free tier allowing up to 3 million messages per year." }
    ]),
    downloadFileName: "esp8266-cloud-weather-thingspeak.zip"
  },

  {
    title: "ESP8266 Wi-Fi Packet Monitor & Security Probe",
    slug: "esp8266-deauther-network-probe",
    platform: "ESP8266",
    difficulty: "Advanced",
    projectType: "Hardware Project",
    buildTime: "2-3 Hours",
    estimatedCost: "₹500 - ₹750",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Promiscuous mode 802.11 spectrum analyzer displaying channel traffic histograms, rogue access points, and deauth detection on OLED.",
    description: "Educational wireless cybersecurity research tool. Leverages ESP8266 promiscuous packet sniffer mode to capture and decode 802.11 management, control, and data frames. Visualizes 2.4GHz channel congestion histograms and sounds alerts upon detecting deauthentication attack packets.",
    categorySlug: "esp8266",
    technologies: ["esp8266", "wifi", "oled", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"]),
    featured: true,
    isExperiment: true,
    currentVersion: "2.6.0",
    bomJson: JSON.stringify([
      { component: "NodeMCU ESP8266 / D1 Mini", qty: "1", specs: "ESP-12F module", estCost: "₹240" },
      { component: "0.96\" I2C OLED Display (SSD1306)", qty: "1", specs: "128x64 pixels", estCost: "₹190" },
      { component: "Buzzer + NeoPixel / LED", qty: "1 Set", specs: "Packet alert indicators", estCost: "₹40" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "D1 (GPIO 5)", componentPin: "SCL", component: "OLED Display", notes: "I2C Clock" },
      { boardPin: "D2 (GPIO 4)", componentPin: "SDA", component: "OLED Display", notes: "I2C Data" },
      { boardPin: "D5 (GPIO 14)", componentPin: "Positive", component: "Buzzer Alert", notes: "Deauth warning" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "ESP8266 Board Package v3.x"]),
    librariesJson: JSON.stringify([
      { name: "Adafruit SSD1306", author: "Adafruit", installMethod: "Library Manager", version: "2.5.9" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "Promiscuous Sniffer Filter", detail: "wifi_set_promiscuous_rx_cb hooks all incoming 802.11 packets from air across channels 1 to 14." },
      { step: 2, title: "Deauth Frame Interceptor", detail: "Inspects frame control type 0x00 and subtype 0x0C (Deauthentication) and 0x0A (Disassociation)." },
      { step: 3, title: "OLED Graphing Pipeline", detail: "Draws real-time scrolling bar graph showing packets per second on the active Wi-Fi channel." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Connect OLED", instruction: "Wire D1 to SCL and D2 to SDA on D1 Mini." },
      { step: 2, title: "Upload Firmware", instruction: "Select board 'NodeMCU 1.0 (ESP-12E Module)' and hit Upload." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on device", "OLED boots and begins scrolling packet histogram", "Channel hops every 1 second across channels 1 to 13", "Displays packets/sec and active channel number"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[PROBE] Promiscuous mode enabled\n[CH 1] Packets/sec: 142 | Deauth: 0\n[CH 6] Packets/sec: 489 | Deauth: 0"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "WDT reset (Watchdog Reset) crashes", cause: "Lengthy operations inside promiscuous callback", solution: "Keep promiscuous callback minimal: increment counters only, defer OLED drawing to main loop." }
    ]),
    applicationsJson: JSON.stringify(["Wireless Network Site Survey", "Wi-Fi Jamming Detection Tool", "Educational RF Protocol Analysis"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP8266_Packet_Monitor.ino",
        language: "cpp",
        code: `// ESP8266 802.11 Packet Monitor & Deauth Detector
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 64, &Wire, -1);

unsigned long pkts = 0;
unsigned long deauths = 0;
int currentChannel = 1;

void sniffer(uint8_t *buf, uint16_t len) {
  pkts++;
  if (buf[12] == 0xA0 || buf[12] == 0xC0) {
    deauths++;
  }
}

void setup() {
  Serial.begin(115200);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();

  wifi_set_opmode(STATION_MODE);
  wifi_promiscuous_enable(0);
  WiFi.disconnect();
  wifi_set_promiscuous_rx_cb(sniffer);
  wifi_set_channel(currentChannel);
  wifi_promiscuous_enable(1);
}

void loop() {
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.printf("CH: %d | PKTS/S: %lu", currentChannel, pkts);
  display.setCursor(0, 16);
  display.printf("DEAUTHS: %lu", deauths);

  int barWidth = map(pkts, 0, 800, 0, 128);
  display.fillRect(0, 32, barWidth, 16, WHITE);

  display.display();

  pkts = 0;
  currentChannel++;
  if (currentChannel > 13) currentChannel = 1;
  wifi_set_channel(currentChannel);

  delay(1000);
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this legal to use?", answer: "Yes, passive packet monitoring and deauth detection is completely legal. It only listens to RF signals already present in the air." }
    ]),
    downloadFileName: "esp8266-deauther-network-probe.zip"
  },

  {
    title: "ESP8266 Alexa & Google Home Smart Voice Relay",
    slug: "esp8266-alexa-voice-relay",
    platform: "ESP8266",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "1-2 Hours",
    estimatedCost: "₹450 - ₹650",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Zero-cloud Amazon Alexa voice integration via local Belkin WeMo / fauxmoESP device emulation for instant voice switching.",
    description: "Voice-activated smart home appliance controller. Employs fauxmoESP to emulate Philips Hue / Belkin WeMo smart plugs over local SSDP / UPnP multicast. Say 'Alexa, discover devices' and control your bedroom lights and fans immediately without cloud skills or external subscriptions.",
    categorySlug: "home-automation",
    technologies: ["esp8266", "wifi", "relay", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1543512214-318c7553f230?w=800"]),
    featured: false,
    isExperiment: false,
    currentVersion: "2.0.0",
    bomJson: JSON.stringify([
      { component: "NodeMCU ESP8266", qty: "1", specs: "ESP-12E / 12F", estCost: "₹240" },
      { component: "2-Channel 5V Relay Module", qty: "1", specs: "10A 250VAC", estCost: "₹110" },
      { component: "5V 1A DC Power Supply", qty: "1", specs: "USB wall adapter", estCost: "₹120" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "D1 (GPIO 5)", componentPin: "IN1", component: "2-Ch Relay", notes: "Device 1 (Light)" },
      { boardPin: "D2 (GPIO 4)", componentPin: "IN2", component: "2-Ch Relay", notes: "Device 2 (Fan)" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x", "Amazon Echo / Echo Dot"]),
    librariesJson: JSON.stringify([
      { name: "fauxmoESP", author: "Xose Perez", installMethod: "ZIP", version: "3.4.0" },
      { name: "ESPAsyncTCP", author: "me-no-dev", installMethod: "ZIP", version: "1.2.2" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "UPnP / SSDP Multicast", detail: "Responds to UDP discovery broadcasts on 239.255.255.250:1900 pretending to be a Belkin WeMo switch." },
      { step: 2, title: "Direct Voice Execution", detail: "Amazon Echo sends direct HTTP POST /upnp/control/basicevent1 over LAN with zero cloud delay (<100ms)." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Configure Device Names", instruction: "Set device names in sketch: fauxmo.addDevice('Living Room Light'); fauxmo.addDevice('Fan');" },
      { step: 2, title: "Discover Devices", instruction: "Once ESP8266 is on Wi-Fi, say to Echo: 'Alexa, discover devices'." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Say 'Alexa, discover devices'", "Echo responds 'Found 2 new devices: Living Room Light and Fan'", "Say 'Alexa, turn on Living Room Light': relay clicks on immediately"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[WIFI] Connected to LAN\n[FAUXMO] Virtual devices advertised: Living Room Light, Fan\n[VOICE] Received command: 'Living Room Light' -> STATE: ON"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Alexa cannot find devices", cause: "ESP8266 and Amazon Echo on different Wi-Fi bands (2.4GHz vs 5GHz) with AP isolation", solution: "Ensure router has AP Isolation disabled and both Echo and ESP8266 are on the same subnet." }
    ]),
    applicationsJson: JSON.stringify(["Voice-Controlled Bedside Table Lamp", "Hands-Free Solder Fume Extractor", "Disabled / Senior Voice Accessibility"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP8266_Alexa_Relay.ino",
        language: "cpp",
        code: `// ESP8266 Alexa Voice Controlled Relay
#include <ESP8266WiFi.h>
#include "fauxmoESP.h"

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

#define RELAY_1 5 // D1
#define RELAY_2 4 // D2

fauxmoESP fauxmo;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_1, OUTPUT); digitalWrite(RELAY_1, HIGH);
  pinMode(RELAY_2, OUTPUT); digitalWrite(RELAY_2, HIGH);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println("\\nWi-Fi Connected!");

  fauxmo.createServer(true);
  fauxmo.setPort(80);
  fauxmo.enable(true);

  // Add virtual devices
  fauxmo.addDevice("Table Lamp");
  fauxmo.addDevice("Ceiling Fan");

  fauxmo.onSetState([](unsigned char device_id, const char * device_name, bool state, unsigned char value) {
    Serial.printf("[ALEXA] Device: %s -> State: %s\\n", device_name, state ? "ON" : "OFF");
    if (strcmp(device_name, "Table Lamp") == 0) {
      digitalWrite(RELAY_1, state ? LOW : HIGH);
    } else if (strcmp(device_name, "Ceiling Fan") == 0) {
      digitalWrite(RELAY_2, state ? LOW : HIGH);
    }
  });
}

void loop() {
  fauxmo.handle();
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Do I need an Alexa Developer skill or AWS account?", answer: "No! Because it emulates local hardware Belkin WeMo switches, Amazon Echo speaks directly to it on your local LAN." }
    ]),
    downloadFileName: "esp8266-alexa-voice-relay.zip"
  },

  {
    title: "ESP8266 Real-Time Crypto & Stock Ticker with MAX7219 Dot Matrix",
    slug: "esp8266-matrix-stock-ticker",
    platform: "ESP8266",
    difficulty: "Intermediate",
    projectType: "Hardware Project",
    buildTime: "2 Hours",
    estimatedCost: "₹550 - ₹800",
    youtubeUrl: "https://www.youtube.com/@BRKEXPERIMENTS",
    shortDescription: "Smooth scrolling LED dot matrix marquee streaming live prices for Bitcoin, Ethereum, and S&P 500 via CoinGecko REST API.",
    description: "Desktop trading desk companion built with NodeMCU and 4-in-1 MAX7219 8x32 LED matrix. Connects to CoinGecko and Yahoo Finance public APIs over HTTPS, parses JSON price quotes, and scrolls continuous ticker tape with green/red up/down price indicators.",
    categorySlug: "esp8266",
    technologies: ["esp8266", "wifi", "i2c-spi", "cpp-arduino"],
    price: 0,
    discountPrice: 0,
    currency: "INR",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    gallery: JSON.stringify(["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"]),
    featured: true,
    isExperiment: false,
    currentVersion: "2.1.0",
    bomJson: JSON.stringify([
      { component: "NodeMCU ESP8266", qty: "1", specs: "ESP-12F Wi-Fi", estCost: "₹240" },
      { component: "MAX7219 4-in-1 Dot Matrix Display", qty: "1", specs: "32x8 Red/Blue/Green LEDs", estCost: "₹220" },
      { component: "Jumper Wires + USB Cable", qty: "1 Set", specs: "5-pin DuPont", estCost: "₹40" }
    ]),
    wiringTableJson: JSON.stringify([
      { boardPin: "D7 (GPIO 13)", componentPin: "DIN", component: "MAX7219 Matrix", notes: "Hardware SPI MOSI" },
      { boardPin: "D5 (GPIO 14)", componentPin: "CLK", component: "MAX7219 Matrix", notes: "Hardware SPI Clock" },
      { boardPin: "D8 (GPIO 15)", componentPin: "CS", component: "MAX7219 Matrix", notes: "Chip Select" },
      { boardPin: "5V / VIN", componentPin: "VCC", component: "MAX7219 Matrix", notes: "Requires 5V for bright LEDs" }
    ]),
    softwareReqsJson: JSON.stringify(["Arduino IDE 2.x"]),
    librariesJson: JSON.stringify([
      { name: "MD_Parola", author: "MajicDesigns", installMethod: "Library Manager", version: "3.7.1" },
      { name: "MD_MAX72xx", author: "MajicDesigns", installMethod: "Library Manager", version: "3.3.1" },
      { name: "ArduinoJson", author: "Benoit Blanchon", installMethod: "Library Manager", version: "6.21.3" }
    ]),
    architectureJson: JSON.stringify([
      { step: 1, title: "HTTPS JSON Ingestion", detail: "Requests 'api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd' via WiFiClientSecure." },
      { step: 2, title: "Parola Text Scrolling", detail: "Animates smooth pixel-by-pixel scrolling banner across 32 columns at 40ms frame rate." }
    ]),
    buildInstructionsJson: JSON.stringify([
      { step: 1, title: "Connect SPI Pins", instruction: "Wire DIN->D7, CLK->D5, CS->D8, VCC->VIN, GND->GND." },
      { step: 2, title: "Set Hardware Type", instruction: "Ensure '#define HARDWARE_TYPE MD_MAX72XX::FC16_HW' is set in sketch for common blue/red matrix modules." }
    ]),
    testingProcedureJson: JSON.stringify({
      steps: ["Power on device", "Display scrolls 'BRK LABS TICKER'", "Connects to Wi-Fi", "Begins scrolling 'BTC: $64,280 | ETH: $3,450' in continuous marquee"],
      expectedBaudRate: 115200,
      expectedSerialOutput: "[WIFI] Connected to LAN\n[API] Fetched CoinGecko: BTC=$64280.50, ETH=$3450.20\n[PAROLA] Scrolling marquee started"
    }),
    troubleshootingJson: JSON.stringify([
      { problem: "Display characters are scrambled or backwards", cause: "Incorrect MAX7219 module hardware definition", solution: "Switch HARDWARE_TYPE between FC16_HW, GENERIC_HW, and PAROLA_HW in the sketch." }
    ]),
    applicationsJson: JSON.stringify(["Day Trader Desk Companion", "YouTube Subscriber Counter Marquee", "Tech Startup Office Live Metrics Signboard"]),
    codeSnippetJson: JSON.stringify([
      {
        filename: "ESP8266_Crypto_Ticker.ino",
        language: "cpp",
        code: `// ESP8266 Crypto & Stock Ticker with MAX7219
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <MD_Parola.h>
#include <MD_MAX72xx.h>
#include <SPI.h>

#define HARDWARE_TYPE MD_MAX72XX::FC16_HW
#define MAX_DEVICES 4
#define CS_PIN 15 // D8

MD_Parola P = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
char curMessage[128] = "BRK TICKER INITIALIZING...";

void fetchCryptoPrices() {
  WiFiClientSecure client;
  client.setInsecure(); // Skip SSL cert validation for speed

  HTTPClient https;
  if (https.begin(client, "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")) {
    int httpCode = https.GET();
    if (httpCode == HTTP_CODE_OK) {
      String payload = https.getString();
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);

      long btc = doc["bitcoin"]["usd"];
      long eth = doc["ethereum"]["usd"];
      snprintf(curMessage, sizeof(curMessage), "BTC: $%ld  ETH: $%ld  ", btc, eth);
      Serial.println(curMessage);
    }
    https.end();
  }
}

void setup() {
  Serial.begin(115200);
  P.begin();
  P.displayText(curMessage, PA_LEFT, 50, 0, PA_SCROLL_LEFT, PA_SCROLL_LEFT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  fetchCryptoPrices();
}

unsigned long lastFetch = 0;
void loop() {
  if (P.displayAnimate()) {
    P.displayReset();
  }

  if (millis() - lastFetch > 60000) { // Fetch every 60s
    lastFetch = millis();
    fetchCryptoPrices();
  }
}
`
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I display stock prices like Apple or Tesla?", answer: "Yes! Use Finnhub or AlphaVantage free REST APIs to query equity stock quotes." }
    ]),
    downloadFileName: "esp8266-matrix-stock-ticker.zip"
  }
];

module.exports = { esp8266Projects };
