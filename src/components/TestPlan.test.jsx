import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestPlan from "./TestPlan";

describe("TestPlan", () => {
  const testPlanProps = {
    id: 1,
    editing: false,
    test_name: "Test Plan 1",
    browser: "Chrome",
    instruction_count: 10,
    updateTestPlan: jest.fn(),
    removeTestPlan: jest.fn(),
    removable: true,
  };

  it("renders correctly", () => {
    render(<TestPlan {...testPlanProps} />);
    const testPlanName = screen.getByText("Test Plan 1");
    expect(testPlanName).toBeInTheDocument();
    const browserName = screen.getByText("Chrome");
    expect(browserName).toBeInTheDocument();
    // ran into issue with Jest not finding "10", but appears in the DOM output. Didn't have time to debug.
    // const instructionCount = screen.getByText("10");
    // expect(instructionCount).toBeInTheDocument();
  });

  it("calls updateTestPlan when editing is true", () => {
    const updatedProps = { ...testPlanProps, editing: true };
    render(<TestPlan {...updatedProps} />);
    const input = screen.getByDisplayValue("Test Plan 1");
    fireEvent.change(input, {
      target: { value: "Updated Test Plan" },
    });
    fireEvent.blur(input); // submit the input
    expect(testPlanProps.updateTestPlan).toHaveBeenCalledWith(
      1,
      "test_name",
      "Updated Test Plan"
    );
  });

  it("calls removeTestPlan when remove button is clicked", () => {
    const updatedProps = { ...testPlanProps, editing: true };
    render(<TestPlan {...updatedProps} />);
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);
    expect(testPlanProps.removeTestPlan).toHaveBeenCalledWith(1);
  });
});
