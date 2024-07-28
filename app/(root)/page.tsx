import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";
const Home = () => {
  const loggedIn = {
    firstName: "Thiago",
    lastName: "Scherer",
    email: "tas@gmail",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Bem vindo"
            user={loggedIn.firstName || "Covidado"}
            subtext="Acesse e controle sua conta e suas transações com eficiência."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={5421}
          />
        </header>
        TRANSAÇÕES RECENTES
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 52.5 }]}
      />
    </section>
  );
};

export default Home;
