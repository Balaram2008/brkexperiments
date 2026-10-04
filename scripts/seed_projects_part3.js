const projectsPart3 = [
  {
    title: "Distributed Cloud File Intelligence System",
    slug: "distributed-cloud-file-intelligence-system",
    shortDescription: "S3-compatible object intelligence fabric with automated content chunking, semantic vector embeddings, and full-text AI search across millions of documents.",
    description: "An enterprise file storage backend that transforms unstructured blobs into queryable intelligence. When files are uploaded, worker nodes extract text from PDFs, Office docs, and images, compute dense embeddings, and enable conversational semantic search across petabytes of files.",
    categorySlug: "cloud",
    price: 2599,
    discountPrice: 1999,
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://file-intel.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.0.5",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "s3", label: "MinIO / S3 Object Storage", type: "storage" },
        { id: "queue", label: "Redis BullMQ Ingestion Queue", type: "queue" },
        { id: "worker", label: "Node.js OCR & Parsing Cluster", type: "worker" },
        { id: "vec", label: "pgvector PostgreSQL Semantic Store", type: "db" },
        { id: "api", label: "Search & Streaming API Gateway", type: "api" }
      ],
      edges: [
        { from: "s3", to: "queue" },
        { from: "queue", to: "worker" },
        { from: "worker", to: "vec" },
        { from: "vec", to: "api" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Node.js 20+",
      "PostgreSQL with pgvector extension enabled",
      "Redis for queue management"
    ]),
    featuresJson: JSON.stringify([
      "Seamless S3/MinIO event listener triggers instant parsing on upload",
      "Support for PDF, DOCX, XLSX, Markdown, and scan OCR extraction",
      "Hybrid search combining BM25 keyword matching and vector cosine proximity",
      "Role-based folder permission access filters baked into search queries"
    ]),
    folderTreeJson: JSON.stringify({
      name: "file-intelligence",
      children: [
        { name: "services", children: [{ name: "ingest.ts" }, { name: "embeddings.ts" }, { name: "search.ts" }] },
        { name: "db", children: [{ name: "schema.prisma" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "services/search.ts",
        language: "typescript",
        code: "export async function hybridSearch(query: string, embedding: number[], userId: string) {\n  return prisma.$queryRaw`\n    SELECT id, filename, content,\n           (1 - (embedding <=> ${embedding}::vector)) AS score\n    FROM 'DocumentChunk'\n    WHERE user_id = ${userId}\n    ORDER BY score DESC LIMIT 10;\n  `;\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can it work with local storage instead of AWS?", answer: "Yes, it fully supports local MinIO and Dockerized Ceph storage." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.0.5", date: "2026-07-28", notes: "Introduced Reciprocal Rank Fusion (RRF) for hybrid keyword/vector search." }
    ]),
    downloadFileName: "distributed-cloud-file-intelligence-system-v1.0.5.zip",
    rating: 4.89,
    reviewCount: 18,
    purchaseCount: 95,
    technologies: ["nodejs", "typescript", "postgresql", "docker", "redis"]
  },
  {
    title: "Automated Trading & Quant Strategy Studio",
    slug: "automated-trading-quant-strategy-studio",
    shortDescription: "Backtesting and automated trade execution engine for algorithmic strategies with tick-level historical replay and risk guardrails.",
    description: "A financial engineering suite for prototyping, stress-testing, and executing algorithmic strategies. Supports Monte Carlo simulations, order book market replay, real-time slippage modeling, and multi-broker API execution with strict position limits.",
    categorySlug: "ai",
    price: 3299,
    discountPrice: 2499,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: null,
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.4.0",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "feed", label: "WebSocket Market Tick Stream", type: "feed" },
        { id: "strategy", label: "FastAPI Quant Strategy Engine", type: "engine" },
        { id: "risk", label: "Pre-Trade Risk & Margin Guardian", type: "risk" },
        { id: "broker", label: "Fix Protocol / Broker API Gateway", type: "gateway" }
      ],
      edges: [
        { from: "feed", to: "strategy" },
        { from: "strategy", to: "risk" },
        { from: "risk", to: "broker" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Python 3.11+",
      "Pandas, NumPy, and TA-Lib",
      "Interactive Brokers or CCXT API credentials"
    ]),
    featuresJson: JSON.stringify([
      "Tick-by-tick event-driven backtesting with historical order book replay",
      "Monte Carlo simulation of drawdown distributions and Sharpe ratios",
      "Automated stop-loss, circuit breaker, and delta hedging rules",
      "Interactive TradingView charting integration in web interface"
    ]),
    folderTreeJson: JSON.stringify({
      name: "quant-studio",
      children: [
        { name: "engine", children: [{ name: "backtester.py" }, { name: "strategy.py" }, { name: "risk.py" }] },
        { name: "dashboard", children: [{ name: "ChartContainer.tsx" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "engine/strategy.py",
        language: "python",
        code: "class MeanReversionStrategy:\n    def on_tick(self, tick: MarketTick) -> OrderSignal | None:\n        z_score = (tick.price - self.rolling_mean) / self.rolling_std\n        if z_score < -2.1 and self.position <= 0:\n            return OrderSignal(symbol=tick.symbol, side='BUY', qty=100)\n        elif z_score > 2.1 and self.position >= 0:\n            return OrderSignal(symbol=tick.symbol, side='SELL', qty=100)\n        return None"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this financial advice?", answer: "No, this is an engineering research tool intended for developers and algorithmic strategy researchers." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.4.0", date: "2026-08-19", notes: "Added CCXT exchange connectors for 20+ cryptocurrency markets." }
    ]),
    downloadFileName: "automated-trading-quant-strategy-studio-v1.4.0.zip",
    rating: 4.84,
    reviewCount: 16,
    purchaseCount: 104,
    technologies: ["python", "fastapi", "react", "typescript"]
  },
  {
    title: "Neural Voice Clone & Speech Synthesis Lab",
    slug: "neural-voice-clone-speech-synthesis-lab",
    shortDescription: "Few-shot voice cloning and low-latency acoustic neural vocoder pipeline capable of natural human speech generation from 5-second audio samples.",
    description: "An audio engineering lab that performs real-time neural speech synthesis. Input short voice samples to extract speaker speaker embeddings, run text conditioning through a diffusion acoustic model, and stream high-fidelity 48kHz audio directly to the browser.",
    categorySlug: "ai",
    price: 2299,
    discountPrice: 1799,
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://voice-lab.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.1.2",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "audio", label: "Reference Audio Sample (WAV)", type: "input" },
        { id: "encoder", label: "Speaker Embedding Encoder", type: "encoder" },
        { id: "acoustic", label: "Diffusion Acoustic Text-to-Mel Model", type: "model" },
        { id: "vocoder", label: "HiFi-GAN Neural Vocoder", type: "vocoder" },
        { id: "stream", label: "WebAudio API AudioBuffer Streamer", type: "output" }
      ],
      edges: [
        { from: "audio", to: "encoder" },
        { from: "encoder", to: "acoustic" },
        { from: "acoustic", to: "vocoder" },
        { from: "vocoder", to: "stream" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Python 3.10+",
      "PyTorch 2.1+ (CUDA strongly recommended, CPU mode supported)",
      "libsndfile and ffmpeg system libraries"
    ]),
    featuresJson: JSON.stringify([
      "High-fidelity zero-shot speaker adaptation from 5-second references",
      "Emotion and cadence modulation sliders (speed, pitch variance, breathiness)",
      "Streaming chunked synthesis yielding first audio packet in under 200ms",
      "Interactive waveform and spectrogram visualizer built in React Canvas"
    ]),
    folderTreeJson: JSON.stringify({
      name: "neural-voice-lab",
      children: [
        { name: "models", children: [{ name: "acoustic.py" }, { name: "vocoder.py" }] },
        { name: "api", children: [{ name: "server.py" }] },
        { name: "ui", children: [{ name: "AudioPlayer.tsx" }, { name: "Spectrogram.tsx" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "api/server.py",
        language: "python",
        code: "@app.post('/synthesize/stream')\nasync def stream_speech(req: SynthesisRequest):\n    speaker_embed = encoder.embed_utterance(req.ref_audio_path)\n    async for audio_chunk in model.generate_stream(req.text, speaker_embed):\n        yield audio_chunk"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What language does it support?", answer: "Natively supports English, Spanish, Hindi, French, and German out of the box." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.1.2", date: "2026-06-14", notes: "Added HiFi-GAN 48kHz audio upsampler and low-latency chunk streaming." }
    ]),
    downloadFileName: "neural-voice-clone-speech-synthesis-lab-v1.1.2.zip",
    rating: 4.90,
    reviewCount: 20,
    purchaseCount: 135,
    technologies: ["python", "pytorch", "fastapi", "react", "typescript"]
  },
  {
    title: "Sub-surface Robotics Telemetry Streamer",
    slug: "sub-surface-robotics-telemetry-streamer",
    shortDescription: "Underwater autonomous vehicle (AUV) telemetry and sensor fusion bridge with ROS2, Three.js 3D orientation visualizer, and acoustic modem packet handler.",
    description: "A robotics telemetry mission console designed for autonomous submersibles and underwater ROVs. Connects to ROS2 topics, decodes depth pressure, Doppler velocity logs (DVL), IMU attitudes, and presents an interactive 3D digital twin in Three.js.",
    categorySlug: "iot",
    price: 2799,
    discountPrice: 2099,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://auv-telemetry.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.0.3",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "ros2", label: "ROS2 Galactic / Humble Topics", type: "ros" },
        { id: "bridge", label: "WebRTC / Rosbridge WebSocket Server", type: "bridge" },
        { id: "twin", label: "Three.js 3D Digital Twin & Gyro Visualizer", type: "3d" }
      ],
      edges: [
        { from: "ros2", to: "bridge" },
        { from: "bridge", to: "twin" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "ROS2 (Humble or Iron) on Ubuntu or Docker",
      "Python 3.10+",
      "WebGL-capable modern web browser"
    ]),
    featuresJson: JSON.stringify([
      "Real-time 6-DoF attitude quaternion 3D vehicle orientation tracking",
      "Depth sensor pressure profiling and salinity density compensation",
      "Acoustic modem low-bandwidth packet encoder with Reed-Solomon error correction",
      "Gamepad API integration for direct ROV joystick thruster testing"
    ]),
    folderTreeJson: JSON.stringify({
      name: "auv-telemetry",
      children: [
        { name: "ros_nodes", children: [{ name: "telemetry_bridge.py" }] },
        { name: "frontend", children: [{ name: "components", children: [{ name: "Submersible3D.tsx" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "frontend/components/Submersible3D.tsx",
        language: "typescript",
        code: "export function SubmersibleScene({ attitude }: { attitude: Quaternion }) {\n  return (\n    <Canvas camera={{ position: [0, 2, 5] }}>\n      <ambientLight intensity={0.4} />\n      <directionalLight position={[10, 10, 5]} />\n      <ROVModel quaternion={attitude} />\n      <OrbitControls />\n    </Canvas>\n  );\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can it be tested without a real submersible?", answer: "Yes, an included Gazebo simulation world launches an AUV model in underwater physics." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.0.3", date: "2026-05-30", notes: "Added Three.js bathymetric seabed mesh terrain rendering." }
    ]),
    downloadFileName: "sub-surface-robotics-telemetry-streamer-v1.0.3.zip",
    rating: 4.92,
    reviewCount: 14,
    purchaseCount: 76,
    technologies: ["python", "threejs", "react", "nextjs", "websockets"]
  }
];

module.exports = { projectsPart3 };
