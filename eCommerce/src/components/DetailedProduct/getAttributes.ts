export function getProductColors(productData: any) {
  const colors = [];
  colors.push(productData?.masterVariant.attributes[0]?.value.label);

  productData?.variants.forEach((variant: any) => {
    if (variant.attributes[0]?.name === 'color') {
      colors.push(variant.attributes[0].value.label);
    }
  });

  return colors;
}

export function getProductSizes(productData: any) {
  const sizes = [];
  sizes.push(productData?.masterVariant.attributes[1]?.value.label);

  productData?.variants.forEach((variant: any) => {
    variant.attributes.forEach((attribute: any) => {
      if (attribute?.name === 'size') {
        sizes.push(attribute?.value.label);
      }
    });
  });

  return sizes;
}
