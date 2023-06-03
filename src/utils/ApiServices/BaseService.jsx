import { Client, Databases } from "appwrite";
import toast from "react-hot-toast";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646fac4383abdf7894e9");

const databases = new Databases(client);

export const createDocuments = async (
  collectionId,
  id,
  body,
  successMessage
) => {
  try {
    const toastLoading = toast.loading("Loading...");

    const data = await databases.createDocument(
      "6470526679415457d3f1",
      collectionId,
      id,
      body
    );
    toast.dismiss(toastLoading);

    if (!!data) {
      toast.success(successMessage);
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err);
  }
};

export const updateDocuments = async (
  collectionId,
  id,
  query,
  successMessage
) => {
  try {
    const toastLoading = toast.loading("Loading...");

    const data = await databases.updateDocument(
      "6470526679415457d3f1",
      collectionId,
      id,
      query
    );
    toast.dismiss(toastLoading);

    if (!!data) {
      toast.success(successMessage);
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err);
  }
};

export const deleteDocument = async (collectionId, id, successMessage) => {
  try {
    const toastLoading = toast.loading("Loading...");

    await databases.deleteDocument("6470526679415457d3f1", collectionId, id);

    toast.dismiss(toastLoading);

    toast.success(successMessage);
  } catch (err) {
    toast.error(err);
  }
};
