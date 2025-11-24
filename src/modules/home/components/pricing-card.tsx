import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  priceSmall?: string;
  priceBig: string;
  points: string[];
  cta?: string;
  highlight?: boolean;
}

const PricingCard: React.FC<Props> = ({
  title,
  priceSmall,
  priceBig,
  points,
  cta = "Pilih",
  highlight = false,
}) => {
  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 shadow-md border h-full flex flex-col ${
        highlight
          ? "bg-gradient-to-b from-[#0d4fa6] to-[#083a7f] text-white border-transparent shadow-2xl"
          : "bg-white/90 border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg font-semibold ${
            title === "Starter" || title === "Pro"
              ? "text-blue-600"
              : highlight
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {title}
        </h3>

        {priceSmall && (
          <div
            className={`text-sm ${
              highlight
                ? "text-white/80 line-through"
                : "text-gray-400 line-through"
            }`}
          >
            {priceSmall}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div
          className={`text-3xl font-extrabold ${
            highlight ? "text-white" : "text-gray-900"
          }`}
        >
          {priceBig}
        </div>
        <div
          className={`text-sm mt-1 ${
            highlight ? "text-white/80" : "text-gray-500"
          }`}
        >
          / bulan
        </div>
      </div>

      {/* Features */}
      <ul
        className={`space-y-3 mb-6 ${
          highlight ? "text-white/90" : "text-gray-700"
        }`}
      >
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-1 text-sm ${
                highlight ? "text-white" : "text-green-600"
              }`}
            >
              ✔
            </span>
            <span className="text-sm leading-snug">{p}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button (Link) */}
      <div className="mt-auto pt-6">
        <Link
          href="/create"
          className={`block w-full rounded-lg px-4 py-3 font-medium text-center transition-shadow ${
            highlight
              ? "bg-white/10 hover:bg-white/20 ring-1 ring-white/20"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
