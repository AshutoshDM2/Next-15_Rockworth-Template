import Section from "@/common/Section/Section";
import Image from "next/image";

interface SimilarProduct {
  id: string;
  title: string;
  image: string;
  type: string;
}

interface SingleSimilarProductsProps {
  products: SimilarProduct[];
}

export function SingleSimilarProducts({
  products,
}: SingleSimilarProductsProps) {
  return (
    <Section className="bg-white">
      <h2 className="text-2xl font-medium text-black text-center lg:text-left px-4 sm:px-0 mb-4">
        Similar Product
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="bg-gray-100 rounded-xl p-0.5 aspect-square flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-medium text-center text-gray-700 group-hover:text-black transition-colors">
              {product.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
}
