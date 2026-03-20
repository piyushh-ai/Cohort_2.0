import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import {
  getAllItemsAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  toggleFavoriteAPI,
  addToCollectionAPI,
  removeFromCollectionAPI,
  addHighlightAPI,
  deleteHighlightAPI,
  generateAIHighlightsAPI,
  getRelatedItemsAPI,
  resurfaceItemsAPI,
} from "../api/items.api";

const useItems = () => {
  const {
    items,
    setItems,
    pagination,
    setPagination,
    loading,
    setLoading,
    error,
    setError,
    resurfaceItems,
    setResurfaceItems,
  } = useContext(ItemsContext);

  // ─── Fetch All Items ──────────────────────────────────
  const fetchItems = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllItemsAPI(params);
      setItems(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  // ─── Create Item ──────────────────────────────────────
  const createItem = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createItemAPI(formData);
      setItems((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create item");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ─── Update Item ──────────────────────────────────────
  const updateItem = async (id, data) => {
    try {
      const response = await updateItemAPI(id, data);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update item");
      return null;
    }
  };

  // ─── Delete Item ──────────────────────────────────────
  const deleteItem = async (id) => {
    try {
      await deleteItemAPI(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete item");
    }
  };

  // ─── Toggle Favorite ──────────────────────────────────
  const toggleFavorite = async (id) => {
    try {
      const response = await toggleFavoriteAPI(id);
      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isFavorite: response.data.isFavorite }
            : item
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update favorite");
    }
  };

  // ─── Add To Collection ────────────────────────────────
  const addToCollection = async (id, collectionId) => {
    try {
      const response = await addToCollectionAPI(id, collectionId);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to collection");
    }
  };

  // ─── Remove From Collection ───────────────────────────
  const removeFromCollection = async (id) => {
    try {
      const response = await removeFromCollectionAPI(id);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from collection");
      return null;
    }
  };

  // ─── Add Highlight ────────────────────────────────────
  const addHighlight = async (id, data) => {
    try {
      const response = await addHighlightAPI(id, data);
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, highlights: response.data } : item
        )
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add highlight");
      return null;
    }
  };

  // ─── Delete Highlight ─────────────────────────────────
  const deleteHighlight = async (id, highlightId) => {
    try {
      const response = await deleteHighlightAPI(id, highlightId);
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, highlights: response.data } : item
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete highlight");
    }
  };

  // ─── Generate AI Highlights ───────────────────────────
  const generateAIHighlights = async (id) => {
    try {
      const response = await generateAIHighlightsAPI(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate highlights");
      return [];
    }
  };

  // ─── Get Related Items ────────────────────────────────
  const getRelatedItems = async (id) => {
    try {
      const response = await getRelatedItemsAPI(id);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get related items");
      return [];
    }
  };

  // ─── Resurface Items ──────────────────────────────────
  const fetchResurfaceItems = async () => {
    try {
      const response = await resurfaceItemsAPI();
      setResurfaceItems(response.data);
    } catch (err) {
      console.error("Resurface failed:", err.message);
    }
  };

  // ─── Clear Error ──────────────────────────────────────
  const clearError = () => setError(null);

  return {
    // State
    items,
    pagination,
    loading,
    error,
    resurfaceItems,
    // Actions
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    addToCollection,
    removeFromCollection,
    addHighlight,
    deleteHighlight,
    generateAIHighlights,
    getRelatedItems,
    fetchResurfaceItems,
    clearError,
  };
};

export default useItems;