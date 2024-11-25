import mpesaPhoneUtils from "./mpesaPhonUtils";

describe("mpesaPhoneUtils", () => {
  describe("formatToKenyanPhone", () => {
    test.each([
      ["0742125032", "254742125032"],
      ["0142125032", "254142125032"],
      ["+254742125032", "254742125032"],
      ["254742125032", "254742125032"],
    ])("formats %s to %s", (input, expected) => {
      expect(mpesaPhoneUtils.formatToKenyanPhone(input)).toBe(expected);
    });
  });

  describe("isValidKenyanPhone", () => {
    test.each([
      ["0742125032", true],
      ["0142125032", true],
      ["+254742125032", true],
      ["254742125032", true],
      ["12345", false],
      ["abcdefghijk", false],
      ["0642125032", false], // Invalid prefix
    ])("validates %s as %s", (input, expected) => {
      expect(mpesaPhoneUtils.isValidKenyanPhone(input)).toBe(expected);
    });
  });
});
