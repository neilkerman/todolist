import Header from "./components/global/header.component";
import Todo from './components/todo/todo.component';

function App() {
  return (
    <main>
      <Header />
      <section className="mb-4 container">
        <Todo />
      </section>
    </main>
  );
}

export default App;
