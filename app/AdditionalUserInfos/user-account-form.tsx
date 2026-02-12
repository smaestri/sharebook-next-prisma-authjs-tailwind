"use client"
import { updateUser } from "@/lib/actions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { userInfoSchema, UserInfoType } from "@/lib/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormButton from "@/components/form-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function UserAccountForm({ email, userInfo }: { email: string, userInfo?: any }) {
    const [loading, setLoading] = useState<boolean>();
    const [cities, setCities] = useState<[string] | []>([]);
    const [cp, setCp] = useState<string>("");

    useEffect(() => {
        const refreshCitiesFromCp = async () => {
            await refreshCities(userInfo.cp)
        }
        if (userInfo && userInfo.cp) {
            refreshCitiesFromCp()
        }
    }, [userInfo])

    const refreshCities = async (cp: any) => {
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/geo?cp=${cp}`
        try {
            setLoading(true)
            const response = await axios.get(url)
            if (response && response.data && response.data.cities) {
                const theCities = response.data.cities.map((item: any) => (item.nomCommune))
                setCities(theCities)
                setCp(cp)
            }
        } catch (error) {
            console.log('err' + JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    const cpChanged = async (event: any) => {
        if (event.target.value.length === 5) {
            refreshCities(event.target.value)
        }
    }

    const form = useForm<UserInfoType>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: {
            pseudo: userInfo?.pseudo ? userInfo.pseudo : "",
            city: userInfo?.city ? userInfo.city : "",
            street: userInfo?.street ? userInfo.street : "",
        },
    })

    async function onSubmit(values: z.infer<typeof userInfoSchema>) {
        setLoading(true)
        await updateUser(email, cp, values)
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-2">
                        <div>
                            Merci de renseigner votre pseudo et votre adresse précise SVP, qui sera le lieu de rencontre avec le demandeur (il possible de changer en envoyant un message au propriétaire / demandeur, une fois la demande éffectuée).
                        </div>
                        <div>
                            <Controller
                                control={form.control}
                                name="pseudo"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Pseudo</FieldLabel>
                                        <Input {...field} name="pseudo" placeholder="Pseudo" required />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} />
                        </div>
                        <div>
                            <Input defaultValue={userInfo?.cp} name="cp" placeholder="code postal" onChange={cpChanged} />
                        </div>
                        {loading && <div>Chargement...</div>}
                        {!loading && <FormField
                            disabled={cities.length === 0}
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ville</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ville" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {cities.map((city: any) => (
                                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        <div>
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                required
                                                placeholder="Numéro et nom de la rue"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormButton className="cursor-pointer" pending={form.formState.isSubmitting || loading}>
                                Valider
                            </FormButton>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}