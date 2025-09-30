"use client"

import FormButton from "./form-button"
import { refusePurchase } from "@/lib/actions"
import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { Select, SelectItem } from "./ui/select"
import { Textarea } from "./ui/textarea"

const ModalRefus = ({ isOpen, onClose, sale }: { isOpen: boolean, onClose: any, sale: any }) => {

  const allMotifs = [
    { id: 'INCORRECT_SLOT', label: "Je ne suis pas disponible au créneau proposé" },
    { id: 'OTHER', label: "Autre" }
  ]

  const [motif, setMotif] = useState();
  const [slot, setSlot] = useState<any>();
  console.log('motif', motif)

  console.log('slot', slot)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
          <form action={refusePurchase.bind(null, sale.id)}>
            <DialogHeader className="flex flex-col gap-1">Motif du refus</DialogHeader>
              <Select
                required
                // label="Motif du refus"
                onValueChange={(ev: any) => setMotif(ev.target.value)}
              >
                {allMotifs.map((motif: any) => (
                  <SelectItem key={motif.id} value={""}>{motif.label}</SelectItem>
                ))}
              </Select>

              {motif === "INCORRECT_SLOT" && <Textarea
                required
                // label="Indiquer un créneau disponible"
                onChange={setSlot}
                placeholder="Date et heure ou vous etes disponible"
              />}

            <DialogFooter>
              <Button onClick={onClose}>
                Fermer
              </Button>
              <FormButton>
                Valider
              </FormButton>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>)
}

export default ModalRefus;