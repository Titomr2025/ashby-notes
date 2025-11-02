# 📝 Ashby Notes - Smart Task Manager

A modern, elegant, and intelligent task management application built with pure HTML, CSS, and JavaScript.

![Ashby Notes](https://img.shields.io/badge/Status-Complete-success)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)
![Storage](https://img.shields.io/badge/Storage-LocalStorage-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Functionality
- ✅ **Add/Delete Tasks** - Clean and intuitive task management
- ✅ **Mark Complete/Incomplete** - Toggle task status with automatic timestamps
- ✅ **Automatic Date Tracking** - Completion dates stored automatically
- ✅ **Persistent Storage** - All data saved in browser's localStorage
- ✅ **Real-time Statistics** - Live counters for total, pending, and completed tasks

### 🧠 Smart Features
- 🚨 **Automatic Storage Alerts** - Warns when storage is getting full
- 🧹 **Intelligent Cleanup** - Automatically removes oldest completed tasks
- 📊 **Storage Statistics** - Visual dashboard showing usage and capacity
- 💾 **Export/Backup** - Download tasks as JSON file

### 🎨 Modern Design
- 🌟 **Glassmorphism UI** - Modern, elegant interface
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🎭 **Smooth Animations** - Polished user experience
- 🎪 **Professional Layout** - Clean tables with modern styling

### 📱 Mobile Optimized
- 📋 **Card Layout on Mobile** - Tables transform to cards on small screens
- 👆 **Touch-Friendly** - Large buttons and optimized for mobile interaction
- 🔍 **No Zoom Issues** - Properly configured viewport for mobile devices

## 🚀 Live Demo

Visit the live application: **[Ashby Notes](https://your-username.github.io/ashby-notes/)**

## 🛠️ Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence
- **Font Awesome** - Beautiful icons
- **Google Fonts (Inter)** - Modern typography

## 📦 Installation

### Option 1: Direct Download
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

### Option 2: GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → "main"
4. Your app will be available at `https://yourusername.github.io/ashby-notes/`

## 🔧 Usage

### Basic Operations
1. **Add Task**: Type in the input field and click "Add Task" or press Enter
2. **Complete Task**: Click the "✅ Complete" button
3. **Unmark Task**: Click "↩️ Unmark" to move back to pending
4. **Delete Task**: Click "🗑️ Delete" to remove permanently

### Advanced Features
- **Storage Statistics**: Click the 📊 button to view detailed storage info
- **Automatic Cleanup**: When storage gets full, click the alert button to clean old tasks
- **Export Data**: Use `exportarTareas()` in console to download your tasks

## 💾 Data Storage

- All tasks are stored locally in your browser using `localStorage`
- **Capacity**: ~5-10MB (thousands of tasks)
- **Privacy**: Data never leaves your device
- **Persistence**: Tasks survive browser restarts
- **Smart Cleanup**: Automatic alerts when storage is nearly full

## 🎯 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- 📱 **Mobile**: 0-767px (Card layout)
- 📊 **Tablet**: 768-1023px (Compact table)
- 💻 **Desktop**: 1024px+ (Full table layout)

## 🧹 Storage Management

The app includes intelligent storage management:
- **Warning at 2MB**: Yellow alert suggests cleanup
- **Critical at 3.5MB**: Red alert with one-click cleanup
- **Automatic cleanup**: Removes 30% of oldest completed tasks
- **Manual cleanup**: Available through statistics modal

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tito Martinez**

- 🌐 GitHub: [@your-username](https://github.com/your-username)
- 📧 Email: your-email@example.com

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Google Fonts for the Inter typeface
- Inspired by modern task management applications

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ and ☕ by Tito Martinez
