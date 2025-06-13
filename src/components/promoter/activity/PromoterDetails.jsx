import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { CalendarIcon, GraduationCap, Clock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PromoterDetails({ open, onClose, activity }) {
  if (!activity) return null;

  const [items, setItems] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(null);

  useEffect(() => {
    if (activity) {
      const activityItem = {
        ...activity,
        sampleCount: activity.noOfSampleIssued || "",
        attachments: [],
        fileTypes: [],
        previewUrls: [],
        uploaded: activity.sampleSubmitted || activity.lunchboxSubmitted || false,
      };
      setItems([activityItem]);
    }
  }, [activity]);

  const handleUpload = (idx) => {
    const copy = [...items];
    copy[idx].uploaded = true;
    setItems(copy);
    toast.success("Upload successful!");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="
            bg-gray-100 flex flex-col max-h-[90vh] sm:rounded-lg
            w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw]
            px-0 overflow-hidden
          "
        >
          <DialogHeader>
            <DialogTitle className="text-lg text-center w-full">
              Activity Details
            </DialogTitle>
            <DialogClose className="absolute top-4 right-4" />
          </DialogHeader>

          <div className="px-6 py-4 overflow-y-auto flex-1 space-y-6">
            {/* School Info */}
            <div className="bg-white shadow rounded-lg p-6 space-y-5">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-700" />
                {activity.school?.name || "Unknown School"}
              </h3>
              {[
                ["Region", activity.region],
                ["Address", activity.address],
                ["No of Kids", activity.noOfKids || "N/A"],
                ["Location", `Lat: ${activity.latitude || '-'}, Long: ${activity.longitude || '-'}`],
              ].map(([label, val]) => (
                <p key={label} className="text-sm text-muted-foreground">
                  <span className="font-medium text-black">{label}:</span> {val}
                </p>
              ))}
            </div>

            {/* Activity Section */}
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-lg p-6 flex flex-col space-y-6 w-full"
              >
                <div className="text-sm font-medium text-gray-800">
                  {activity.activityType === "SCHOOL_SAMPLING" 
                    ? "School Sampling" 
                    : "Lunchbox Check"}
                </div>

                {/* Date & Time */}
                <div className="flex flex-col sm:flex-row justify-between sm:gap-0 gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="w-[140px] text-center text-sm p-[5px] border border-gray-300 rounded">
                      {formatDate(
                        activity.activityType === "SCHOOL_SAMPLING" 
                          ? activity.samplingDate 
                          : activity.lunchboxDate
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="w-[140px] text-center text-sm p-[5px] border border-gray-300 rounded">
                      {activity.activityType === "SCHOOL_SAMPLING" 
                        ? activity.samplingTime 
                        : activity.lunchboxTime || "--:--"}
                    </span>
                  </div>
                </div>

                {/* No of sample issued */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="w-full sm:w-40 text-sm font-medium text-gray-800">
                    {activity.activityType === "SCHOOL_SAMPLING" 
                      ? "No of samples issued" 
                      : "No of lunchboxes issued"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={item.sampleCount}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[idx].sampleCount = e.target.value;
                      setItems(copy);
                    }}
                    className="w-full sm:flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* Attachments */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <label className="w-full sm:w-40 text-sm font-medium text-gray-800">
                      Attachments
                    </label>
                    <div className="relative flex-1 border border-gray-300 rounded px-3 py-2">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.webp"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const copy = [...items];
                          copy[idx].attachments = files;
                          copy[idx].fileTypes = files.map((f) => f.type);
                          files.forEach((f) => {
                            if (f.type.startsWith("image/")) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                copy[idx].previewUrls = [
                                  ...copy[idx].previewUrls,
                                  reader.result,
                                ];
                                setItems(copy);
                              };
                              reader.readAsDataURL(f);
                            }
                          });
                          setItems(copy);
                        }}
                        className="w-full text-sm text-gray-700"
                      />
                      {!item.attachments.length && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          {/* Select files to upload */}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal slider */}
                  {item.previewUrls.length > 0 && (
                    <div className="flex overflow-x-auto space-x-3 py-2">
                      {item.previewUrls.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="preview"
                          className="w-24 h-24 flex-shrink-0 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom buttons */}
                <div className="flex justify-center gap-6 mt-auto">
                  {!item.uploaded && item.attachments.length > 0 && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleUpload(idx)}
                    >
                      Upload
                    </Button>
                  )}
                  {item.uploaded && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReviewIndex(idx);
                        setReviewOpen(true);
                      }}
                    >
                      Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={reviewOpen} onOpenChange={() => setReviewOpen(false)}>
        <DialogContent className="max-h-[70vh]">
          <DialogHeader>
            <DialogTitle>Review Attachments</DialogTitle>
            <DialogClose className="absolute top-4 right-4" />
          </DialogHeader>
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {reviewIndex != null &&
              items[reviewIndex].attachments.map((f, i) =>
                items[reviewIndex].fileTypes[i]?.startsWith("image/") ? (
                  <img
                    key={i}
                    src={items[reviewIndex].previewUrls[i]}
                    alt="review"
                    className="w-full rounded"
                  />
                ) : (
                  <p key={i} className="text-sm text-gray-700">
                    {f.name} (PDF)
                  </p>
                )
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}