
import { useState } from "react";
import PlaceCard from "@/components/PlaceCard";
import Map from "@/components/Map";
import { useItinerary } from "@/context/ItineraryContext";
import { AlertTriangle, ClipboardList, Share2, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Itinerary = () => {
  const { itinerary, clearItinerary } = useItinerary();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleShare = () => {
    if (itinerary.length === 0) {
      toast.error("You don't have any places to share");
      return;
    }
    
    // In a real app, this would generate a shareable link
    // For demo purposes, we'll just show a success toast
    toast.success("Sharing is not available in the demo");
  };

  const handleDownload = () => {
    if (itinerary.length === 0) {
      toast.error("You don't have any places to download");
      return;
    }
    
    // In a real app, this would generate a PDF or other downloadable format
    // For demo purposes, we'll just show a success toast
    toast.success("Download is not available in the demo");
  };

  const handleClearItinerary = () => {
    if (showConfirmClear) {
      clearItinerary();
      setShowConfirmClear(false);
    } else {
      setShowConfirmClear(true);
      
      // Auto-hide the confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmClear(false);
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Itinerary</h1>
          <p className="text-muted-foreground">
            {itinerary.length > 0
              ? `You have ${itinerary.length} place${itinerary.length !== 1 ? 's' : ''} in your itinerary`
              : "Start adding places to your itinerary from the Explore page"}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-secondary text-foreground px-3 py-2 rounded-lg font-medium transition-all hover:bg-secondary/80"
            disabled={itinerary.length === 0}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-secondary text-foreground px-3 py-2 rounded-lg font-medium transition-all hover:bg-secondary/80"
            disabled={itinerary.length === 0}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          
          <button
            onClick={handleClearItinerary}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
              showConfirmClear
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
            disabled={itinerary.length === 0}
          >
            {showConfirmClear ? (
              <>
                <AlertTriangle className="h-4 w-4" />
                Confirm Clear
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Clear All
              </>
            )}
          </button>
        </div>
      </div>

      {itinerary.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Map places={itinerary} className="mb-6 lg:mb-0 sticky top-20" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Selected Places
            </h2>
            
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {itinerary.map((place) => (
                <PlaceCard 
                  key={place.id} 
                  place={place} 
                  variant="itinerary"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-secondary/30 rounded-xl">
          <div className="bg-muted/50 p-4 rounded-full mb-4">
            <ClipboardList className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your itinerary is empty</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Start by adding places from the Explore page to create your personalized travel itinerary.
          </p>
          <a
            href="/explore"
            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-accent/90"
          >
            Go to Explore
          </a>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
