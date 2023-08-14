import { TextInput, Card, Button } from "@aomdev/ui";
import { Checkbox, Select } from "./_components/client";
import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { CarRelation, Database } from "@/types/database.types";

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
  rememberMe;
  let firstName = "";
  let lastName = "";
  if (rememberMe?.value === "on") {
    firstName = cookies.get("firstName")?.value || "";
    lastName = cookies.get("lastName")?.value || "";
  }

  async function onSubmit(formData: FormData) {
    "use server";
    const cookies = nextCookies();
    const firstName = formData.get("first_name")?.toString() || "";
    const lastName = formData.get("last_name")?.toString() || "";
    const licensePlate = formData.get("license_plate")?.toString() || "";
    const rememberMe = formData.get("remember_me")?.toString() || "";
    let test: CarRelation | null = null;
    if (data) {
      for (const car of data) {
        if (car.license_plate === licensePlate) test = car as CarRelation;
      }
    }
    if (!test) throw Error;
    console.log(test);

    const { error, data: userCheckList } = await supabase
      .from("user_check_list")
      .insert({ first_name: firstName, last_name: lastName, license_plate: licensePlate })
      .select()
      .single();
    if (error) throw new Error("");
    const userChecks = test.car_checks.map(check => {
      return {
        check_id: check.id,
        checklist_id: userCheckList.id,
        description: "",
        name: check.name
      };
    });
    const { error: checksError } = await supabase.from("user_checks").insert(userChecks);
    console.log(checksError);

    if (rememberMe === "on") {
      cookies.set("firstName", firstName?.toString() || "");
      cookies.set("lastName", lastName?.toString() || "");
      cookies.set("rememberMe", "on");
    } else {
      cookies.set("rememberMe", "off");
    }
    redirect(`/${userCheckList.id}`);
  }
  const plates = error
    ? []
    : data.map(({ license_plate }) => ({ label: license_plate, value: license_plate }));
  return (
    <>
      <>
        <div className="cardcontainer">
          <h1 className="font-heading font-medium text-3xl">Connexion</h1>
          <Card className="card">
            <form className="space-y-4" action={onSubmit}>
              <TextInput label="Nom" defaultValue={firstName} required name="first_name" />
              <TextInput label="Prénom" defaultValue={lastName} required name="last_name" />

              <Select items={plates} placeholder="Select license plate" fullWidth name="license_plate" />
              <Checkbox
                defaultChecked={rememberMe?.value === "on"}
                label="Se souvenir de moi"
                name="remember_me"
              />

              <Button fullWidth size="sm" className="rounded-full mt-6">
                Suivant
              </Button>
            </form>
          </Card>
        </div>
      </>
    </>
  );
}
