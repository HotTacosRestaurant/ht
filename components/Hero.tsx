export default function Hero() {

  return (
    <section className="text-center py-28 bg-yellow-50">

      <h1 className="text-5xl font-bold mb-6">
        Authentic Mexican Flavor
      </h1>

      <p className="text-xl mb-10">
        Party in Every Bite
      </p>

      <div className="flex justify-center gap-6">

        <a
          href="https://order.touchbistro.com"
          target="_blank"
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Order Online
        </a>

        <a
          href="/menu"
          className="border px-6 py-3 rounded"
        >
          View Menu
        </a>

      </div>

    </section>
  )

}