"use client";
import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <div className="w-full">
      <CountUp end={amount} decimal="," prefix="R$" decimals={2} />
    </div>
  );
}

export default AnimatedCounter;
