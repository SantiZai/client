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

const Differential = () => {
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
    <section className="h-32 w-full bg-gray-200 flex justify-center items-center text-center">
      <h3 className="text-2xl">
        {text}
        {boldText && <strong>{boldText}</strong>}
      </h3>
    </section>
  );
};

export default Differential;
