import { FC } from "react";

const About: FC = () => {
  return (
    <div className="py-4 pb-8">
      <section id="about" className="container flex flex-col flex-nowrap gap-2">
        <h1 className="text-xl font-bold">About</h1>
        <p className="mt-2 text-sm">
          <b>A-Z Platinum Challenge</b> is a trophy hunting challenge where
          players aim to earn a platinum trophy for a game starting with each
          letter of the alphabet, <b>from A to Z</b>. It&apos;s a fun and
          challenging way to explore a wide range of games while pushing your
          completionist skills
        </p>
        <p className="text-sm">
          This web app is designed to help you <b>track</b> your progress,&nbsp;
          <b>organize</b> your completed titles, and <b>stay motivated</b>
          &nbsp;throughout the challenge. Whether you&apos;re a seasoned trophy
          hunter or just getting started, this tool offers a clear and simple
          way to visualize your achievements and plan your next move
        </p>
        <b className="text-sm">
          Start your challenge today and see how far through the alphabet you
          can get!
        </b>
      </section>
    </div>
  );
};

export default About;
