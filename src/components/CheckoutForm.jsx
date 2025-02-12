import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../store/cart/cartSlice";

export const action =
  (store) =>
  async ({ request }) => {
    //get user data, store data , jwt token. Order will only work with JWT token
    const formData = await request.formData(); //get the formData from request
    const orderData = Object.fromEntries(formData); //convert form data to an obj
    const user = store.getState().userState.user;
    // const cart = store.getState().cartState;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    const data = {
      ...orderData,
      cartItems,
      orderTotal: formatPrice(orderTotal),
      numItemsInCart,
      chargeTotal: orderTotal,
    };
    // console.log(user);
    console.log(data);

    console.log(user);
    try {
      const response = await customFetch.post(
        `/orders/`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      console.log(response);
      store.dispatch(clearCart());
      toast.success("order sent successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message || "please check your info";
      toast.error(errorMessage);
      // console.error(error.response.data.error.message);
      return null;
    }
    return null;
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
