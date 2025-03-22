import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Provider } from "react-redux";
import Router from "./router/Router";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Sidebar />
          <main className="pl-64 pt-16 ">
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Router />
            </div>
          </main>
        </div>
      </BrowserRouter>
      //{" "}
    </Provider>
  );
}

export default App;
