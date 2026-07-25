# 🍽️ Make You Boost - Restaurant Website & WhatsApp Ordering System

A fast, responsive, and modern website for **Make You Boost** restaurant with built-in interactive shopping cart, dynamic admin dashboard, and WhatsApp ordering system

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

## 💳 Payment QR Code & Payment Link

- In Admin → **Payment QR & Link**, upload your UPI/QR scanner image and/or paste a payment link (UPI deep link, Razorpay, PayPal, etc.).
- Once set, customers can tap the cart **Total** (or the checkout button) to see your QR code and payment link before ordering.
- The WhatsApp order message is only sent after the customer taps **"✅ I've Paid – Send My Order."**
- If no payment info is set yet, checkout works exactly as before — a direct "Order via WhatsApp" button.

> ⚠️ Note: everything (menu, settings, PIN, payment info) is stored in the browser's `localStorage`. It's per-device/browser and not synced across devices. For a shared, always-in-sync admin experience across multiple devices, a small backend/database would be needed.
