import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Events() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*");

      console.log("Fetched events:", data);
      console.log("Error:", error);

      if (error) {
        setErrorMessage("Failed to load events.");
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Upcoming Events</h1>

      {loading && <p>Loading events...</p>}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!loading && events.length === 0 && (
        <p>No events found in database.</p>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#1e293b",
            borderRadius: "10px",
          }}
        >
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.event_date}</p>
        </div>
      ))}
    </div>
  );
}