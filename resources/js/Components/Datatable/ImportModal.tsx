import Input from "@/Components/Form/Fields/Input";
import ArrowDownTray from "@/Components/Icons/ArrowDownTray";
import LoadingSpinner from "@/Components/Icons/LoadingSpinner";
import Modal from "@/Components/ui/Modal";
import { Button } from "@/Components/ui/shadcn/button";
import DownloadFile from "@/Hooks/use-download";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

const ImportModal = ({
    revalidate,
    importRoute,
    importExampleRoute,
}: {
    revalidate: () => void;
    importRoute: string;
    importExampleRoute?: string;
}) => {
    const [openImport, setOpenImport] = useState(false);

    const { post, setData, processing } = useForm<{
        excel_file?: File;
    }>();

    const { isLoading, downloadFile } = DownloadFile();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(importRoute, {
            onSuccess: () => {
                if (!processing && !isLoading) {
                    revalidate();
                    setOpenImport(false);
                    setData("excel_file", undefined);
                }
            },
        });
    };
    return (
        <Modal
            isOpen={openImport}
            trigger={
                <Button
                    type={"button"}
                    size={"icon"}
                    variant={"success"}
                    onClick={() => {
                        setOpenImport(true);
                    }}
                >
                    <ArrowDownTray />
                </Button>
            }
            onClose={() => {
                setOpenImport(false);
            }}
            footer={
                <div className="flex items-center gap-2">
                    <Button
                        type={"button"}
                        variant={"destructive"}
                        onClick={() => {
                            setOpenImport(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Import
                        {processing && <LoadingSpinner />}
                    </Button>
                    {importExampleRoute && (
                        <Button
                            variant={"secondary"}
                            type="button"
                            onClick={() => {
                                downloadFile(() =>
                                    fetch(importExampleRoute),
                                ).then(() => {
                                    setOpenImport(false);
                                });
                            }}
                            disabled={isLoading}
                        >
                            Get import example
                            {isLoading && <LoadingSpinner />}
                        </Button>
                    )}
                </div>
            }
            title={"Import from excel file"}
        >
            <form onSubmit={onSubmit}>
                <label className={"dark:text-white"}>
                    Excel file
                    <Input
                        name={"excel_file"}
                        type="file"
                        onChange={(e) => {
                            setData("excel_file", e.target.files?.[0]);
                        }}
                    />
                </label>
            </form>
        </Modal>
    );
};

export default ImportModal;
