const phoneUtils = {
  // Clean phone number by removing spaces, dashes, and other non-digit characters
  cleanPhoneNumber: (number) => number.replace(/[^\d+]/g, ""),

  // Format phone number to international format
  formatToInternational: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // If already in international format
    if (cleaned.startsWith("+254")) {
      return cleaned;
    }

    // If starts with 0 (handling both 07 and 01)
    if (cleaned.startsWith("0")) {
      return "+254" + cleaned.substring(1);
    }

    // If starts with 254
    if (cleaned.startsWith("254")) {
      return "+" + cleaned;
    }

    // If just the 9 digits are provided (starting with 7 or 1)
    if (
      cleaned.length === 9 &&
      (cleaned.startsWith("7") || cleaned.startsWith("1"))
    ) {
      return "+254" + cleaned;
    }

    return cleaned;
  },

  // Validate Kenyan phone number
  validateKenyanPhone: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);

    // Updated patterns to explicitly include both 7 and 1 prefixes
    const patterns = {
      international: /^\+254([17]\d{8})$/, // +254 7xxx or +254 1xxx
      national: /^0([17]\d{8})$/, // 07xxx or 01xxx
      shorthand: /^([17]\d{8})$/, // 7xxx or 1xxx
    };

    // Test if the number matches any of the valid patterns
    const isValid =
      patterns.international.test(cleaned) ||
      patterns.national.test(cleaned) ||
      patterns.shorthand.test(cleaned);

    // Additional check to ensure the remaining digits are valid
    if (isValid) {
      // Extract the core number (without prefixes) for additional validation
      let coreNumber;
      if (cleaned.startsWith("+254")) {
        coreNumber = cleaned.substring(4);
      } else if (cleaned.startsWith("0")) {
        coreNumber = cleaned.substring(1);
      } else {
        coreNumber = cleaned;
      }

      // Check if the first digit after the prefix is valid (7 or 1)
      return coreNumber.startsWith("7") || coreNumber.startsWith("1");
    }

    return false;
  },

  // Format phone number for display
  formatForDisplay: (number) => {
    const international = phoneUtils.formatToInternational(number);
    if (!international) return "";

    // Format as +254 XXX XXX XXX
    return international.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  },

  // Get initial display format based on input
  getInitialFormat: (number) => {
    const cleaned = phoneUtils.cleanPhoneNumber(number);
    if (cleaned.startsWith("+254") || cleaned.startsWith("254")) {
      return "international";
    }
    return "national";
  },
};

export default phoneUtils;
