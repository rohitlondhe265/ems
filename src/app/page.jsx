import Card from "@/components/Card";
import Hero from "@/components/Hero";
import React from "react";

export default function page() {
  const prod = [
    {
      _id: "654dc8dd11d66048a0c81787",
      title: "TCS Aptitude",
      banner: "/dummy.jpg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum cupiditate nostrum facere commodi recusandae est.",
    },
    {
      _id: "654dc8dd11d66048a0c81787",
      title: "General Studies",
      banner: "/dummy.jpg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum cupiditate nostrum facere commodi recusandae est.",
    },
    {
      _id: "654dc8dd11d66048a0c81787",
      title: "Placements Aptitude",
      banner: "/dummy.jpg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum cupiditate nostrum facere commodi recusandae est.",
    },
    {
      _id: "654dc8dd11d66048a0c81787",
      title: "Resoning",
      banner: "/dummy.jpg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum cupiditate nostrum facere commodi recusandae est.",
    },
  ];
  return (
    <div className="mt-6">
      <Hero/>
      <h3 className="text-2xl text-primary font-medium underline text-center my-6">
        Explore Various Test Series Categories
      </h3>
      <Card categories={prod} />
    </div>
  );
}
