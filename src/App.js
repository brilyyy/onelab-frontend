import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="font-open-sans">
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
