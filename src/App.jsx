import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/header/Header";
import Content from "./components/Content";

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <Header />
        <Content />
      </QueryClientProvider>
    </>
  );
}

export default App;
