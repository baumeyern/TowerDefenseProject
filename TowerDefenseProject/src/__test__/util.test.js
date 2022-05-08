import { collision, convertToRoman, numerals } from "../components/utils/utils";

test("should return true if boxes are colliding", () => {
  const box1 = { x: 0, y: 10, width: 7, height: 7 };
  const box2 = { x: 6, y: 15, width: 7, height: 7 };

  expect(collision(box1, box2)).toBe(true);
});

test("should return false if boxes are not colliding", () => {
  const box1 = { x: 0, y: 10, width: 7, height: 7 };
  const box2 = { x: 8, y: 15, width: 7, height: 7 };

  expect(collision(box1, box2)).toBe(false);
});

test("should convert number to simple roman numberal", () => {
  for (const [romanNumeral, n] of Object.entries(numerals)) {
    expect(convertToRoman(n)).toBe(romanNumeral);
  }
});

test("should convert number to complex roman numberal", () => {
  expect(convertToRoman(8)).toBe("VIII");
  expect(convertToRoman(12)).toBe("XII");
  expect(convertToRoman(70)).toBe("LXX");
});
