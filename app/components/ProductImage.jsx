import {Image} from '@shopify/hydrogen';
import { useCallback, useState } from 'react';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 *   imageText: string;
 * }}
 */
export function ProductImage({image, imageText, imageTextColor, imageTextFontfamily}) {
  
  if (!image) {
    return <div className="product-image" />;
  }

  const ChangetextFontFamilyHandle = useCallback(() =>{},[]);
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
      {/* Display the imageText below the image */}
      {imageText && <p className='product-image-text' style={{color:`${imageTextColor}`, fontFamily: `${imageTextFontfamily}`}}>{imageText}</p>} {/* Conditionally render imageText */}
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
