"use client"

import { useActionState, useState } from "react"
import { addMessage } from "@/lib/actions"
import { BorrowDate } from "@/app/purchase/page"
import { formatDate } from "@/lib/utils"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import FormButtonActionState from "./form-button-action-state"

const Messages = ({ messages, borrowId, isPurchase, borrowDate }: { messages: any, borrowId: any, isPurchase: any, borrowDate: BorrowDate}) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  let firstUserMessage = ""
  if (messages && messages.length > 0) {
    firstUserMessage = messages[0].user.pseudo
  }

  const renderMessages = () => {
    return messages.map((mess: any) => {
      if(!mess.createdAt) {
        return null
      }
      const dateStr = formatDate(mess.createdAt)
      return (<div key={mess.id} className="flex flex-col mb-5">
        <div>{dateStr} par {mess.user.name}</div>
        <div className={`${firstUserMessage == mess.user.pseudo ? "bg-amber-100" : "bg-blue-100"} rounded-full`}>
          <div className="p-6">
            <div>{mess.message}</div>
          </div>
        </div>
      </div>)
    })

  }

   const [formState, action] = useActionState(addMessage.bind(null, borrowId, isPurchase, message), { message: '' })

  return (
  <div className="flex flex-col">
    <div>
    {borrowDate.createdDate && <div>Demandé le {formatDate(borrowDate.createdDate)}</div>}
    {borrowDate.validatedDate && <div>Demande acceptée le {formatDate(borrowDate.validatedDate)}</div>}
    {borrowDate.closeDate && <div>Demande close le {formatDate(borrowDate.closeDate)}</div>}
    </div>
    <div>
      Messages
    </div>
    {renderMessages()}
    <form action={action} className="p-4">
      <div>
        <Textarea
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message au vendeur"
        />
      </div>
      <div className="mt-5">
        <FormButtonActionState >Ajouter message</FormButtonActionState>
      </div>
    </form>
  </div>)
}

export default Messages;