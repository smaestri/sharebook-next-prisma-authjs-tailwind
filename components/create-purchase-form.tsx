"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { purchaseBook } from "@/lib/actions"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"
import FormButton from "./form-button"


export default function PurchaseForm({ userBook }: any) {

  const [message, setMessage] = useState<string>();
  // const [rdvDate, setRdvDate] = useState<any>({
  //   day: "",
  //   month: "",
  //   year: ""
  // })
  const [date, setDate] = useState<Date | undefined>(undefined)
  console.log('date', date)
  // const rdv = new Date(rdvDate.year, rdvDate.month - 1, rdvDate.day).toDateString();

  return (
    <form action={purchaseBook.bind(null, userBook.id, date, message)}>

      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          <h1 className="">Achat du livre "{userBook.book.title}"</h1>
          <div className="flex flex-row gap-2 items-center">
            <div>Date de rencontre avec le vendeur souhaitée</div>
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
            <FormButton>Valider ma demande</FormButton>
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