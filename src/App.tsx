import { FormEvent, useState } from "react";
import AmountInput from "./components/amount-input";
import CurrencyInputs from "./components/currency-inputs";
import { Button } from "@/components/ui/button"

export default function App() {

  const [amount, setAmount] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [fromSelected, setFromSelected] = useState("");


  // Call the Api to show results
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  return (
    <main className="min-h-screen h-full w-full bg-slate-50 flex justify-center items-center p-4">
      <div className="border p-4 w-full md:w-96 rounded-md">
        <h1 className="text-lg font-semibold">Currency Convertor</h1>
        <form onSubmit={handleSubmit}>
          <AmountInput
            amount={amount}
            setAmount={setAmount}
          />
          <CurrencyInputs
            toSelected={toSelected}
            setToSelected={setToSelected}
            fromSelected={fromSelected}
            setFromSelected={setFromSelected}
          />
          <Button type="submit" className="my-4">
            Convert
          </Button>
        </form>
      </div>
    </main>
  )
}