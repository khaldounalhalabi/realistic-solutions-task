import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";

const LongTextField = ({
    label,
    value,
    className,
}: {
    label?: string;
    value?: string;
    className?: string;
}) => {
    return (
        <Card className={className ?? "my-2"}>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
        </Card>
    );
};

export default LongTextField;
