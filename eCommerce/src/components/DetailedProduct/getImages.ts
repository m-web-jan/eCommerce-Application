export function getProductImages(productData: any) {
  const imageUrls: string[] = [];

  productData?.masterVariant.images.forEach((image: any) => {
    imageUrls.push(image.url);
  });

  productData?.variants.forEach((variant: any) => {
    variant.images.forEach((image: any) => {
      imageUrls.push(image.url);
    });
  });

  return imageUrls;
}
