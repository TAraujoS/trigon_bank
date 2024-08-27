/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "pt-BR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "pt-BR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const formatToCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const formatToDate = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

export const mockAccount = {
  totalBanks: 1,
  totalCurrentBalance: 199,
  data: [
    {
      id: "123",
      avaialableBalance: 99,
      currentBalance: 199,
      institutionId: "ins_56",
      name: "Banco Exemplo",
      officialName: "Trygon",
      mask: "1234",
      type: "checking",
      subtype: "checking",
      appwriteItemId: "1234",
      sharableId: "12345",
    },
  ],
  transactions: [
    {
      account_id: "1234",
      transaction_id: "v0D9JxKk3dhwZRlEVrZotkMXEZveVmHd83wJ5",
      amount: 29.99,
      iso_currency_code: "USD",
      date: "2024-08-15",
      merchant_name: "Amazon",
      name: "Amazon Purchase",
      payment_channel: "online",
      category: "Pagamentos",
      category_id: "19013000",
    },
    {
      account_id: "1234",
      transaction_id: "r3P1JxGg3Rf7ZRtT6pZotjH1R2vD5mHd5YtV7",
      amount: 15.75,
      iso_currency_code: "USD",
      date: "2024-08-14",
      merchant_name: "Starbucks",
      name: "Starbucks Coffee",
      payment_channel: "online",
      category: "Alimentação",
      category_id: "13005043",
    },
    {
      account_id: "1234",
      transaction_id: "t9M5JxLg2QawZRbO2mXoxkFMZaWdZnHd9QwJ9",
      amount: 102.5,
      iso_currency_code: "USD",
      date: "2024-08-13",
      merchant_name: "Walmart",
      name: "Walmart Groceries",
      payment_channel: "online",
      category: "Viagem",
      category_id: "19047000",
    },
  ],
};
export const mockPlaidAccount = {
  data: {
    accounts: [
      {
        account_id: "A3wenK5EQRfKlnxlBbVXtPw9gyazDWu1EdaZD",
        balances: {
          available: 100,
          current: 110,
          iso_currency_code: "USD",
          limit: null,
          unofficial_currency_code: null,
        },
        mask: "0000",
        name: "Plaid Checking",
        official_name: "Plaid Gold Standard 0% Interest Checking",
        subtype: "checking",
        type: "depository",
      },
      {
        account_id: "GPnpQdbD35uKdxndAwmbt6aRXryj4AC1yQqmd",
        balances: {
          available: 200,
          current: 210,
          iso_currency_code: "USD",
          limit: null,
          unofficial_currency_code: null,
        },
        mask: "1111",
        name: "Plaid Saving",
        official_name: "Plaid Silver Standard 0.1% Interest Saving",
        subtype: "savings",
        type: "depository",
      },
      {
        account_id: "nVRK5AmnpzFGv6LvpEoRivjk9p7N16F6wnZrX",
        balances: {
          available: null,
          current: 1000,
          iso_currency_code: "USD",
          limit: null,
          unofficial_currency_code: null,
        },
        mask: "2222",
        name: "Plaid CD",
        official_name: "Plaid Bronze Standard 0.2% Interest CD",
        subtype: "cd",
        type: "depository",
      },
    ],
    item: {
      available_products: [
        "assets",
        "balance",
        "identity",
        "investments",
        "transactions",
      ],
      billed_products: ["auth"],
      consent_expiration_time: null,
      error: null,
      institution_id: "ins_12",
      item_id: "gVM8b7wWA5FEVkjVom3ri7oRXGG4mPIgNNrBy",
      webhook: "https://requestb.in",
    },
    request_id: "C3IZlexgvNTSukt",
  },
};
export function formatAmount(amount: number | string): string {
  if (typeof amount === "string") {
    const numericValue = amount.replace(/\D/g, "");
    const formattedValue = (Number(numericValue) / 100).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
    return formattedValue;
  } else {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  transactions &&
    transactions.forEach((transaction) => {
      const category = transaction.category;

      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
      totalCount++;
    });

  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  const parts = url.split("/");

  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processando" : "Sucesso";
};

export const authFormSchema = (type: string) =>
  z.object({
    firstName:
      type === "sign-in"
        ? z.string().optional()
        : z.string({ required_error: "Obrigatório" }).min(3, {
            message: "Primeiro nome deve ter pelo menos 3 caracteres.",
          }),
    lastName:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string({ required_error: "Obrigatório" })
            .min(3, { message: "Sobrenome deve ter pelo menos 3 caracteres." }),
    state:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string({ required_error: "Obrigatório" })
            .min(2, { message: "Estado deve ter pelo menos 2 caracteres." })
            .max(2, { message: "Estado deve ter no máximo 2 caracteres." }),
    city:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string({ required_error: "Obrigatório" })
            .min(3, { message: "Cidade deve ter pelo menos 3 caracteres." }),
    dateOfBirth:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string({ required_error: "Obrigatório" })
            .min(8, { message: "Data de nascimento inválida." }),
    cpf:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string({ required_error: "Obrigatório" })
            .min(11, { message: "CPF inválido." }),

    email: z.string().email({ message: "Email inválido." }),
    password: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres." }),
  });
