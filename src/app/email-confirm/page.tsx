"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/supabase/clients/client";
import { toast } from "sonner";

const emailConfirmSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

type EmailConfirmFormData = z.infer<typeof emailConfirmSchema>;

export default function EmailConfirmPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailConfirmFormData>({
    resolver: zodResolver(emailConfirmSchema),
    defaultValues: {
      token: searchParams.get("token") || "",
    },
  });

  const onSubmit = async (data: EmailConfirmFormData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        token_hash: data.token,
        type: "email",
      });

      if (error) {
        throw error;
      }

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Confirm your email</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Please check your email for the verification link or enter the
              token below
            </p>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="token">Verification Token</Label>
              <Input
                id="token"
                type="text"
                placeholder="Enter verification token"
                {...register("token")}
              />
              {errors.token && (
                <p className="text-sm text-red-500">{errors.token.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </div>
          <div className="text-center text-sm">
            Already verified?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
