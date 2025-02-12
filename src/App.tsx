import { lazy, Suspense } from 'react';
import Hero from "./components/Hero";

// Lazy load components after hero section
const Instructions = lazy(() => import("./components/Instructions"));
const MapComponent = lazy(() => import("./components/MapComponent"));

// Loading component
const LoadingFallback = () => <div className="min-h-screen grid place-content-center">Loading...</div>;

const App = (): JSX.Element => (
 <>
   <Hero />
   <main className="relative">
     <Suspense fallback={<LoadingFallback />}>
       <Instructions />
       <MapComponent />
     </Suspense>
   </main>
 </>
);

export default App;