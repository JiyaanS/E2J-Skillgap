import axios from "axios";

const API_BASE = "http://localhost:5000";

const api = axios.create({
  baseURL: "/aspirations",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getAspirations() {
  const token = localStorage.getItem("token");
  console.log("Authorization header:", `Bearer ${token}`);
  const { data } = await axios.get(`${API_BASE}/aspirations/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function createAspirations(payload) {
  const token = localStorage.getItem("token");
  console.log("Authorization header:", `Bearer ${token}`);
  const { data } = await axios.post(`${API_BASE}/aspirations`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function updateCertifications(payload) {
  const token = localStorage.getItem("token");
  console.log("Authorization header:", `Bearer ${token}`);
  const { data } = await axios.put(`${API_BASE}/aspirations/certifications`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export const saveAspirations = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  console.log("Authorization header:", `Bearer ${token}`);

  const response = await axios.post(
    `${API_BASE}/aspirations`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
