# Cursor Checkout Generator

This extension generates credit cards and Moroccan addresses for applying to Cursor Pro free trials.

## 🚀 Quick Setup

### 1. Install Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select this folder (`credit-card-generator`)
5. Extension appears in your extensions list

### 2. Usage

1. Go to Cursor Pro checkout page with "Try Cursor Pro" text
2. Widget automatically appears on the right side
3. Click **"Generate Card"** to fill card details
4. Click **"Generate Address"** to fill name + address

## 🔧 How It Works

### Detection Logic

- Only activates on `https://checkout.stripe.com/*` pages
- Checks if page contains "Try Cursor Pro" text
- Shows widget only when both conditions are met
