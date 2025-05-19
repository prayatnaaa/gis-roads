import "./App.css";

function App() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        hello world
      </div>
    </>
  );
}

export default App;
