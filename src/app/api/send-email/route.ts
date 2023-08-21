import { Check } from "@/lib/check";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type RequestJson<T> = T;

async function toJson<T>(req: Request): Promise<RequestJson<T>> {
  const json = await req.json();
  return json;
}

type PostData = {
  data: Check[];
};

export const POST = async (req: Request) => {
  const json = await toJson<PostData>(req);
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["activeoutremer@gmail.com"],
    subject: "Hello world",
    text: `
    ${json.data
      .map(
        data => `${data.name}: 
    - Condition: ${data.condition}
    - Person notified: ${data.notification ? data.notification.person : "N/A"}
    - Issue Resolved: ${data.notification ? data.notification.resolved : "N/A"}`
      )
      .join("\n")}
    
    `
  });
  return new Response("Hello there");
};
