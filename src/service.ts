export async function getFruits(query: string) {
  const response = await fetch('fruits.json');
  const fruits: string[] = await response.json()
  
  return fruits
    .filter((fruit) => fruit.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 5);
}

