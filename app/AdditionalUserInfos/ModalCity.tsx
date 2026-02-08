"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import UserAccountForm from "./user-account-form"

const ModalCity = ({ email, isOpen, onClose }: { email: string, isOpen: boolean, onClose: () => void }) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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