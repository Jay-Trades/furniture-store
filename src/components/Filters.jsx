import { Form, useLoaderData, Link } from "react-router-dom";
import { FormSelect, FormRange, FormInput, SubmitBtn, FormCheckbox } from "./";

const Filters = () => {
  const { meta, params } = useLoaderData();
  // console.log(params);
  return (
    <div>
      <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <FormInput
          label="Search Product"
          type="search"
          name="search"
          defaultValue={params.search || ""}
          size="input-sm"
        />
        <FormSelect
          label="Select Category"
          name="category"
          list={meta.categories}
          defaultValue={params.category || "all"}
          size="select-sm"
        />
        <FormSelect
          label="Select Company"
          name="company"
          list={meta.companies}
          defaultValue={params.company || "all"}
          size="select-sm"
        />
        <FormSelect
          label="Sort By"
          name="order"
          list={["a-z", "z-a", "high", "low"]}
          defaultValue={params.order || "a-z"}
          size="select-sm"
        />
        <FormRange
          label="Select Price"
          name="price"
          size="range-sm"
          price={params.price}
        />
        {/* SSEARCH BUTTON i just used the login button but might not be the right one and need customization */}
        <FormCheckbox
          label="Free Shipping"
          name="shipping"
          defaultValue={params.shipping}
          size="checkbox-sm"
        />
        <div className="mt-4">
          <SubmitBtn text="Search" />
        </div>
        {/* WE USED LINK HERE instead of button */}
        <Link to="/products" className="btn btn-accent btn-sm">
          Reset
        </Link>
      </Form>
    </div>
  );
};

export default Filters;
