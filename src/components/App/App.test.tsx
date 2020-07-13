import React from "react";

import { render, cleanup } from "@testing-library/react";

import App from "./App";

describe("App", () => {
    afterEach(cleanup);

    it("renders the App div", () => {
        const { container } = render(<App />);

        expect(container.querySelector("div.App")).toBeInTheDocument();
    });
});
