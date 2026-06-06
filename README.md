# ArticleZine.xyz 👕
### منصة الطباعة حسب الطلب في المغرب | Print On Demand Morocco

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?logo=github)](https://articlezine.xyz)
[![Languages](https://img.shields.io/badge/Languages-AR%20|%20FR%20|%20EN-green)](https://articlezine.xyz)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+212602321305-25d366?logo=whatsapp)](https://wa.me/212602321305)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Product Management Guide](#product-management-guide)
5. [WhatsApp Integration Guide](#whatsapp-integration-guide)
6. [SEO Guide](#seo-guide)
7. [Customization](#customization)
8. [Contact](#contact)

---

## 🌟 Project Overview

**ArticleZine** is a complete multilingual Print-On-Demand eCommerce platform for Morocco:

- **Languages:** Arabic (default, RTL), French, English
- **Order System:** WhatsApp-based (no payment gateway needed)
- **Deployment:** Static site — GitHub Pages ready
- **Features:** Product catalog, category filtering, search, custom design requests, SEO blog (90 articles), dark/light mode, PWA-ready
- **Target Market:** Morocco — Casablanca, Rabat, Marrakech, Tangier, Agadir, Fès

### Tech Stack
- Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- Zero dependencies — no build step required
- Unsplash royalty-free images (CDN)
- Google Fonts (Syne + DM Sans + Noto Naskh Arabic)

---

## 📁 File Structure

```
articlezine/
├── index.html          # Main page (all sections SPA)
├── style.css           # Complete styling (dark/light, RTL/LTR)
├── app.js              # Application logic, routing, events
├── products.js         # Product catalog + WhatsApp message builder
├── translations.js     # AR/FR/EN translations + 90 blog articles
├── manifest.json       # PWA manifest
├── sitemap.xml         # Full SEO sitemap (90+ URLs)
├── robots.txt          # Search engine directives
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── icons/              # (create these for PWA)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 GitHub Pages Deployment

### Step 1: Create Repository

Go to [github.com](https://github.com) → **New repository**
- Repository name: `articlezine`
- Visibility: **Public**
- Do NOT initialize with README

### Step 2: Push Code

```bash
# Navigate to project folder
cd articlezine

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🚀 Launch ArticleZine — Print On Demand Morocco"

# Set main branch
git branch -M main

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/articlezine.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**: select `Deploy from a branch`
4. Branch: `main` / Folder: `/ (root)`
5. Click **Save**

Your site will be live at:
`https://YOUR_USERNAME.github.io/articlezine/`

### Step 4: Custom Domain (articlezine.xyz)

1. In GitHub Pages settings, add custom domain: `articlezine.xyz`
2. Go to your domain registrar (Namecheap, GoDaddy, Porkbun, etc.)
3. Add DNS records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR_USERNAME.github.io
```

4. Wait 24-48h for DNS propagation
5. Enable **Enforce HTTPS** in GitHub Pages settings

### Step 5: Update URL References

Once your custom domain is live, update these files:
- `sitemap.xml` — already set to `https://articlezine.xyz/`
- `index.html` — OG/Twitter meta tags already set

---

## 📦 Product Management Guide

### Adding a New Product

Open `products.js` and add to the `PRODUCTS` array:

```javascript
{
  id: "m-ts-5",          // unique ID: category-subcategory-number
  category: "men",        // men | women | kids | accessories
  sub: "tshirts",         // subcategory key (see list below)
  name: {
    ar: "تيشرت جديد",
    fr: "Nouveau T-shirt",
    en: "New T-Shirt"
  },
  price: 149,             // price in MAD
  colors: ["black","white","navy"],  // from COLORS object
  sizes: SIZES_ADULT,     // SIZES_ADULT | SIZES_KIDS | SIZES_BABY | SIZES_ONE
  images: [
    "https://images.unsplash.com/photo-XXXXXXXX?w=600&q=80",
    "https://images.unsplash.com/photo-YYYYYYYY?w=600&q=80"
  ],
  trending: false,        // shows 🔥 badge
  isNew: true,            // shows ✨ badge
  desc: makeDesc          // keep as-is for auto description
}
```

### Subcategory Keys

| Category | Subcategories |
|----------|---------------|
| men | tshirts, polo, hoodies, sweatshirts, jackets, sportswear |
| women | tshirts, hoodies, dresses, sweatshirts, sportswear |
| kids | tshirts, hoodies, school, baby |
| accessories | caps, totebags, mugs, phonecases, stickers |

### Adding Colors

Add to the `COLORS` object in `products.js`:

```javascript
coral: { ar: "مرجاني", fr: "Corail", en: "Coral", hex: "#ff6b6b" }
```

### Updating Prices

Simply change the `price` field (integer, in MAD).

### Using Custom Images

Replace Unsplash URLs with your own hosted images. Recommended size: **600×750px minimum**, JPG/WebP format.

For best performance, use Cloudinary or imgix:
```
https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_600,q_80/your-image.jpg
```

---

## 📱 WhatsApp Integration Guide

### How It Works

When a customer clicks **"Order via WhatsApp"**, the app:

1. Collects: product name, selected size, selected color, quantity
2. Builds a pre-filled WhatsApp message
3. Opens `https://wa.me/212602321305?text=...`

### Message Format (Arabic)

```
مرحبًا، أريد طلب المنتج التالي:

المنتج: تيشرت جرافيك أسود
المقاس: L
اللون: أسود
الكمية: 2
```

### Changing WhatsApp Number

In `products.js`, line 1:
```javascript
const WHATSAPP_NUMBER = "212602321305";
// Format: country code + number, no + or spaces
```

### Custom Design Request

When a customer submits the custom design form:
1. They optionally upload files (logo/artwork)
2. They write notes about their order
3. Clicking the button opens WhatsApp with their notes pre-filled
4. You receive the message and follow up via WhatsApp

**Note:** File uploads via WhatsApp web link are not supported. Ask customers to send files after the initial WhatsApp contact, or use [wa.me](https://wa.me) links with `text=` parameter only.

---

## 🔍 SEO Guide

### What's Already Set Up

✅ Full trilingual meta tags (AR/FR/EN)  
✅ Open Graph (Facebook/LinkedIn)  
✅ Twitter/X Cards  
✅ Schema.org LocalBusiness  
✅ Schema.org WebSite + SearchAction  
✅ Schema.org BreadcrumbList  
✅ Canonical URLs  
✅ hreflang tags  
✅ Geo meta tags (Morocco)  
✅ Sitemap.xml with 90+ blog article URLs  
✅ robots.txt  
✅ 90 SEO blog articles (50 AR + 20 FR + 20 EN)  

### Adding to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://articlezine.xyz/`
3. Verify via DNS TXT record or HTML file
4. Submit sitemap: `https://articlezine.xyz/sitemap.xml`

### Google Analytics Setup

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Measurement ID.

### Key SEO Keywords Targeted

**Arabic:** طباعة حسب الطلب المغرب · تصميم تيشرتات المغرب · طباعة على الملابس · تيشرتات مخصصة · ملابس مطبوعة

**French:** Impression à la demande Maroc · T-shirt personnalisé Maroc · Impression textile Maroc

**English:** Print On Demand Morocco · Custom T-Shirts Morocco · Personalized Apparel Morocco

**Local:** Casablanca · Rabat · Marrakech · Tangier · Agadir · Fès

### Blog Content Strategy

Add new articles to `translations.js` in the `BLOG_ARTICLES` object:

```javascript
{ 
  id: "ar-51", 
  cat: "printing",       // printing|pod|personal|business|events|school
  title: "عنوان المقال",
  date: "2025-10-01", 
  excerpt: "مقدمة قصيرة...", 
  tags: ["كلمة مفتاحية"] 
}
```

---

## 🎨 Customization

### Changing Brand Colors

In `style.css`, update CSS variables:

```css
:root {
  --accent: #c8a96e;    /* Gold accent — your brand color */
  --accent2: #8b6c42;   /* Darker accent for text */
  --wa: #25d366;        /* WhatsApp green — keep this */
}
```

### Dark Mode Colors

```css
[data-theme="dark"] {
  --bg: #0f0e0c;
  /* customize dark palette here */
}
```

### Changing Fonts

In `style.css`, update the Google Fonts import and variables:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

:root {
  --font-head: 'YOUR_FONT', sans-serif;
  --font-body: 'YOUR_BODY_FONT', sans-serif;
}
```

### Changing Hero Images

In `index.html`, replace the `src` attributes of `.hero-img-main` and `.hero-img-2`.

---

## 🔄 Updating the Site

```bash
# Make changes to files
# Then:
git add .
git commit -m "Update: [describe what you changed]"
git push
```

GitHub Pages auto-deploys within 1-3 minutes.

---

## 📧 Contact

**WhatsApp:** [+212 6 02 32 13 05](https://wa.me/212602321305)  
**Email:** salatrir@gmail.com  
**Website:** [articlezine.xyz](https://articlezine.xyz)

**Service Areas:** الدار البيضاء · الرباط · مراكش · طنجة · أكادير · فاس · وجميع مدن المغرب

---

*© 2025 ArticleZine.xyz — All rights reserved | جميع الحقوق محفوظة*
