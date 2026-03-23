import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign Up | Nike",
  description: "Create your Nike account",
};

export default function SignUpPage() {
  return <AuthForm mode="sign-up" />;
}
