"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        console.log(response);
        if (response) {
          console.log(router);
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Trigon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link Account"
              : type === "sign-in"
              ? "Entrar"
              : "Cadastrar-se"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Conecte sua conta para começar"
                : "Por favor entre com seus dados"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* plaid */}</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "sign-up" && (
              <>
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="Nome"
                    placeholder="Insira o seu Nome"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Sobrenome"
                    placeholder="Insira o seu Sobrenome"
                  />
                </div>

                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Endereço"
                  placeholder="Insira o seu Endereço"
                />

                <CustomInput
                  control={form.control}
                  name="city"
                  label="Cidade"
                  placeholder="Insira a sua Cidade"
                />

                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="Estado"
                    placeholder="Ex: ES"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="CEP"
                    placeholder="Ex: 29100-000"
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Data de Nascimento"
                    placeholder="Ex: dd/mm/aaaa"
                  />

                  <CustomInput
                    control={form.control}
                    name="taxId"
                    label="CPF"
                    placeholder="Ex: 000.000.000-00"
                  />
                </div>
              </>
            )}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Insira o seu Email"
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Senha"
              placeholder="Insira a sua Senha"
            />
            <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> &nbsp;Carregando...
                  </>
                ) : type === "sign-in" ? (
                  "Entrar"
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </div>
          </form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Não possui uma conta?"
                : "Ja possui uma conta?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Cadastrar" : "Entrar"}
            </Link>
          </footer>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
