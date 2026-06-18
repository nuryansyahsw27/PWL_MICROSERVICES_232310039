import axios from "axios";

export async function RequestAPI(
  method: string,
  url: string,
  headers: any = {},
  data: any = null
) {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
  console.log(
    "ERROR RESPONSE:",
    error.response?.data
  );

  console.log(error);

  return {
    success: false,
    message:
      error.response?.data?.message ||
      error.message,
  };
}
}