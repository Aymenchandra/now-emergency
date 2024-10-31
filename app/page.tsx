import { Button } from "@/components/ui/button";
import { compileWelcomeTemplate, sendMail } from "@/lib/mail";

export default function  Home() {
  const send = async () => {
    "use server";
    await sendMail({
      to: "aymen.chandra@etudiant-fsegt.utm.tn",
      name: "Vahid",
      subject: "Test Mail",
      body:'<h1>hello worlds</h1>',
    });
  };
  return (
    <form>
      <Button formAction={send}>test</Button>
    </form>
  );
}
