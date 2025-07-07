import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

export default function UserPreview({ user, trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="">
          <DialogTitle>User Preview:</DialogTitle>
        </DialogHeader>

        <DialogDescription />
        <div className="space-y-2">
          <p><span className="font-bold">First Name:</span> {user.firstName}</p>
          <p><span className="font-bold">Last Name:</span> {user.lastName}</p>
          <p><span className="font-bold">Gender:</span> {user.gender}</p>
          {/* public users*/}
          {user.email && user.country && user.badge && (
            <div className="space-y-2">
              <p><span className="font-bold">Email:</span> {user.email}</p>
              <p><span className="font-bold">Country:</span> {user.country}</p>
              <p><span className="font-bold">Badge:</span> {user.badge}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
