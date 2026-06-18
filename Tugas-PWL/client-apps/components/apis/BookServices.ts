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

export async function GET_ALL_BOOK() {
  const result =
    await RequestAPI(
      "GET",
      `${API}/api/books`,
      getHeaders()
    );

  return {
    success:
      result.success,
    data:
      result.data,
  };
}

export function GET_BOOK_BY_ID(id: number) {
  return RequestAPI(
    "GET",
    `${API}/api/books/${id}`,
    getHeaders()
  );
}

export function CREATE_BOOK(
  data: any
) {
  return RequestAPI(
    "POST",
    `${API}/api/books`,
    getHeaders(),
    data
  );
}

export function UPDATE_BOOK(
  id: number,
  data: any
) {
  return RequestAPI(
    "PUT",
    `${API}/api/books/${id}`,
    getHeaders(),
    data
  );
}

export function DELETE_BOOK(
  id: number
) {
  console.log(
    "DELETE URL:",
    `${API}/api/books/${id}`
  );

  return RequestAPI(
    "DELETE",
    `${API}/api/books/${id}`,
    getHeaders(),
    {}
  );
}

export async function GET_BOOK_STATS() {
  const result =
    await GET_ALL_BOOK();

  if (!result.success) {
    return {
      totalBooks: 0,
      totalViews: 0,
    };
  }

  const books =
    result.data || [];

  const totalViews =
    books.reduce(
      (
        total: number,
        book: any
      ) =>
        total +
        Number(
          book.views || 0
        ),
      0
    );

  return {
    totalBooks:
      books.length,
    totalViews,
  };
}