'use client'
import { useEffect, useState } from "react";
import { AppointmentStats } from "../../types/appwrite.type";

export function useAppointments() {
  const [data, setData] = useState<AppointmentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointment")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
}



