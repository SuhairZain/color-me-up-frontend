const RGB_FORMAT_REGEX = /^rgb\([ ]*([\d]{1,3}[ ]*,[ ]*[\d]{1,3}[ ]*,[ ]*[\d]{1,3}[ ]*)\)$/;

/** Converts a color in the rgb(0, 0, 0) format to #000000 */
export const rgbToHexString = (rgbString: string): string => {
    const matches = RGB_FORMAT_REGEX.exec(rgbString);

    if (!matches || matches.length !== 2) {
        throw new Error(`Invalid color: "${rgbString}"`);
    }

    const colorsPart = matches[1];

    return (
        "#" +
        colorsPart
            .split(",")
            .map((colorStr) =>
                Number.parseInt(colorStr)
                    .toString(16)
                    .toUpperCase()
                    .padStart(2, "0")
            )
            .join("")
    );
};

const HEX_FORMAT_REGEX = /^[ ]*#([A-Fa-f0-9]{6})[ ]*$/;

export const hexToRgbString = (hexString: string): string => {
    const matches = HEX_FORMAT_REGEX.exec(hexString);

    if (!matches || matches.length !== 2) {
        throw new Error(`Invalid color: "${hexString}"`);
    }

    const colorsPart = matches[1];

    return [
        "rgb(",
        Number.parseInt(colorsPart.slice(0, 2), 16),
        ", ",
        Number.parseInt(colorsPart.slice(2, 4), 16),
        ", ",
        Number.parseInt(colorsPart.slice(4, 6), 16),
        ")",
    ].join("");
};
