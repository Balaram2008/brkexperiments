const projectsPart1 = [
  {
    title: "Smart Vision Analytics Engine",
    slug: "smart-vision-analytics-engine",
    shortDescription: "Production-ready computer vision pipeline with real-time multi-stream YOLOv8 object tracking, spatial heatmaps, and WebSocket telemetry dashboard.",
    description: "Smart Vision Analytics is an enterprise-grade video intelligence engine engineered for multi-camera feeds. It features hardware-accelerated inference with TensorRT/ONNX, automatic trajectory clustering, bounding box stabilization, and sub-15ms WebSocket state broadcasts to a reactive Next.js telemetry console.",
    categorySlug: "computer-vision",
    price: 2499,
    discountPrice: 1899,
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://vision.brkexperiments.dev",
    videoUrl: "https://assets.brkexperiments.dev/demos/vision-stream.mp4",
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "2.1.0",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "rtsp", label: "RTSP Video Feeds (H.264/HEVC)", type: "input" },
        { id: "decoder", label: "NVDEC / FFmpeg Hardware Decoder", type: "process" },
        { id: "yolo", label: "YOLOv8 + TensorRT Engine", type: "inference" },
        { id: "tracker", label: "ByteTrack Trajectory Filter", type: "process" },
        { id: "api", label: "FastAPI Async State Broadcaster", type: "api" },
        { id: "client", label: "Next.js WebGL & Canvas Dashboard", type: "client" }
      ],
      edges: [
        { from: "rtsp", to: "decoder" },
        { from: "decoder", to: "yolo" },
        { from: "yolo", to: "tracker" },
        { from: "tracker", to: "api" },
        { from: "api", to: "client" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Python 3.11+ with CUDA 12.x support (CPU fallback included)",
      "Node.js 20.x or higher",
      "8GB RAM minimum (16GB recommended for 4+ concurrent 1080p RTSP feeds)",
      "Docker & Docker Compose (optional for containerized deployments)"
    ]),
    featuresJson: JSON.stringify([
      "Concurrent 4-channel RTSP & WebRTC video pipeline with auto-reconnect",
      "YOLOv8 deep learning inference with TensorRT GPU quantization",
      "High-performance ByteTrack object tracking and boundary tripwire triggers",
      "Spatial dwell-time heatmaps rendered on interactive HTML5 Canvas overlays",
      "Real-time bidirectional WebSocket telemetry with protobuf support",
      "Comprehensive REST API with JWT role-based camera access tokens",
      "Docker multi-stage compose setup with GPU passthrough support"
    ]),
    folderTreeJson: JSON.stringify({
      name: "smart-vision-analytics",
      children: [
        { name: "backend", children: [{ name: "pipeline", children: [{ name: "detector.py" }, { name: "tracker.py" }, { name: "streamer.py" }] }, { name: "api", children: [{ name: "routes.py" }, { name: "auth.py" }] }, { name: "main.py" }, { name: "requirements.txt" }] },
        { name: "frontend", children: [{ name: "src", children: [{ name: "components", children: [{ name: "VideoCanvas.tsx" }, { name: "HeatmapLayer.tsx" }, { name: "TelemetryBar.tsx" }] }, { name: "hooks", children: [{ name: "useStreamSocket.ts" }] }, { name: "app", children: [{ name: "page.tsx" }] }] }, { name: "package.json" }] },
        { name: "docker-compose.yml" },
        { name: "README.md" }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "backend/pipeline/detector.py",
        language: "python",
        code: "import cv2\nimport torch\nfrom ultralytics import YOLO\n\nclass VisionEngine:\n    def __init__(self, model_path: str = 'models/yolov8n.pt', device: str = 'cuda'):\n        self.device = torch.device(device if torch.cuda.is_available() else 'cpu')\n        self.model = YOLO(model_path).to(self.device)\n        print(f'[SYS/001] Vision Engine running on {self.device}')\n\n    def infer_frame(self, frame):\n        results = self.model.track(frame, persist=True, conf=0.45, verbose=False)\n        boxes = results[0].boxes\n        return {\n            'detections': len(boxes),\n            'coordinates': boxes.xyxy.cpu().numpy().tolist() if len(boxes) else [],\n            'classes': boxes.cls.cpu().numpy().tolist() if len(boxes) else []\n        }"
      },
      {
        filename: "frontend/hooks/useStreamSocket.ts",
        language: "typescript",
        code: "import { useEffect, useState, useRef } from 'react';\n\nexport function useStreamSocket(streamUrl: string) {\n  const [metrics, setMetrics] = useState({ fps: 30, count: 0 });\n  const wsRef = useRef<WebSocket | null>(null);\n\n  useEffect(() => {\n    const ws = new WebSocket(streamUrl);\n    wsRef.current = ws;\n    ws.onmessage = (event) => {\n      const payload = JSON.parse(event.data);\n      setMetrics(payload.metrics);\n    };\n    return () => ws.close();\n  }, [streamUrl]);\n\n  return { metrics };\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Does this require an NVIDIA GPU?", answer: "While TensorRT acceleration yields highest frame-rates (60+ FPS), the codebase automatically falls back to optimized CPU inference using ONNX Runtime." },
      { question: "Can I connect my own IP cameras?", answer: "Yes! The system natively accepts standard RTSP, RTMP, and HTTP video streams via standard configuration in config.yaml." },
      { question: "Are updates included with the purchase?", answer: "All purchasers receive lifetime access to future model updates, bug fixes, and upgraded client components." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v2.1.0", date: "2026-09-18", notes: "Added TensorRT FP16 quantization support, reducing inference latency by 42% on RTX cards." },
      { version: "v2.0.0", date: "2026-07-04", notes: "Rewrote frontend in Next.js 14 App Router with WebGL spatial canvas rendering." },
      { version: "v1.0.0", date: "2026-03-12", notes: "Initial release with YOLOv8 inference and FastAPI streaming endpoints." }
    ]),
    downloadFileName: "smart-vision-analytics-v2.1.0.zip",
    rating: 4.95,
    reviewCount: 38,
    purchaseCount: 215,
    technologies: ["python", "fastapi", "opencv", "pytorch", "react", "nextjs", "docker"]
  },
  {
    title: "Autonomous Web Research Agent",
    slug: "autonomous-web-research-agent",
    shortDescription: "Self-directing autonomous research worker using headless browser navigation, semantic web parsing, and hierarchical multi-agent synthesis.",
    description: "An advanced multi-agent orchestrator built to conduct exhaustive, multi-step web investigations. The agent spawns specialized sub-workers to scrape search engines, follow relevant citations, bypass DOM noise, and generate publication-quality research briefs with exact source footnotes.",
    categorySlug: "ai",
    price: 1999,
    discountPrice: 1499,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://agent-lab.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Intermediate",
    projectType: "Full Project",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.4.2",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "planner", label: "Lead Planner Agent (Task Decomposition)", type: "agent" },
        { id: "browser", label: "Playwright Headless Browser Pool", type: "worker" },
        { id: "parser", label: "Readability & Markdown DOM Extractor", type: "process" },
        { id: "vector", label: "In-Memory Embedding Store", type: "storage" },
        { id: "synthesizer", label: "Report Synthesizer & Citation Engine", type: "output" }
      ],
      edges: [
        { from: "planner", to: "browser" },
        { from: "browser", to: "parser" },
        { from: "parser", to: "vector" },
        { from: "vector", to: "synthesizer" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Python 3.10+ or Node.js 20+",
      "Playwright browser binaries (installed with npx playwright install)",
      "OpenAI, Anthropic, or local Ollama LLM endpoint"
    ]),
    featuresJson: JSON.stringify([
      "Multi-step goal decomposition with recursive self-correction",
      "Headless browser pool with automatic CAPTCHA awareness & rate throttling",
      "Clean markdown document extraction removing ads, navbars, and cookie popups",
      "Interactive web dashboard showing live agent thought stream and browser viewport",
      "Automated Markdown, PDF, and Notion-ready research export"
    ]),
    folderTreeJson: JSON.stringify({
      name: "autonomous-research-agent",
      children: [
        { name: "core", children: [{ name: "planner.py" }, { name: "navigator.py" }, { name: "extractor.py" }] },
        { name: "server", children: [{ name: "main.py" }, { name: "websocket.py" }] },
        { name: "ui", children: [{ name: "src", children: [{ name: "LiveConsole.tsx" }, { name: "ViewportStream.tsx" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "core/planner.py",
        language: "python",
        code: "class ResearchPlanner:\n    def __init__(self, llm_client):\n        self.llm = llm_client\n\n    async def formulate_plan(self, query: str) -> list[str]:\n        prompt = f'Decompose query into 4 distinct search vectors: {query}'\n        subtasks = await self.llm.generate(prompt)\n        return [s.strip() for s in subtasks.splitlines() if s.strip()]"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I use local open-source models?", answer: "Yes, the provider abstraction allows seamless connection to local models running via Ollama, vLLM, or LMStudio." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.4.2", date: "2026-08-10", notes: "Added Ollama local model connector and markdown table generation." }
    ]),
    downloadFileName: "autonomous-web-research-agent-v1.4.2.zip",
    rating: 4.88,
    reviewCount: 29,
    purchaseCount: 164,
    technologies: ["python", "langchain", "typescript", "react", "nextjs"]
  },
  {
    title: "IoT Smart Energy Grid Monitor",
    slug: "iot-smart-energy-grid-monitor",
    shortDescription: "Hardware-to-cloud industrial telemetry hub with ESP32 firmware, MQTT message broker, and live WebSockets energy distribution dashboard.",
    description: "A complete end-to-end telemetry system for monitoring distributed electrical circuits and solar microgrids. Includes C++ ESP32 firmware with FreeRTOS multitasking, secure TLS MQTT communications, time-series storage, and a low-latency WebSockets dashboard.",
    categorySlug: "iot",
    price: 2199,
    discountPrice: 1699,
    thumbnail: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://energy-grid.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Intermediate",
    projectType: "Full Project",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.3.0",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "sensors", label: "CT Current & Voltage Sensors", type: "hardware" },
        { id: "esp32", label: "ESP32 (FreeRTOS + mbedTLS)", type: "firmware" },
        { id: "mqtt", label: "Mosquitto MQTT Broker (TLS)", type: "broker" },
        { id: "ingest", label: "Go Telemetry Ingestion Worker", type: "backend" },
        { id: "db", label: "TimescaleDB Time-Series Engine", type: "storage" },
        { id: "ui", label: "Next.js High-Frequency Dashboard", type: "frontend" }
      ],
      edges: [
        { from: "sensors", to: "esp32" },
        { from: "esp32", to: "mqtt" },
        { from: "mqtt", to: "ingest" },
        { from: "ingest", to: "db" },
        { from: "ingest", to: "ui" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "ESP32 DevKit v1 or compatible (ESP-IDF or PlatformIO)",
      "Docker for Mosquitto & TimescaleDB setup",
      "Node.js 20+ for web interface"
    ]),
    featuresJson: JSON.stringify([
      "Dual-core FreeRTOS firmware with non-blocking analog sampling",
      "TLS mutual authentication between edge microcontrollers and broker",
      "Sub-100ms power-factor, harmonic distortion, and wattage telemetry",
      "Peak-demand surge alerting with configurable SMS/Email webhooks",
      "Offline buffering to SPIFFS flash during temporary network dropouts"
    ]),
    folderTreeJson: JSON.stringify({
      name: "iot-smart-grid",
      children: [
        { name: "firmware", children: [{ name: "platformio.ini" }, { name: "src", children: [{ name: "main.cpp" }, { name: "telemetry.cpp" }] }] },
        { name: "backend", children: [{ name: "main.go" }, { name: "docker-compose.yml" }] },
        { name: "dashboard", children: [{ name: "src", children: [{ name: "GaugeGrid.tsx" }, { name: "PhaseChart.tsx" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "firmware/src/main.cpp",
        language: "cpp",
        code: "#include <WiFiClientSecure.h>\n#include <PubSubClient.h>\n\nvoid vTelemetryTask(void *pvParameters) {\n  for (;;) {\n    float rmsCurrent = readACS712Current();\n    float activePower = rmsCurrent * 230.0f;\n    char payload[128];\n    snprintf(payload, sizeof(payload), \"{\\\"watts\\\":%.2f}\", activePower);\n    mqttClient.publish(\"telemetry/grid\", payload);\n    vTaskDelay(pdMS_TO_TICKS(100));\n  }\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can I test without physical hardware?", answer: "Yes! A hardware simulator script in Go/Python is included to generate realistic load patterns." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.3.0", date: "2026-06-21", notes: "Added PlatformIO project configuration and SPIFFS flash fallback buffering." }
    ]),
    downloadFileName: "iot-smart-energy-grid-monitor-v1.3.0.zip",
    rating: 4.91,
    reviewCount: 22,
    purchaseCount: 139,
    technologies: ["esp32", "mqtt", "go", "react", "nextjs", "docker"]
  },
  {
    title: "Realtime Collaborative Canvas Engine",
    slug: "realtime-collaborative-canvas-engine",
    shortDescription: "Infinite collaborative whiteboard engine powered by conflict-free replicated data types (CRDTs), WebSockets, and high-DPI HTML5 Canvas.",
    description: "A production-grade Figma/Miro-style vector canvas engine with multi-user cursor tracking, presence sync, offline undo/redo stack, and instant zero-latency peer updates using state-of-the-art CRDT algorithms.",
    categorySlug: "web",
    price: 2799,
    discountPrice: 1999,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://canvas.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "2.0.1",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "clients", label: "Browser Vector Clients (WebGL/Canvas)", type: "client" },
        { id: "crdt", label: "Yjs / LWW Conflict-Free Replicated State", type: "sync" },
        { id: "ws", label: "Node.js WebSocket Hub (Cluster)", type: "server" },
        { id: "redis", label: "Redis Pub/Sub State Channel", type: "broker" },
        { id: "persist", label: "Snapshot Database Storage", type: "storage" }
      ],
      edges: [
        { from: "clients", to: "crdt" },
        { from: "crdt", to: "ws" },
        { from: "ws", to: "redis" },
        { from: "redis", to: "persist" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Node.js 18+ or 20+",
      "Redis instance (optional for single-server development)",
      "Modern browser with PointerEvents and Canvas API support"
    ]),
    featuresJson: JSON.stringify([
      "Infinite zoom and pan vector canvas with sub-pixel rendering",
      "Multiplayer cursor tracking with avatar labels and selection boundaries",
      "Rich primitives: sticky notes, geometric shapes, freehand bezier smoothing, and text",
      "Offline-first support with automatic sync upon reconnection",
      "Lossless SVG and high-resolution PNG export engine"
    ]),
    folderTreeJson: JSON.stringify({
      name: "collaborative-canvas",
      children: [
        { name: "packages", children: [{ name: "canvas-core", children: [{ name: "renderer.ts" }, { name: "shapes.ts" }, { name: "crdt.ts" }] }, { name: "server", children: [{ name: "hub.ts" }, { name: "room.ts" }] }] },
        { name: "app", children: [{ name: "page.tsx" }, { name: "layout.tsx" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "packages/canvas-core/renderer.ts",
        language: "typescript",
        code: "export class VectorRenderer {\n  private ctx: CanvasRenderingContext2D;\n  private zoom = 1.0;\n  private pan = { x: 0, y: 0 };\n\n  constructor(canvas: HTMLCanvasElement) {\n    this.ctx = canvas.getContext('2d')!;\n  }\n\n  renderShapes(shapes: Map<string, Shape>) {\n    this.ctx.save();\n    this.ctx.translate(this.pan.x, this.pan.y);\n    this.ctx.scale(this.zoom, this.zoom);\n    shapes.forEach((shape) => shape.draw(this.ctx));\n    this.ctx.restore();\n  }\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "How does this prevent race conditions?", answer: "By utilizing Lamport timestamps and conflict-free replicated data types, conflicting edits converge deterministically on all client viewports." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v2.0.1", date: "2026-08-30", notes: "Added sub-pixel bezier freehand smoothing and custom color palettes." }
    ]),
    downloadFileName: "realtime-collaborative-canvas-engine-v2.0.1.zip",
    rating: 4.97,
    reviewCount: 44,
    purchaseCount: 298,
    technologies: ["typescript", "react", "nextjs", "websockets", "nodejs", "redis"]
  }
];

module.exports = { projectsPart1 };
