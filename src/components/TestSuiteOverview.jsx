import { useState, useEffect } from "react";
import TestSuite from "./TestSuite";

export default function TestSuiteOverview() {
  const [testSuites, setTestSuites] = useState([]);
  const [loading, setLoading] = useState(false);

  function updateTestSuite(testSuiteId, newTestPlans) {
    setTestSuites((prevTestSuites) => {
      const updatedTestSuites = [...prevTestSuites];
      const oldTestSuite = updatedTestSuites[testSuiteId];
      oldTestSuite.test_plans = newTestPlans;
      return updatedTestSuites;
    });
  }

  useEffect(() => {
    const getTestSuites = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3456/test_suites");
        const data = await response.json();
        // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        setTestSuites(data);
      } catch {
        console.error("Error fetching test suites");
      } finally {
        setLoading(false);
      }
    };
    getTestSuites();
  }, []);

  if (loading) {
    return <p>Loading test suites...</p>;
  }

  return (
    <div>
      <h2>Test Suite Overview</h2>
      {testSuites.map((testSuite) => {
        return (
          <div key={testSuite.id}>
            <TestSuite {...testSuite} updateTestSuite={updateTestSuite} />
          </div>
        );
      })}
    </div>
  );
}
