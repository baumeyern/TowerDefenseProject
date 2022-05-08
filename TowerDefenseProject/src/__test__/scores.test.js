import React from "react";
import "regenerator-runtime/runtime";
import { act, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ScoresPage from "../components/pages/ScoresPage";

const server = setupServer(
  rest.get(
    "https://backendapi20220502161045.azurewebsites.net/api/v1/HighScore/GetAll",
    (req, res, ctx) => {
      return res(
        ctx.json([
          { name: "Testing Guy", score: 42, date: new Date().toISOString() },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//Test #3
test.skip("should render", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <ScoresPage />
    </Router>
  );
});
