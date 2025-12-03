import AuthLayout from "../../core/layout/auth-layout";
import SignUpForm from "@/modules/auth/sign_up";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
