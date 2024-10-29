// src/utils/phoneUtils.js

const phoneUtils = {
  cleanPhoneNumber: (number) => number.replace(/[^\d+]/g, ""),

  formatToInternational: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    if (
      cleaned.startsWith("+254") ||
      cleaned.startsWith("+256") ||
      cleaned.startsWith("+255")
    ) {
      return cleaned; // Already in international format
    }

    // Kenyan format
    if (cleaned.startsWith("0") && (cleaned[1] === "7" || cleaned[1] === "1")) {
      return "+254" + cleaned.substring(1);
    }
    if (cleaned.startsWith("254")) return "+" + cleaned;

    // Ugandan format
    if (cleaned.startsWith("0") && cleaned[1] === "7") {
      return "+256" + cleaned.substring(1);
    }
    if (cleaned.startsWith("256")) return "+" + cleaned;

    // Tanzanian format
    if (cleaned.startsWith("0") && (cleaned[1] === "6" || cleaned[1] === "7")) {
      return "+255" + cleaned.substring(1);
    }
    if (cleaned.startsWith("255")) return "+" + cleaned;

    return cleaned; // Return as-is if it doesn't match any rules
  },

  validatePhoneNumber: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // Patterns for Kenya, Uganda, and Tanzania
    const patterns = {
      kenya: /^\+254([17]\d{8})$/,
      uganda: /^\+256(7\d{8})$/,
      tanzania: /^\+255([67]\d{8})$/,
      national: /^0([17]\d{8})$/,
    };

    return (
      patterns.kenya.test(cleaned) ||
      patterns.uganda.test(cleaned) ||
      patterns.tanzania.test(cleaned)
    );
  },

  formatForDisplay: (number) => {
    const international = phoneUtils.formatToInternational(number);
    if (!international) return "";

    // Adjust format to match international display format +XXX XXX XXX XXX
    return international.replace(
      /(\+\d{3})(\d{3})(\d{3})(\d{3})/,
      "$1 $2 $3 $4"
    );
  },

  getInitialFormat: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);
    if (cleaned.startsWith("+254") || cleaned.startsWith("254"))
      return "international";
    if (cleaned.startsWith("+256") || cleaned.startsWith("256"))
      return "international";
    if (cleaned.startsWith("+255") || cleaned.startsWith("255"))
      return "international";
    return "national";
  },
};

export default phoneUtils;
