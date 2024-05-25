export const GET_CONFIG = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const POST_CONFIG = (props: any) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  };
};
