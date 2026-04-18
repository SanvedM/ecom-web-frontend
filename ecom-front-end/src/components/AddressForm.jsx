import React, { useState, useEffect } from "react";
import { privateApi } from "../api/axios";

export default function AddressForm({
  address = {},
  setAddress,
  onSave,
  editData
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ PREFILL (ONLY ONCE)
  useEffect(() => {
    if (editData) {
      const names = editData.full_name?.split(" ") || [];

      setAddress({
        first_name: names[0] || "",
        last_name: names.slice(1).join(" ") || "",
        mobile: editData.phone || "",
        address_line: editData.address_line || "",
        city: editData.city || "",
        state: editData.state || "",
        pincode: editData.pincode || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile" || name === "pincode") {
      value = value.replace(/\D/g, "");
    }

    setAddress({ ...address, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!address?.first_name) newErrors.first_name = "Required";
    if (!address?.last_name) newErrors.last_name = "Required";

    if (!/^[0-9]{10}$/.test(address?.mobile || "")) {
      newErrors.mobile = "Invalid mobile";
    }

    if (!address?.address_line) newErrors.address_line = "Required";
    if (!address?.city) newErrors.city = "Required";
    if (!address?.state) newErrors.state = "Required";

    if (!/^[0-9]{6}$/.test(address?.pincode || "")) {
      newErrors.pincode = "Invalid pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      full_name: `${address.first_name} ${address.last_name}`,
      phone: address.mobile,
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    };

    try {
      let res;

      if (editData) {
        res = await privateApi.put(
          `update-address/${editData.id}`,
          payload
        );
      } else {
        res = await privateApi.post("save-address", payload);
      }

      onSave(res.data);
    } catch (err) {
      console.log(err);
      alert("Error saving address ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 border">

      <p className="text-center mb-6 font-semibold">
        {editData ? "UPDATE ADDRESS" : "ADD ADDRESS"}
      </p>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="first_name"
          placeholder="First Name"
          value={address?.first_name || ""}
          onChange={handleChange}
          className="bg-[#eef0ed] p-3 rounded"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={address?.last_name || ""}
          onChange={handleChange}
          className="bg-[#eef0ed] p-3 rounded"
        />
      </div>

      <input
        name="mobile"
        placeholder="Mobile"
        value={address?.mobile || ""}
        onChange={handleChange}
        maxLength={10}
        className="bg-[#eef0ed] p-3 rounded w-full mt-4"
      />

      <input
        name="address_line"
        placeholder="Address"
        value={address?.address_line || ""}
        onChange={handleChange}
        className="bg-[#eef0ed] p-3 rounded w-full mt-4"
      />

      <div className="grid md:grid-cols-3 gap-4 mt-4">

        <input
          name="city"
          placeholder="City"
          value={address?.city || ""}
          onChange={handleChange}
          className="bg-[#eef0ed] p-3 rounded"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={address?.pincode || ""}
          onChange={handleChange}
          maxLength={6}
          className="bg-[#eef0ed] p-3 rounded"
        />

        <input
          name="state"
          placeholder="State"
          value={address?.state || ""}
          onChange={handleChange}
          className="bg-[#eef0ed] p-3 rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-[#0f3d33] text-white py-3 rounded"
      >
        {loading
          ? "Saving..."
          : editData
          ? "Update Address"
          : "Save Address"}
      </button>
    </div>
  );
}