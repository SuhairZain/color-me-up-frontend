import React from "react";

import { render, cleanup } from "@testing-library/react";

import { createBoard, Board } from "color-me-up-shared";

import BoardUi from "./BoardUi";

describe("Board", () => {
    let board: Board;

    beforeEach(() => {
        board = createBoard(5, 5);
    });

    afterEach(cleanup);

    it("renders the board with enabled tiles", () => {
        const { container } = render(
            <BoardUi board={board} onSelectTile={() => {}} enabled={true} />
        );

        const tileElements = Array.from(container.querySelectorAll(".Tile"));

        expect(tileElements.length).toBe(25);

        tileElements.forEach((tile) => {
            expect(tile).toHaveClass("Enabled");
        });
    });

    it("renders the board with disabled tiles", () => {
        const { container } = render(
            <BoardUi board={board} onSelectTile={() => {}} enabled={false} />
        );

        const tileElements = Array.from(container.querySelectorAll(".Tile"));

        tileElements.forEach((tile) => {
            expect(tile).not.toHaveClass("Enabled");
        });
    });
});
