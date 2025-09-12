"use client"
import { saveCity } from "@/lib/actions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Select, SelectItem } from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function UserAccountForm({ email, userInfo, onClose, pseudo }: { email: string, userInfo?: any, onClose?: any, pseudo: string | null}) {

    const [loading, setLoading] = useState<boolean>();
    const [cities, setCities] = useState<[string] | []>([]);
    const [selectedCity, setSelectedCity] = useState();
    const [street, setStreet] = useState<any>();
    const [formState, action] = useFormState(saveCity.bind(null, email, street, selectedCity), null)
    const { push } = useRouter();

    if (formState === 'OK') {
        if (onClose) {
            onClose();
        } else {
            push('/');

        }
    }

    useEffect(() => {
        const refreshCitiesFromCp = async () => {
            await refreshCities(userInfo.cp)
        }

        if (userInfo && userInfo.cp) {
            refreshCitiesFromCp()
            console.log('set city', userInfo.city)
            setSelectedCity(userInfo.city)
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
                setCities(theCities)
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
    return (
       
        <form action={action}>
            <div className="flex justify-center">
                <div className="flex flex-col gap-2">
                    <div>
                    Merci de renseigner votre pseudo et votre adresse précise SVP, qui sera le lieu de la vente avec l'acheteur
                    </div>
                    <div>
                        <Input name="pseudo" placeholder="Pseudo" required />
                    </div>
                    <div>
                        <Input name="cp" placeholder="code postal" onChange={cpChanged} defaultValue={userInfo ? userInfo.cp : null} />
                    </div>
                    {loading && <div>Loading...</div>}
                    
                    {!loading && <div><Select
                        required
                        onValueChange={(ev: any) => setSelectedCity(ev.target.value)}
                    >
                        {cities.map((city: any) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </Select></div>}
                    <div><Textarea
                        required
                        onChange={(event) => setStreet(event.target.value)}
                        defaultValue={userInfo ? userInfo.street : null}
                        placeholder="Numéro et nom de la rue"
                    /></div>
                    <div>
                    <FormButton>
                        Valider
                    </FormButton>
                    </div>
                </div>
            </div>
        </form>

    )
}