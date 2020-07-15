import { AxiosResponse } from "axios";

import { createBoard, playGame, Board } from "color-me-up-shared";

import { delay } from "../utils/delay";

import { ApiType } from "./types";

const FAKE_API_DELAY = 1000;

function createFakeAxiosResponse<T>(result: T): AxiosResponse<T> {
    return {
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: result,
    };
}

export const fakeApi: ApiType = {
    start: (size, numberOfColors) => {
        return delay(FAKE_API_DELAY).then(() => {
            return createFakeAxiosResponse(createBoard(size, numberOfColors));
        });
    },
    aiPlay: (board: Board) => {
        return delay(FAKE_API_DELAY).then(() => {
            return createFakeAxiosResponse(playGame(board));
        });
    },
};
