import Image from "next/image";

export default function ProductItem({product}) {
  return (
    <div className="flex flex-col">
      <Image
        src={`http:${product.node.thumbnailImage.file.url}`}
        width={398}
        height={398}
        alt=""
      />
      <div className="flex justify-between mt-6 align-top">
        <p className="max-w-sx text-13.2 uppercase">{product.node.name}</p>
        <p className="max-w-sx text-13.2 uppercase">
          &euro;
          {product.node.shopifyProductEu.variants.edges[0].node.price}
        </p>
      </div>
    </div>
  )
}