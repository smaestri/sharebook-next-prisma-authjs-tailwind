import FormButton from "@/components/form-button"
import { closePurchase } from "@/lib/actions"

export default function CloseBorrowForm({ bookId, borrowId }: { bookId: number, borrowId: number }) {
    const closeBorrowAction = closePurchase.bind(null, borrowId)

    return (
        <form action={closeBorrowAction}>
            <FormButton className="cursor-pointer">Close</FormButton>
        </form>
    )

}