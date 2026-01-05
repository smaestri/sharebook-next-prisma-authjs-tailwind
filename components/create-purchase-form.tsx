"use client"

import { useActionState, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { purchaseBook } from "@/lib/actions"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"
import FormButton from "./form-button"
import FormButtonActionState from "./form-button-action-state"


export default function PurchaseForm({ userBook }: any) {

  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
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
            <p>Message au vendeur (heure RDV, ou toute autre information)</p>
            <Textarea
              name="message"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message au vendeur"
            />
          </div>
          <div>
            <FormButtonActionState>Valider ma demande</FormButtonActionState>
          </div>

        </div>
      </div>
    </form>
  )
}

const Choice = ({ date, setDate }: any) => {

  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      {/* <Calendar
      mode="single"
      selected={datePicker}
      onSelect={setDatePicker}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    /> */}
      {/* <Select
        required
        // items={times}
        name={timeFieldName}
        // className="w-[180px]"
      >
        {times.map((time) => (
          <SelectItem key={time.id} value={time.id}>
            {time.label}
          </SelectItem>
        ))}
      </Select> */}
      {/* <Calendar
        selected={new Date()}
        // minValue={today(getLocalTimeZone())}
        aria-label="Date (No Selection)"
        onChange={setDate} /> */}
      {/* <Select
        required
        items={times}
        name={timeFieldName}>
          <SelectItem key={time.id} value={time.id} >{time.label}</SelectItem>
      </Select> */}
    </div>)
}