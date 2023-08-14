import { admin } from "@/lib/supabase";

export const PUT = async (req: Request) => {
  const json = await req.json();
  const finishedDate = new Date().toUTCString();
  const [{ error: userListError }, { error: carError }] = await Promise.all([
    admin
      .from("user_check_list")
      .update({
        completed: true,
        finished_at: finishedDate
      })
      .eq("id", json.id),
    admin.from("cars").update({ last_checked: finishedDate }).eq("license_plate", json.licensePlate)
  ]);

  if (userListError || carError) return new Response("Failed to update checks", { status: 500 });
  console.log(json);
  return new Response("Hello there", { status: 200 });
};
