# Body Measurement App 📏

A lightning-fast web application built with **Vite**, **React**, and **Tailwind CSS** that measures body dimensions using your device camera.

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📸 **Camera Integration** - Capture full-body photos instantly
- 📊 **Instant Measurements** - Get 8 body measurements in seconds
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 💾 **Export Data** - Download measurements as JSON
- 📱 **Mobile-Friendly** - Works seamlessly on all devices

## 📏 Measurements Provided

- Height
- Shoulders
- Chest
- Waist
- Hips
- Inseam
- Arm Length
- Neck Circumference

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/body-measurement-app.git
cd body-measurement-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install -D gh-pages

# Deploy
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/body-measurement-app`

## 💻 Technology Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Build tool & dev server |
| **React 18** | UI framework |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icon library |
| **HTML5 Canvas** | Image processing |
| **MediaStream API** | Camera access |

## 📖 Usage

1. **Enter Height** - Input your height in centimeters (100-250 cm)
2. **Start Camera** - Grant camera permissions
3. **Position Yourself** - Stand 2-3 meters away, full body visible
4. **Capture Photo** - Click the capture button
5. **View Results** - See your measurements instantly
6. **Download** - Export data as JSON (optional)

## 🎯 Project Structure

body-measurement-app/
├── src/
│   ├── components/
│   │   └── BodyMeasurementApp.jsx    # Main app component
│   ├── App.jsx                         # Root component
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles + Tailwind
├── public/                             # Static assets
├── index.html                          # HTML template
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
└── package.json                        # Dependencies & scripts
