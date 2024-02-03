import Image from "next/image";

import clasees from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={clasees.hero}>
      <div className={clasees.image}>
        <Image
          src="/images/site/Roman.jpg"
          alt="An image showing Roman"
          width={300}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
      <h1>Hi, I`m Roman</h1>
      <p>A blog about web development - especially frontend frameworks like Angular or React.</p>
    </section>
  );
}
