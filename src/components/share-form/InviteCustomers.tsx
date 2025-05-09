import { Mail, Clipboard } from "lucide-react";

export function InviteCustomers() {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Invite your customers</h2>
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
          <span className="text-lg font-bold">OO</span>
        </div>
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <span className="text-lg font-bold">TR</span>
        </div>
      </div>
      <p className="text-center mb-6">
        Invite your customers already in Testimate.
      </p>

      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
          2 customers
        </span>
      </div>

      <hr className="my-6" />

      <p className="text-center mb-2">Or</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 text-center">
          <div className="mb-2 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <p className="text-sm font-medium">Invite using email</p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="mb-2 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Clipboard className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <p className="text-sm font-medium">Invite in bulk via CSV/XLSX</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 text-center">
          <div className="mb-2 flex justify-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Mailchimp"
              className="h-10 w-10"
            />
          </div>
          <p className="text-sm font-medium">Invite Mailchimp subscribers</p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="mb-2 flex justify-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Kit"
              className="h-10 w-10"
            />
          </div>
          <p className="text-sm font-medium">Invite Kit subscribers</p>
        </div>
      </div>
    </div>
  );
}
