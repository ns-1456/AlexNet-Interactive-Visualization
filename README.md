# Interactive AlexNet CNN Visualization

An interactive web-based visualization of the image classification process using AlexNet Convolutional Neural Network. Created for ENCS 282 Technical Writing and Communication - Process Description Assignment.

## 📋 Overview

This project provides a comprehensive, interactive explanation of how image classification works through AlexNet's architecture. It demonstrates the complete process from input preprocessing through softmax output, with detailed visualizations and technical specifications for each stage.

## 🌍 Live Website

**🚀 [View Live Demo Here](https://ns-1456.github.io/AlexNet-Interactive-Visualization/)**

The website is deployed and ready to use! Click the link above to explore the interactive AlexNet visualization.

## ✨ Features

- **Interactive Step-Through**: Navigate through all 9 stages of the classification process
- **Visual Representations**: Custom visualizations for each layer type (convolutional, pooling, fully connected)
- **Technical Details**: Comprehensive specifications including dimensions, parameters, and operations
- **Sample Images**: Three demo images (cat, dog, car) with realistic classification predictions
- **Educational Content**: 700+ words of technical content suitable for process description assignment
- **Comprehensive Glossary**: 30+ technical terms explained in accessible language
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use arrow keys or spacebar to navigate

## 🚀 Quick Start

### Local Viewing

1. Open the project folder
2. Double-click `index.html` or right-click and select "Open With" → Browser
3. The website will open in your default web browser
4. No server or installation required!

### Using Python HTTP Server (Optional)

```bash
cd /Users/ns/Desktop/CNN-Visualized
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

1. **Create a GitHub repository**:
   ```bash
   cd /Users/ns/Desktop/CNN-Visualized
   git init
   git add .
   git commit -m "Initial commit: AlexNet visualization"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/CNN-Visualized.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://YOUR_USERNAME.github.io/CNN-Visualized/`

### Option 2: Netlify (Fast & Simple)

1. Visit [netlify.com](https://www.netlify.com/)
2. Sign up for a free account
3. Drag and drop the entire `CNN-Visualized` folder onto the Netlify dashboard
4. Your site will be live instantly with a URL like: `https://random-name-12345.netlify.app`
5. Optional: Customize your domain name in Netlify settings

### Option 3: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd /Users/ns/Desktop/CNN-Visualized
   vercel
   ```

3. Follow the prompts to deploy

### Option 4: GitLab Pages

1. Create a `.gitlab-ci.yml` file:
   ```yaml
   pages:
     stage: deploy
     script:
       - mkdir .public
       - cp -r * .public
       - mv .public public
     artifacts:
       paths:
         - public
     only:
       - main
   ```

2. Push to GitLab and your site will be deployed automatically

## 📁 Project Structure

```
CNN-Visualized/
├── index.html              # Main HTML file with all content
├── css/
│   └── style.css          # Styling and responsive design
├── js/
│   ├── alexnet.js         # AlexNet architecture definitions
│   ├── animation.js       # Visualization and animation engine
│   └── main.js            # Main application logic
├── assets/
│   ├── cat.jpg            # Sample image 1
│   ├── dog.jpg            # Sample image 2
│   └── car.jpg            # Sample image 3
└── README.md              # This file
```

## 🎯 How to Use

### Basic Navigation

1. **Select an Image**: Click on one of the three sample images (cat, dog, or car)
2. **Start Process**: Click the "Start Process" button
3. **Step Through**: Use "Next Step" and "Previous Step" buttons to navigate
4. **Reset**: Click "Reset" to return to the beginning

### Keyboard Shortcuts

- `Space` or `N` - Next stage
- `P` - Previous stage
- `R` - Reset to beginning
- `Arrow Keys` - Navigate forward/backward

### Interactive Features

- **Hover** over technical terms for quick definitions (tooltip support)
- **Click** different sample images to see how predictions change at the output stage
- **Scroll** through detailed stage descriptions below the visualization
- **Read** the glossary for comprehensive term definitions

## 📝 Assignment Submission

### For ENCS 282 Submission

1. **Update the title page** in `index.html`:
   - Add your name and student ID
   - Add your tutorial section
   - Date is automatically populated

2. **Deployment URL**: 
   - Deploy using one of the methods above
   - Submit the live URL with your assignment

3. **Optional - PDF Export**:
   - Open the website in your browser
   - Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
   - Select "Save as PDF"
   - Use this as a backup or print version

### Content Structure (Meets Assignment Requirements)

✅ **Title Page** - Includes all required information  
✅ **Introduction (200 words)** - What, why, where, when, how  
✅ **Process Overview** - Lists all 9 main stages  
✅ **Detailed Stages (700+ words)** - Chronological description with relationships  
✅ **Technical Specifications** - Dimensions, timing, parameters  
✅ **Interactive Visualization** - Labeled figures  
✅ **Conclusion (200 words)** - Applications, limitations, time, cost  
✅ **Glossary/Appendix** - 30+ technical terms defined  

## 🔧 Customization

### Change Sample Images

Replace files in `assets/` folder with your own images:
- Keep filenames: `cat.jpg`, `dog.jpg`, `car.jpg`
- Recommended size: 400x400 pixels
- Format: JPG, PNG, or SVG

### Modify Stage Descriptions

Edit `js/alexnet.js` to update:
- Stage descriptions
- Technical specifications
- Visual configurations

### Update Styling

Edit `css/style.css` to change:
- Colors (see CSS variables at top of file)
- Fonts
- Layout
- Responsive breakpoints

## 🎨 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript (ES6+)** - Interactive functionality
- **Canvas API** - Custom visualizations
- **SVG** - Scalable vector graphics

## 📊 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 References & Resources

### AlexNet Paper
- Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). "ImageNet Classification with Deep Convolutional Neural Networks." *NIPS 2012*.

### Additional Learning Resources
- [CS231n: Convolutional Neural Networks (Stanford)](http://cs231n.stanford.edu/)
- [Deep Learning Book (Goodfellow et al.)](https://www.deeplearningbook.org/)
- [ImageNet Dataset](https://www.image-net.org/)

## 🐛 Troubleshooting

### Images Not Loading
- Ensure all files are in the correct directory structure
- Check browser console (F12) for errors
- Verify file paths are correct

### Visualization Not Appearing
- Make sure JavaScript is enabled in your browser
- Check browser console for errors
- Try refreshing the page (Ctrl+R or Cmd+R)

### Deployment Issues on GitHub Pages
- Ensure repository is public
- Wait 2-3 minutes after enabling Pages
- Check that `index.html` is in the root directory

## 📧 Support & Contact

For questions about this project:
- Check the glossary for technical term definitions
- Review the detailed stage descriptions
- Consult the assignment guidelines in ENCS 282

## 📄 License

This project is created for educational purposes as part of ENCS 282 Technical Writing and Communication course.

## 🙏 Acknowledgments

- **AlexNet Architecture**: Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton
- **ImageNet Dataset**: Stanford Vision Lab
- **Educational Inspiration**: CS231n Stanford Course
- **Course**: ENCS 282 Technical Writing and Communication

---

**Created**: October 2025  
**Purpose**: ENCS 282 Process Description Assignment  
**Topic**: Image Classification Process Using AlexNet CNN

---

## Quick Deploy Commands

```bash
# GitHub Pages
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Then enable Pages in GitHub Settings

# Python Server (local testing)
python3 -m http.server 8000
# Open http://localhost:8000

# PHP Server (if available)
php -S localhost:8000

# Node.js Server (if you have npx)
npx http-server
```

---

**Enjoy your interactive CNN visualization!** 🎉

