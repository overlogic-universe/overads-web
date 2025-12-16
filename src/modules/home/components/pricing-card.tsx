import React from "react";
import Link from "next/link";

interface Props {
  onBuy: () => void;
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
  onBuy,
  cta = "Pilih",
  highlight = false,
}) => {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 shadow-md md:p-8 ${
        highlight
          ? "border-transparent bg-linear-to-b from-[#0d4fa6] to-[#02214c] text-white shadow-2xl"
          : "border-gray-200 bg-white/90"
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3
          className={`text-lg font-semibold ${
            title === "Starter" || title === "Pro"
              ? "text-blue-500"
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
          className={`mt-1 text-sm ${
            highlight ? "text-white/80" : "text-gray-500"
          }`}
        >
          / bulan
        </div>
      </div>

      {/* Features */}
      <ul
        className={`mb-6 space-y-3 ${
          highlight ? "text-white/90" : "text-gray-700"
        }`}
      >
        {points.map((p, i) => (
          <li key={i} className="flex items-center gap-3">
            <span
              className={`mt-1 text-sm ${
                highlight ? "text-white" : "text-green-400"
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
        <button
          onClick={onBuy}
          className={`block w-full cursor-pointer rounded-lg px-4 py-3 text-center font-medium transition-shadow ${
            highlight
              ? "bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
