import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyEmailForm from "./VerifyEmaliForm";

export default function VerifyEmailCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          Please check your email for a verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
}
