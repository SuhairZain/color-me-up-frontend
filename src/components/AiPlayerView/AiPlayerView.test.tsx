import React from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";

import AiPlayerView from "./AiPlayerView";
import { createBoard, playGame } from "color-me-up-shared";
import { hexToRgbString } from "../../utils/colors";

describe("AiPlayerView", () => {
    afterEach(cleanup);

    it("Back, step count and next button has the proper classes and colors", () => {
        const board = createBoard(6, 6);
        const aiPlayerSteps = playGame(board);

        const { container, getByText } = render(
            <AiPlayerView originalBoard={board} steps={aiPlayerSteps} />
        );

        const back = getByText("Back");
        expect(back).toBeInTheDocument();
        expect(back.parentElement).toHaveClass(
            "SpaceOccupyingHiddenElement Hidden AlwaysOccupySpace"
        );

        const stepCount = getByText("0");
        expect(stepCount).toBeInTheDocument();
        expect(stepCount).toHaveClass(
            "SpaceOccupyingHiddenElement Hidden AlwaysOccupySpace"
        );

        const next = getByText("Next");
        expect(next).toBeInTheDocument();
        expect(next.parentElement).toHaveStyle(
            `color: ${hexToRgbString(aiPlayerSteps[0])}`
        );
        expect(next.parentElement).not.toHaveClass("Hidden");
        expect(next.parentElement).toHaveClass(
            "SpaceOccupyingHiddenElement AlwaysOccupySpace"
        );

        for (let i = 0; i < aiPlayerSteps.length - 1; i++) {
            fireEvent.click(next);
            expect(back.parentElement).not.toHaveClass("Hidden");
            expect(back.parentElement).toHaveStyle(
                `color: ${hexToRgbString(aiPlayerSteps[i])}`
            );

            expect(stepCount).not.toHaveClass("Hidden");
            expect(stepCount).toHaveStyle(
                `color: ${hexToRgbString(aiPlayerSteps[i])}`
            );

            expect(next.parentElement).not.toHaveClass("Hidden");
            expect(next.parentElement).toHaveStyle(
                `color: ${hexToRgbString(aiPlayerSteps[i + 1])}`
            );
        }

        const lastColor = hexToRgbString(
            aiPlayerSteps[aiPlayerSteps.length - 1]
        );

        fireEvent.click(next);
        expect(back.parentElement).not.toHaveClass("Hidden");
        expect(back.parentElement).toHaveStyle(`color: ${lastColor}`);
        expect(stepCount).not.toHaveClass("Hidden");
        expect(stepCount).toHaveStyle(`color: ${lastColor}`);
        expect(next.parentElement).toHaveClass("Hidden");

        Array.from(container.querySelectorAll(".Tile")).forEach((tile) => {
            expect(tile).toHaveStyle(`background-color: ${lastColor}`);
        });
    });
});
