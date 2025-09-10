# Cursor Checkout Generator

This extension generates credit cards and Moroccan addresses for applying to Cursor Pro free trials.

## 🚀 Quick Setup

### 1. Install Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"** (usually in top-left corner)
4. Select this folder (`credit-card-generator`)
5. Extension appears in your extensions list

### 2. Usage

1. Start Cursor Pro free trial which takes you to the checkout page
2. Widget appears automatically on the right side of the page
3. Click "Generate Address" - fills name, address, postal code, and city fields
4. Click "Generate Card" - fills card number, expiry date, and CVV fields
5. Complete checkout with all fields filled for the 14-day trial

## 🔧 How It Works

### Detection Logic

- Only activates on `https://checkout.stripe.com/*` pages
- Checks if page contains "Try Cursor Pro" text
- Shows widget only when both conditions are met
