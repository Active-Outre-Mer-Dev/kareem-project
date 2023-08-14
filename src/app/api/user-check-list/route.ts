import { admin } from "@/lib/supabase";
import { CarRelation } from "@/types/database.types";
import { cookies as nextCookies } from "next/headers";

type RequestJson<T> = T;

async function toJson<T>(req: Request): Promise<RequestJson<T>> {
  const json = await req.json();
  return json;
}

type PostData = {
  firstName?: string;
  lastName?: string;
  licensePlate?: string;
  currentCar?: CarRelation;
  rememberMe: boolean;
};

export const POST = async (req: Request) => {
  const json = await toJson<PostData>(req);
  const cookies = nextCookies();
  if (!json.currentCar || !json.firstName || !json.lastName || !json.licensePlate) {
    return new Response(JSON.stringify({ message: "Missing data from form", data: json }), { status: 400 });
  }

  const { error, data: userCheckList } = await admin
    .from("user_check_list")
    .insert({ first_name: json.firstName, last_name: json.lastName, license_plate: json.licensePlate })
    .select()
    .single();

  if (error) return new Response("An error ocurred on the server", { status: 500 });

  const userChecks = json.currentCar.car_checks.map(check => {
    return {
      check_id: check.id,
      checklist_id: userCheckList.id,
      description: "",
      name: check.name
    };
  });
  await admin.from("user_checks").insert(userChecks);
  const cookieOptions = { httpOnly: true, maxAge: 60 * 60 * 24 * 3 };
  const expireCookieCoptions = { maxAge: -1 };
  if (json.rememberMe) {
    cookies.set("firstName", json.firstName, cookieOptions);
    cookies.set("lastName", json.lastName, cookieOptions);
    cookies.set("rememberMe", "on", cookieOptions);
  } else {
    cookies.set("firstName", "", expireCookieCoptions);
    cookies.set("lastName", "", expireCookieCoptions);
    cookies.set("rememberMe", "", expireCookieCoptions);
  }

  return new Response(JSON.stringify({ message: "Data insertion successful", data: userCheckList.id }), {
    status: 201
  });
};

type PutData = {
  id: string;
  licensePlate: string;
};

export const PUT = async (req: Request) => {
  const json = await toJson<PutData>(req);

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
