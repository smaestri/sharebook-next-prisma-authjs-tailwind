"use client"
import FormButton from "@/components/form-button"
import { purchaseBook } from "@/lib/actions"
import { use, useState } from "react"
//import { today, getLocalTimeZone } from "@internationalized/date";
import { times } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectItem } from "@/components/ui/select"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

const Borrow = ({ searchParams }: { searchParams: any }) => {

  const [rdvDate, setRdvDate] = useState<any>({
    day: "",
    month: "",
    year: ""
  })
  const [message, setMessage] = useState<string>();


  console.log('message', message)

  const rdv = new Date(rdvDate.year, rdvDate.month - 1, rdvDate.day).toDateString();
  const bookId : any= use(searchParams);
  console.log('bookId',  bookId.bookId );

  return (
    <form action={purchaseBook.bind(null, bookId.bookId,rdv, message)}>

      <div className="flex justify-center">
        <div className="flex flex-col gap-2">

          <div>
            <p>La vente aura lieu au domicile du vendeur. Merci d'indiquer la date et l'heure de rencontre souhaités</p>
          </div>
          {/* <div className="flex justify-center gap-2">
            <Choice />
          </div> */}
          <div>
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

const Choice = () => {
  
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
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

export default Borrow;