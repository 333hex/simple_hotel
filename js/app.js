// Initial Default Data
const DEFAULT_MENU = [
  {
    id: "1",
    name: "Bajji",
    desc: "Spicy, crispy fritters served with authentic secret chutney",
    price: 15,
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Vadaa",
    desc: "Crispy savory fried lentil donut with spicy & sweet secret chutney",
    price: 10,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Sambar Rice",
    desc: "Hot, comforting lentils & rice cooked with rich aromatic spices",
    price: 50,
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  }
];

const DEFAULT_SETTINGS = {
  shopName: "Make You Boost",
  whatsappNumber: "919876543210",
  paymentQR: "",
  paymentLink: ""
};

// State Management
let menuItems = JSON.parse(localStorage.getItem('bakeryMenu')) || DEFAULT_MENU;
let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];
let settings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem('bakerySettings')) || {});

// Holds a data-URL while the "Add Item" form is being filled out
let pendingNewItemImg = "";
// Holds a data-URL while the payment QR is being set in Admin
let pendingPaymentQR = settings.paymentQR || "";

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartOverlay = document.getElementById('cartOverlay');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartHeaderTotal = document.getElementById('cartHeaderTotal');
const cartGrandTotal = document.getElementById('cartGrandTotal');
const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

// Admin DOM Elements
const adminModalOverlay = document.getElementById('adminModalOverlay');
const openAdminBtn = document.getElementById('openAdminBtn');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminShopNameInput = document.getElementById('adminShopNameInput');
const adminWhatsappInput = document.getElementById('adminWhatsappInput');
const saveAdminSettingsBtn = document.getElementById('saveAdminSettingsBtn');
const addItemForm = document.getElementById('addItemForm');
const adminItemList = document.getElementById('adminItemList');
const changePinBtn = document.getElementById('changePinBtn');
const changePinNew = document.getElementById('changePinNew');

// Admin PIN Lock DOM Elements
const adminPinModalOverlay = document.getElementById('adminPinModalOverlay');
const closePinBtn = document.getElementById('closePinBtn');
const pinModalTitle = document.getElementById('pinModalTitle');
const pinModalSubtext = document.getElementById('pinModalSubtext');
const pinInput = document.getElementById('pinInput');
const pinConfirmGroup = document.getElementById('pinConfirmGroup');
const pinConfirmInput = document.getElementById('pinConfirmInput');
const pinErrorMsg = document.getElementById('pinErrorMsg');
const pinSubmitBtn = document.getElementById('pinSubmitBtn');

// New Item Image Upload DOM Elements
const newItemImgFile = document.getElementById('newItemImgFile');
const newItemImgPreviewWrapper = document.getElementById('newItemImgPreviewWrapper');
const newItemImgPreview = document.getElementById('newItemImgPreview');
const newItemImgUrl = document.getElementById('newItemImg');

// Payment Settings DOM Elements
const paymentQRInput = document.getElementById('paymentQRInput');
const paymentQRPreviewWrapper = document.getElementById('paymentQRPreviewWrapper');
const paymentQRPreview = document.getElementById('paymentQRPreview');
const removeQRBtn = document.getElementById('removeQRBtn');
const paymentLinkInput = document.getElementById('paymentLinkInput');
const savePaymentSettingsBtn = document.getElementById('savePaymentSettingsBtn');

// Payment Modal (customer-facing) DOM Elements
const paymentModalOverlay = document.getElementById('paymentModalOverlay');
const closePaymentBtn = document.getElementById('closePaymentBtn');
const cartTotalRow = document.getElementById('cartTotalRow');
const paymentModalAmount = document.getElementById('paymentModalAmount');
const paymentQRWrapper = document.getElementById('paymentQRWrapper');
const paymentQRImg = document.getElementById('paymentQRImg');
const paymentLinkBtn = document.getElementById('paymentLinkBtn');
const noPaymentSetMsg = document.getElementById('noPaymentSetMsg');
const confirmPaidBtn = document.getElementById('confirmPaidBtn');

// Initialization
function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  applySettings();
  renderMenu();
  renderCart();
  renderAdminItemList();
}

// Apply Settings Across Page
function applySettings() {
  document.title = `${settings.shopName} | Restaurant & Menu`;
  document.getElementById('headerShopName').textContent = settings.shopName;
  document.getElementById('heroShopTitle').textContent = `Welcome to ${settings.shopName}`;
  document.querySelectorAll('.dyn-shop-name').forEach(el => el.textContent = settings.shopName);
  
  adminShopNameInput.value = settings.shopName;
  adminWhatsappInput.value = settings.whatsappNumber;

  paymentLinkInput.value = settings.paymentLink || "";
  if (settings.paymentQR) {
    paymentQRPreview.src = settings.paymentQR;
    paymentQRPreviewWrapper.style.display = 'block';
  } else {
    paymentQRPreviewWrapper.style.display = 'none';
  }
}

// ==========================================
// IMAGE HELPER: read a file and compress it to a
// reasonably small base64 data URL (keeps localStorage happy)
// ==========================================
function fileToCompressedDataUrl(file, maxDimension, quality, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDimension) {
        height = Math.round(height * (maxDimension / width));
        width = maxDimension;
      } else if (height > maxDimension) {
        width = Math.round(width * (maxDimension / height));
        height = maxDimension;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Render Public Menu Cards
function renderMenu() {
  menuGrid.innerHTML = menuItems.map(item => `
    <div class="menu-card">
      <div class="menu-img-wrapper">
        <img src="${item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" alt="${item.name}" class="menu-img">
        <span class="menu-price-tag">₹${item.price}</span>
      </div>
      <div class="menu-body">
        <h3 class="menu-title">${item.name}</h3>
        <p class="menu-desc">${item.desc}</p>
        <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
          <span>🛒</span> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Cart Logic
function addToCart(itemId) {
  const item = menuItems.find(m => m.id === itemId);
  if (!item) return;

  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
  renderCart();
  openCartDrawer();
}

function updateQty(itemId, delta) {
  const item = cart.find(c => c.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== itemId);
  }

  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCountBadge.textContent = totalItems;
  cartHeaderTotal.textContent = `₹${totalPrice}`;
  cartGrandTotal.textContent = `₹${totalPrice}`;

  whatsappCheckoutBtn.innerHTML = (settings.paymentQR || settings.paymentLink)
    ? '💳 Proceed to Payment'
    : '📱 Order via WhatsApp';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); margin-top: 3rem;">
        <p style="font-size: 3rem;">🛒</p>
        <p>Your cart is empty.</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// WhatsApp Checkout
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let text = `Hello *${settings.shopName}*, I would like to place an order:\n\n`;

  cart.forEach(item => {
    text += `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  text += `\n*Total Amount:* ₹${total}\n`;
  text += `Please confirm my order. Thank you!`;

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
}

whatsappCheckoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // If the shop has set up a QR code or payment link, route the customer
  // through payment first — the order is only sent after they confirm payment.
  if (settings.paymentQR || settings.paymentLink) {
    openPaymentModal();
  } else {
    sendWhatsAppOrder();
  }
});

// Drawer Open/Close
function openCartDrawer() { cartOverlay.classList.add('active'); }
function closeCartDrawer() { cartOverlay.classList.remove('active'); }
openCartBtn.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
clearCartBtn.addEventListener('click', clearCart);

// ==========================================
// ADMIN PIN LOCK
// ==========================================
function getStoredPin() {
  return localStorage.getItem('bakeryAdminPin') || "";
}

function isValidPinFormat(val) {
  return /^\d{4}$/.test(val);
}

function showPinError(msg) {
  pinErrorMsg.textContent = msg;
  pinErrorMsg.style.display = 'block';
}

function clearPinError() {
  pinErrorMsg.style.display = 'none';
  pinErrorMsg.textContent = '';
}

function resetPinModalFields() {
  pinInput.value = '';
  pinConfirmInput.value = '';
  clearPinError();
}

function openAdminPinModal() {
  const storedPin = getStoredPin();
  resetPinModalFields();

  if (!storedPin) {
    // First time ever — ask the shop owner to set up a PIN
    pinModalTitle.textContent = '🔒 Set Up Admin PIN';
    pinModalSubtext.textContent = 'Create a 4-digit PIN to protect your admin dashboard. You will need this every time you open Admin.';
    pinConfirmGroup.style.display = 'block';
    pinSubmitBtn.textContent = 'Set PIN & Continue';
  } else {
    pinModalTitle.textContent = '🔒 Enter Admin PIN';
    pinModalSubtext.textContent = 'Enter your 4-digit PIN to access the admin dashboard.';
    pinConfirmGroup.style.display = 'none';
    pinSubmitBtn.textContent = 'Unlock';
  }

  adminPinModalOverlay.classList.add('active');
  setTimeout(() => pinInput.focus(), 100);
}

function closeAdminPinModal() {
  adminPinModalOverlay.classList.remove('active');
  resetPinModalFields();
}

function handlePinSubmit() {
  const storedPin = getStoredPin();
  const entered = pinInput.value.trim();

  if (!isValidPinFormat(entered)) {
    showPinError('Please enter exactly 4 digits.');
    return;
  }

  if (!storedPin) {
    // Setting up PIN for the first time
    const confirmVal = pinConfirmInput.value.trim();
    if (entered !== confirmVal) {
      showPinError('PINs do not match. Try again.');
      return;
    }
    localStorage.setItem('bakeryAdminPin', entered);
    closeAdminPinModal();
    openAdminModal();
    return;
  }

  // Verifying existing PIN
  if (entered === storedPin) {
    closeAdminPinModal();
    openAdminModal();
  } else {
    showPinError('Incorrect PIN. Please try again.');
    pinInput.value = '';
    pinInput.focus();
  }
}

pinSubmitBtn.addEventListener('click', handlePinSubmit);
closePinBtn.addEventListener('click', closeAdminPinModal);
[pinInput, pinConfirmInput].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlePinSubmit();
  });
});

changePinBtn.addEventListener('click', () => {
  const newPin = changePinNew.value.trim();
  if (!isValidPinFormat(newPin)) {
    alert('Please enter exactly 4 digits for the new PIN.');
    return;
  }
  localStorage.setItem('bakeryAdminPin', newPin);
  changePinNew.value = '';
  alert('Admin PIN updated successfully!');
});

// Admin Dashboard Logic
function openAdminModal() { adminModalOverlay.classList.add('active'); }
function closeAdminModal() { adminModalOverlay.classList.remove('active'); }
openAdminBtn.addEventListener('click', openAdminPinModal);
closeAdminBtn.addEventListener('click', closeAdminModal);

saveAdminSettingsBtn.addEventListener('click', () => {
  settings.shopName = adminShopNameInput.value.trim() || DEFAULT_SETTINGS.shopName;
  settings.whatsappNumber = adminWhatsappInput.value.trim() || DEFAULT_SETTINGS.whatsappNumber;
  localStorage.setItem('bakerySettings', JSON.stringify(settings));
  applySettings();
  alert('Settings saved successfully!');
});

newItemImgFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) {
    pendingNewItemImg = "";
    newItemImgPreviewWrapper.style.display = 'none';
    return;
  }
  fileToCompressedDataUrl(file, 800, 0.75, (dataUrl) => {
    pendingNewItemImg = dataUrl;
    newItemImgPreview.src = dataUrl;
    newItemImgPreviewWrapper.style.display = 'block';
  });
});

addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Priority: uploaded device image > pasted URL > default placeholder
  const chosenImg = pendingNewItemImg || newItemImgUrl.value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

  const newItem = {
    id: Date.now().toString(),
    name: document.getElementById('newItemName').value.trim(),
    desc: document.getElementById('newItemDesc').value.trim(),
    price: parseFloat(document.getElementById('newItemPrice').value),
    img: chosenImg
  };

  menuItems.push(newItem);
  localStorage.setItem('bakeryMenu', JSON.stringify(menuItems));
  renderMenu();
  renderAdminItemList();
  addItemForm.reset();
  pendingNewItemImg = "";
  newItemImgPreviewWrapper.style.display = 'none';
  alert('New item added to menu!');
});

// ==========================================
// PAYMENT SETTINGS (Admin: QR code + payment link)
// ==========================================
paymentQRInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fileToCompressedDataUrl(file, 600, 0.85, (dataUrl) => {
    pendingPaymentQR = dataUrl;
    paymentQRPreview.src = dataUrl;
    paymentQRPreviewWrapper.style.display = 'block';
  });
});

removeQRBtn.addEventListener('click', () => {
  pendingPaymentQR = "";
  paymentQRInput.value = "";
  paymentQRPreviewWrapper.style.display = 'none';
});

savePaymentSettingsBtn.addEventListener('click', () => {
  settings.paymentQR = pendingPaymentQR || "";
  settings.paymentLink = paymentLinkInput.value.trim();
  localStorage.setItem('bakerySettings', JSON.stringify(settings));
  alert('Payment settings saved successfully!');
});

// ==========================================
// CUSTOMER PAYMENT MODAL (QR code / payment link)
// ==========================================
function openPaymentModal() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  paymentModalAmount.textContent = `₹${total}`;

  if (settings.paymentQR) {
    paymentQRImg.src = settings.paymentQR;
    paymentQRWrapper.style.display = 'inline-block';
  } else {
    paymentQRWrapper.style.display = 'none';
  }

  if (settings.paymentLink) {
    paymentLinkBtn.href = settings.paymentLink;
    paymentLinkBtn.style.display = 'inline-flex';
  } else {
    paymentLinkBtn.style.display = 'none';
  }

  noPaymentSetMsg.style.display = (!settings.paymentQR && !settings.paymentLink) ? 'block' : 'none';

  paymentModalOverlay.classList.add('active');
}

function closePaymentModal() {
  paymentModalOverlay.classList.remove('active');
}

cartTotalRow.addEventListener('click', openPaymentModal);
closePaymentBtn.addEventListener('click', closePaymentModal);

confirmPaidBtn.addEventListener('click', () => {
  sendWhatsAppOrder();
  closePaymentModal();
  closeCartDrawer();
});

function deleteMenuItem(id) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    menuItems = menuItems.filter(item => item.id !== id);
    localStorage.setItem('bakeryMenu', JSON.stringify(menuItems));
    renderMenu();
    renderAdminItemList();
  }
}

function renderAdminItemList() {
  adminItemList.innerHTML = menuItems.map(item => `
    <div class="admin-item-row">
      <div>
        <strong>${item.name}</strong> - ₹${item.price}
      </div>
      <button class="delete-item-btn" onclick="deleteMenuItem('${item.id}')">Delete</button>
    </div>
  `).join('');
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you! Your message has been sent successfully.');
  e.target.reset();
});

// Newsletter Form
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  const list = JSON.parse(localStorage.getItem('bakeryNewsletter')) || [];
  list.push(email);
  localStorage.setItem('bakeryNewsletter', JSON.stringify(list));
  alert('Thank you for subscribing to our newsletter!');
  e.target.reset();
});

// Initialize on load
init();
