export function getProductColors(productData: any) {
  const colors = [];
  colors.push(productData?.masterVariant.attributes[0]?.value.label);

  productData?.variants.forEach((variant: any) => {
    if (variant.attributes[0].name === 'color') {
      colors.push(variant.attributes[0].value.label);
    }
  });

  return colors;
}
