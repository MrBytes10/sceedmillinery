// src/utils/phoneUtils.js

const phoneUtils = {
  // Clean phone number by removing everything except digits and +
  cleanPhoneNumber: (number) => number.replace(/[^\d+]/g, ""),

  // Format to international format, ensuring + prefix
  formatToInternational: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);
    return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  },

  // Basic validation for mobile numbers
  isValidMobile: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // Basic validation rules:
    // 1. Must have + prefix
    // 2. Must be between 8 and 15 digits (including country code)
    // 3. Must contain only digits after the +
    return /^\+\d{8,15}$/.test(cleaned);
  },

  // Format for display (can be used as a backup if needed)
  formatForDisplay: (number) => {
    const international = phoneUtils.formatToInternational(number);
    if (!international) return "";
    return international;
  },
  // };

  // ... existing code ...

  // Add new methods for Kenyan phone numbers
  isValidKenyanPhone: (number) => {
    // Remove any spaces and clean the number
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // Match patterns: 07... , 01... , 254... , +254...
    const kenyanRegex = /^(?:254|\+254|0)([17]\d{8})$/;
    return kenyanRegex.test(cleaned);
  },

  // Format to Kenyan format (254...)
  formatToKenyanPhone: (number) => {
    if (!number) return "";
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // If already in correct format, return as is
    if (cleaned.match(/^254\d{9}$/)) {
      return cleaned;
    }

    // Remove +254 or 254 prefix if exists
    let normalized = cleaned.replace(/^\+?(254)/, "");

    // Remove leading 0 if exists
    normalized = normalized.replace(/^0/, "");

    // Add 254 prefix
    return `254${normalized}`;
  },
};

export default phoneUtils;
