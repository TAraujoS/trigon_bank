import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex mon-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <iframe
            width={700}
            height={700}
            src="https://lottie.host/embed/3de23d36-c82b-4e2b-ad70-8fa7c98ecb0b/y7Tz45POwh.json"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
