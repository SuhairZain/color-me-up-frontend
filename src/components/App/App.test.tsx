import React from "react";

import { render, cleanup } from "@testing-library/react";

import { delay } from "../../utils/delay";

import App from "./App";

// Jest picks up the mock file from the __mocks__ folder
jest.mock("../../API");

describe("App", () => {
    afterEach(cleanup);

    it("renders the App div", () => {
        const { container } = render(<App />);

        expect(container.querySelector("div.App")).toBeInTheDocument();
    });

    it("shows the loading message", () => {
        const { getByText } = render(<App />);

        expect(
            getByText("Creating the board, please wait...")
        ).toBeInTheDocument();
    });

    it("shows the click on tile message after the api resolves", async (done) => {
        const { getByText } = render(<App />);

        await delay(1000);

        expect(
            getByText(
                "Click on a tile to change the origin and its connected tiles to that color. Change all tiles to the same color to win."
            )
        ).toBeInTheDocument();

        done();
    });
});
