# 🚀 Complete Setup & Configuration Guide

## Quick Fix Summary

You have **3 main issues**:

1. ❌ **SMTP not configured** - Server crashes on startup
2. ❌ **User entered email as password** - Invalid credentials
3. ⚠️ **Signin returns 400** - Because server crashed

---

## 🔧 Solution 1: Configure SMTP (Choose One)

### Option A: Gmail (Easiest) ⭐ RECOMMENDED

**Step 1: Get Gmail App Password**

1. Go to https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Scroll to **2-Step Verification** → enable it if not done
4. Go back to **Security** → find **App passwords**
5. Select: **Mail** → **Windows Computer**
6. Copy the 16-character password Google provides

**Step 2: Update `.env`**

```properties
MONGO_URI=mongodb+srv://yokasdenis:oldaman@cluster012.nehxw.mongodb.net/test123Db
PORT=5000
SECRET=your_secret_key_make_it_random_abcd1234efgh5678

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yokasdenis@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx

VITE_CLIENT_BASE_URL=http://localhost:3000
```

**Replace:**

- `SMTP_USER` = Your Gmail address
- `SMTP_PASS` = The 16-character password from Google (remove spaces if any)

---

### Option B: Mailtrap (Free Alternative)

1. Sign up at https://mailtrap.io/ (free account)
2. Create inbox
3. Go to **Integrations** → **Nodemailer**
4. Copy the credentials

**Update `.env`:**

```properties
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user_id
SMTP_PASS=your_mailtrap_password
```

---

### Option C: Skip Email (Development Only)

If you don't want email yet, create a dummy `.env`:

```properties
MONGO_URI=mongodb+srv://yokasdenis:oldaman@cluster012.nehxw.mongodb.net/test123Db
PORT=5000
SECRET=your_secret_key_make_it_random_abcd1234efgh5678

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

VITE_CLIENT_BASE_URL=http://localhost:3000
```

The server will now run but email will be disabled (you'll see a warning).

---

## ✅ Test Your Setup

### Step 1: Start Server

```powershell
cd c:\Users\yokas\Desktop\yokie\nic\qoutation\server
npm install  # if not already done
npm run start
```

**Expected Output:**

```
✅ SMTP Transporter configured successfully
Server running on port: 5000
```

OR (if email disabled):

```
⚠️  SMTP not configured. Email features will be disabled.
Server running on port: 5000
```

### Step 2: Start Frontend

```powershell
cd c:\Users\yokas\Desktop\yokie\nic\qoutation\client
npm install  # if not already done
npm start
```

**Expected:** Browser opens http://localhost:3000

### Step 3: Test Signup

1. Click **Sign up** tab
2. Fill form:
   - First Name: `Denis`
   - Last Name: `Mayoka Kitto`
   - Email: `yokasdenis@gmail.com`
   - **Password:** `MySecurePassword123!` (NOT your email!)
   - Confirm Password: `MySecurePassword123!`
3. Click **Sign Up**

**Expected:**

- ✅ Toast notification: "Sign up successful"
- ✅ Redirected to dashboard
- ✅ Token stored in localStorage

### Step 4: Test Signin

1. Go to http://localhost:3000/login
2. Click **Sign in** tab
3. Fill form:
   - Email: `yokasdenis@gmail.com`
   - **Password:** `MySecurePassword123!` (the one you set, not email)
4. Click **Sign In**

**Expected:**

- ✅ Toast notification: "Signin successful"
- ✅ Redirected to dashboard
- ✅ User profile visible

---

## 🐛 Troubleshooting

### Error: `connect ECONNREFUSED 127.0.0.1:587`

**Cause:** SMTP credentials missing or wrong

**Fix:**

1. Check `.env` file has all 4 SMTP variables
2. Double-check credentials from Gmail/Mailtrap
3. Make sure email address is correct
4. For Gmail: verify 2FA is enabled before getting app password

### Error: `400 Bad Request` on signin

**Cause:** Server crashed on startup due to SMTP

**Fix:**

1. Check server logs for SMTP error
2. Configure SMTP as above
3. Restart server with `npm run start`

### Error: `Invalid credentials` after signin

**Cause:** Password doesn't match

**Fix:**

1. Check you're entering the password you set, NOT your email
2. Passwords are case-sensitive
3. Check for extra spaces

### Error: MongoDB connection refused

**Cause:** Bad connection string or MongoDB Atlas down

**Fix:**

1. Verify MongoDB Atlas cluster is running
2. Check `.env` has correct `MONGO_URI`
3. Try reconnecting from MongoDB Atlas dashboard

---

## 📝 Key Changes Made

### Server (index.js)

- ✅ Made Nodemailer transporter optional
- ✅ Added error check before sending emails
- ✅ Added helpful console messages

### User Controller (controllers/user.js)

- ✅ Added SMTP validation in forgotPassword
- ✅ Better error messages

### Error Handling

- ✅ Server won't crash if SMTP missing
- ✅ Email endpoints return proper error messages
- ✅ Console warnings guide users

---

## 🎯 Next Steps

1. **Choose SMTP option** (Gmail recommended)
2. **Get credentials** and update `.env`
3. **Restart server**: `npm run start`
4. **Test signup** on http://localhost:3000
5. **Test signin** with correct password
6. **Test creating invoice** in dashboard
7. **Test sending invoice** (if SMTP configured)

---

## 📚 Full .env Template

```properties
# ==================== DATABASE ====================
MONGO_URI=mongodb+srv://yokasdenis:oldaman@cluster012.nehxw.mongodb.net/test123Db

# ==================== SERVER ====================
PORT=5000
SECRET=your_secret_key_here_make_it_long_random_string_1234567890abcdefghij

# ==================== EMAIL (SMTP) ====================
# Option 1: Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yokasdenis@gmail.com
SMTP_PASS=your_16_char_app_password_here

# Option 2: Mailtrap (uncomment to use)
# SMTP_HOST=smtp.mailtrap.io
# SMTP_PORT=2525
# SMTP_USER=your_user_id
# SMTP_PASS=your_password

# ==================== CLIENT ====================
VITE_CLIENT_BASE_URL=http://localhost:3000
REACT_APP_API=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_if_using_google_oauth
```

---

## ✨ Success Checklist

- [ ] `.env` file created in `/server` folder
- [ ] SMTP variables filled in
- [ ] Server runs without crashing: `npm run start`
- [ ] Frontend runs: `npm start`
- [ ] Can signup with valid email and **different** password
- [ ] Can signin with same credentials
- [ ] Appear in dashboard after signin
- [ ] Can create new invoice
- [ ] Can view invoice details

Once all checks pass, your app is ready to use! 🎉

---

**Last Updated:** February 12, 2026
