import React from "react";

import { render, cleanup } from "@testing-library/react";

import App from "./App";

describe("App", () => {
    afterEach(cleanup);

    it("renders the dummy tiles", () => {
        const { container } = render(<App />);

        const rows: HTMLDivElement[] = Array.from(
            container.querySelectorAll(".Row")
        );
        expect(rows.length).toBe(4);

        rows.forEach((row) => {
            expect(row.style.flexDirection).toBe("row");
            expect(Array.from(row.querySelectorAll(".Tile")).length).toBe(4);
        });

        expect(Array.from(container.querySelectorAll(".Tile")).length).toBe(16);
    });
});
