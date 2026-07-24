# 🍽️ Make You Boost - Restaurant Website & WhatsApp Ordering System

A fast, responsive, and modern website for **Make You Boost** restaurant with built-in interactive shopping cart, dynamic admin dashboard, and WhatsApp ordering system!

---

## 📁 Folder Structure

```
make-you-boost-restaurant/
├── index.html           # Main HTML structure
├── css/
│   └── style.css        # Theme, layout styles, and animations
├── js/
│   └── app.js           # Menu logic, cart, WhatsApp order & admin dashboard
└── README.md            # Project guide & free deployment steps
```

---

## 🚀 How to Deploy for FREE (Step-by-Step Guide)

You can publish this website live on the internet completely for **FREE** in under 2 minutes using any of the following platforms:

---

### Option 1: Deploy with Netlify Drop (Easiest - 1 Minute, No Coding Required)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the extracted `make-you-boost-restaurant` folder (or the ZIP file) directly onto the Netlify drop box on your screen.
3. Netlify will generate a live URL for your website instantly (e.g. `https://make-you-boost.netlify.app`).
4. **Done!** Your restaurant website is live!

---

### Option 2: Deploy with Vercel (Fast & Professional)

1. Go to [vercel.com](https://vercel.com) and create a free account.
2. Install Vercel CLI (optional) or drag & drop your project folder on the Vercel dashboard.
3. Click **Deploy**.
4. Your site will be live on a custom `.vercel.app` domain with free SSL certificate!

---

### Option 3: Deploy with GitHub Pages

1. Go to [github.com](https://github.com) and create a free account.
2. Create a new repository named `make-you-boost`.
3. Upload all files (`index.html`, `css/`, `js/`, `README.md`) into the repository.
4. Go to **Settings** -> **Pages** -> Select **Branch: main** -> Save.
5. In a few seconds, your site will be live at `https://YOUR-USERNAME.github.io/make-you-boost`.

---

## ⚙️ How to Customize / Manage Shop Items

- Click the **⚙️ Admin** button in the header of your live site.
- Change the **Shop Name** or **WhatsApp Phone Number**.
- Add new menu items with custom **names, descriptions, and prices in ₹**.
- Delete any old items from the menu.
- All changes are saved instantly in `localStorage`.

---

## 🔒 Admin PIN Lock

- The very first time you open the **⚙️ Admin** panel, you'll be asked to create a 4-digit PIN.
- After that, the PIN is required **every time** you open the Admin panel.
- You can change your PIN anytime from inside the dashboard (Shop Settings → Change Admin PIN).
- The PIN is stored locally in `localStorage`, so it's specific to the browser/device it was set on.

## 📸 Uploading Food Images from Your Device

- In **Add New Food Item**, use "Upload Image from Device" to pick a photo directly from your phone or computer.
- The image is automatically compressed before saving so it won't overload browser storage.
- You can still paste an image URL instead if you prefer.

## 💳 Payment QR Code & Payment Link

- In Admin → **Payment QR & Link**, upload your UPI/QR scanner image and/or paste a payment link (UPI deep link, Razorpay, PayPal, etc.).
- Once set, customers can tap the cart **Total** (or the checkout button) to see your QR code and payment link before ordering.
- The WhatsApp order message is only sent after the customer taps **"✅ I've Paid – Send My Order."**
- If no payment info is set yet, checkout works exactly as before — a direct "Order via WhatsApp" button.

> ⚠️ Note: everything (menu, settings, PIN, payment info) is stored in the browser's `localStorage`. It's per-device/browser and not synced across devices. For a shared, always-in-sync admin experience across multiple devices, a small backend/database would be needed.
