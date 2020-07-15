import axios from "axios";
import { ApiType } from "./types";
import { fakeApi } from "./fakeApi";

const API_URL = `http://localhost:8000/api`;

const USE_FAKE_API =
    JSON.parse(
        new URLSearchParams(window.location.search).get("offline") || "false"
    ) === true;

export const API = ((): ApiType => {
    if (USE_FAKE_API) {
        return fakeApi;
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
