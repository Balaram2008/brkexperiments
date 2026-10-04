const hardwareCategories = [
  {
    name: "ESP32 Lab",
    slug: "esp32",
    description: "Wi-Fi + Bluetooth BLE + IoT + Edge AI + ESP32-CAM automation systems.",
    icon: "Cpu",
  },
  {
    name: "Arduino UNO Lab",
    slug: "arduino-uno",
    description: "Beginner electronics, robotics, sensor telemetry, and foundational automation.",
    icon: "Terminal",
  },
  {
    name: "Arduino Nano Lab",
    slug: "arduino-nano",
    description: "Compact embedded systems, wearables, pocket instruments, and miniaturized robotics.",
    icon: "Atom",
  },
  {
    name: "Arduino Mega Lab",
    slug: "arduino-mega",
    description: "High I/O capacity, multi-channel relays, multi-sensor weather hubs, and industrial controllers.",
    icon: "Layers",
  },
  {
    name: "ESP8266 Lab",
    slug: "esp8266",
    description: "Ultra low-cost Wi-Fi IoT microcontrollers, cloud nodes, and smart home modules.",
    icon: "Wifi",
  },
  {
    name: "Robotics & Motion",
    slug: "robotics",
    description: "Motor drivers, line trackers, obstacle avoiders, and multi-axis servo arms.",
    icon: "Flame",
  },
  {
    name: "Smart Home & Automation",
    slug: "home-automation",
    description: "Relays, touchless sensors, smart dustbins, lighting controllers, and automated door locks.",
    icon: "Shield",
  },
  {
    name: "Environmental & Sensors",
    slug: "environmental",
    description: "Weather stations, soil irrigation probes, gas detectors, and air quality monitors.",
    icon: "FlaskConical",
  }
];

const hardwareTechnologies = [
  { name: "ESP32", slug: "esp32", color: "#EF4444" },
  { name: "Arduino UNO", slug: "arduino-uno", color: "#00979C" },
  { name: "Arduino Nano", slug: "arduino-nano", color: "#008184" },
  { name: "Arduino Mega", slug: "arduino-mega", color: "#006468" },
  { name: "ESP8266", slug: "esp8266", color: "#3B82F6" },
  { name: "C++ / Arduino", slug: "cpp-arduino", color: "#6366F1" },
  { name: "Wi-Fi", slug: "wifi", color: "#10B981" },
  { name: "BLE", slug: "ble", color: "#06B6D4" },
  { name: "MQTT", slug: "mqtt", color: "#F59E0B" },
  { name: "I2C / SPI", slug: "i2c-spi", color: "#8B5CF6" },
  { name: "Relay Module", slug: "relay", color: "#EC4899" },
  { name: "Ultrasonic", slug: "ultrasonic", color: "#14B8A6" },
  { name: "RFID", slug: "rfid", color: "#EAB308" },
  { name: "Servo Motor", slug: "servo", color: "#F97316" },
  { name: "OLED SSD1306", slug: "oled", color: "#38BDF8" }
];

module.exports = { hardwareCategories, hardwareTechnologies };
