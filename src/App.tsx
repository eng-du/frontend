import Header from './components/Header';
import Home from './features/home/Home';

function App() {
  return (
    <div>
      <Header />
      <main className="min-h-dvh pt-15">
        <Home />
      </main>
    </div>
  );
}

export default App;
