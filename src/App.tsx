import Header from './components/Header';
import EngduLearning from './features/engdu-learning/EngduLeaning';

function App() {
  return (
    <div>
      <Header />
      <main className="h-dvh pt-15">
        <EngduLearning />
      </main>
    </div>
  );
}

export default App;
