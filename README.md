# Dawn-HD-Studio - Luxury Photography Portfolio

A stunning, high-end photography portfolio website built with Next.js 14, featuring sophisticated animations, minimalist design, and a spotlight Wedding section.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02)

---

## 🎨 Design Philosophy

### Minimalist Luxury
This website embodies **sophisticated minimalism** with a focus on showcasing photography in its purest form. The design follows these core principles:

- **Less is More**: Clean, spacious layouts with minimal distractions
- **Photography First**: Images are the hero, design serves as an elegant backdrop
- **Subtle Elegance**: Smooth animations that enhance without overwhelming
- **Dark Aesthetic**: Pure black backgrounds with gold accents for luxury feel
- **Typography as Art**: Oversized, refined typography with wide letter spacing

### Visual Hierarchy
The website is designed with a clear spotlight on the **Wedding section**, which features:
- Cinematic 21:9 featured image
- Ultra-large typography (9xl)
- Unique minimalist layout
- More vertical space and prominence
- Sophisticated hover interactions

---

## ✨ Key Features

### 🎬 Advanced Animations
- **GSAP ScrollTrigger** - Smooth scroll-based animations
- **Parallax Effects** - Subtle depth and movement
- **Staggered Reveals** - Sequential image appearances
- **Hover Interactions** - Elegant scale and overlay effects
- **Reverse Animations** - Smooth transitions on scroll up

### 📱 Responsive Design
- **Mobile-First** - Optimized for all devices
- **Adaptive Layouts** - Grid systems that adjust beautifully
- **Touch-Friendly** - Optimized interactions for mobile
- **Performance** - Fast loading on all devices

### 🖼️ Image Optimization
- **Next.js Image** - Automatic optimization and lazy loading
- **Priority Loading** - Above-fold images load first
- **Responsive Images** - Correct sizes for each device
- **WebP Support** - Modern image formats

### 🎯 User Experience
- **Lightbox Gallery** - Full-screen image viewing with zoom
- **Smooth Scrolling** - Buttery smooth navigation
- **Modal Forms** - Elegant enquiry and contact forms
- **Form Validation** - Client-side validation with React Hook Form
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

---

## 🏗️ Technical Stack

### Core Technologies
- **Next.js 14** - React framework with App Router and SSR
- **React 18** - Modern component architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Professional animation library

### Key Libraries
- **gsap** - Animation engine with ScrollTrigger
- **zustand** - Lightweight state management
- **framer-motion** - Modal animations
- **react-hook-form** - Form handling and validation
- **yet-another-react-lightbox** - Image lightbox with zoom

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📂 Project Structure

```
taj-studio/
├── app/
│   ├── layout.jsx          # Root layout with fonts
│   ├── page.jsx            # Main page with all sections
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Navbar.jsx          # Fixed navigation
│   ├── Hero.jsx            # Video hero with parallax
│   ├── Portfolio.jsx       # Pre-Wedding section
│   ├── WeddingSection.jsx  # ⭐ Spotlight Wedding section
│   ├── HorizontalScroll.jsx # Films horizontal scroll
│   ├── FamilySection.jsx   # Family/Maternity section
│   ├── Testimonials.jsx    # Auto-rotating carousel
│   ├── About.jsx           # About section
│   ├── Contact.jsx         # Contact details
│   ├── Footer.jsx          # Footer
│   └── EnquiryModal.jsx    # Enquiry form modal
├── store/
│   └── modalStore.js       # Zustand state management
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd taj-studio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--dark: #0a0a0a;           /* Pure black background */
--dark-lighter: #1a1a1a;   /* Secondary background */
--dark-light: #2a2a2a;     /* Tertiary background */

/* Accent Colors */
--gold: #c9a961;           /* Primary accent */
--gold-dark: #b89850;      /* Hover state */

/* Text Colors */
--white: #ffffff;          /* Primary text */
--gray-400: #9ca3af;       /* Secondary text */
--gray-500: #6b7280;       /* Tertiary text */
```

### Typography

**Headings:** Montserrat (400, 600, 700)
- Ultra-large titles (6xl-9xl)
- Wide letter spacing (0.2-0.3em)
- Light to bold weights

**Body:** Lato (300, 400, 700)
- Readable and clean
- Comfortable line height
- Professional feel

### Spacing Scale
- **Sections:** py-24 to py-48 (96px-192px)
- **Elements:** Standard Tailwind scale
- **Gaps:** 4-6 (16px-24px) for grids

---

## 📸 Sections Overview

### 1. Hero Section
- Full-screen video background
- Parallax text animations
- Smooth scroll reveal
- Blur effect on scroll

### 2. Pre-Wedding Section
- 3-column grid layout
- Simple fade-up animations
- Hover scale effects
- Lightbox integration

### 3. ⭐ Wedding Section (Spotlight)
- **Cinematic featured image** (21:9 aspect ratio)
- **5-column gallery grid**
- **Ultra-large typography**
- **Minimalist design**
- **Elegant hover effects**
- **Unique layout and prominence**

### 4. Films Section
- Horizontal scroll on vertical scroll
- Pinned section
- Video embeds
- Film frame decorations
- Smooth scrubbing

### 5. Family Section
- Asymmetric grid layout
- Category tabs
- Large featured image
- Floating heart decorations
- Split-text title animation

### 6. Testimonials
- Auto-rotating carousel (5s)
- Pause on hover
- Navigation dots and arrows
- Smooth transitions

### 7. About Section
- Split-text animation
- Animated statistics
- Floating decorative elements
- Dual-column text

### 8. Contact Section
- Two-column layout
- Contact details for multiple regions
- Tabbed forms (Enquiry/Careers)
- Form validation

---

## 🎬 Animation Details

### Scroll Animations
All sections feature scroll-triggered animations using GSAP ScrollTrigger:

```javascript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',      // Animation starts
  toggleActions: 'play none none reverse',
}
```

### Animation Types
- **Fade In**: Opacity 0 → 1
- **Slide Up**: Y translation with fade
- **Scale**: Scale 0.9 → 1.0
- **Parallax**: Continuous scroll-based movement
- **Stagger**: Sequential delays (0.1-0.15s)

### Easing Functions
- **power2.out** - Smooth deceleration
- **power3.out** - Strong deceleration
- **back.out** - Bounce effect
- **elastic.out** - Spring effect

---

## 🎯 Performance Optimizations

### Image Optimization
- Next.js automatic optimization
- Lazy loading below fold
- Priority loading for hero images
- Responsive image sizes
- WebP format support

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Tree shaking unused code

### Animation Performance
- GPU-accelerated transforms
- `will-change` hints
- Efficient ScrollTrigger setup
- Proper cleanup on unmount

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

---

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  gold: {
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_DARK_COLOR',
  },
}
```

### Update Images

Edit `app/page.jsx`:

```javascript
images={[
  { url: 'YOUR_IMAGE_URL', name: 'Your Name' },
]}
```

### Modify Animations

Edit component files:

```javascript
// Change duration
duration: 1.2,

// Change stagger delay
stagger: 0.15,

// Change easing
ease: 'power3.out',
```

### Update Content

- **Contact Info**: `components/Contact.jsx`
- **Testimonials**: `components/Testimonials.jsx`
- **About Text**: `components/About.jsx`
- **Video URLs**: `components/HorizontalScroll.jsx`

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms

```bash
# Build
npm run build

# The output will be in .next folder
# Deploy the entire project folder
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Sufficient color contrast
- Alt text for images

---

## 📄 License

© 2025 Taj Studio. All rights reserved.

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **GSAP** - Animation library
- **Tailwind CSS** - Styling framework
- **Unsplash** - Placeholder images

---

## 📞 Support

For questions or support, contact: info@taj.studio

---

## 🎊 Features Highlight

### What Makes This Special

1. **Spotlight Wedding Section** - Unique, prominent design
2. **Cinematic Layouts** - 21:9 featured images
3. **Smooth Animations** - 60fps GSAP animations
4. **Minimalist Aesthetic** - Clean, sophisticated design
5. **Professional Quality** - Production-ready code
6. **Fully Responsive** - Perfect on all devices
7. **SEO Optimized** - Server-side rendering
8. **Fast Performance** - Optimized images and code

---

**Built with ❤️ for luxury photography**
