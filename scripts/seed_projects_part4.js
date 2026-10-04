const projectsPart4 = [
  {
    title: "Decentralized Audit & Merkle Proof Vault",
    slug: "decentralized-audit-merkle-proof-vault",
    shortDescription: "Cryptographic tamper-evident audit logging engine utilizing sparse Merkle trees, EVM smart contracts, and zero-knowledge inclusion proofs.",
    description: "A data integrity system that guarantees corporate audit records cannot be altered or falsified retrospectively. Hashes operational log batches into sparse Merkle trees, commits root anchors to the blockchain, and issues instantaneous cryptographic proofs of inclusion.",
    categorySlug: "security",
    price: 2699,
    discountPrice: 1999,
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://merkle-vault.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Full Project",
    featured: false,
    isExperiment: false,
    experimentTag: null,
    published: true,
    currentVersion: "1.0.2",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "logs", label: "Application Audit Events", type: "input" },
        { id: "tree", label: "Sparse Merkle Tree Engine (TypeScript/Rust)", type: "crypto" },
        { id: "contract", label: "EVM Smart Contract Root Anchor", type: "blockchain" },
        { id: "verifier", label: "Client-Side Zero-Knowledge Verifier", type: "verifier" }
      ],
      edges: [
        { from: "logs", to: "tree" },
        { from: "tree", to: "contract" },
        { from: "tree", to: "verifier" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Node.js 20+",
      "Hardhat or Foundry for smart contract deployment",
      "EVM testnet RPC (Sepolia, Polygon, or local Anvil)"
    ]),
    featuresJson: JSON.stringify([
      "Sparse Merkle Tree implementation supporting up to 2^64 unique leaves",
      "Sub-cent gas cost batch anchoring through automated epoch commits",
      "Standalone lightweight cryptographic proof verification SDK for client browsers",
      "Cryptographically signed exportable compliance certificate generation"
    ]),
    folderTreeJson: JSON.stringify({
      name: "merkle-vault",
      children: [
        { name: "contracts", children: [{ name: "AuditVault.sol" }] },
        { name: "src", children: [{ name: "tree.ts" }, { name: "prover.ts" }, { name: "verifier.ts" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "contracts/AuditVault.sol",
        language: "solidity",
        code: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract AuditVault {\n    mapping(uint256 => bytes32) public epochRoots;\n    event RootCommitted(uint256 indexed epoch, bytes32 root, uint256 timestamp);\n\n    function commitRoot(uint256 epoch, bytes32 root) external {\n        require(epochRoots[epoch] == bytes32(0), 'Epoch already anchored');\n        epochRoots[epoch] = root;\n        emit RootCommitted(epoch, root, block.timestamp);\n    }\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Does this require mainnet ETH gas?", answer: "No, it is compatible with low-fee L2s like Arbitrum, Base, Polygon, or private enterprise chains." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.0.2", date: "2026-07-09", notes: "Added Foundry test suite and browser WebAssembly prover." }
    ]),
    downloadFileName: "decentralized-audit-merkle-proof-vault-v1.0.2.zip",
    rating: 4.95,
    reviewCount: 17,
    purchaseCount: 89,
    technologies: ["solidity", "typescript", "nextjs", "docker"]
  },
  {
    title: "Quantum Algorithm Circuit Simulator",
    slug: "quantum-algorithm-circuit-simulator",
    shortDescription: "Interactive statevector quantum gate simulator with Bloch sphere visualizer, circuit builder, and Grover/Shor algorithm walkthroughs.",
    description: "An experimental visual workbench for designing and simulating quantum circuits up to 24 qubits in WebAssembly. Features drag-and-drop Hadamard, CNOT, and Pauli gates, real-time wave-function collapse analysis, and multi-qubit entanglement visualization.",
    categorySlug: "experiments",
    price: 0,
    discountPrice: 0,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://quantum.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "Experiment",
    featured: true,
    isExperiment: true,
    experimentTag: "PROTOTYPE",
    published: true,
    currentVersion: "0.9.1",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "ui", label: "Drag-and-Drop Gate Matrix Composer", type: "ui" },
        { id: "wasm", label: "Rust WebAssembly Statevector Engine", type: "wasm" },
        { id: "bloch", label: "Three.js 3D Bloch Sphere Visualizer", type: "3d" }
      ],
      edges: [
        { from: "ui", to: "wasm" },
        { from: "wasm", to: "bloch" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Modern browser with WebAssembly SIMD support",
      "Node.js 20+ for local development"
    ]),
    featuresJson: JSON.stringify([
      "Zero-latency WebAssembly matrix multiplier with complex number vector operations",
      "Interactive 3D Bloch sphere showing state rotation and superposition angles",
      "Pre-built educational templates: Quantum Teleportation, Superdense Coding, Grover Search",
      "100% Free and Open Source under MIT license"
    ]),
    folderTreeJson: JSON.stringify({
      name: "quantum-sim",
      children: [
        { name: "wasm", children: [{ name: "src", children: [{ name: "matrix.rs" }, { name: "qubit.rs" }] }] },
        { name: "frontend", children: [{ name: "components", children: [{ name: "BlochSphere.tsx" }, { name: "CircuitGrid.tsx" }] }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "wasm/src/matrix.rs",
        language: "rust",
        code: "use num_complex::Complex64;\n\npub struct StateVector {\n    pub amplitudes: Vec<Complex64>,\n}\n\nimpl StateVector {\n    pub fn apply_hadamard(&mut self, target_qubit: usize) {\n        let inv_sqrt_2 = Complex64::new(1.0 / 2.0_f64.sqrt(), 0.0);\n    }\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this free?", answer: "Yes! All BRKExperiments lab prototypes are free to explore and clone." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v0.9.1", date: "2026-09-12", notes: "Added Shor's algorithm modular exponentiation gate sequence." }
    ]),
    downloadFileName: "quantum-algorithm-circuit-simulator-v0.9.1.zip",
    rating: 4.98,
    reviewCount: 42,
    purchaseCount: 312,
    technologies: ["rust", "threejs", "react", "typescript"]
  },
  {
    title: "High-Frequency Graph Database Visualizer",
    slug: "high-frequency-graph-database-visualizer",
    shortDescription: "GPU-accelerated force-directed graph renderer capable of rendering 100,000+ nodes and edges in real-time with WebGL compute shaders.",
    description: "An interactive graph visualization workbench designed for large-scale knowledge graphs and financial transaction networks. Uses WebGL compute shaders to simulate n-body repulsion at 60 FPS, with interactive community cluster detection.",
    categorySlug: "web",
    price: 1899,
    discountPrice: 1399,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://graph.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Advanced",
    projectType: "UI Kit",
    featured: false,
    isExperiment: true,
    experimentTag: "RESEARCH",
    published: true,
    currentVersion: "1.1.0",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "neo4j", label: "Neo4j / Memgraph Bolt Protocol", type: "db" },
        { id: "webgl", label: "WebGL 2.0 Transform Feedback Compute", type: "gpu" },
        { id: "ui", label: "Canvas Shading & Inspect Overlay", type: "ui" }
      ],
      edges: [
        { from: "neo4j", to: "webgl" },
        { from: "webgl", to: "ui" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Modern browser with WebGL 2.0 support",
      "Node.js 18+"
    ]),
    featuresJson: JSON.stringify([
      "100,000+ nodes simulated at 60 FPS on standard integrated GPUs",
      "Louvain community detection algorithm running in browser worker thread",
      "Dynamic edge bundling to eliminate visual hairballs in dense networks",
      "Exportable high-resolution vector and vector PDF output"
    ]),
    folderTreeJson: JSON.stringify({
      name: "graph-vis",
      children: [
        { name: "shaders", children: [{ name: "force.frag" }, { name: "render.vert" }] },
        { name: "src", children: [{ name: "GraphCanvas.tsx" }, { name: "clustering.ts" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "src/GraphCanvas.tsx",
        language: "typescript",
        code: "export function GraphViewer({ nodes, edges }: GraphProps) {\n  const glRef = useRef<WebGL2RenderingContext | null>(null);\n  return <canvas ref={canvasRef} className='w-full h-full bg-[#050505]' />;\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "What formats can it import?", answer: "Imports JSON graph, GEXF, GraphML, and direct Neo4j Cypher query results." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v1.1.0", date: "2026-06-08", notes: "Implemented Barnes-Hut quadtree GPU spatial partitioning." }
    ]),
    downloadFileName: "high-frequency-graph-database-visualizer-v1.1.0.zip",
    rating: 4.86,
    reviewCount: 19,
    purchaseCount: 110,
    technologies: ["typescript", "threejs", "react", "nextjs"]
  },
  {
    title: "Generative UI Engine & Design Sandbox",
    slug: "generative-ui-engine-design-sandbox",
    shortDescription: "Prompt-to-component visual playground rendering production React and Tailwind code inside an isolated WebContainer sandbox.",
    description: "A generative UI experimental workspace where natural language prompts are compiled into live, interactive React components with zero server reload. Features live CSS variable tweaking, AST code inspection, and instant npm component export.",
    categorySlug: "experiments",
    price: 0,
    discountPrice: 0,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80"
    ]),
    demoUrl: "https://genui.brkexperiments.dev",
    videoUrl: null,
    difficulty: "Intermediate",
    projectType: "Experiment",
    featured: true,
    isExperiment: true,
    experimentTag: "OPEN SOURCE",
    published: true,
    currentVersion: "0.8.4",
    architectureJson: JSON.stringify({
      nodes: [
        { id: "prompt", label: "User UI Prompt", type: "input" },
        { id: "ast", label: "Babel AST & Sanitizer", type: "compiler" },
        { id: "iframe", label: "Sandboxed WebContainer Frame", type: "render" }
      ],
      edges: [
        { from: "prompt", to: "ast" },
        { from: "ast", to: "iframe" }
      ]
    }),
    requirementsJson: JSON.stringify([
      "Node.js 20+",
      "Modern browser with SharedArrayBuffer support"
    ]),
    featuresJson: JSON.stringify([
      "Real-time JSX compilation and rendering inside secure sandboxed iframe",
      "Interactive Tailwind CSS token inspector and color theme switcher",
      "One-click copy to clipboard formatted for Next.js App Router",
      "MIT Licensed open experiment"
    ]),
    folderTreeJson: JSON.stringify({
      name: "gen-ui",
      children: [
        { name: "src", children: [{ name: "Compiler.ts" }, { name: "SandboxFrame.tsx" }] }
      ]
    }),
    codeSnippetJson: JSON.stringify([
      {
        filename: "src/Compiler.ts",
        language: "typescript",
        code: "export function compileJSX(code: string) {\n  return transform(code, {\n    presets: ['react', 'typescript'],\n    plugins: ['transform-modules-umd']\n  }).code;\n}"
      }
    ]),
    faqJson: JSON.stringify([
      { question: "Is this free to use in commercial projects?", answer: "Yes, under the standard MIT license." }
    ]),
    changelogJson: JSON.stringify([
      { version: "v0.8.4", date: "2026-09-24", notes: "Added live Tailwind v3 color palette injection." }
    ]),
    downloadFileName: "generative-ui-engine-design-sandbox-v0.8.4.zip",
    rating: 4.94,
    reviewCount: 36,
    purchaseCount: 280,
    technologies: ["typescript", "react", "nextjs", "tailwindcss"]
  }
];

module.exports = { projectsPart4 };
