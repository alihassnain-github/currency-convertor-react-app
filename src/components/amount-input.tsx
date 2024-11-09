import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AmountInputProps = {
    amount: string
    setAmount: (value: string) => void
}

export default function AmountInput({ amount, setAmount }: AmountInputProps) {
    return (
        <div className="my-4">
            <Label htmlFor="amount">Amount</Label>
            <Input required type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
    )
}