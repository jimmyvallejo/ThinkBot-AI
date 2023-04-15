import React, { useEffect } from "react";
import axios from "axios";

function Home() {
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5001/miami-hackathon-ai/us-central1/api/users/my-test-id"
        );

        console.log(res);
      } catch (e) {
        console.error(e);
      }
    })();
  });

  return <h1>Home</h1>;
}

export default Home;
