"use client"

import { useState } from "react"
import { addMessage } from "@/lib/actions"
import { BorrowDate } from "@/app/purchase/page"
import { formatDate } from "@/lib/utils"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

const Messages = ({ messages, borrowId, isPurchase, borrowDate }: { messages: any, borrowId: any, isPurchase: any, borrowDate: BorrowDate}) => {
  const [message, setMessage] = useState<string>();
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
    <form>
      <div>
        <Textarea
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message au vendeur"
        />
      </div>
      <div className="mt-5">
        <Button formAction={addMessage.bind(null, borrowId, isPurchase, message)}>Ajouter message</Button>
      </div>
    </form>
  </div>)
}

export default Messages;