import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";

export default function BookCreateInfos({ form, categories }: any) {

    const [priceDisabled, setPriceDisabled] = useState<boolean>(form.getValues("price") === 0);
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
                            <SelectTrigger className="hover:transform-none">
                                <SelectValue placeholder="Catégorie du livre" />
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

            <RadioGroup defaultValue={form.getValues("price") === 0 ? "option-free" : "option-not-free"} onValueChange={(event) => {
                if (event == "option-free") {
                    form.setValue("price", 0);
                    setPriceDisabled(true);
                    return
                }
                setPriceDisabled(false);
            }}>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="option-free" id="form-option-free" />
                    <Label htmlFor="form-option-free">Je le donne / je le prête</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="option-not-free" id="form-option-not-free" />
                    <Label htmlFor="form-option-not-free">Je le vends</Label>
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