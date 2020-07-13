import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";

import { Color } from "color-me-up-shared";

import { hexToRgbString } from "../../utils/colors";

import Tile from "./Tile";

describe("Tile", () => {
    let commonTileProps: Pick<Tile["props"], "color" | "onClick" | "enabled">;

    beforeEach(() => {
        commonTileProps = {
            color: Color.Green,
            onClick: jest.fn(),
            enabled: true,
        };
    });

    afterEach(cleanup);

    it("renders the tile with the Enabled class and handles clicks", () => {
        const { container } = render(<Tile {...commonTileProps} />);

        const tileElement: HTMLDivElement = container.querySelector(".Tile");

        expect(tileElement).toHaveStyle(
            `background-color: ${hexToRgbString(Color.Green)}}`
        );

        expect(tileElement).toHaveClass("Enabled");

        fireEvent.click(tileElement);
        expect(commonTileProps.onClick).toHaveBeenCalledTimes(1);
    });

    it("renders the tile without Enabled class when disabled and does not handle clicks", () => {
        const { container } = render(
            <Tile {...commonTileProps} enabled={false} />
        );

        const tileElement: HTMLDivElement = container.querySelector(".Tile");

        expect(tileElement).not.toHaveClass("Enabled");

        fireEvent.click(tileElement);
        expect(commonTileProps.onClick).toHaveBeenCalledTimes(0);
    });
});
