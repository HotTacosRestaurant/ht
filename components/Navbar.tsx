export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">

      <div className="font-bold text-xl">
        Hot Tacos
      </div>

      <div className="flex gap-6 text-sm">

        <a href="/menu">Menu</a>
        <a href="/locations">Locations</a>
        <a href="/reviews">Reviews</a>
        <a href="/raffle">Raffle</a>

      </div>

      <a
        href="https://order.touchbistro.com"
        target="_blank"
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Order Online
      </a>

    </nav>
  )
}