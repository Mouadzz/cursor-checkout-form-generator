# Cursor Checkout Generator

This extension generates credit cards and random addresses for applying to Cursor Pro free trials. It's designed to be used with [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip) for infinite Cursor Pro access.

## 📋 How It Works

### The Complete Cursor Pro Trial Process:

**1. Create Account**
- Go to https://cursor.com/
- Click "Sign up" then "Sign up via Google"
- Complete Google authentication

**2. Activate Pro Trial**
- Click "Claim your Pro Trial"
- You'll be redirected to Stripe payment page

**3. Payment Setup (This is where this extension helps!)**
- Select "Credit Card" as payment method
- **Instead of manually getting addresses and cards, this extension does it automatically:**
  - Generates realistic US addresses
  - Creates valid credit cards with Luhn algorithm
  - Fills all form fields with one click

**4. Switch Accounts to Use Another Free Trial (Optional - Only When Needed)**
- Use [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip) for infinite trials
- Follow installation instructions
- Log out of Cursor
- Use CursorVIP menu → 8 & 1
- Close and restart Cursor
- Go to Settings → General → Sign in

### How This Extension Simplifies Step 3:
Instead of manually copying addresses from random websites and generating cards from card generators, this extension automates everything with one click!

## 🚀 Quick Setup

### 1. Install Extension

1. Clone this repository: `git clone <repository-url>`
2. Open Chrome and go to `chrome://extensions/`
3. Enable **"Developer mode"** (toggle in top-right corner)
4. Click **"Load unpacked"** (usually in top-left corner)
5. Select this folder (`credit-card-generator`)
6. Extension appears in your extensions list

### 2. How to Use the Extension

1. Start Cursor Pro free trial which takes you to the checkout page
2. When you need to fill the payment form to submit the free trial, you'll see a widget automatically appear on the right side of the page
3. Click "Generate Address" - fills name, address, postal code, and city fields
4. Click "Generate Card" - fills card number, expiry date, and CVV fields
5. Complete checkout with all fields filled for the 14-day trial
6. If credit card is not valid or not accepted, just click "Generate Card" again and try with a new card

## Important

**After using cursor-free-vip, avoid updating Cursor to newer versions.** Stay on the same version to maintain compatibility and prevent potential issues with the VIP functionality.

