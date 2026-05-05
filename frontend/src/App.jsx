import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return (
    <h1 className="text-2xl">{msg}</h1>
  );
}

export default App;
