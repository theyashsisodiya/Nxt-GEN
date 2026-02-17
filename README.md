# Nxt-Gen: The Autonomous AI Operations Platform

A premium, investor-grade website showcasing the Nxt-Gen Autonomous AI Operations Platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- **Hero Section** with live terminal demo simulating AI operations
- **Problem/Solution Comparison** showing the "Doom Loop" vs "Autonomy"
- **Autonomous Capabilities** with interactive tabs:
  - Self-Healing (The Hero)
  - Autonomous Deployment
  - Continuous Monitoring
- **Failure Taxonomy** visualizing L1 (Auto), L2 (Rx), and L3 (Human) failures
- **Security Trust Vault** showcasing Zero-Trust/JIT architecture
- **Competitive Moat** comparison against AWS/Azure native tools
- **Pricing Tiers** with professional layout
- Premium dark mode design with glassmorphism effects
- Smooth animations powered by Framer Motion

## 🚀 Quick Start

### Development Mode (Hot Reload)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

### Production Build

```bash
npm run build
```

### Serve Production Build Locally

```bash
npm run serve
```

This starts a Node.js server at [http://localhost:3000](http://localhost:3000) serving the optimized static files.

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend**: Node.js (Express) for static serving

## 🎨 Design Philosophy

- **Premium Aesthetics**: "Senior Engineer" look with dark mode and AI Purple accents
- **Glassmorphism**: Modern UI with backdrop blur effects
- **Micro-animations**: Smooth transitions for enhanced UX
- **Responsive**: Mobile-first design that scales beautifully

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Terminal)
│   ├── layout/          # Layout components (Navbar, Hero, Footer)
│   └── features/        # Feature sections (Capabilities, Taxonomy, Pricing)
├── lib/                 # Utilities (cn function for class merging)
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind directives
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build (Vite)
- `npm run serve` - Serve production build (Express)
- `npm run lint` - Run ESLint

## 📝 Notes

- All components use the `@/` path alias for clean imports
- The project uses TypeScript with relaxed linting for faster development
- Production build is optimized and ready for deployment
- Express server included for easy local testing of production builds

## 🎯 Next Steps

1. **Deploy**: Upload the `dist/` folder to your hosting provider
2. **Customize**: Update content in component files as needed
3. **Extend**: Add more sections or features using the existing component patterns

---

Built with ❤️ for the Nxt-Gen Platform
