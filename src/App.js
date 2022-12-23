import { useState } from "react";
import Login from "./components/Login";

function App() {

    const [logged, setLogged] = useState(false)

    return (
        <div>
			{!logged && <Login setLogged={setLogged}/>}
        </div>
    );
}

export default App;
