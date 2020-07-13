import React from "react";

import { render, cleanup } from "@testing-library/react";

import { createBoard } from "color-me-up-shared";

import BoardUi from "./BoardUi";

describe("Board", () => {
    afterEach(cleanup);

    it("renders the board", () => {
        const board = createBoard(5, 5);

        const { container } = render(<BoardUi board={board} />);

        expect(Array.from(container.querySelectorAll(".Tile")).length).toBe(25);
    });
});
