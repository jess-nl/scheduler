import React from "react";
import { render, cleanup } from "@testing-library/react";
import Button from "components/Button";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Button />);
});
