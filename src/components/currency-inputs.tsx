import { ArrowLeftRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { currencies } from "./data"

type SelectedCurrencyProps = {
    toSelected: string,
    setToSelected: (value: string) => void,
    fromSelected: string,
    setFromSelected: (value: string) => void,
    toggleSelection: () => void
}

export default function CurrencyInputs({ fromSelected, setFromSelected, toSelected, setToSelected, toggleSelection }: SelectedCurrencyProps) {
    return (
        <div>
            <div className="my-4">
                <Label>From Currency</Label>
                <Select onValueChange={(value) => setFromSelected(value)} value={fromSelected}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                currencies.map(({ code, name }) => (
                                    <SelectItem key={code} value={code}>
                                        <div className="flex items-center">
                                            <div className="w-8">
                                                <span>{code}</span>
                                            </div>
                                            <div>
                                                <small className="text-gray-500 ms-4">{name}</small>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={toggleSelection} type="button" variant="outline" size="icon" className="mx-auto block">
                <ArrowLeftRight className="mx-auto cursor-pointer" />
            </Button>
            <div className="my-4">
                <Label>To Currency</Label>
                <Select onValueChange={(value) => setToSelected(value)} value={toSelected}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                currencies.map(({ code, name }) => (
                                    <SelectItem key={code} value={code}>
                                        <div className="flex items-center">
                                            <div className="w-8">
                                                <span>{code}</span>
                                            </div>
                                            <div>
                                                <small className="text-gray-500 ms-4">{name}</small>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div >
    )
}