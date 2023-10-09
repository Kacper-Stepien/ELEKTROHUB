import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj logika wysyłania danych do serwera
  };

  return (
    <div className="flex justify-center items-center text-xs">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl mb-4">Załóż konto</h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="mb-4 p-2 w-full border rounded"
          onChange={handleChange}
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            className="mr-2"
            onChange={handleCheckboxChange}
          />
          <span>I agree to the terms and conditions</span>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
