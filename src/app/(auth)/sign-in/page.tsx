import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In | Nike",
  description: "Sign in to your Nike account",
};

export default function SignInPage() {
  return <AuthForm mode="sign-in" />;
}
