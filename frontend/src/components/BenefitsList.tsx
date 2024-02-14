import { BsCheck } from "react-icons/bs";

const BenefitsList = () => {
  return (
    <div className="bold mb-4 flex flex-col gap-6 text-xl">
      <h2 className="bold text-2xl">Ciesz się następującymi korzyściami</h2>
      <ul className="flex flex-col gap-4">
        <li className="flex gap-4">
          <BsCheck className="text-4xl text-green-700" /> Szybki proces
          zamawiania
        </li>
        <li className="flex gap-4">
          <BsCheck className="text-4xl text-green-700" />
          Pełna historia wszystkich zamówień
        </li>
        <li className="flex gap-4">
          <BsCheck className="text-4xl text-green-700" />
          Specjalne kody rabatowe
        </li>
        <li className="flex gap-4">
          <BsCheck className="text-4xl text-green-700" />
          Dostęp do unikalnych promocji
        </li>
      </ul>
    </div>
  );
};

export default BenefitsList;
