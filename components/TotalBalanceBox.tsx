import React from "react";

import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";
function TotalBalanceBox({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Contas Bancárias: {totalBanks} </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label"> Saldo Atual</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalBalanceBox;
