import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function LiveMap() {
  const [drivers, setDrivers] = useState([]);

    async function loadDrivers() {
        const { data, error } = await supabase
              .from("drivers")
                    .select("*");

                        if (!error) {
                              setDrivers(data);
                                  }
                                    }

                                      useEffect(() => {
                                          loadDrivers();

                                              const channel = supabase
                                                    .channel("drivers-live")
                                                          .on(
                                                                  "postgres_changes",
                                                                          {
                                                                                    event: "*",
                                                                                              schema: "public",
                                                                                                        table: "drivers",
                                                                                                                },
                                                                                                                        () => {
                                                                                                                                  loadDrivers();
                                                                                                                                          }
                                                                                                                                                )
                                                                                                                                                      .subscribe();

                                                                                                                                                          return () => {
                                                                                                                                                                supabase.removeChannel(channel);
                                                                                                                                                                    };
                                                                                                                                                                      }, []);

                                                                                                                                                                        return (
                                                                                                                                                                            <div style={{ padding: 20 }}>
                                                                                                                                                                                  <h2>🗺️ Live Driver Tracking</h2>

                                                                                                                                                                                        {drivers.length === 0 && (
                                                                                                                                                                                                <p>No active drivers</p>
                                                                                                                                                                                                      )}

                                                                                                                                                                                                            {drivers.map((driver) => (
                                                                                                                                                                                                                    <div
                                                                                                                                                                                                                              key={driver.id}
                                                                                                                                                                                                                                        style={{
                                                                                                                                                                                                                                                    border: "1px solid #ccc",
                                                                                                                                                                                                                                                                padding: 10,
                                                                                                                                                                                                                                                                            marginBottom: 10,
                                                                                                                                                                                                                                                                                        borderRadius: 8,
                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                    <h3>{driver.name}</h3>

                                                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                                                          🚐 {driver.vehicle_type}
                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                                                                                          🔢 {driver.vehicle_reg}
                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                                                                                                                          📍 Latitude: {driver.latitude}
                                                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                          📍 Longitude: {driver.longitude}
                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                              <p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Status: {driver.status}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }