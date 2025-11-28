import LoginForm from "@/components/BlogComponents/LoginForm";
export const revalidate = 0; // prevent ISR
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
 <LoginForm />
  );
}
