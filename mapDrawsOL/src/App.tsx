import MapComponent from "./components/MapComponent.tsx";
import Instructions from "./components/Instructions.tsx";

const App = (): JSX.Element => {
  return (
    <main>
      <Instructions />
      <MapComponent />
    </main>
  );
};

export default App;