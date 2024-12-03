import React from "react"

import { getAccounts } from "@/lib/actions/bank.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import HeaderBox from "@/components/HeaderBox"
import PaymentTransferForm from "@/components/PaymentTransferForm"

const Transfer = async () => {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({ userId: loggedIn?.$id })

  if (!accounts) return

  const accountsData = accounts?.data

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Tranferência de dinheiro"
        subtext="Por favor, forneça qualquer detalhe ou informação relacionado a esta transação."
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}

export default Transfer
