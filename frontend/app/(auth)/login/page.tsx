
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    MessageCircle,
    Users,
    Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
            {/* Left: Branding */}
            <section className="relative hidden min-h-screen overflow-hidden bg-linear-to-br from-violet-50 via-indigo-50 to-blue-50 p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                        <Users className="size-6" />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                        SocialHub
                    </span>
                </Link>

                <div className="relative z-10 max-w-lg">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-sm font-medium text-violet-700">
                        <Heart className="size-4" />
                        Your community awaits
                    </span>

                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 xl:text-6xl">
                        Welcome
                        <br />
                        back to your
                        <br />
                        <span className="text-violet-600">
                            community.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                        Catch up with your people, discover new stories,
                        and pick up right where you left off.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                            <MessageCircle className="mb-3 size-6 text-violet-600" />
                            <p className="font-semibold text-slate-900">
                                Stay connected
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Conversations are waiting for you.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                            <Heart className="mb-3 size-6 text-pink-500" />
                            <p className="font-semibold text-slate-900">
                                Never miss a moment
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                See what your community shares.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute -bottom-28 -right-24 size-96 rounded-full bg-violet-200/50 blur-3xl" />
                <div className="pointer-events-none absolute right-16 top-1/4 size-48 rounded-full bg-blue-200/40 blur-3xl" />
            </section>

            {/* Right: Login form */}
            <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
                <div className="w-full max-w-md">
                    <Link
                        href="/"
                        className="mb-10 flex items-center gap-2 lg:hidden"
                    >
                        <div className="flex size-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                            <Users className="size-5" />
                        </div>

                        <span className="text-xl font-bold text-slate-900">
                            SocialHub
                        </span>
                    </Link>

                    <div className="mb-8">
                        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                            <LockKeyhole className="size-6" />
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Enter your details to sign in to your account.
                        </p>
                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            // Connect your login API here.
                        }}
                    >
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>

                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="h-12 rounded-xl border-slate-200 pl-10 focus-visible:ring-violet-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <div className="relative">
                                <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="h-12 rounded-xl border-slate-200 pl-10 pr-11 focus-visible:ring-violet-500"
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2">
                            <Checkbox id="rememberMe" name="rememberMe" />
                            <Label
                                htmlFor="rememberMe"
                                className="cursor-pointer text-sm font-normal text-slate-600"
                            >
                                Remember me
                            </Label>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-violet-600 text-base font-semibold shadow-md shadow-violet-200 transition hover:bg-violet-700"
                        >
                            Sign in
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                        >
                            Create account
                        </Link>
                    </p>

                    <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                        By signing in, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline hover:text-slate-600"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline hover:text-slate-600"
                        >
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </section>
        </main>
    );
}