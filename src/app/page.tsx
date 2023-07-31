import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Data {
  runtime: "node";
  message: string;
  time: string;
  pi: number;
}

const Card = ({
  runtime,
  data,
}: {
  runtime: "Node" | "Rust";
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
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Note: Estimate Pi with Monte Carlo Method&nbsp;</p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
        <Card
          runtime="Rust"
          data={{
            runtime: "node",
            message: "string",
            time: "string",
            pi: 3.14,
          }}
        />
      </div>
    </main>
  );
}
