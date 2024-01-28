import React, { useState } from "react";
import TestPlan from "./TestPlan";

export default function TestSuite({
  id,
  test_suite_name,
  test_plans,
  updateTestSuite,
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [testPlans, setTestPlans] = useState(test_plans);
  const [name, setName] = useState(test_suite_name);

  const rightAlignStyle = {
    textAlign: "right",
    width: "8rem",
    padding: "0",
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const validateTestSuiteName = (testSuiteName) => {
    return testSuiteName.length > 0;
  };

  const updateTestPlan = (testPlanId, path, newValue) => {
    setTestPlans((prevTestPlans) => {
      const updatedTestPlans = [...prevTestPlans];
      const oldPlan = updatedTestPlans[testPlanId];
      oldPlan[path] = newValue;
      return updatedTestPlans;
    });
  };

  const removeTestPlan = (testPlanId) => {
    setTestPlans((prevTestPlans) => {
      const updatedTestPlans = [...prevTestPlans];
      updatedTestPlans.splice(testPlanId, 1);
      return updatedTestPlans;
    });
  };

  const addTestPlan = () => {
    setTestPlans((prevTestPlans) => {
      const updatedTestPlans = [...prevTestPlans];
      updatedTestPlans.push({
        test_name: "New Test",
        browser: "chrome",
        instruction_count: 1,
      });
      return updatedTestPlans;
    });
  };

  const onSubmit = () => {
    const newTestSuite = {
      id,
      test_suite_name: name,
      test_plans: testPlans,
    };
    console.log(JSON.stringify(newTestSuite, null, 2));
    setEditing(false);
    updateTestSuite(id, testPlans);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={!editing ? toggleOpen : null}>
              {open ? "V " : "> "}
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    if (validateTestSuiteName(e.target.value)) {
                      setName(e.target.value);
                    }
                  }}
                />
              ) : (
                <p style={{ display: "inline" }}>{name}</p>
              )}
            </th>
            <th style={rightAlignStyle}>
              {testPlans.length} test{testPlans.length > 1 ? "s" : ""}
            </th>
            {editing ? (
              <th style={rightAlignStyle}>
                <button
                  onClick={onSubmit}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Save
                </button>
              </th>
            ) : (
              <th style={rightAlignStyle}>
                <button
                  onClick={toggleEditing}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "lightblue",
                    color: "black",
                  }}
                >
                  Edit
                </button>
              </th>
            )}
          </tr>
        </thead>
        {open && (
          <tbody>
            {testPlans.map((testPlan, id) => {
              return (
                <TestPlan
                  key={JSON.stringify(testPlan)} // TODO: could use better key
                  id={id}
                  editing={editing}
                  updateTestPlan={updateTestPlan}
                  removeTestPlan={removeTestPlan}
                  addTestPlan={addTestPlan}
                  removable={testPlans.length > 1}
                  {...testPlan}
                />
              );
            })}
            {editing && (
              <tr>
                <td colSpan="4" style={rightAlignStyle}>
                  <button
                    onClick={() => {
                      addTestPlan(id);
                    }}
                    style={{ backgroundColor: "seagreen", color: "black" }}
                  >
                    Add Test
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}
