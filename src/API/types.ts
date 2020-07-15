import { AxiosResponse } from "axios";

import { Board, playGame } from "color-me-up-shared";

export type ApiType = {
    start: (
        size: number,
        numberOfColors: number
    ) => Promise<AxiosResponse<Board>>;
    aiPlay: (
        board: Board
    ) => Promise<AxiosResponse<ReturnType<typeof playGame>>>;
};
