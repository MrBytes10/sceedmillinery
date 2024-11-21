// src/config/dpoConfig.js

// Environment Variables Required (.env.local or .env)
/*
REACT_APP_DPO_COMPANY_TOKEN=your_company_token_here
REACT_APP_ENV=development
REACT_APP_DPO_REDIRECT_URL=https://yoursite.com/payment/success
REACT_APP_DPO_CANCEL_URL=https://yoursite.com/payment/cancel
REACT_APP_DPO_NOTIFY_URL=https://yourapi.com/api/dpo/notification
*/

// src/config/dpoConfig.js

export const DPO_CONFIG = {
  // Core Configuration
  companyToken: "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3", // Replace with your actual company token
  isDevelopment: true, // Set to `false` for production

  // API Endpoints
  endpoints: {
    sandbox: "https://secure.3gdirectpay.com/dpopayment/v7",
    production: "https://secure.3gdirectpay.com/dpopayment/v7",
    // These are the main endpoints you'll need
    createToken: "/initiate",
    verifyTransaction: "/verify",
    refund: "/refund",
  },

  // Payment Service Types
  serviceTypes: {
    CARD: "CARD",
    MPESA: "MPESA",
    TIGOPESA: "TIGOPESA",
    AIRTEL: "AIRTEL",
    MTN: "MTN_MONEY",
    BANK_TRANSFER: "BANK_TRANSFER",
    PAYPAL: "PAYPAL",
  },

  // Payment Method Descriptions
  serviceDescriptions: {
    CARD: "Credit/Debit Card Payment",
    MPESA: "M-Pesa Mobile Money Payment",
    TIGOPESA: "Tigo Pesa Mobile Money Payment",
    AIRTEL: "Airtel Money Payment",
    MTN: "MTN Mobile Money Payment",
    BANK_TRANSFER: "Direct Bank Transfer",
    PAYPAL: "PayPal Payment",
  },

  // Currency Configuration
  currency: {
    default: "USD",
    supported: [
      { code: "USD", name: "US Dollar" },
      { code: "KES", name: "Kenyan Shilling" },
      { code: "TZS", name: "Tanzanian Shilling" },
      { code: "UGX", name: "Ugandan Shilling" },
      { code: "RWF", name: "Rwandan Franc" },
      { code: "ZMW", name: "Zambian Kwacha" },
    ],
  },

  // Payment Method Country Restrictions
  countryRestrictions: {
    MPESA: ["KE"],
    TIGOPESA: ["TZ"],
    AIRTEL: ["KE", "TZ", "UG", "RW"],
    MTN: ["UG", "RW", "ZM"],
    CARD: ["all"],
    BANK_TRANSFER: ["all"],
    PAYPAL: ["all"],
  },

  // Transaction Settings
  transaction: {
    defaultLanguage: "EN",
    defaultTimeout: 30, // minutes
    minimumAmount: {
      USD: 1,
      KES: 100,
      TZS: 2000,
      UGX: 3500,
      RWF: 1000,
      ZMW: 20,
    },
  },

  // URL Configuration
  urls: {
    redirect: "https://sceedmillinery.com/payment/success", // To replace with the actual redirect URL
    cancel: "https://sceedmillinery.com/payment/cancel", // To replace with the actual cancel URL
    notify: "https://sceedbackend.pensoft.co.ke/api/dpo/notification", //To replace with the actual notification URL
  },

  // Helper Functions
  helpers: {
    isValidAmount: (amount, currency = "USD") => {
      const minAmount = DPO_CONFIG.transaction.minimumAmount[currency] || 1;
      return amount >= minAmount;
    },

    isValidPaymentMethod: (method, countryCode) => {
      const restrictions = DPO_CONFIG.countryRestrictions[method];
      return (
        restrictions?.includes("all") || restrictions?.includes(countryCode)
      );
    },

    getBaseUrl: () => {
      return DPO_CONFIG.isDevelopment
        ? DPO_CONFIG.endpoints.sandbox
        : DPO_CONFIG.endpoints.production;
    },

    formatAmount: (amount) => {
      return Number(amount).toFixed(2);
    },
  },
};

export default DPO_CONFIG;
