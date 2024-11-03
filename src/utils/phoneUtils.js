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
};

export default phoneUtils;
