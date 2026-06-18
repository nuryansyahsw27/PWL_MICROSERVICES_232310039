import { RequestAPI } from "@/hooks/request-api";

const API =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "";

console.log("API URL =", API);

function getHeaders() {
  const headers: any = {
    "Content-Type":
      "application/json",
  };

  if (
    typeof window !==
    "undefined"
  ) {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {
      headers.Authorization =
        `Bearer ${token}`;
    }
  }

  return headers;
}

export function LOGIN(
  data: any
) {
  return RequestAPI(
    "POST",
    `${API}/api/users/login`,
    getHeaders(),
    data
  );
}

export function REGISTER(
  data: any
) {
  return RequestAPI(
    "POST",
    `${API}/api/users/register`,
    getHeaders(),
    data
  );
}

export function GET_PROFILE() {
  return RequestAPI(
    "GET",
    `${API}/api/users/profile`,
    getHeaders()
  );
}

export function UPDATE_PROFILE(
  data: any
) {
  return RequestAPI(
    "PUT",
    `${API}/api/users/profile`,
    getHeaders(),
    data
  );
}