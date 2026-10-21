"use client";

import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    MessageCircle,
    UserRound,
    Users,
    Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";


export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    return (
        <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
            {/* Left branding grid  */}
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
                        Your community starts here
                    </span>

                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 xl:text-6xl">
                        Meet people.
                        <br />
                        Share moments.
                        <br />
                        <span className="text-violet-600">
                            Be yourself.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                        Create your account and join a community where
                        your ideas, interests, and stories matter.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                            <MessageCircle className="mb-3 size-6 text-violet-600" />
                            <p className="font-semibold text-slate-900">
                                Start conversations
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Connect through shared interests.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                            <Heart className="mb-3 size-6 text-pink-500" />
                            <p className="font-semibold text-slate-900">
                                Share your world
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Make every moment count.
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-500">
                    A place to connect, create, and belong.
                </p>

                <div className="pointer-events-none absolute -bottom-28 -right-24 size-96 rounded-full bg-violet-200/50 blur-3xl" />
                <div className="pointer-events-none absolute right-16 top-1/4 size-48 rounded-full bg-blue-200/40 blur-3xl" />
            </section>

            {/* Right registration form  */}
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
                            <UserRound className="size-6" />
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Create your account
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Get started today. It only takes a minute.
                        </p>
                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            // Connect your registration API here.
                        }}
                    >

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                    @
                                </span>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="johndoe"
                                    autoComplete="username"
                                    required
                                    className="h-12 rounded-xl border-slate-200 pl-10 focus-visible:ring-violet-500"
                                />
                            </div>
                            <p className="text-xs text-slate-500">
                                Choose a username people can find you by.
                            </p>
                        </div>

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

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    minLength={8}
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
                            <p className="text-xs text-slate-500">
                                Use at least 8 characters.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm password
                            </Label>
                            <div className="relative">
                                <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    className="h-12 rounded-xl border-slate-200 pl-10 pr-11 focus-visible:ring-violet-500"
                                />
                                <button
                                    type="button"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-violet-600 text-base font-semibold shadow-md shadow-violet-200 transition hover:bg-violet-700"
                        >
                            Create account
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                    <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-slate-600">
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
        </div>
    );
}