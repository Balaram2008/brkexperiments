const categories = [
  {
    name: "Artificial Intelligence",
    slug: "ai",
    description: "Advanced neural architectures, LLM orchestration, agentic workflows, and semantic pipelines.",
    icon: "Cpu",
  },
  {
    name: "Computer Vision",
    slug: "computer-vision",
    description: "Real-time edge perception, object tracking, biometric inference, and spatial vision telemetry.",
    icon: "Eye",
  },
  {
    name: "IoT & Hardware",
    slug: "iot",
    description: "Industrial sensor streaming, microcontrollers, telemetry gateways, and edge hardware.",
    icon: "Wifi",
  },
  {
    name: "Cloud & Distributed Systems",
    slug: "cloud",
    description: "Kubernetes operators, microservice event backbones, and zero-downtime streaming fabrics.",
    icon: "Cloud",
  },
  {
    name: "Web & Realtime",
    slug: "web",
    description: "CRDT collaboration canvases, WebSockets, high-frequency UIs, and state synchronization.",
    icon: "Globe",
  },
  {
    name: "Cybersecurity",
    slug: "security",
    description: "Zero-trust network perimeters, eBPF security monitors, cryptographically verified audit trails.",
    icon: "Shield",
  },
  {
    name: "Developer Tools",
    slug: "dev-tools",
    description: "High-performance compilers, terminal instrumentation, productivity engines, and SDKs.",
    icon: "Terminal",
  },
  {
    name: "The Experiment Lab",
    slug: "experiments",
    description: "Bleeding-edge prototypes, quantum circuit simulators, strange interactive visuals, and exploratory tech.",
    icon: "FlaskConical",
  },
];

const technologies = [
  { name: "Python", slug: "python", color: "#3B82F6" },
  { name: "Next.js", slug: "nextjs", color: "#FFFFFF" },
  { name: "React", slug: "react", color: "#06B6D4" },
  { name: "TypeScript", slug: "typescript", color: "#3B82F6" },
  { name: "FastAPI", slug: "fastapi", color: "#10B981" },
  { name: "PyTorch", slug: "pytorch", color: "#EF4444" },
  { name: "OpenCV", slug: "opencv", color: "#8B5CF6" },
  { name: "Node.js", slug: "nodejs", color: "#22C55E" },
  { name: "Go", slug: "go", color: "#00ADD8" },
  { name: "Rust", slug: "rust", color: "#F97316" },
  { name: "Docker", slug: "docker", color: "#0284C7" },
  { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" },
  { name: "WebSockets", slug: "websockets", color: "#EAB308" },
  { name: "PostgreSQL", slug: "postgresql", color: "#336791" },
  { name: "SQLite", slug: "sqlite", color: "#003B57" },
  { name: "Redis", slug: "redis", color: "#DC2626" },
  { name: "ESP32", slug: "esp32", color: "#D97706" },
  { name: "MQTT", slug: "mqtt", color: "#6366F1" },
  { name: "Three.js", slug: "threejs", color: "#EC4899" },
  { name: "LangChain", slug: "langchain", color: "#14B8A6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#38BDF8" },
  { name: "Solidity", slug: "solidity", color: "#627EEA" }
];

module.exports = { categories, technologies };
