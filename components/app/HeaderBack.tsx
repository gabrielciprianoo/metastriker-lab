
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function HeaderBack() {
  return (
     <div className="flex items-center justify-between mb-6">
        <Image
          src="/logo.jpg"
          alt="MetaStriker Logo"
          width={50}
          height={50}
          className="drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] rounded-full"
        />
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 font-medium"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Volver
        </Link>
      </div>

  )
}
