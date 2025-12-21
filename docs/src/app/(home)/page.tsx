import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { codeToHtml } from "shiki";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600"] });

const exampleCode = `import { distinctBy } from 'distinct';

const ns = [1, 2, 2, 3, 4, 4, 5];
const uNs = distinctBy(ns, n => n % 2);

console.log(uNs); // Output: [1, 2]`;

export default async function HomePage() {
  const out = await codeToHtml(exampleCode, {
    lang: "ts",
    theme: "one-dark-pro",
    colorReplacements: {
      "#282c34": "transparent",
    },
  });

  return (
    <div className={`${display.className} relative flex-1`}>
      <div className="relative isolate overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Badge className="uppercase tracking-widest">
              Distinct utility toolkit
            </Badge>
            <div
              className="reveal flex flex-col gap-4"
              style={{ animationDelay: "120ms" }}
            >
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Keep arrays clean without losing intent.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg">
                Distinct gives you two focused helpers: one for primitives and
                one for derived keys. It keeps the first occurrence, handles
                deep object equality, and stays readable in every code review.
              </p>
            </div>
            <div
              className="reveal flex flex-wrap gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <Button asChild>
                <Link href="/docs">Read the docs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs/why-distinct">Why distinct</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card
              className="reveal gap-4 sm:gap-6"
              style={{ animationDelay: "300ms" }}
            >
              <CardHeader className="flex items-center px-4 sm:px-6">
                <Badge
                  className="uppercase tracking-widest"
                  variant="secondary"
                >
                  What it solves
                </Badge>
                <Badge className="uppercase tracking-widest">
                  Deep equality
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 px-4 sm:px-6">
                <div className="rounded-2xl border p-4 shadow-sm">
                  <h3 className="text-base font-semibold">
                    Predictable output
                  </h3>
                  <p className="mt-2 text-sm">
                    The first occurrence wins, so your arrays keep their
                    original rhythm and ordering.
                  </p>
                </div>
                <div className="rounded-2xl border p-4 shadow-sm">
                  <h3 className="text-base font-semibold">
                    Works with objects
                  </h3>
                  <p className="mt-2 text-sm">
                    Deep equality is handled when you need it, without manual
                    serialization tricks.
                  </p>
                </div>
                <div className="rounded-2xl border p-4 shadow-sm">
                  <h3 className="text-base font-semibold">Focused API</h3>
                  <p className="mt-2 text-sm">
                    Two functions, no extra ceremony. Reach for one and move on.
                  </p>
                </div>
                <div className="rounded-2xl border p-4 shadow-sm">
                  <h3 className="text-base font-semibold">
                    Clear escape hatch
                  </h3>
                  <p className="mt-2 text-sm">
                    Use distinctBy when you already know the key you care about.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="reveal gap-4 sm:gap-6"
              style={{ animationDelay: "360ms" }}
            >
              <CardHeader className="flex items-center justify-between px-4 sm:px-6">
                <Badge className="uppercase tracking-widest">Example</Badge>
                <Badge className="tracking-widest" variant="outline">
                  distinctBy
                </Badge>
              </CardHeader>
              <CardContent className="border-y sm:text-sm text-xs px-4 sm:px-6 py-6">
                <div
                  className="**:m-0! **:p-0!"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: "This is safe because the HTML is generated by shiki."
                  dangerouslySetInnerHTML={{ __html: out }}
                />
              </CardContent>
              <CardFooter className="px-4 sm:px-6 py-2">
                Result keeps the first occurrence per id without reordering.
              </CardFooter>
            </Card>
          </div>

          <Card
            className="reveal rounded-3xl"
            style={{ animationDelay: "420ms" }}
          >
            <CardHeader className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
              <h2 className="text-2xl font-semibold">
                Choose the right helper
              </h2>
              <Button asChild variant="outline">
                <Link href="/docs/distinct">API reference</Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3 px-4 sm:px-6">
              <div className="rounded-2xl border p-4 shadow-sm">
                <h3 className="text-base font-semibold">distinct</h3>
                <p className="mt-2 text-sm">
                  Use it for primitives, or for full deep equality with objects.
                </p>
              </div>
              <div className="rounded-2xl border p-4 shadow-sm">
                <h3 className="text-base font-semibold">distinctBy</h3>
                <p className="mt-2 text-sm">
                  Feed a key function to define what makes items unique.
                </p>
              </div>
              <div className="rounded-2xl border p-4 shadow-sm">
                <h3 className="text-base font-semibold">Native option</h3>
                <p className="mt-2 text-sm">
                  Prefer Set or Map when deep equality is not required.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
