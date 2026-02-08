"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import UserAccountForm from "./user-account-form"

const ModalCity = ({ email, isOpen }: { email: string, isOpen: boolean }) => {

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1">Indiquer une ville</DialogTitle>
        </DialogHeader>
        <UserAccountForm email={email} />
        {/* <DialogFooter>
            <Button type="button" variant="secondary">
              Close
            </Button>
        </DialogFooter> */}
    </DialogContent>
    </Dialog >)
}

export default ModalCity;