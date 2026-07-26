import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 pt-[70px] text-center">
      <div>
        <LogoMark className="mx-auto h-16 w-16" />
        <h1 className="mt-6 text-4xl">Page not found</h1>
        <p className="mt-3 text-muted">This page seems to have wandered off the canvas.</p>
        <Link href="/en" className="btn btn-accent mt-6">
          Back home
        </Link>
      </div>
    </section>
  );
}
