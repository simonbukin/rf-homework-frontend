import "@picocss/pico/css/pico.min.css";
import TestSuiteOverview from "./components/TestSuiteOverview";

function App() {
  return (
    <div className="App">
      <main className="container">
        <header className="App-header">
          <h1 style={{ marginTop: "1rem" }}>Rainforest Frontend Homework</h1>
        </header>
        <TestSuiteOverview />
      </main>
    </div>
  );
}

export default App;
