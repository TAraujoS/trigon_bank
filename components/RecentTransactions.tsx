import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

function RecentTransactions({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-lable">Transações recentes </h2>

        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          Ver todas
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts?.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={account.appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts?.map((account: Account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className="space-y-4"
          >
            <BankInfo
              key={account.id}
              account={account}
              appwriteItemId={account.appwriteItemId}
              type="full"
            />

            {transactions.length > 0 ? (
              <TransactionsTable transactions={currentTransactions} />
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <p className="header-box-subtext ">
                  Você ainda não possui transações nessa conta.
                </p>
                <iframe
                  width={300}
                  height={300}
                  src="https://lottie.host/embed/5bceff30-cb69-44e3-aa52-eeb84d556bb1/gJpgG8ParS.json"
                ></iframe>
              </div>
            )}

            {totalPages > 1 && (
              <div className="my-4 w-full">
                {" "}
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export default RecentTransactions;
