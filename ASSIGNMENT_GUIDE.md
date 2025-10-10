# ENCS 282 Assignment Submission Guide

## 📋 Before You Submit

### 1. Update Your Information in `index.html`

Open `index.html` and update the following fields (around line 19-23):

```html
<p><strong>Student Name:</strong> [Your Name Here]</p>
<p><strong>Student ID:</strong> [Your ID Here]</p>
<p><strong>Tutorial Section:</strong> [Your Section]</p>
```

Replace with your actual information:
```html
<p><strong>Student Name:</strong> John Smith</p>
<p><strong>Student ID:</strong> 40123456</p>
<p><strong>Tutorial Section:</strong> Tutorial 01</p>
```

The date will be automatically populated!

---

## 🌐 Deployment Steps (Choose ONE)

### Option 1: GitHub Pages (Recommended) ⭐

**Step 1: Create GitHub Repository**
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `CNN-Visualized`
4. Make it **Public**
5. Don't initialize with README
6. Click "Create repository"

**Step 2: Upload Your Project**

Open Terminal/Command Prompt and run:

```bash
cd /Users/ns/Desktop/CNN-Visualized
git init
git add .
git commit -m "AlexNet CNN Visualization - ENCS 282 Assignment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CNN-Visualized.git
git push -u origin main
```

**Step 3: Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Pages" (left sidebar)
4. Under "Source", select **"main"** branch
5. Click "Save"
6. Wait 2-3 minutes

**Your URL**: `https://YOUR_USERNAME.github.io/CNN-Visualized/`

---

### Option 2: Netlify (Fastest) 🚀

1. Go to [netlify.com](https://www.netlify.com/)
2. Click "Sign up" (use GitHub, Google, or email)
3. On dashboard, look for the deploy area
4. **Drag and drop** the entire `CNN-Visualized` folder
5. Wait 30 seconds - Done!

**Your URL**: `https://random-name-12345.netlify.app`

To customize the URL:
- Click "Site settings" → "Change site name"
- Change to something like: `yourname-cnn-alexnet`

---

## 📝 What to Submit

### Submission Checklist

1. ✅ **Live Website URL**
   - Copy the URL from GitHub Pages or Netlify
   - Example: `https://yourname.github.io/CNN-Visualized/`

2. ✅ **Updated Title Page**
   - Your name, ID, and section filled in

3. ✅ **Optional: PDF Backup**
   - Open your live website
   - Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
   - Select "Save as PDF"
   - Use "Print background graphics" option

4. ✅ **Submission Platform**
   - Submit URL via Moodle (or as instructed)
   - Include PDF if required

---

## 📊 Assignment Requirements Coverage

Your website meets ALL requirements:

| Requirement | Status | Location |
|------------|--------|----------|
| **Title Page** | ✅ | Top of index.html |
| **Process Description** | ✅ | Section 3 (700+ words) |
| **Introduction** | ✅ | Section 1 (200 words) |
| **9 Main Stages Listed** | ✅ | Section 1.4 |
| **Detailed Stages** | ✅ | Section 3 (chronological) |
| **Stage Relationships** | ✅ | Each stage description |
| **Technical Measurements** | ✅ | Dimensions, parameters shown |
| **Conclusion** | ✅ | Section 4 (200 words) |
| **Applications** | ✅ | Section 4.2 |
| **Limitations** | ✅ | Section 4.3 |
| **Labeled Figures** | ✅ | Interactive visualization |
| **Glossary/Appendix** | ✅ | Full section with 30+ terms |
| **Word Count** | ✅ | 700-900 words (Process) |
| **IEEE Style** | ✅ | Professional formatting |

---

## 🎯 How to Present Your Website

### During Presentation (if required)

**1. Title Page** (10 seconds)
   - "This is my process description of image classification using AlexNet CNN"
   - Point out your name and course info

**2. Introduction** (30 seconds)
   - Scroll to Section 1
   - Mention: "AlexNet revolutionized computer vision in 2012"
   - Point out the 9 stages listed

**3. Interactive Demo** (2-3 minutes)
   - Scroll to visualization section
   - Select a sample image (e.g., cat)
   - Click "Start Process"
   - Step through 2-3 stages, explaining:
     * Stage name
     * What happens (from description panel)
     * Technical specs (dimensions, parameters)
   - Show final output with predictions

**4. Detailed Descriptions** (30 seconds)
   - Scroll to Section 3
   - Mention: "Over 700 words of detailed stage descriptions"
   - Show how stages relate to each other

**5. Conclusion** (30 seconds)
   - Scroll to Section 4
   - Highlight applications (autonomous vehicles, medical imaging)
   - Mention limitations (computational cost, explainability)

**6. Glossary** (20 seconds)
   - Scroll to Appendix
   - "30+ technical terms defined for accessibility"
   - Show 2-3 examples

**Total Time**: ~4-5 minutes

---

## 🔧 Quick Fixes

### Issue: Canvas Not Showing
**Solution**: Make sure all 3 JavaScript files are loaded. Check browser console (F12).

### Issue: Images Not Loading
**Solution**: SVG images are embedded. They should work offline. If not, check browser console.

### Issue: GitHub Pages Not Working
**Solution**: 
1. Make sure repository is **Public**
2. Wait 3-5 minutes after enabling Pages
3. Clear browser cache
4. Check URL is exactly: `https://username.github.io/CNN-Visualized/`

### Issue: Need to Update Content
**Solution**: 
1. Edit the file locally
2. For GitHub:
   ```bash
   cd /Users/ns/Desktop/CNN-Visualized
   git add .
   git commit -m "Updated content"
   git push
   ```
3. For Netlify: Just drag and drop the folder again

---

## 💡 Tips for Success

### Writing Tips
- ✅ All content is already written and meets requirements
- ✅ Technical but accessible language used
- ✅ Chronological order maintained
- ✅ Stage relationships explained

### Presentation Tips
- 🎯 Practice the interactive demo beforehand
- 🎯 Have the website open before presenting
- 🎯 Use the keyboard shortcuts (Space, arrows) for smooth navigation
- 🎯 Zoom in (Ctrl/Cmd +) if presenting on a large screen

### Deployment Tips
- ⚡ Deploy at least 24 hours before deadline
- ⚡ Test the live URL on different devices
- ⚡ Keep a local backup of the folder
- ⚡ Take screenshots of the working site (just in case)

---

## 📱 Mobile Testing

Your website is fully responsive! Test on:
- iPhone/Android phone
- iPad/Tablet
- Different browsers (Chrome, Safari, Firefox)

---

## 🎨 Optional Customizations

### Change Colors
Edit `css/style.css`, lines 10-15 (CSS variables):
```css
--primary-color: #2563eb;  /* Change to your preferred color */
```

### Add Your Own Images
Replace files in `assets/` folder:
- Keep names: `cat.jpg`, `dog.jpg`, `car.jpg`
- Use 400×400 pixel images
- JPG or PNG format

### Update Predictions
Edit `js/alexnet.js`, line 186+ (samplePredictions object)

---

## 📞 Final Checklist

Before submitting:

- [ ] Updated your name, ID, and section in index.html
- [ ] Tested the website locally (opened index.html)
- [ ] Deployed to GitHub Pages or Netlify
- [ ] Verified the live URL works
- [ ] Tested on at least 2 different browsers
- [ ] Created PDF backup (optional)
- [ ] Ready to submit URL on Moodle

---

## 🎉 You're All Set!

Your interactive CNN visualization is:
- ✅ Professionally designed
- ✅ Technically accurate
- ✅ Meets all assignment requirements
- ✅ Interactive and engaging
- ✅ Fully documented with glossary
- ✅ Ready for submission

**Good luck with your assignment!** 🚀

---

**Quick Reference URLs:**
- GitHub: [github.com](https://github.com)
- Netlify: [netlify.com](https://www.netlify.com)
- Project Folder: `/Users/ns/Desktop/CNN-Visualized/`

**Need Help?**
- Check `README.md` for detailed documentation
- Review assignment guidelines in ENCS 282 Moodle
- Test locally before deploying

