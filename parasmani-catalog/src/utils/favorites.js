const FAVORITES_KEY = "parasmani_favorites";

export const getFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

export const isFavorite = (productId) => {
  const favorites = getFavorites();
  return favorites.includes(Number(productId));
};

export const toggleFavorite = (productId) => {
  const id = Number(productId);
  const favorites = getFavorites();

  let updated;
  let favoriteStatus;

  if (favorites.includes(id)) {
    updated = favorites.filter(
      (favoriteId) => favoriteId !== id
    );

    favoriteStatus = false;
  } else {
    updated = [...favorites, id];

    favoriteStatus = true;
  }

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  );

  // Tell other components that favorites changed
  window.dispatchEvent(new Event("favoritesChanged"));

  return favoriteStatus;
};