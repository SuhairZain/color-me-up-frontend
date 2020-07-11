import axios, { AxiosResponse } from "axios";

import { Board, createBoard, playGame } from "color-me-up-shared";

type ApiType = {
    start: (
        size: number,
        numberOfColors: number
    ) => Promise<AxiosResponse<Board>>;
    aiPlay: (
        board: Board
    ) => Promise<AxiosResponse<ReturnType<typeof playGame>>>;
};

const API_URL = `http://localhost:8000/api`;

const USE_FAKE_API =
    JSON.parse(
        new URLSearchParams(window.location.search).get("offline") || "false"
    ) === true;
const FAKE_API_DELAY = 1000;

const delay = (delayInMs: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, delayInMs);
    });
};

function createFakeAxiosResponse<T>(result: T): AxiosResponse<T> {
    return {
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: result,
    };
}

export const API = ((): ApiType => {
    if (USE_FAKE_API) {
        return {
            start: (size, numberOfColors) => {
                return delay(FAKE_API_DELAY).then(() => {
                    return createFakeAxiosResponse(
                        createBoard(size, numberOfColors)
                    );
                });
            },
            aiPlay: (board: Board) => {
                return delay(FAKE_API_DELAY).then(() => {
                    return createFakeAxiosResponse(playGame(board));
                });
            },
        };
    }

    return {
        start: (size, numberOfColors) => {
            return axios.get(`${API_URL}/start`, {
                params: { size, numberOfColors },
            });
        },
        aiPlay: (board) => {
            return axios.post(`${API_URL}/aiPlay`, {
                board,
            });
        },
    };
})();
