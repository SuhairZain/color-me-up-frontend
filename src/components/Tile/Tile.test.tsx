import React from "react";

import { render, cleanup } from "@testing-library/react";

import { Color } from "color-me-up-shared";

import { hexToRgbString } from "../../utils/colors";

import Tile from "./Tile";

describe("Tile", () => {
    let commonTileProps: Pick<Tile["props"], "color">;

    beforeEach(() => {
        commonTileProps = {
            color: Color.Green,
        };
    });

    afterEach(cleanup);

    it("renders the tile with the correct borders and border radius", () => {
        const { container } = render(<Tile {...commonTileProps} />);

        expect(container.querySelector(".Tile")).toHaveStyle(
            `background-color: ${hexToRgbString(Color.Green)}}`
        );
    });
});
