# ⚡ BRKExperiments — Next-Gen IoT & Embedded Systems Engineering Lab

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![OxygenOS](https://img.shields.io/badge/OxygenOS-7.0_Flux-06B6D4?style=for-the-badge)](https://github.com)
[![YouTube](https://img.shields.io/badge/YouTube-@BRKEXPERIMENTS-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@BRKEXPERIMENTS)

> **BRKExperiments** is a premier open hardware engineering lab and digital project platform founded by **Balaram** (Student Engineer at Sri Vasavi Engineering College). Discover, test, and download production-grade microcontroller firmware, interactive breadboard schematics, wiring matrices, and AI-synthesized hardware builds.

---

## 🌟 Key Features

### 1. 🎨 OxygenOS 7.0 Flux Fluid Theme Engine
- **Aquamorphic Ocean**: Signature OxygenOS fluid cyan (`#06B6D4`) & emerald mint (`#10B981`).
- **Neon Horizon**: High-energy electric violet (`#8B5CF6`) & sunset magenta (`#EC4899`).
- **Solar Flare**: Radiant amber (`#F59E0B`) & ruby crimson (`#EF4444`).
- **Emerald Matrix**: Cyber mint (`#10B981`) & quantum lime (`#84CC16`).
- **Deep OLED Stealth**: Pure obsidian black (`#000000`) with high-contrast ice blue accents.
- Persistent fluid glassmorphism (`.flux-glass`) with real-time accent syncing.

### 2. ⚡ YouTube Shorts AI Hardware Agent ("Shorts-to-Hardware Expander")
- Solves the brevity problem of YouTube Shorts (<60s) from [@BRKEXPERIMENTS](https://www.youtube.com/@BRKEXPERIMENTS).
- Analyzes short-form demos and instantly synthesizes:
  - Missing build context and theoretical explanation
  - Tested, production-ready Arduino C++ `.ino` firmware with 1-click copy & download
  - Sensor-to-MCU pinout wiring matrices with color coding
  - Component Bill of Materials (BOM) with quantities and estimated INR costs
  - Step-by-step breadboard assembly and serial debugging guide
  - Interactive AI adaptations (e.g., *"Convert to ESP32"*, *"Add 0.96 OLED display"*)

### 3. 🔬 Comprehensive Multi-MCU Hardware Catalog
- **ESP32**: Wi-Fi home automation, camera telemetry, dual-core real-time control
- **Arduino Uno / Nano / Mega**: Laser tripwire, mini radar, ultrasonic navigation, industrial automation
- **ESP8266 NodeMCU**: Minimalist cloud IoT telemetry & MQTT publishing
- **Raspberry Pi Pico W**: Dual-Core RP2040 133MHz IoT web server HUD
- **STM32 Blue Pill**: ARM Cortex-M3 72MHz 12-bit ADC waveform ECG plotter
- **ESP32 LoRa**: SX1278 433MHz long-range mesh telemetry with 15µA deep sleep

### 4. 👑 Admin Hardware Studio & Creator Controls
- **Admin Name**: `Balaram`
- Full project studio to compose, bench-test, and edit project firmware, BOM, and pinout before publishing.
- **Draft Protection**: Only projects published by Balaram (`published: true`) are visible to regular users. Drafts remain isolated in the admin studio.
- Quick 1-click login card on the homepage for makers and Admin Balaram.

### 5. 📱 PC vs. OxygenOS Mobile App Switcher
- Pinned switcher in the header: `[ 💻 PC | 📱 App ]`.
- **Mobile Mode**: Wraps the interface inside an OxygenOS smartphone frame with a real-time status bar, top app bar, and fixed 5-tab bottom dock (*Home, Lab, Shorts AI, Saved, Admin/Profile*).
- **PC Mode**: Expands into a widescreen, responsive engineering workspace.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.17+ or v20+
- Git

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/brkexperiments.git
cd brkexperiments

# 2. Install dependencies
npm install

# 3. Setup SQLite database with Prisma
npx prisma db push

# 4. Seed hardware packages & seed Admin Balaram
node scripts/seed_all_mcu.js
node scripts/update_balaram_user.js

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Credentials

| Role | Username / Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin (Creator)** | `Balaram` / `balaram@brkexperiments.dev` | `balaram@2008` | Full Admin Studio, Edit Projects, Draft/Publish Controls |
| **Maker (Student)** | `brkexperiments` / `brkexperiments@gmail.com` | `maker123` | Public Marketplace, Firmware Downloads, Shorts AI Agent |

---

## 📁 Project Architecture

```
brkexperiments/
├── app/                        # Next.js 14 App Router
│   ├── admin/                  # Admin Studio (New project, Edit project)
│   ├── api/                    # REST APIs (Hardware projects, AI Shorts expander, Auth)
│   ├── projects/               # Dynamic project detail pages & lab catalog
│   ├── shorts/                 # YouTube Shorts AI Agent Hub
│   ├── login/                  # Universal Username / Email login
│   ├── register/               # Create account page
│   ├── forgot-password/        # Password recovery with simulated OTP
│   ├── globals.css             # Tailwind & OxygenOS Flux theme CSS variables
│   └── page.tsx                # Homepage with hero, creator spotlight & starting login
├── components/
│   ├── brand/                  # Creator spotlight (Balaram) & quick starting login card
│   ├── hardware/               # Circuit diagram visualizer, Shorts AI expander, code viewer
│   ├── layout/                 # Desktop Navbar, MobileAppShell, OxygenOS theme switcher
│   ├── marketplace/            # Hardware card grid, search & multi-MCU filter sidebar
│   └── providers/              # AuthProvider, FluxThemeProvider, DeviceViewProvider
├── prisma/
│   └── schema.prisma           # SQLite schema (User, Project, Component, Pinout, Review)
├── public/
│   ├── creator.jpg             # Creator portrait (Balaram)
│   └── logo.png                # Official BRKExperiments brand logo
├── scripts/                    # Database seeding and admin user setup scripts
└── package.json
```

---

## 👨‍💻 Creator & Attribution

- **Founder & Hardware Architect**: **Balaram**
- **Institution**: Sri Vasavi Engineering College
- **YouTube Channel**: [@BRKEXPERIMENTS](https://www.youtube.com/@BRKEXPERIMENTS)
- **Open Access**: 100% Free Open Hardware for Students, Makers, and Engineers worldwide.

---

Made with ❤️ by Balaram & the BRKExperiments Community.
