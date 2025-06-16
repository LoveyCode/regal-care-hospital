'use client'
import { useEffect, useState, useCallback } from "react";
import { AppointmentStats } from "../../types/appwrite.type";

export function useAppointments() {
  const [data, setData] = useState<AppointmentStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
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

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading };
}