"use client"
import { updateUser } from "@/lib/actions";
import axios from "axios";
import { useActionState, useEffect, useState } from "react";
import FormButton from "./form-button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { userInfoSchema, UserInfoType } from "@/lib/ValidationSchemas copy";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function UserAccountForm({ email, userInfo, onClose }: { email: string, userInfo?: any, onClose?: any }) {


    console.log('userInfo in form', userInfo)

    const [loading, setLoading] = useState<boolean>();
    const [cities, setCities] = useState<[string] | []>([]);
    const [cp, setCp] = useState<string>("");
    const { push } = useRouter();

    useEffect(() => {
        const refreshCitiesFromCp = async () => {
            await refreshCities(userInfo.cp)
        }

        if (userInfo && userInfo.cp) {
            refreshCitiesFromCp()
            console.log('set city', userInfo.city)
            // setSelectedCity(userInfo.city)
        }
    }, [userInfo])


    const refreshCities = async (cp: any) => {
        console.log('event.target.value', cp)
        const url = `http://localhost:3000/api/geo?cp=${cp}`

        try {
            setLoading(true)
            const response = await axios.get(url)
            console.log('response 2', response)
            if (response && response.data && response.data.cities) {
                const theCities = response.data.cities.map((item: any) => (item.nomCommune))
                console.log('theCities', theCities)
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
            city: userInfo?.city ? userInfo.city : "",
            street: userInfo?.street ? userInfo.street : "",
        },
    })

  async function onSubmit(values: z.infer<typeof userInfoSchema>) {
    console.log("onSubmit ", values)
    await updateUser(email, cp, values)
  }

    return (
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-2">
                        <div>
                            Merci de renseigner votre pseudo et votre adresse précise SVP, qui sera le lieu de la vente avec votre acheteur.
                        </div>
                        {/* <div>
                        <Input name="pseudo" placeholder="Pseudo" required defaultValue={pseudo} />
                    </div> */}
                        <div>

                            {/* <FormField
                                control={form.control}
                                name="cp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code postal</FormLabel>
                                        <FormControl> */}
                                            <Input defaultValue={userInfo?.cp} name="cp" placeholder="code postal" onChange={cpChanged} />
                                        {/* </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}

                        </div>
                        {loading && <div>Loading...</div>}
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
                            <FormButton>
                                Valider
                            </FormButton>
                        </div>
                    </div>
                </div>
            </form>
        </Form>


    )
}