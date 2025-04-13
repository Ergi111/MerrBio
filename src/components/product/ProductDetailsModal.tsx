import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useLanguage } from "../../context/LanguageContext";
import { Product } from "../../types/product";

interface ProductDetailsModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({
  product,
  open,
  onClose,
}: ProductDetailsModalProps) => {
  const { t } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("purchaseRequestDetails")}</DialogTitle>
          <DialogDescription>{t("requestIdLabel")}</DialogDescription>
        </DialogHeader>

        {/* {selectedRequest && (
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
                      ? new Date(selectedRequest.createdAt).toLocaleDateString()
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
        )} */}

        <DialogFooter className="gap-2 ">
          {/* {selectedRequest?.status === "pending" && (
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
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
