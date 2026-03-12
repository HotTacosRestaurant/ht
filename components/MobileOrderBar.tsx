import Link from "next/link";

export default function MobileOrderBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white p-3 md:hidden">
      <div className="mx-auto flex max-w-[640px] gap-3">
        <Link href="/locations" className="ht-btn ht-btn-primary flex-1">
          Order Online
        </Link>
        <Link href="/menu" className="ht-btn ht-btn-secondary flex-1">
          View Menu
        </Link>
      </div>
    </div>
  );
}