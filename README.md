# Cursor Checkout Generator

This extension generates credit cards and random addresses for applying to Cursor Pro free trials. It's designed to be used with [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip) for infinite Cursor Pro access.

## 📋 How It Works

### The Complete Cursor Pro Trial Process:

**1. Create Account**
- Go to https://cursor.com/
- Click "Sign up"
- You can use [temp-mail.org](https://temp-mail.org/en/view/68cc31b0174a7400b80b23c2) for infinite disposable email addresses

**2. Activate Pro Trial**
- Click "Claim your Pro Trial"
- You'll be redirected to Stripe payment page

**3. Payment Setup**
- Select "Credit Card" as payment method
- Install this extension:
  - Clone this repository: `git clone https://github.com/Mouadzz/cursor-checkout-form-generator.git`
  - Open Chrome or Brave and go to `chrome://extensions/` (or `brave://extensions/`)
  - Enable **"Developer mode"** (toggle in top-right or top-left corner)
  - Click **"Load unpacked"** (usually in top-left corner)
  - Select the cloned folder
  - If you go to the Stripe payment page and refresh, you'll see a popup on the right to generate addresses and cards
- **The extension automatically:**
  - Generates realistic addresses
  - Creates valid credit cards with Luhn algorithm
  - Fills all form fields with one click

**4. Switch Accounts to Use Another Free Trial (Optional - Only When Needed)**
- **When to use:** When your trial ends or the token limit of a model ends and you want to use another account
- **Steps:**
  - Do step 1 and 2 again (create new account with temp-mail)
  - Install [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip) and follow installation instructions
  - Log out of Cursor
  - Use CursorVIP menu → 8 & 1
  - Close and restart Cursor
  - Go to Settings → General → Sign in
  - Login with the new account again and voila!


## Important

**After using cursor-free-vip, avoid updating Cursor to newer versions.** Stay on the same version to maintain compatibility and prevent potential issues with the VIP functionality.

