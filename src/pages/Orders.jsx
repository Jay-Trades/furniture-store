import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { ComplexPageContainer } from "../components";
import OrderList from "../components/OrderList";
import { SectionTitle } from "../components";
// import { OrdersList, PaginationContainer, SectionTitle } from "../components";
//we will have to use the api to get all orders filtter by a certain user
// probably filtered on user id?

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in");
      return redirect("/login");
    }
    console.log(request);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);

    try {
      const response = await customFetch.get("orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      const orders = response.data.data;
      // console.log(orders);
      return { orders: orders, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");

      return null;
    }
  };

const Orders = () => {
  const { orders, meta } = useLoaderData();
  console.log(orders);

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList orders={orders} meta={meta} />
      <ComplexPageContainer />
    </>
  );
};

export default Orders;
