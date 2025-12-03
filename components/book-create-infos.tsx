import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";

export default function BookCreateInfos({ form, categories }: any) {

    const [priceDisabled, setPriceDisabled] = useState<boolean>(true);

    const renderCat = () => {
        return categories.map((cat: any) => <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>)
    }

    return (
        <FieldGroup>
            <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Catégorie</FieldLabel>
                        <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {renderCat()}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea placeholder="description" {...field} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <RadioGroup defaultValue="option-one" onValueChange={(event) => {
                form.setValue("isFree", event === "option-one" ? true : false);
                if (event == "option-one") {
                    form.setValue("price", 0);
                    setPriceDisabled(true);
                    return
                }
                setPriceDisabled(false);
            }}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Je le donne / je le prête</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Je le vends</Label>
                </div>
            </RadioGroup>


            <Controller
                control={form.control}
                name="price"
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel>Prix</FieldLabel>
                        <Input disabled={priceDisabled} type="number" placeholder="prix" {...field} onChange={event => field.onChange(+event.target.value)} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </FieldGroup>)
}