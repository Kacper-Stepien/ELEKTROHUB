const Footer = () => {
  return (
    <footer className="bg-blue-600 px-4 py-4 md:px-6 md:py-6 3xl:px-12 3xl:py-12 text-blue-100 text-sm 3xl:text-lg grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-bold text-md 3xl:text-xl  mb-2">Obsługa klienta</p>
        <p>Kontakt</p>
        <p>Status zamówienia</p>
        <p>Reklamacje</p>
        <p>Status reklamacji</p>
        <p>Akcje serwisowe</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-md 3xl:text-xl  mb-2">Informacje</p>
        <p>Praca</p>
        <p>Centrum informacyjne</p>
        <p>O firmie</p>
        <p>Regulamin</p>
        <p>Newsletter - regulamin</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-md 3xl:text-xl  mb-2">Zakupy</p>
        <p>Producenci</p>
        <p>Raty</p>
        <p>Leasing</p>
        <p>Ubezpieczenie "Gwarancja Plus"</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-md 3xl:text-xl  mb-2">Moje konto</p>
        <p>Moje zamówienie</p>
        <p>Paragon i faktura</p>
        <p>Moje dane </p>
        <p>Moje opinie</p>
        <p>Moje reklamacje</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-md 3xl:text-xl  mb-2">Pomoc</p>
        <p>Zadzwoń do nas</p>
        <p className="font-bold">Tel. 782 748 757</p>
        <table>
          <tbody>
            <tr>
              <td>Pon - Pt</td>
              <td>8:00 - 20:00</td>
            </tr>
            <tr>
              <td>Sob</td>
              <td>10:00 - 18:00</td>
            </tr>
            <tr>
              <td>Niedz</td>
              <td>10:00 - 18:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default Footer;
