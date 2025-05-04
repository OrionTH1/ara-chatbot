"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import {
  createAccount,
  createOAuthAccount,
  createEmailSession,
} from "@/lib/actions/auth";
type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password must be at most 50 characters long" }),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const {
    setError,
    clearErrors,
    formState: { errors: errorMessage },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    clearErrors();
    try {
      switch (type) {
        case "sign-in":
          const session = await createEmailSession(
            values.fullName || "",
            values.email,
            values.password
          );

          if (!session.error) {
            router.push("/chat");
            break;
          }

          setError("root", {
            message: session.error.message,
          });

          break;

        case "sign-up":
          const user = await createAccount(
            values.fullName || "",
            values.email,
            values.password
          );

          if (user.response) {
            await createEmailSession(
              values.fullName || "",
              values.email,
              values.password
            );

            router.push("/chat");
            break;
          }

          if (user.error === "user_already_exists") {
            setError("email", {
              message: "A user with this email already exists. Try sign in.",
            });
            break;
          }

          setError("root", {
            message: "Something went wrong, please try again.",
          });
          break;

        default:
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    clearErrors();

    try {
      const url = window.location.origin;
      console.log(url);

      const OAuthURL = await createOAuthAccount(path);

      if (OAuthURL.response) {
        console.log(OAuthURL.response);

        router.push(OAuthURL.response);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Login" : "Create Account"}
          </h1>
          <div className="flex flex-col gap-[18px]">
            {type == "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        autoComplete="current-password"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" disabled={isLoading}>
              <p className="text-2">
                {type === "sign-in" ? "Sign In" : "Sign Up"}
              </p>

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader icon"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>

            <Button
              type="button"
              variant={"outline"}
              disabled={isLoading}
              onClick={handleGoogleAuth}
            >
              <Image
                src="/assets/icons/google-icon.svg"
                width={20}
                height={20}
                alt="Google Icon"
              />
              <p className="text-2">
                {(type === "sign-in" ? "Sign In" : "Sign Up") + " with Google"}
              </p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader icon"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {errorMessage.root && (
              <p className="error-message">*{errorMessage.root?.message}</p>
            )}
            <div className="flex justify-center">
              <p>
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-medium text-brand"
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AuthForm;
