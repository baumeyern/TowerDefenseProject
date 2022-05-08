import React from "react";
import "regenerator-runtime/runtime";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Audio from "../components/ui/Audio";

/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => {
        /* do nothing */
    };
    window.HTMLMediaElement.prototype.play = () => {
        /* do nothing */
    };
    window.HTMLMediaElement.prototype.pause = () => {
        /* do nothing */
    };
    window.HTMLMediaElement.prototype.addTextTrack = () => {
        /* do nothing */
    };
});

test("should render", () => {
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Audio />
        </Router>
    );
});

test("should play audio", async () => {
    const history = createMemoryHistory();
    const playAudio = jest.fn();
    window.HTMLMediaElement.prototype.play = playAudio;
    render(
        <Router location={history.location} navigator={history}>
            <Audio />
        </Router>
    );

    await waitFor(() => screen.findByText("Toggle for audio"));

    fireEvent.click(screen.getByTitle("Toggle audio"));

    expect(playAudio).toHaveBeenCalled();
});