"use client";

import { useState, useEffect } from "react";
import { getAssets, uploadAsset } from "@/app/actions/assets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FileUpload } from "./ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Asset = {
    id: string;
    type: string; // "LOGO" or "SIGNATURE"
    name: string;
    mimeType: string;
    base64: string;
};

interface AssetPickerProps {
    type: "LOGO" | "SIGNATURE";
    value?: string; // Base64 or ID, currently storing Base64 directly
    onChange: (value: string) => void;
    label?: string;
}

export function AssetPicker({ type, value, onChange, label }: AssetPickerProps) {
    const [open, setOpen] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("select");

    const fetchAssets = async () => {
        setLoading(true);
        const data = await getAssets();
        // Filter by type
        setAssets(data.filter((a: any) => a.type === type));
        setLoading(false);
    };

    useEffect(() => {
        if (open) {
            fetchAssets();
        }
    }, [open, type]);

    const handleUpload = async (files: File[]) => {
        if (!files.length) return;
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", type);

        toast.promise(uploadAsset(formData), {
            loading: "Uploading...",
            success: (data) => {
                if (data.error) throw new Error(data.error);
                fetchAssets();
                setTab("select");
                return "Asset uploaded!";
            },
            error: "Failed to upload"
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        "border border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition flex flex-col items-center justify-center gap-2 text-muted-foreground",
                        value ? "border-solid border-primary/20 bg-muted/20" : ""
                    )}
                >
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={value} alt="Selected" className="h-20 object-contain" />
                    ) : (
                        <>
                            <ImageIcon className="w-8 h-8 opacity-50" />
                            <span className="text-sm font-medium">{label || "Select Image"}</span>
                        </>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Select {type === "LOGO" ? "Company Logo" : "Signature"}</DialogTitle>
                </DialogHeader>

                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="select">Select Existing</TabsTrigger>
                        <TabsTrigger value="upload">Upload New</TabsTrigger>
                    </TabsList>

                    <TabsContent value="select" className="mt-4 max-h-[300px] overflow-y-auto">
                        {loading ? (
                            <div className="p-8 text-center text-muted-foreground">Loading...</div>
                        ) : assets.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No assets found. Upload one!
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {assets.map((asset) => (
                                    <div
                                        key={asset.id}
                                        className="border rounded-md p-2 cursor-pointer hover:border-primary transition relative group"
                                        onClick={() => {
                                            onChange(`data:${asset.mimeType};base64,${asset.base64}`);
                                            setOpen(false);
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`data:${asset.mimeType};base64,${asset.base64}`} alt={asset.name} className="w-full h-20 object-contain" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium rounded-md">
                                            Select
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upload" className="mt-4">
                        <div className="border border-dashed rounded-lg p-4">
                            <FileUpload onChange={handleUpload} />
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
