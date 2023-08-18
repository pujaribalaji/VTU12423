import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Register your company and obtain the client ID and client secret
    const registrationData = {
      companyName: "Your Company Name",
      ownerName: "Your Name",
      rollNo: "Your Roll Number",
      ownerEmail: "your.email@example.com",
      accessCode: "Your Access Code",
    };

    axios.post("http://20.244.56.144/train/register", registrationData)
      .then((registrationResponse) => {
        const { clientID, clientSecret } = registrationResponse.data;

        // Use the obtained client ID and client secret for authentication
        const authData = {
          companyName: "Your Company Name",
          clientID: clientID,
          ownerName: "Your Name",
          ownerEmail: "your.email@example.com",
          rollNo: "Your Roll Number",
          clientSecret: clientSecret,
        };

        // Obtain the authorization token
        axios.post("http://20.244.56.144/train/auth", authData)
          .then((authResponse) => {
            const authorizationToken = authResponse.data.access_token;

            // Fetch train data using the obtained authorization token
            axios.get("/api/train-schedule", {
              headers: {
                Authorization: `Bearer ${authorizationToken}`,
              },
            })
              .then((response) => {
                setTrains(response.data);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          })
          .catch((error) => {
            console.error("Authorization error:", error.message);
          });
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>Train Schedule for the Next 12 Hours</h1>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Seats Available (AC)</th>
            <th>Price (Sleeper)</th>
            <th>Price (AC)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{train.departureTime}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
