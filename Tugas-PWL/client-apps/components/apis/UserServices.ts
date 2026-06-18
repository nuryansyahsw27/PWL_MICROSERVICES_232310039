import { RequestAPI } from "@/hooks/request-api";

const API =
  process.env
    .NEXT_PUBLIC_API_GATEWAY_URL || "";

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

export function GET_ALL_USER() {
  return RequestAPI(
    "GET",
    `${API}/api/users`,
    getHeaders()
  );
}

export function GET_USER_BY_ID(
  id: string
) {
  return RequestAPI(
    "GET",
    `${API}/api/users/${id}`,
    getHeaders()
  );
}

export function DELETE_USER(
  id: string
) {
  return RequestAPI(
    "DELETE",
    `${API}/api/users/${id}`,
    getHeaders()
  );
}

export async function GET_USER_STATS() {
  const result =
    await GET_ALL_USER();

  if (!result.success) {
    return {
      totalUsers: 0,
    };
  }

  return {
    totalUsers:
      result.length ||
      result.data?.length ||
      0,
  };
}