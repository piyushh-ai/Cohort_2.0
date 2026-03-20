import { useContext } from "react";
import { CollectionsContext } from "../context/CollectionsContext";
import {
  getAllCollectionsAPI,
  createCollectionAPI,
  updateCollectionAPI,
  deleteCollectionAPI,
} from "../api/collections.api";

const useCollections = () => {
  const { collections, setCollections, loading, setLoading, error, setError } =
    useContext(CollectionsContext);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await getAllCollectionsAPI();
      setCollections(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (data) => {
    try {
      const response = await createCollectionAPI(data);
      setCollections((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create collection");
      return null;
    }
  };

  const updateCollection = async (id, data) => {
    try {
      const response = await updateCollectionAPI(id, data);
      setCollections((prev) =>
        prev.map((c) => (c._id === id ? response.data : c))
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update collection");
      return null;
    }
  };

  const deleteCollection = async (id) => {
    try {
      await deleteCollectionAPI(id);
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete collection");
    }
  };

  return {
    collections,
    loading,
    error,
    fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
  };
};

export default useCollections;