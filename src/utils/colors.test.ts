import { rgbToHexString, hexToRgbString } from "./colors";

describe("rgbToHexString", () => {
    it("converts a color of format rgb(a,b,c) to #ABC", () => {
        expect(rgbToHexString("rgb(0, 0, 0)")).toBe("#000000");
        expect(rgbToHexString("rgb(255, 255, 255)")).toBe("#FFFFFF");
        expect(rgbToHexString("rgb(255, 255, 255)")).toBe("#FFFFFF");
        expect(rgbToHexString("rgb( 255, 255 , 255 )")).toBe("#FFFFFF");
        expect(rgbToHexString("rgb( 255, 255, 255)")).toBe("#FFFFFF");
        expect(rgbToHexString("rgb(200,0,182)")).toBe("#C800B6");
    });

    it("throws an error when an invalid sting is given", () => {
        expect(() => rgbToHexString("r")).toThrow('Invalid color: "r"');
        expect(() => rgbToHexString("rgb()")).toThrow();
        expect(() => rgbToHexString("rgb()rgb()")).toThrow();
        expect(() => rgbToHexString("rgb(#AABBCC)")).toThrow();
    });
});

describe("rgbToHexString", () => {
    it("converts a color of format #ABC to rgb(a, b, c)", () => {
        expect(hexToRgbString("#000000")).toBe("rgb(0, 0, 0)");
        expect(hexToRgbString("#FFFFFF")).toBe("rgb(255, 255, 255)");
    });

    it("throws an error when an invalid sting is given", () => {
        expect(() => hexToRgbString("r")).toThrow('Invalid color: "r"');
        expect(() => hexToRgbString("rgb()")).toThrow();
        expect(() => hexToRgbString("#FFAAFFBB")).toThrow();
        expect(() => hexToRgbString("rgb(#AABBCC)")).toThrow();
    });
});
