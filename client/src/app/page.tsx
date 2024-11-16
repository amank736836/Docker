export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl">
          This Site is being edited
          <span className="text-3xl text-[#0070f3]">🚧</span>
        </h1>
        <h2 className="text-yellow-500">
          By <span className="text-[#0070f3]">Aman Kumar</span>
        </h2>
        <form
          action={async (formData) => {
            "use server";
            try {
              const name = formData.get("name") as string | undefined;
              const email = formData.get("email") as string | undefined;

              if (!name || !email) {
                throw new Error("Name and Email are required");
              }

              const response = await fetch(
                `${process.env.SERVER_URL}/api/newuser?name=${name}&email=${email}`,
                {
                  cache: "no-cache",
                }
              );

              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="border-2 border-gray-300 rounded-md p-2 text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border-2 border-gray-300 rounded-md p-2 text-black"
          />

          <button
            type="submit"
            className="bg-[#0070f3] text-white rounded-md p-2"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
