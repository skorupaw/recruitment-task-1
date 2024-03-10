import "@testing-library/jest-dom";

import { server } from "./src/test-utils/msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
