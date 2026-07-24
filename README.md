# 🍽️ Make You Boost - Restaurant Website & WhatsApp Ordering System


## 💳 Payment QR Code & Payment Link

- In Admin → **Payment QR & Link**, upload your UPI/QR scanner image and/or paste a payment link (UPI deep link, Razorpay, PayPal, etc.).
- Once set, customers can tap the cart **Total** (or the checkout button) to see your QR code and payment link before ordering.
- The WhatsApp order message is only sent after the customer taps **"✅ I've Paid – Send My Order."**
- If no payment info is set yet, checkout works exactly as before — a direct "Order via WhatsApp" button.

> ⚠️ Note: everything (menu, settings, PIN, payment info) is stored in the browser's `localStorage`. It's per-device/browser and not synced across devices. For a shared, always-in-sync admin experience across multiple devices, a small backend/database would be needed.
