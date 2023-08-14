import { cookies as nextCookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { CheckListForm } from "@/components/check-list-form";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    global: { fetch: fetch.bind(globalThis) },
    auth: { persistSession: false }
  }
);

export default async function Home() {
  const { data, error } = await supabase.from("cars").select("*, car_checks (car_license_plate, name, id)");
  const cookies = nextCookies();
  const rememberMe = cookies.get("rememberMe") || null;

  let firstName = "";
  let lastName = "";

  if (rememberMe?.value === "on") {
    firstName = cookies.get("firstName")?.value || "";
    lastName = cookies.get("lastName")?.value || "";
  }

  const plates = error
    ? []
    : data.map(({ license_plate }) => ({ label: license_plate, value: license_plate }));
  return (
    <>
      <>
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <CheckListForm
            data={data || []}
            defaultFirstName={firstName}
            defaultLastName={lastName}
            items={plates}
            rememberMe={rememberMe?.value === "on"}
          />
        </div>
      </>
    </>
  );
}
