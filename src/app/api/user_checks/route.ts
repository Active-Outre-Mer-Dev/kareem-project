import { admin } from "@/lib/supabase";

export const PUT = async (req: Request) => {
  const updatedChecks = await req.json();

  console.log(updatedChecks.data);
  // admin.from('user_checks').update()
  await Promise.all(
    updatedChecks.data.map(check => {
      return admin
        .from("user_checks")
        .update({ description: check.description, checked: check.checked })
        .eq("id", check.id);
    })
  );
  return new Response("Nice");
};
