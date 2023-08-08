import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type Runtime =
  | "Rust 🦀"
  | "Python 🐍"
  | "Go 🎃"
  | "Node 🍜"
  | "Ruby 💎"
  | "PHP 🎯";

interface Data {
  runtime: Runtime | string;
  message: string;
  time: string;
  pi: number;
}

const Card = ({
  runtime,
  data,
}: {
  runtime: Runtime;
  data?: Data | null;
}): JSX.Element => {
  return (
    <section className={styles.card}>
      <div className={styles.runtime}>
        <p>{runtime}</p>
      </div>
      <div className={styles.desc}>
        <p>Time: {data?.time ?? "-"}</p>
        <p>Points in circle: {data?.message ?? "-"}</p>
        <p>Pi: {data?.pi ?? "-"}</p>
      </div>
    </section>
  );
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [resultRust, setResultRust] = useState<Data | null>(null);
  const [resultPython, setResultPython] = useState<Data | null>(null);
  const [resultGo, setResultGo] = useState<Data | null>(null);
  const [resultNode, setResultNode] = useState<Data | null>(null);

  let prefix = "/api/";
  const serverless = ["rust", "python", "go", "node"];
  const FN = serverless.map((fn) => `${prefix}${fn}`);
  const resultSet = [
    setResultRust,
    setResultPython,
    setResultGo,
    setResultNode,
  ];

  async function request(
    api: (typeof FN)[number],
    set: React.Dispatch<React.SetStateAction<Data | null>>
  ) {
    try {
      const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify({
          count: 1000,
        }),
      });
      const data = await res.json();
      set(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Note: Estimate Pi with Monte Carlo Method&nbsp;
          <button
            className={[styles.button, loading ? styles.progress : ""]
              .join(" ")
              .trim()}
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              try {
                resultSet.forEach((f) => f(null));
                await Promise.all(
                  FN.map(async (fn, index) => {
                    const set = resultSet[index];
                    const response = await fetch(fn);
                    const data = await response.json();
                    return set(data);
                  })
                );
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            Run - PRNG Algorithm
          </button>
        </p>
        <div className={inter.className}>
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/fromwhite/next.stack&project-name=next_stack&repository-name=next.stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles.grid}>
        <Card runtime="Rust 🦀" data={resultRust} />
        <Card runtime="Python 🐍" data={resultPython} />
        <Card runtime="Go 🎃" data={resultGo} />
        <Card runtime="Node 🍜" data={resultNode} />
        {/* <Card runtime="Ruby 💎" data={} />
        <Card runtime="PHP 🎯" data={} /> */}
      </div>
    </main>
  );
}
