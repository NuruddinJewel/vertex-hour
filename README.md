<div align="center">

# ⌚ Horology Vault

### *A Curated Marketplace for Fine, Authenticated Timepieces*

*"The definitive dive watch, reimagined for modern depths."*

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## 📖 About

**Horology Vault** is a luxury watch marketplace built for collectors who value trust, transparency, and craftsmanship as much as the timepieces themselves. Every listing on the platform — from a Rolex Submariner to a Patek Philippe Nautilus — comes with detailed specifications, multi-angle imagery, and a clean, considered buying experience.

The platform supports two roles — **Admin** and **User** — with role-based dashboards, listing management, and a quantity-aware purchase system, all wrapped in a deep charcoal-and-gold design language inspired by the watches it sells.

---

## ✨ Features

### 🏠 Public Experience
- **Hero Slider** — Rotating showcase of featured timepieces with auto-play and manual navigation
- **Brand Grid** — Quick-access browsing by Rolex, Patek Philippe, Omega, and more
- **Hot Listings** — Highest-value pieces surfaced automatically
- **Live Stats Tracker** — Real-time watches listed, watches sold, total valuation, and registered collectors
- **Editorial Blog** — Long-form guides on collecting, movements, and authenticity
- **Testimonials & FAQ** — Social proof and answers on warranty, shipping, and verification

### 🔍 Explore & Details
- **Search & Filter** — By brand, price range, and movement type (Automatic / Manual)
- **Sortable Listings** — Price low-to-high and high-to-low
- **Media Slider** — Multi-angle photography with thumbnail navigation on every listing
- **Full Specifications** — Caliber, case size, dial color, water resistance, and more
- **Quantity-Aware Purchasing** — Live stock tracking with a "Buy Now" flow that requires sign-in

### 🔐 Authentication
- Email & password authentication via **Better-Auth**
- Google OAuth social login
- Role-based access control (**Admin** / **User**)
- Protected routes enforced via Next.js Proxy (formerly Middleware)

### 👤 User Dashboard
- Manage personal watch listings (Add, View, Delete)
- Track owned inventory and purchase history

### 🛠️ Admin Dashboard
- Marketplace-wide stats: total listings, units sold, total valuation, registered users
- Sales-by-brand bar chart (Recharts)
- Recent listings and recent purchases tables

---

## 🧰 Tech Stack

### Frontend
| Technology               | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| **Next.js (App Router)** | React framework, routing, server & client components |
| **TypeScript**           | Type safety across the entire frontend               |
| **MongoDB**              | Auth data persistence via Better-Auth adapter        |
| **Tailwind CSS**         | Utility-first styling                                |
| **DaisyUI**              | Component primitives on top of Tailwind              |
| **Lucide React**         | Icon system                                          |
| **Framer Motion**        | Animation and transitions                            |
| **Recharts**             | Admin analytics charts                               |
| **Better-Auth**          | Authentication (email/password + Google OAuth)       |
| **React Toastify**       | Toast notifications                                  |

### Backend
| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| **Node.js**    | Runtime                            |
| **Express.js** | REST API framework                 |
| **TypeScript** | Type safety across the API         |
| **MongoDB**    | Watch listings & orders data store |
| **CORS**       | Cross-origin request handling      |
| **Dotenv**     | Environment variable management    |

---

## 🎨 Design Language

Horology Vault uses a restrained, luxury-inspired palette:

| Token              | Hex       | Usage                  |
| ------------------ | --------- | ---------------------- |
| **Deep Charcoal**  | `#0B0C10` | Primary background     |
| **Slate**          | `#1F2833` | Cards & surfaces       |
| **Champagne Gold** | `#C5A880` | Accents, CTAs, borders |
| **Bronze**         | `#8C7851` | Hover states           |
| **Ivory**          | `#E8E6E1` | Primary text           |

**Typography:** *Cormorant Garamond* for display headings, *Inter* for body and UI text.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Google Cloud OAuth Client (for social login)

### Backend Setup

```bash
cd backend
npm install
```

### Run the server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Run the app:
```bash
npm run dev
```

### Visit **https://vertex-hour.vercel.app** 🎉

---
<div align="center">

*Built for collectors who see time differently.*

**Horology Vault** — *Explore the Vault.*

</div>