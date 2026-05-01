const API_BASE_URL = "http://localhost:3001";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      ...options,
    });
  } catch {
    throw new Error(
      "API server holbogdohgui baina. `npm run server` ajilluulaad dahin oroldooch."
    );
  }

  if (!response.ok) {
    const message =
      response.status === 404
        ? "API endpoint oldsongui. Server asaaltai esehiig, mun request zam zuv esehiig shalga."
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  patch: (path, body) =>
    request(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export const courseService = {
  list: () => api.get("/courses"),
  detail: (id) => api.get(`/courses/${id}`),
};

export const userService = {
  list: () => api.get("/users"),
  detail: (id) => api.get(`/users/${id}`),
};

export { API_BASE_URL };
