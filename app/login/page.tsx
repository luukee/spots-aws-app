"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export default function LoginPage() {
  const router = useRouter();

  return (
    <Authenticator socialProviders={['google']}>
      {({ signOut, user }) => {
        // Redirect to dashboard when authenticated
        if (user) {
          router.push('/dashboard');
        }

        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
      }}
    </Authenticator>
  );
}
