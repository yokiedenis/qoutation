# Invoice Application - Codebase Analysis

## 📋 Project Overview

**Application Name:** Invoice Application / Accountill  
**Purpose:** A full-stack web application that allows users to create, send, and manage invoices, receipts, estimates, quotations, and bills via email.

**Key Features:**

- User authentication (Email/Password & Google OAuth)
- Invoice creation with detailed items, taxes, and fees
- Client management
- PDF invoice generation and email delivery
- Payment tracking
- Dashboard with analytics and charts
- User profile/business settings

---

## 🏗️ Architecture Overview

### Full-Stack MERN Application

- **Frontend:** React 17 with Redux state management
- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + Google OAuth
- **Email Service:** Nodemailer
- **PDF Generation:** html-pdf

---

## 📁 Project Structure

### Backend (`/server`)

#### 1. **Entry Point: `index.js`**

- Express server setup
- CORS configuration (allows http://localhost:3000)
- MongoDB connection via Mongoose
- Nodemailer transport setup for email delivery
- PDF generation endpoints:
  - `POST /send-pdf` - Creates and sends invoice PDF via email
  - `POST /create-pdf` - Creates invoice PDF locally
  - `GET /fetch-pdf` - Retrieves PDF file

#### 2. **Models** (`/models`)

| Model             | Purpose           | Key Fields                                                                                    |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `userModel.js`    | User accounts     | name, email, password, resetToken, expireToken                                                |
| `InvoiceModel.js` | Invoice documents | dueDate, items[], rates, vat, tax fees, total, client info, payment records, status, type     |
| `ClientModel.js`  | Customer data     | name, email, phone, address, userId, createdAt                                                |
| `ProfileModel.js` | Business profiles | userId, name, email, phoneNumber, businessName, contactAddress, logo, website, paymentDetails |

#### 3. **Routes** (`/routes`)

**User Routes (`userRoutes.js`)**

- `POST /users/signin` - Login
- `POST /users/signup` - Register
- `POST /users/forgot` - Forgot password
- `POST /users/reset` - Reset password

**Invoice Routes (`invoices.js`)**

- `GET /invoices/count` - Get total invoice count for serial numbering
- `GET /invoices/:id` - Get specific invoice
- `GET /invoices` - Get user's invoices
- `POST /invoices` - Create new invoice
- `PATCH /invoices/:id` - Update invoice
- `DELETE /invoices/:id` - Delete invoice

**Client Routes (`clients.js`)**

- `GET /clients/:id` - Get specific client
- `GET /clients?page=X` - Get clients (paginated)
- `POST /clients` - Add new client
- `PATCH /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client
- `GET /clients/user?searchQuery=X` - Get user's clients

**Profile Routes (`profile.js`)**

- CRUD operations for business profiles

#### 4. **Controllers** (`/controllers`)

**User Controller (`user.js`)**

- `signin()` - Validates credentials, returns JWT token + user profile
- `signup()` - Hashes password with bcrypt, creates user, returns token
- `forgotPassword()` - Sends password reset email
- `resetPassword()` - Updates password with reset token

**Invoice Controller (`invoices.js`)**

- `getInvoicesByUser()` - Filters invoices by creator user ID
- `getTotalCount()` - Returns count of user's invoices for numbering
- `createInvoice()` - Saves new invoice to DB
- `getInvoice()` - Retrieves single invoice by ID
- `updateInvoice()` - Updates invoice details
- `deleteInvoice()` - Removes invoice from DB

**Client Controller (`clients.js`)**

- Standard CRUD for client management

#### 5. **Middleware**

- `auth.js` - JWT/Google token verification middleware
  - Supports both custom JWT tokens and Google OAuth tokens
  - Extracts user ID from token and attaches to request

#### 6. **Documents** (`/documents`)

- `invoice.js` - HTML template for PDF invoices
- `email.js` - Email template with invoice details
- `index.js` - PDF template rendering

---

### Frontend (`/client`)

#### 1. **Core Files**

**`App.js`**

- React Router setup with BrowserRouter
- Routes defined for all pages
- Conditional NavBar rendering based on login status
- Notistack snackbar provider for notifications

**Routes:**

```
/ - Home (public)
/login - Authentication
/signup - User registration
/dashboard - Main dashboard
/invoice - Create new invoice
/invoice/:id - Invoice details
/invoices - List all invoices
/edit/invoice/:id - Edit invoice
/customers - Client management
/settings - User settings
/forgot - Password recovery
/reset/:token - Password reset
```

**`store.js`**

- Redux store configuration with thunk middleware
- Combines all reducers (invoices, clients, auth, profiles)

**`initialState.js`**

- Default state for new invoices:
  - Empty items array
  - Zero totals, rates, fees
  - Currency placeholder
  - Random invoice number generation

#### 2. **Redux Structure** (`/actions` & `/reducers`)

**Actions:**

- `auth.js` - Auth flows (signin, signup, forgot, reset password)
- `invoiceActions.js` - Invoice CRUD operations
- `clientActions.js` - Client management
- `profile.js` - Business profile operations
- `constants.js` - Redux action type constants

**Reducers:**

- `auth.js` - Manages user authentication state
- `invoices.js` - Manages invoices state + loading states
- `clients.js` - Manages clients list
- `profiles.js` - Manages business profiles
- `index.js` - Combines all reducers

**State Shape:**

```javascript
{
  auth: { authData, loading },
  invoices: { invoices[], currentInvoice, loading },
  clients: { clients[] },
  profiles: { profiles[], currentProfile }
}
```

#### 3. **API Layer** (`/api/index.js`)

Axios instance with:

- Base URL from environment variable `REACT_APP_API`
- Request interceptor that adds JWT token from localStorage
- Methods for all CRUD operations:
  - Invoices: `fetchInvoice`, `addInvoice`, `updateInvoice`, `deleteInvoice`, `fetchInvoicesByUser`
  - Clients: `fetchClient`, `fetchClients`, `addClient`, `updateClient`, `deleteClient`
  - Auth: `signIn`, `signUp`, `forgot`, `reset`
  - Profiles: `fetchProfilesByUser`, `createProfile`, `updateProfile`, etc.

#### 4. **Components** (`/components`)

| Component           | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| **Login/**          | Authentication UI (email/password + Google OAuth)        |
| **Home/**           | Landing page                                             |
| **Header/**         | Top navigation                                           |
| **NavBar/**         | Main navigation (shown when logged in)                   |
| **Invoice/**        | Invoice creation/editing form with itemized table        |
| **InvoiceDetails/** | Invoice display + payment history tracking               |
| **Invoices/**       | List view of all user invoices                           |
| **Clients/**        | Client list + add/edit clients                           |
| **Dashboard/**      | Analytics dashboard with charts (ApexCharts, DevExpress) |
| **Settings/**       | Business profile configuration                           |
| **Payments/**       | Payment recording interface                              |
| **Password/**       | Forgot/Reset password flows                              |
| **Fab/**            | Floating action button                                   |
| **Footer/**         | Footer section                                           |

**Key Invoice Component Details:**

- Uses Material-UI components (Table, DatePicker, TextField, Button)
- State management for:
  - Items (itemName, unitPrice, quantity, discount)
  - Rates, VAT, fees (stickerFee, levy, stamp)
  - Currency selection
  - Client selection (with Autocomplete)
  - Invoice type (Invoice, Receipt, Estimate, Quotation, Bill)
- Dynamic calculation of totals and subtotals
- File upload support (react-dropzone)

#### 5. **Utilities**

- `utils.js` - Helper functions (e.g., `toCommas()` for number formatting)

#### 6. **Assets**

- `currencies.json` - List of supported currencies
- `clients.json` - Sample client data
- `svgIcons/` - Custom SVG icon components
- `components/Dashboard/Icons.js` - Icon definitions

---

## 🔐 Authentication Flow

### Sign Up Flow

1. User fills signup form (first name, last name, email, password)
2. Frontend dispatches `signup` action
3. Backend validates, hashes password with bcrypt, creates User document
4. JWT token generated (expires in 1 hour)
5. User profile auto-created with empty business details
6. Token + user data returned to frontend
7. Stored in localStorage as `profile` object
8. User redirected to dashboard

### Sign In Flow

1. User enters email and password
2. Backend finds user by email
3. Validates password with bcrypt
4. Fetches associated user profile (business details)
5. Generates JWT token
6. Returns user + profile + token
7. Token added to all API requests via interceptor

### Google OAuth Flow

1. User clicks Google login button
2. Google returns credential (JWT)
3. Frontend decodes JWT to get user info
4. Creates/updates user profile
5. Stores auth data in localStorage
6. User profile picture from Google image URL

### Protected Routes

- Middleware in backend verifies JWT token
- Extracts user ID from token
- Attaches `userId` to request object for use in controllers
- Supports both custom JWT and Google tokens

---

## 💾 Data Models & Relationships

### User Model

```
User {
  _id: ObjectId (auto)
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  resetToken: String (optional)
  expireToken: Date (optional)
}
```

### Invoice Model

```
Invoice {
  _id: ObjectId (auto)
  dueDate: Date
  currency: String
  items: [{
    itemName: String,
    unitPrice: String,
    quantity: String,
    discount: String
  }]
  rates: String
  vat: Number
  stickerFee: Number
  levy: Number
  stamp: Number
  total: Number
  subTotal: Number
  notes: String
  status: String (e.g., 'pending', 'paid')
  invoiceNumber: String (serialized)
  type: String ('Invoice', 'Receipt', 'Estimate', 'Quotation', 'Bill')
  creator: [String] (user ID)
  totalAmountReceived: Number
  client: {
    name: String,
    email: String,
    phone: String,
    address: String
  }
  paymentRecords: [{
    amountPaid: Number,
    datePaid: Date,
    paymentMethod: String,
    note: String,
    paidBy: String
  }]
  createdAt: Date (default: current date)
}
```

### Client Model

```
Client {
  _id: ObjectId (auto)
  name: String
  email: String
  phone: String
  address: String
  userId: [String] (reference to User)
  createdAt: Date (default: current date)
}
```

### Profile Model

```
Profile {
  _id: ObjectId (auto)
  userId: String (reference to User)
  name: String
  email: String
  phoneNumber: String
  businessName: String
  contactAddress: String
  logo: String (URL or base64)
  website: String
  paymentDetails: String (shown in invoice notes)
}
```

---

## 🔄 Key Data Flows

### Creating an Invoice

1. User fills invoice form (items, client, dates, fees)
2. Frontend calculates totals
3. `createInvoice` action dispatches to backend
4. Backend saves invoice with creator ID
5. Invoice appears in user's dashboard

### Sending Invoice via Email

1. User clicks "Send" or similar button
2. Frontend sends invoice data to `/send-pdf` endpoint
3. Backend:
   - Generates HTML using `pdfTemplate`
   - Converts HTML to PDF using html-pdf
   - Configures Nodemailer with SMTP settings
   - Sends email with PDF attachment
   - Email includes custom reply-to address

### Payment Tracking

1. User records payment in Payments component
2. Frontend submits payment record
3. Backend updates `paymentRecords` array in Invoice
4. `totalAmountReceived` recalculated
5. Invoice status may update to 'paid'

---

## 🛠️ Technology Stack

### Backend

| Layer     | Technology     |
| --------- | -------------- |
| Runtime   | Node.js        |
| Framework | Express.js     |
| Database  | MongoDB        |
| ODM       | Mongoose       |
| Auth      | JWT + bcryptjs |
| Email     | Nodemailer     |
| PDF       | html-pdf       |
| Dev Tools | Nodemon        |

### Frontend

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | React 17                         |
| State Management | Redux + Redux-Thunk              |
| Routing          | React Router v5                  |
| UI Components    | Material-UI v4                   |
| HTTP Client      | Axios                            |
| Charts           | ApexCharts, Recharts, DevExpress |
| Date Handling    | moment.js, date-fns              |
| Notifications    | Notistack                        |
| File Handling    | react-dropzone, file-saver       |
| Auth             | @react-oauth/google, jwt-decode  |

---

## 🌐 Environment Variables

### Backend (.env required)

```
SMTP_HOST=     # Email service host
SMTP_PORT=     # Email service port
SMTP_USER=     # Email account
SMTP_PASS=     # Email password
SECRET=        # JWT secret key
MONGODB_URL=   # MongoDB connection string
```

### Frontend (.env.local)

```
REACT_APP_API=http://localhost:5000  # Backend API URL
REACT_APP_GOOGLE_CLIENT_ID=          # Google OAuth Client ID
```

---

## 🚀 Deployment Architecture

### Frontend

- Built to `/client/build` directory
- Can be served by Nginx
- `_redirects` file for SPA routing on Netlify

### Backend

- Runs on Node.js server
- CORS configured for specific origin
- MongoDB connection required
- SMTP credentials needed for email functionality

---

## 📊 Key Features Breakdown

### 1. Invoice Management

- Multiple invoice types (Invoice, Receipt, Estimate, Quotation, Bill)
- Itemized line items with unit price, quantity, discount
- Automatic calculations (subtotal, taxes, fees, total)
- Serial number generation based on count
- Payment history tracking
- Status management

### 2. Client Management

- Add/edit/delete clients
- Store contact information
- Associate clients with invoices
- Search/filter clients

### 3. User Management

- Email/password authentication
- Google OAuth integration
- Password reset via email
- User profile/business settings
- Logo upload support

### 4. Analytics & Dashboard

- Invoice count statistics
- Payment received tracking
- Charts and visualizations
- Business metrics

### 5. Email & PDF

- PDF invoice generation
- Email delivery with attachments
- Customizable templates
- Reply-to address configuration

---

## 🔍 Code Quality Notes

### Strengths

✅ Clear separation of concerns (frontend/backend)  
✅ Redux for centralized state management  
✅ RESTful API design  
✅ Material-UI for consistent UI  
✅ Comprehensive Redux actions and reducers

### Areas for Improvement

⚠️ Limited error handling in some controllers  
⚠️ No input validation on backend  
⚠️ No pagination for invoices list  
⚠️ Missing TypeScript types  
⚠️ Some console.logs left in production code  
⚠️ Middleware not applied to all protected routes  
⚠️ Password reset token security could be improved

---

## 🔧 Development Workflow

### Backend

```bash
cd server
npm install
npm start  # Runs with nodemon for hot reload
```

### Frontend

```bash
cd client
npm install
npm start  # Runs React dev server on port 3000
```

### Build for Production

```bash
npm run build  # Creates optimized build
```

---

## 📝 Notable Code Patterns

### Redux Action with Async Dispatch

```javascript
export const getInvoicesByUser = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchInvoicesByUser(searchQuery);
    dispatch({ type: FETCH_INVOICE_BY_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
```

### Axios Request Interceptor

```javascript
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});
```

### Invoice Total Calculation

- Items summed with discounts applied
- Subtotal calculated
- VAT applied to subtotal
- Additional fees (stickerFee, levy, stamp) added
- Final total = subtotal + VAT + fees

---

## 🎯 Entry Points for New Developers

1. Start with `README.md` for project overview
2. Review `server/index.js` to understand backend setup
3. Study `client/src/App.js` for frontend routing
4. Examine `server/models/` to understand data structure
5. Follow Redux flow in `client/src/actions/` and `reducers/`
6. Review Invoice component for understanding form handling
7. Check email flow in `server/index.js` POST `/send-pdf`

---

**Last Updated:** February 12, 2026  
**Project Owner:** Panshak Solomon  
**Repository:** https://github.com/yokiedenis/qoutation
