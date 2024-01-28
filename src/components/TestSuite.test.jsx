import React from "react";
import { render, screen } from "@testing-library/react";
import TestSuite from "./TestSuite";

describe("TestSuite", () => {
  const testSuite = {
    id: 1,
    test_suite_name: "Example Test Suite",
    test_plans: [
      { test_name: "Plan 1", browser: "chrome", instruction_count: 1 },
      { test_name: "Plan 2", browser: "edge", instruction_count: 2 },
    ],
    updateTestSuite: jest.fn(),
  };

  it("renders the test suite name", () => {
    render(<TestSuite {...testSuite} />);
    expect(screen.getByText("Example Test Suite")).toBeInTheDocument();
  });

  // didn't have time to fill in more tests, but would have tested the following:
  // - test plans are rendered
  // - test suite name is editable
  // - test plans can be added
});
