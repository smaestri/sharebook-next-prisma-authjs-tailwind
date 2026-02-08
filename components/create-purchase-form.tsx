"use client"

import { useActionState, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { purchaseBook } from "@/lib/actions"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"
import FormButtonActionState from "./form-button-action-state"
import { format } from "date-fns"


export default function PurchaseForm({ userBook }: any) {

  const [message, setMessage] = useState<string>();
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formState, action] = useActionState(purchaseBook.bind(null, userBook.id, date, message), { message: '' })

  return (
    <form action={action} className="p-4">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="max-w-full">
            <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[60ch]" title={userBook.book.title}>
              {`"${userBook.book.title}"`} <span className="text-sm text-muted-foreground">— {userBook.user.pseudo}</span>
            </h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div>Date de rencontre souhaitée</div>
            <div className="flex justify-center gap-2">
              <Choice date={date} setDate={setDate} />
            </div>
          </div>

          <div>
            <p>Message au propriétaire du livre (heure RDV, ou toute autre information)</p>
            <Textarea
              name="message"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message au propriétaire du livre"
            />
          </div>
          <div>
            <FormButtonActionState className="cursor-pointer">Valider ma demande</FormButtonActionState>
          </div>

        </div>
      </div>
    </form>
  )
}

const Choice = ({ date, setDate }: any) => {

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
          >
            {date ? format(date, "PPP") : <span>Sélectionner une date</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>

    </div>)
}