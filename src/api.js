export const name = async (query) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&json=true`
  );
  return res.json();
};

export const barcode = async (barcode) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );
  return res.json();
};

export const category = async (category) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/category/${category}.json`
  );
  return res.json();
};
