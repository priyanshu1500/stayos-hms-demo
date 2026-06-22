# StayOS — Hotel Intelligence Platform

> **AI-native, WhatsApp-first Hotel Management System** built for independent Indian hotels & boutique resorts.

![StayOS Dashboard](https://img.shields.io/badge/StayOS-HMS%20Demo-00C896?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTAiIGZpbGw9InVybCgjYmcpIi8+PHBhdGggZD0iTTggMjNWMTIuNUwxNiA4TDI0IDEyLjVWMjNIMTlWMTdIMTNWMjNIOFoiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjk1Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMzIiIHkyPSIzMiI+PHN0b3Agc3RvcC1jb2xvcj0iIzAwQzg5NiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZEMjhEOSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🎯 What is StayOS?

StayOS is a **pitch-ready interactive demo** for a Hotel Management System targeting independent Indian hotels (5–40 rooms) and boutique resorts. Positioned as *"The PMS that talks to your guests on WhatsApp"*.

**Key differentiators:**
- 🤖 **AI-native** — Claude 3.5 handles 92% of guest queries autonomously
- 💬 **WhatsApp-first** — Guests interact via WhatsApp, staff via a clean dashboard
- 📊 **Revenue intelligence** — Dynamic pricing with ML-driven rate suggestions
- 🇮🇳 **India-first** — GST-compliant billing, UPI/Razorpay, Interakt integration

---

## ✨ Features

| Module | Highlights |
|---|---|
| **Dashboard** | Live KPI bento grid · Room mosaic · Activity feed · Revenue chart |
| **Booking Calendar** | Room × date grid · Click to book · Booking detail panel |
| **Guest CRM** | 128 guests · Segments (VIP/Repeat/Corporate) · WhatsApp opt-ins |
| **WhatsApp AI Concierge** | Live threads · AI/Human mode · Escalation detection |
| **Dynamic Pricing** | AI rate recommendations · Competitor comparison · Event signals |
| **Housekeeping** | Drag-and-drop Kanban · Staff assignment · Priority levels |
| **Billing & GST** | GST-compliant invoices · ClearTax integration |
| **Analytics** | Occupancy trends · Booking source split · OTA commission saved |
| **Settings** | Integrations (Booking.com, Razorpay, WhatsApp) · Team & roles |

---

## 🎨 UI/UX Highlights

Built with cutting-edge 2025/2026 web design techniques:

- **Custom cursor** — Dot + lagging ring with lerp physics at 60fps
- **3D card tilt** — Mouse-tracked `perspective + rotateX/rotateY` on KPI cards
- **Magnetic buttons** — Physics-based cursor attraction on all CTAs
- **Animated gradient border** — CSS `@property` conic-gradient on AI cards
- **Scroll-driven reveals** — Native `animation-timeline: view()` API
- **Noise grain overlay** — SVG `feTurbulence` for tactile analog feel
- **Ambient orbs** — Breathing radial gradients in the background
- **Glassmorphism 2.0** — Restrained `backdrop-filter` with depth hierarchy
- **Bento grid layout** — Linear/Attio-inspired asymmetric card system
- **View transitions** — `document.startViewTransition()` between screens

---

## 🚀 Getting Started

This is a **zero-dependency** frontend demo. Just open in your browser:

```bash
git clone https://github.com/vanshkapoor/stayos-hms-demo.git
cd stayos-hms-demo
open index.html   # macOS
# or just double-click index.html
```

No build step. No npm install. No server needed.

---

## 🏗️ Tech Stack

- **HTML5** — Semantic structure
- **Vanilla CSS** — Custom design system with CSS variables, `@property`, `animation-timeline`
- **Vanilla JavaScript** — State-driven SPA, no frameworks
- **Chart.js 4.4** — Revenue, occupancy, and analytics charts (CDN)
- **Google Fonts** — Inter Variable + DM Serif Display

---

## 📱 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` | Open global search |
| `Esc` | Close modal |

---

## 🗺️ Roadmap (Real Product)

- [ ] FastAPI + PostgreSQL backend
- [ ] Flutter mobile app for staff
- [ ] Real WhatsApp Business API (Interakt/WATI)
- [ ] ML-based dynamic pricing (6-month data threshold)
- [ ] Multi-property management
- [ ] Razorpay payment gateway
- [ ] ClearTax GST e-invoicing

---

## 📄 License

MIT © 2026 StayOS / Vansh Kapoor

---

*Built as a pitch demo. All data is simulated.*
