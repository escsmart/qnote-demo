import Template from "@/components/Template";

export default function Home() {
  return (
    <>
      <Template title="Quick Note">
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <section className="min-h-screen w-full bg-black flex items-center justify-center">
            <h1 className="text-7xl font-semibold">SECTION 1</h1>
          </section>
          <section className="min-h-screen w-full bg-slate-900 flex items-center justify-center">
            <h1 className="text-7xl font-semibold">SECTION 2</h1>
          </section>
          <section className="min-h-screen w-full bg-gray-800 flex items-center justify-center">
            <h1 className="text-7xl font-semibold">SECTION 3</h1>
          </section>
        </div>
      </Template>
    </>
  );
}
