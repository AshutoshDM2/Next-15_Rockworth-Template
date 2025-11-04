import Image from "next/image";
import React from "react";
import Link from "next/link";

interface FallbackImageProps {
  rounded?: boolean;
  slug?: string;
  megaMenu?: boolean;
  searchTerm?: boolean;
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  rounded,
  slug,
  megaMenu,
  searchTerm,
}) => {
  return (
    <Link href={slug || "/"}>
      {searchTerm ? (
        <div className="flex items-center justify-center bg-[#f2f2f2] w-14 lg:w-20 h-14 lg:h-20 rounded-lg mr-4 border border-gray-200">
          <Image
            title="Fallback Logo"
            src={"/images/Logo.webp"}
            alt="Fallback Logo"
            width={100}
            height={100}
            priority
            className="object-contain object-center"
          />
        </div>
      ) : megaMenu ? (
        <div className="flex items-center justify-center bg-[#f2f2f2] rounded-lg w-full h-32">
          <Image
            title="Fallback Logo"
            src={"/images/Logo.webp"}
            alt="Fallback Logo"
            width={200}
            height={200}
            priority
            className="object-contain object-center"
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center bg-[#f2f2f2] w-full aspect-[4/3] ${
            rounded ? "rounded-2xl lg:h-[70vh]" : "h-56"
          }`}
        >
          <Image
            title="Fallback Logo"
            src={"/images/Logo.webp"}
            alt="Fallback Logo"
            width={250}
            height={250}
            priority
          />
        </div>
      )}
    </Link>
  );
};

export default FallbackImage;
