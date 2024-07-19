export function getProductColors(productData: any) {
  const colors = [];
  const masterColor = findAttribute(productData?.masterVariant.attributes, 'color');
  if (masterColor) {
    colors.push(masterColor);
  }
  productData?.variants.forEach((variant: any) => {
    const variantColor = findAttribute(variant.attributes, 'color');
    if (variantColor) {
      colors.push(variantColor);
    }
  });
  return colors;
}

function findAttribute(attributes: any[], name: string) {
  const attribute = attributes?.find((attr) => attr.name === name);
  return attribute ? attribute.value.label : null;
}
export function getProductSizes(productData: any) {
  const sizes = [];
  const masterSize = findAttribute(productData?.masterVariant?.attributes, 'size');
  if (masterSize) {
    sizes.push(masterSize);
  }
  productData?.variants.forEach((variant: any) => {
    const variantSize = findAttribute(variant?.attributes, 'size');
    if (variantSize) {
      sizes.push(variantSize);
    }
  });
  return sizes;
}
