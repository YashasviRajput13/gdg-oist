import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string; // ✅ must match supabase column
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true }) // ✅ IMPORTANT
        .limit(4);

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (!error && data) {
        setEvents(data as Event[]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          What's happening next
        </h2>

        {events.length === 0 && (
          <p className="text-muted-foreground">
            No upcoming events found.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <h3 className="text-2xl font-bold mb-3">
                {event.title}
              </h3>

              <p className="mb-4">
                {event.description}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar size={14} />
                  {format(new Date(event.event_date), "MMM d, yyyy")} {/* ✅ */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;