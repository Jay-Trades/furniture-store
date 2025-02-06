import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { toast } from "react-toastify";

//doing checking from a service set up request and
//it'll be async but we don't have a server we just stored it in redux
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    console.log(user);
    toast.warn("You are not logged in");
    return redirect("/");
  }
  console.log(user);
  return null;
};
const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartTotal);
  if (cartItems.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
