const projectsPart2 = [
  {
    title: "Zero-Trust Network Perimeter Sentinel",
    slug: "zero-trust-network-perimeter-sentinel",
    shortDescription: "Kernel-level network observability and micro-segmentation suite leveraging eBPF, WireGuard tunnels, and cryptographic packet validation.",
    description: "An infrastructure security platform engineered to inspect container ingress, trace anomalous socket connections, and enforce zero-trust network policies in real-time with sub-microsecond overhead via Linux eBPF probes.",
    categorySlug: "security",
    price: 3499,
    discountPrice: 2699,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://sentinel.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Expert",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.1.0",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "kernel", label: "Linux Kernel eBPF TC Hook", type: "kernel" },
        { id: "agent", label: "Rust User-Space Daemon", type: "daemon" },
        { id: "wireguard", label: "WireGuard Mesh Tunnel", type: "network" },
        { id: "control", label: "Go Control Plane & Policy Store", type: "control" },
        { id: "ui", label: "React Security Audit Console", type: "ui" }
      ],
      edges: [
        { from: "kernel", to: "agent" },
        { from: "agent", to: "control" },
        { from: "wireguard", to: "control" },
        { from: "control", to: "ui" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Linux 5.10+ kernel with BTF (BPF Type Format) enabled",
      "Rust toolchain 1.78+ (cargo, rustc)",
      "Root/CAP_BPF privileges for kernel probe attaching"
    ]),
    featuresJson: JSON.stringify([
      "Sub-microsecond packet latency eBPF filter programs",
      "Real-time process-to-socket lineage tracking",
      "Automated dynamic policy synthesis from observed network flows",
      "WireGuard automatic mesh peer key distribution",
      "Exportable audit logs compatible with Splunk and Datadog"
    ]),
    folderTreeJson: JSON.stringify({
      name: "sentinel-security",
      children: [
        { name: "bpf", children: [{ name: "tc_filter.bpf.c" }, { name: "socket_trace.bpf.c" }] },
        { name: "daemon", children: [{ name: "src", children: [{ name: "main.rs" }, { name: "bpf_loader.rs" }] }, { name: "Cargo.toml" }] },
        { name: "console", children: [{ name: "src", children: [{ name: "NetworkGraph.tsx" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "daemon/src/main.rs",
        language: "rust",
        code: "use aya::Bpf;\nuse aya::programs::SchedClassifier;\n\nfn main() -> Result<(), anyhow::Error> {\n    let mut bpf = Bpf::load(include_bytes_aligned!('../../bpf/tc_filter.bpf.o'))?;\n    let program: &mut SchedClassifier = bpf.program_mut('filter_ingress')?.try_into()?;\n    program.load()?;\n    program.attach('eth0', aya::programs::tc::TcAttachType::Ingress)?;\n    println!('[SYS/SENTINEL] eBPF security filter attached to eth0');\n    Ok(())\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Can this run inside Kubernetes?", answer: "Yes, a Helm chart with DaemonSet configurations is provided for zero-friction cluster deployment." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.1.0", date: "2026-07-15", notes: "Added WireGuard automatic peer heartbeat validation." }
    ]),
    downloadFileName: "zero-trust-network-perimeter-sentinel-v1.1.0.zip",
    rating: 5.0,
    reviewCount: 15,
    purchaseCount: 88,
    technologies: ["rust", "go", "docker", "react", "typescript"]
  },
  {
    title: "Kubernetes Multi-Cluster Traffic Controller",
    slug: "kubernetes-multi-cluster-traffic-controller",
    shortDescription: "Cloud-native traffic director managing global ingress routing, canary traffic splits, and geo-failover across heterogeneous Kubernetes clusters.",
    description: "A declarative Kubernetes controller built using Go and the Kubebuilder framework. It watches custom CRDs (TrafficPolicy, ClusterRoute) and dynamically configures global Envoy proxy instances and DNS endpoints to deliver zero-downtime cross-region rollouts.",
    categorySlug: "cloud",
    price: 2999,
    discountPrice: 2299,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: null,
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.2.4",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "crd", label: "Kubernetes Custom Resource Definitions", type: "k8s" },
        { id: "operator", label: "Go Controller (Kubebuilder)", type: "controller" },
        { id: "envoy", label: "Envoy Dynamic xDS Fleet", type: "proxy" },
        { id: "clusters", label: "Edge Clusters (AWS, GCP, Bare-Metal)", type: "cloud" }
      ],
      edges: [
        { from: "crd", to: "operator" },
        { from: "operator", to: "envoy" },
        { from: "envoy", to: "clusters" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Kubernetes 1.26+ cluster",
      "Go 1.22+",
      "kubectl & kustomize"
    ]),
    featuresJson: JSON.stringify([
      "Custom CRDs for zero-friction declarative traffic splits (e.g., 90/10 canary)",
      "Native Envoy Dynamic Discovery Service (xDS) server implementation",
      "Automated health-probe based multi-region failover triggers",
      "Prometheus metrics exporter for latency, error rate, and route weights"
    ]),
    folderTreeJson: JSON.stringify({
      name: "k8s-traffic-controller",
      children: [
        { name: "api", children: [{ name: "v1alpha1", children: [{ name: "trafficpolicy_types.go" }] }] },
        { name: "controllers", children: [{ name: "trafficpolicy_controller.go" }] },
        { name: "config", children: [{ name: "crd", children: [{ name: "bases" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "controllers/trafficpolicy_controller.go",
        language: "go",
        code: "package controllers\n\nimport (\n  'context'\n  'sigs.k8s.io/controller-runtime/pkg/reconcile'\n)\n\nfunc (r *TrafficReconciler) Reconcile(ctx context.Context, req reconcile.Request) (reconcile.Result, error) {\n  policy := &networkingv1.TrafficPolicy{}\n  if err := r.Get(ctx, req.NamespacedName, policy); err != nil {\n    return reconcile.Result{}, client.IgnoreNotFound(err)\n  }\n  r.updateEnvoyConfig(policy)\n  return reconcile.Result{}, nil\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this production ready?", answer: "Yes, currently in active use across multiple multi-cloud infrastructure environments." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.2.4", date: "2026-08-01", notes: "Added automated certificate rotation for Envoy mTLS endpoints." }
    ]),
    downloadFileName: "kubernetes-multi-cluster-traffic-controller-v1.2.4.zip",
    rating: 4.87,
    reviewCount: 19,
    purchaseCount: 112,
    technologies: ["go", "kubernetes", "docker"]
  },
  {
    title: "Developer Productivity CLI & Cloud Engine",
    slug: "developer-productivity-cli-cloud-engine",
    shortDescription: "Ultra-fast developer workflow orchestrator combining a Rust CLI, local daemon cache, and team collaboration cloud synchronization.",
    description: "A developer tool designed to supercharge daily developer velocity. It indexes local repositories in under 50 milliseconds, surfaces cross-project tasks, monitors PR review queues, and synchronizes team environmental secrets with zero friction.",
    categorySlug: "dev-tools",
    price: 1499,
    discountPrice: 999,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://cli.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Intermediate",
    projectType: "Developer Tool",
    featured: true,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.0.8",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "cli", label: "Rust CLI Binary (cross-platform)", type: "cli" },
        { id: "daemon", label: "Local SQLite / IPC Daemon", type: "daemon" },
        { id: "sync", label: "Next.js & PostgreSQL Cloud Sync", type: "cloud" }
      ],
      edges: [
        { from: "cli", to: "daemon" },
        { from: "daemon", to: "sync" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Rust 1.75+ or precompiled binaries for macOS / Linux / Windows",
      "Git 2.30+"
    ]),
    featuresJson: JSON.stringify([
      "Instant multi-repo git status query across 500+ repositories in <40ms",
      "Encrypted team secret sharing using asymmetric Curve25519 cryptography",
      "Terminal fuzzy search with hotkey-bound interactive prompt",
      "GitHub, GitLab, and Jira webhook synchronization"
    ]),
    folderTreeJson: JSON.stringify({
      name: "dev-cli",
      children: [
        { name: "cli", children: [{ name: "src", children: [{ name: "main.rs" }, { name: "indexer.rs" }] }] },
        { name: "cloud", children: [{ name: "api", children: [{ name: "sync.ts" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "cli/src/indexer.rs",
        language: "rust",
        code: "use rayon::prelude::*;\nuse walkdir::WalkDir;\n\npub fn index_workspaces(root: &str) -> Vec<String> {\n    WalkDir::new(root)\n        .max_depth(4)\n        .into_iter()\n        .filter_map(|e| e.ok())\n        .filter(|e| e.file_name() == '.git')\n        .par_bridge()\n        .map(|e| e.path().display().to_string())\n        .collect()\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this compatible with Windows Terminal?", answer: "Yes, 100% native support for Windows PowerShell, macOS zsh, and Linux bash." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.0.8", date: "2026-09-02", notes: "Added parallel multi-thread directory traversal with Rayon." }
    ]),
    downloadFileName: "developer-productivity-cli-cloud-engine-v1.0.8.zip",
    rating: 4.93,
    reviewCount: 31,
    purchaseCount: 220,
    technologies: ["rust", "typescript", "nextjs", "sqlite"]
  },
  {
    title: "Biometric Face Recognition & Access Hub",
    slug: "biometric-face-recognition-access-hub",
    shortDescription: "Privacy-focused edge facial recognition access control suite with anti-spoofing liveness detection and encrypted 512-D vector matching.",
    description: "An edge biometric security gateway capable of validating authorized personnel in under 120ms. Features deep neural liveness testing (anti-spoofing against phone screens and printed photos), privacy-preserving vector encryption, and audit event dispatchers.",
    categorySlug: "computer-vision",
    price: 2899,
    discountPrice: 2199,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: null,
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.3.1",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "cam", label: "Edge Camera Stream (RGB + IR)", type: "sensor" },
        { id: "liveness", label: "MiniFASNet Liveness Verification", type: "model" },
        { id: "arcface", label: "ArcFace 512-D Embedding Extractor", type: "model" },
        { id: "match", label: "Cosine Distance Matcher & Relay Trigger", type: "output" }
      ],
      edges: [
        { from: "cam", to: "liveness" },
        { from: "liveness", to: "arcface" },
        { from: "arcface", to: "match" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Python 3.10+",
      "PyTorch 2.0+ with CUDA or CPU inference",
      "Webcam or USB/RTSP camera"
    ]),
    featuresJson: JSON.stringify([
      "State-of-the-art ArcFace deep feature extraction with 99.8% LFW benchmark accuracy",
      "Deep anti-spoofing 3D liveness model protecting against printed/screen attacks",
      "Hardware GPIO trigger for automatic door strikes and electromagnetic locks",
      "Zero biometric imagery stored: only one-way mathematical embedding vectors"
    ]),
    folderTreeJson: JSON.stringify({
      name: "biometric-access",
      children: [
        { name: "core", children: [{ name: "liveness.py" }, { name: "extractor.py" }, { name: "matcher.py" }] },
        { name: "service", children: [{ name: "server.py" }, { name: "gpio.py" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "core/matcher.py",
        language: "python",
        code: "import numpy as np\n\ndef verify_user(embedding: np.ndarray, known_db: dict, threshold: float = 0.68):\n    best_match = None\n    best_score = 0.0\n    for uid, vec in known_db.items():\n        score = float(np.dot(embedding, vec) / (np.linalg.norm(embedding) * np.linalg.norm(vec)))\n        if score > best_score and score >= threshold:\n            best_score = score\n            best_match = uid\n    return best_match, best_score"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is user privacy protected?", answer: "Yes! Raw photos are never retained. Only 512 floating-point values are retained in encrypted storage." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.3.1", date: "2026-05-18", notes: "Added MiniFASNet anti-spoofing liveness model." }
    ]),
    downloadFileName: "biometric-face-recognition-access-hub-v1.3.1.zip",
    rating: 4.96,
    reviewCount: 26,
    purchaseCount: 147,
    technologies: ["python", "pytorch", "opencv", "docker", "fastapi"]
  }
];

module.exports = { projectsPart2 };
