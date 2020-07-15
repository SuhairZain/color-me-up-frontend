import { delay } from "./delay";

describe("delay", () => {
    it("is resolved after the delay", () => {
        const waitFor100ms = delay(100);
        expect(waitFor100ms).resolves.toBe(undefined);
        expect.assertions(1);

        return waitFor100ms;
    });
});
