import { cache } from "react";
import { admin } from "./supabase";

type CacheFetch<T> = (parameter: string) =>
  | {
      error: true;
      message: string;
    }
  | { error: false; data: T };

export const fetchCar = cache(async (licensePlate: string) => {
  const { error, data } = await admin.from("cars").select("*").eq("license_plate", licensePlate).single();
  if (error) {
    return { error: true, message: error.message } as const;
  } else {
    return { error: false, data } as const;
  }
});

export const fetchUserList = cache(async (listId: string) => {
  const { data, error } = await admin
    .from("user_check_list")
    .select("*, user_checks (checklist_id, description, id, name, checked)")
    .eq("id", listId)
    .single();
  if (error) return { error: true, message: error.message } as const;

  return { error: false, data } as const;
});
