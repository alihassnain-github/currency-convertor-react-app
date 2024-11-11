import { currencies } from "./components/data";
import { useToast } from "@/hooks/use-toast"
import { FormEvent, useCallback, useEffect, useState } from "react";
import AmountInput from "./components/amount-input";
import CurrencyInputs from "./components/currency-inputs";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

export default function App() {

  const [amount, setAmount] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [fromSelected, setFromSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | number>(null);

  const { toast } = useToast()

  // toggle selected currencies 
  const toggleSelection = () => {
    setFromSelected(toSelected)
    setToSelected(fromSelected)
  }


  // helper function to get currency names
  const getCurrencyName = (code: string) => {
    const currency = currencies.find((currency) => currency.code === code)
    return currency ? currency.name : code
  }

  // call the api to show result
  const convertCurrency = useCallback(async () => {
    setLoading(true)

    const url = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_qajHydQHHmKNZam2RAgulZI10YdhQPbZXTUDm7OQ'
    try {
      const response = await fetch(`${url}&base_currency=${fromSelected}`)
      const obj = await response.json()
      console.log(obj);
      const rate = obj.data[toSelected].value
      setResult(rate * Number(amount.replace(/\s+/g, '')))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }

    setLoading(false)
  }, [amount, fromSelected, toSelected])


  // Call the Api to show results
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount && fromSelected && toSelected) convertCurrency();
  }

  useEffect(() => {
    if (amount && fromSelected && toSelected) convertCurrency();
  }, [amount, toSelected, fromSelected])


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
            toggleSelection={toggleSelection}
          />
          <Button disabled={loading} type="submit" className="my-4">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : "Convert"}
          </Button>
        </form>
        {
          result && (
            <div className="mt-2">
              <span className="font-semibold text-sm text-gray-400">{amount.replace(/\s+/g, '')} {getCurrencyName(fromSelected)} =</span>
              <h4 className="text-md font-semibold mt-2">{result} {getCurrencyName(toSelected)}</h4>
            </div>
          )
        }
      </div>
    </main>
  )
}