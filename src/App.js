import underConstructionImg from "./assets/gifs/working-under-construction.gif";

function App() {
  return (
    <div className="under-construction">
      <img src={underConstructionImg} alt="Under Construction" />
      <h1>Something amazing is on its way</h1>
      <p>Our site is currently under construction. <br />Stay tuned!</p>
      {process.env.REACT_APP_ENV && (
        <span className="env-badge">{process.env.REACT_APP_ENV}</span>
      )}
    </div>
  );
}

export default App;