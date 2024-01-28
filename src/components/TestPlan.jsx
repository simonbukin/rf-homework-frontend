import React, { useState } from "react";

export default function TestPlan({
  id,
  editing,
  test_name,
  browser,
  instruction_count,
  updateTestPlan,
  removeTestPlan,
  removable,
}) {
  const [testName, setTestName] = useState(test_name);
  const [browserName, setBrowserName] = useState(browser);
  const [instructionCount, setInstructionCount] = useState(instruction_count);

  // validators (could be moved to different file for better maintainability)
  const validateTestName = (testName) => {
    return testName.length > 0;
  };

  const validateBrowserName = (browserName) => {
    return ["chrome", "firefox", "safari", "edge"].includes(browserName);
  };

  const validateInstructionCount = (instructionCount) => {
    return instructionCount > 0;
  };

  if (editing) {
    return (
      <tr key={test_name}>
        <td>
          <input
            value={testName}
            onChange={(e) => {
              if (validateTestName(e.target.value)) {
                setTestName(e.target.value);
              }
            }}
            onBlur={() => {
              updateTestPlan(id, "test_name", testName);
            }}
          />
        </td>
        <td>
          <select
            value={browserName}
            onChange={(e) => {
              if (validateBrowserName(e.target.value)) {
                updateTestPlan(id, "browser", e.target.value);
                setBrowserName(e.target.value);
              }
            }}
          >
            <option value="chrome">Chrome</option>
            <option value="firefox">Firefox</option>
            <option value="safari">Safari</option>
            <option value="edge">Edge</option>
          </select>
        </td>
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            value={instructionCount}
            onChange={(e) => {
              if (validateInstructionCount(e.target.value)) {
                setInstructionCount(e.target.value);
              }
            }}
            onBlur={() =>
              updateTestPlan(id, "instruction_count", instructionCount)
            }
          />
          {instruction_count > 1 ? "steps" : "step"}
        </td>
        {removable && (
          <td>
            <button
              onClick={() => {
                removeTestPlan(id);
              }}
              style={{ backgroundColor: "lightcoral", color: "black" }}
            >
              Remove
            </button>
          </td>
        )}
      </tr>
    );
  } else {
    return (
      <tr key={test_name}>
        <td>{test_name}</td>
        <td>{browser}</td>
        <td>
          {instruction_count} {instruction_count > 1 ? "steps" : "step"}
        </td>
      </tr>
    );
  }
}
