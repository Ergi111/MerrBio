import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Navbar } from "../../components/NavBar";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Link } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Calendar,
  Package,
  Truck,
} from "lucide-react";
// import { InsertPurchaseRequest } from "../../schema/schema";

type Request = {
  id: number;
  productId: number;
  quantity: number;
  deliveryMethod: string;
  createdAt: string;
  status: string;
  message: string;
};

export default function FarmerRequests() {
  const { t } = useLanguage();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [messageToConsumer, setMessageToConsumer] = useState("");

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const requests = [
    {
      id: 1,
      productId: 1,
      quantity: 10,
      deliveryMethod: "Home Delivery",
      createdAt: new Date().toISOString(),
      status: "pending",
      message: "Please deliver it quickly.",
    },
  ];

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-100"
          >
            {t("pending")}
          </Badge>
        );
      case "accepted":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            {t("accepted")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            {t("rejected")}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Group requests by status
  const pendingRequests =
    requests?.filter((req) => req.status === "pending") || [];
  const acceptedRequests =
    requests?.filter((req) => req.status === "accepted") || [];
  const rejectedRequests =
    requests?.filter((req) => req.status === "rejected") || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <Link to="/farmer">
                <Button variant="ghost" size="sm" className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t("back")}
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t("purchaseRequests")}
                </h1>
                <p className="text-gray-500 mt-1">
                  {t("manageRequestsDescription")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 hover:bg-amber-100"
              >
                {t("pending")}: {pendingRequests.length}
              </Badge>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                {t("accepted")}: {acceptedRequests.length}
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-100 text-red-800 hover:bg-red-100"
              >
                {t("rejected")}: {rejectedRequests.length}
              </Badge>
            </div>
          </header>

          {/* Purchase Requests Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {requests?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">{t("noRequestsYet")}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("requestId")}</TableHead>
                      <TableHead>{t("productDetails")}</TableHead>
                      <TableHead>{t("quantity")}</TableHead>
                      <TableHead>{t("deliveryMethod")}</TableHead>
                      <TableHead>{t("date")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="text-right">
                        {t("actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests?.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          #{request.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <span>Product #{request.productId}</span>
                          </div>
                        </TableCell>
                        <TableCell>{Number(request.quantity)}</TableCell>
                        <TableCell>{request.deliveryMethod}</TableCell>
                        <TableCell>{t("recently")}</TableCell>
                        <TableCell>
                          {getStatusBadge(request.status)}
                          <Button size="sm" variant="outline">
                            {t("viewDetails")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("purchaseRequestDetails")}</DialogTitle>
            <DialogDescription>{t("requestIdLabel")}</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("status")}
                  </h4>
                  <div className="mt-1">
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("date")}
                  </h4>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      {selectedRequest.createdAt
                        ? new Date(
                            selectedRequest.createdAt
                          ).toLocaleDateString()
                        : t("recently")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">
                  {t("productDetails")}
                </h4>
                <div className="flex items-center bg-gray-50 p-2 rounded">
                  <Package className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">
                      Product #{selectedRequest.productId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("quantity")}
                  </h4>
                  <p className="mt-1">{Number(selectedRequest.quantity)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("deliveryMethod")}
                  </h4>
                  <div className="mt-1 flex items-center">
                    <Truck className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{selectedRequest.deliveryMethod}</span>
                  </div>
                </div>
              </div>

              {selectedRequest.message && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("consumerMessage")}
                  </h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm">
                    {selectedRequest.message}
                  </div>
                </div>
              )}

              {selectedRequest.status === "pending" && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    {t("respondToConsumer")}
                  </h4>
                  <div className="space-y-2">
                    <Textarea
                      placeholder={t("messageToConsumerPlaceholder")}
                      value={messageToConsumer}
                      onChange={(e) => setMessageToConsumer(e.target.value)}
                    />
                    <Button variant="secondary" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {t("sendMessage")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            {selectedRequest?.status === "pending" && (
              <>
                <Button variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  {t("rejectRequest")}
                </Button>
                <Button variant="default">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {t("acceptRequest")}
                </Button>
              </>
            )}
            {selectedRequest?.status !== "pending" && (
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                {t("close")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
