import React, { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import { privateApi } from "../api/axios";

export default function AddressPage() {
  const [address, setAddress] = useState({});
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const res = await privateApi.get("get-address");
      console.log(res,"dhsggdahgsdh")

      if (res.data) {
        setEditData(res.data); // ✅ address exists
      } else {
        setEditData(null); // ❌ no address
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSave = (data) => {
    setEditData(data);
    alert("Address saved ✅");
  };

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}

  return (
    <div className="max-w-xl mx-auto mt-24 p-4">

      {/* SHOW EXISTING ADDRESS */}
      {editData && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="font-semibold">{editData.full_name}</p>
          <p>{editData.phone}</p>
          <p>{editData.address_line}</p>
          <p>{editData.city}, {editData.state} - {editData.pincode}</p>
        </div>
      )}

      {/* FORM */}
      <AddressForm
        address={address}
        setAddress={setAddress}
        onSave={handleSave}
        editData={editData}
      />

    </div>
  );
}