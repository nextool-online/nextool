export function getCategorySlug(category: string) {
  return category.toLowerCase().replaceAll(" ", "-");
}