const API_URL = "https://api.parasmanijewelers.in/api/categories";

const getToken = () =>
  localStorage.getItem("parasmani_admin_token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ================= GET =================

export const getCategories = async () => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch categories"
    );
  }

  return data;
};

// ================= CREATE =================

export const createCategory = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create category"
    );
  }

  return data;
};

// ================= UPDATE =================

export const updateCategory = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update category"
    );
  }

  return data;
};

// ================= DELETE =================

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete category"
    );
  }

  return data;
};