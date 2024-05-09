"use client";

import { useEffect, useState } from "react";

const differentials = [
  {
    text: "¡Navegá entre cientos de clubes!",
  },
  {
    text: "Disponibilidad de canchas en ",
    boldText: "tiempo real",
  },
];

export default function Differential() {
  const [diff, setDiff] = useState(0);

  const handleDiffChange = () => {
    setDiff((prevIndex) =>
      prevIndex === differentials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { text, boldText } = differentials[diff];

  useEffect(() => {
    const interval = setInterval(handleDiffChange, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-200 py-8 text-center">
      <h3 className="text-2xl">
        {text}
        {boldText && <strong>{boldText}</strong>}
      </h3>
    </section>
  );
}
