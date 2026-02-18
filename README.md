# InQueApps Developer Website

A modern, responsive developer website for InQueApps that showcases mobile applications and provides information about the development company.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dynamic App Loading**: Fetches and displays apps from Google Play Store
- **Interactive Elements**: Hover effects, smooth scrolling, and engaging animations
- **Mobile-First**: Optimized for mobile devices with touch-friendly interface
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📱 Current Apps

Based on the Google Play Store developer page, the following apps are currently displayed:

1. **PRISM AI** - Turn your camera into a superpower. Night vision, AI vision tools, depth maps, text translation, and more.
2. **Universal Media Converter** - Convert and transform media files
3. **Tech Prep** - Comprehensive preparation app for technology interviews
4. **Rate My Fit** - Rate and review fashion outfits

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. The website should load with all features working

### Local Hosting (Recommended for testing)

Run a local web server from the project root:

```bash
python serve_local.py
```

Then open:

- `http://localhost:8000/` (main site)
- `http://localhost:8000/pai/` (PRISM AI)
- `http://localhost:8000/rmf/` (Rate My Fit)
- `http://localhost:8000/tp/` (Tech Prep)
- `http://localhost:8000/umc/` (Universal Media Converter)

Optional:

```bash
python serve_local.py --open
python serve_local.py --port 5500
```

### File Structure

```
inqueapps.github.io/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## 🎨 Customization

### Adding New Apps

To add new apps to the website, update the `knownApps` array in `script.js`:

```javascript
this.knownApps = [
    {
        name: 'Your New App',
        description: 'Description of your new app',
        icon: 'fas fa-icon-name',
        category: 'App Category'
    },
    // ... existing apps
];
```

### Changing Colors

The website uses a blue color scheme. To change colors, update the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1d4ed8;
    --accent-color: #667eea;
}
```

### Updating Content

- **Company Information**: Edit the content in `index.html` sections
- **Contact Information**: Update the contact details in the contact section
- **Styling**: Modify `styles.css` for visual changes
- **Functionality**: Edit `script.js` for behavior changes

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features

- Lazy loading animations
- Optimized images and assets
- Smooth scrolling
- Efficient CSS animations
- Minimal JavaScript footprint

## 📊 SEO and Analytics

The website includes:

- Proper meta tags for SEO
- Semantic HTML structure
- Open Graph tags for social sharing
- Responsive design for mobile-first indexing
- Fast loading times

## 🔄 Future Enhancements

### Planned Features

1. **Real-time App Fetching**: Implement a backend service to fetch apps directly from Google Play Store API
2. **App Details Modal**: Add detailed information popups for each app
3. **Blog Section**: Add a blog to share development insights
4. **Contact Form**: Implement a working contact form
5. **Analytics**: Add Google Analytics or similar tracking
6. **Dark Mode**: Add a dark/light theme toggle

### API Integration

For real-time app fetching, you would need to:

1. Set up a backend service (Node.js, Python, etc.)
2. Use Google Play Store API or web scraping
3. Create an endpoint to fetch app data
4. Update the JavaScript to call your API instead of using static data

Example API integration:

```javascript
async fetchApps() {
    try {
        const response = await fetch('/api/apps');
        const apps = await response.json();
        this.displayApps(apps);
    } catch (error) {
        this.showError();
    }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Apps not loading**: Check the JavaScript console for errors
2. **Styling issues**: Ensure all CSS files are properly linked
3. **Mobile menu not working**: Check if JavaScript is enabled
4. **Slow loading**: Optimize images and reduce file sizes

### Debug Mode

Open the browser console and type `refreshApps()` to manually refresh the apps section.

## 📝 License

This project is created for InQueApps. All rights reserved.

## 🤝 Contributing

To contribute to this website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions about this website:

- Email: contact@inqueapps.com
- Website: inqueapps.github.io
- Google Play Store: [InQueApps Developer Page](https://play.google.com/store/apps/developer?id=inQue+Apps)

---

**Last Updated**: December 2024  
**Version**: 1.0.0 