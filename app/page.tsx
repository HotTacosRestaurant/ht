import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"

export default function Home() {

  return (
    <>
      <Navbar />

      <Hero />

      <section className="max-w-6xl mx-auto py-20">

        <h2 className="text-3xl font-bold mb-10">
          Our Locations
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <a
            href="/locations/leamington"
            className="border p-6 rounded"
          >
            <h3 className="text-xl font-bold">
              Leamington
            </h3>

            <p>Order • Call • Directions</p>
          </a>

          <a
            href="/locations/windsor"
            className="border p-6 rounded"
          >
            <h3 className="text-xl font-bold">
              Windsor
            </h3>

            <p>Order • Call • Directions</p>
          </a>

        </div>

      </section>

      <Footer />

    </>
  )

}