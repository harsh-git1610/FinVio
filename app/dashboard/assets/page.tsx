"use client";

import { useEffect, useState } from "react";
import { uploadAsset, getAssets, deleteAsset } from "@/app/actions/assets";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, FileIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Asset = {
    id: string;
    type: string;
    name: string;
    mimeType: string;
    base64: string;
    createdAt: Date;
};

export default function AssetsPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchAssets = async () => {
        setLoading(true);
        const data = await getAssets();
        setAssets(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleUpload = async (files: File[], type: "LOGO" | "SIGNATURE") => {
        if (!files.length) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("type", type);

        const result = await uploadAsset(formData);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Asset uploaded successfully");
            fetchAssets();
        }
        setUploading(false);
    };

    const handleDelete = async (id: string) => {
        const result = await deleteAsset(id);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Asset deleted");
            setAssets(assets.filter(a => a.id !== id));
        }
    };

    const logos = assets.filter(a => a.type === "LOGO");
    const signatures = assets.filter(a => a.type === "SIGNATURE");

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Company Assets</h1>
                <p className="text-muted-foreground mt-1">Manage your company logos and signatures for invoices.</p>
            </div>

            <Tabs defaultValue="logos" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="logos">Logos</TabsTrigger>
                    <TabsTrigger value="signatures">Signatures</TabsTrigger>
                </TabsList>

                <TabsContent value="logos" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Logo</CardTitle>
                            <CardDescription>Upload your company logo (PNG, JPG, SVG recommended).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full max-w-xl mx-auto border border-dashed rounded-lg p-4 bg-muted/30">
                                <FileUpload
                                    onChange={(files) => handleUpload(files, "LOGO")}
                                    accept={{
                                        "image/png": [],
                                        "image/jpeg": [],
                                        "image/jpg": [],
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {logos.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} onDelete={handleDelete} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="signatures" className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Signature</CardTitle>
                            <CardDescription>Upload your scanned signature.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full max-w-xl mx-auto border border-dashed rounded-lg p-4 bg-muted/30">
                                <FileUpload
                                    onChange={(files) => handleUpload(files, "SIGNATURE")}
                                    accept={{
                                        "image/png": [],
                                        "image/jpeg": [],
                                        "image/jpg": [],
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {signatures.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} onDelete={handleDelete} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function AssetCard({ asset, onDelete }: { asset: Asset, onDelete: (id: string) => void }) {
    console.log({
        name: asset.name,
        mime: asset.mimeType,
        preview: asset.base64.slice(0, 50),
    })
    return (
        <Card className="overflow-hidden group relative">
            <CardContent className="p-4 flex flex-col items-center gap-4">
                <div className="relative w-full h-32 flex items-center justify-center bg-gray-50 dark:bg-neutral-900 rounded-md overflow-hidden">
                    {asset.mimeType.startsWith("image/") ? (
                        <img
                            src={`data:${asset.mimeType};base64,${asset.base64}`}
                            alt={asset.name}
                            className="object-contain max-h-full max-w-full"
                        />


                    ) : (
                        <FileIcon className="w-12 h-12 text-muted-foreground" />
                    )}
                </div>
                <div className="w-full flex justify-between items-center">
                    <span className="text-sm font-medium truncate max-w-[150px]" title={asset.name}>
                        {asset.name}
                    </span>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Asset?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the asset
                                    from your library.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(asset.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>


        </Card>

    );
}
