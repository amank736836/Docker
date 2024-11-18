export default function Home() {
  const handleDelete = async () => {
    "use server";
    try {
      const response = await fetch(`${process.env.SERVER_URL}/delete`, {
        cache: "no-cache",
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl">
          This Site is being edited
          <span className="text-5xl text-[#0070f3]">🚧</span>
        </h1>
        <h2 className="text-yellow-500 text-2xl">
          By <span className="text-[#0070f3] text-3xl">Aman Kumar</span>
        </h2>
        <form
          action={async (formData) => {
            "use server";
            try {
              const response = await fetch(
                `${process.env.SERVER_URL}/api/newuser`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }}
          className="flex flex-col items-center gap-4 bg-yellow-400"
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
        <button
          type="submit"
          className="bg-[#0070f3] text-white rounded-md p-2"
          onClick={handleDelete}
        >
          Delete Database
        </button>
      </main>
    </div>
  );
}
