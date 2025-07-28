import ActionsButtons from "@/Components/Datatable/ActionsButtons";
import DataTable from "@/Components/Datatable/DataTable";
import { FilterParam } from "@/Components/Datatable/DataTableUtils";
import Input from "@/Components/Form/Fields/Input";
import ApiSelect from "@/Components/Form/Fields/Select/ApiSelect";
import Select from "@/Components/Form/Fields/Select/Select";
import { Badge } from "@/Components/ui/shadcn/badge";
import Attendee from "@/Models/Attendee";
import Event from "@/Models/Event";
import Http from "@/Modules/Http/Http";
import { Link } from "@inertiajs/react";

const Index = ({ exportables }: { exportables: string[] }) => {
    return (
        <DataTable
            title="Attendee Table"
            createUrl={route("v1.web.protected.attendees.create")}
            importRoute={route("v1.web.protected.attendees.import")}
            exportRoute={route("v1.web.protected.attendees.export")}
            importExampleRoute={route(
                "v1.web.protected.attendees.import.example",
            )}
            exportables={exportables}
            getDataArray={(res) => res.data}
            getTotalPages={(res) => res?.paginate?.total_pages ?? 0}
            getTotalRecords={(res) => res.paginate?.total ?? 0}
            api={(
                page?: number | undefined,
                search?: string | undefined,
                sortCol?: string | undefined,
                sortDir?: string | undefined,
                perPage?: number | undefined,
                params?: object | undefined,
            ) =>
                Http.make<Attendee[]>().get(
                    route("v1.web.protected.attendees.data"),
                    {
                        page: page,
                        search: search,
                        sort_col: sortCol,
                        sort_dir: sortDir,
                        limit: perPage,
                        ...params,
                    },
                )
            }
            schema={[
                {
                    name: "id",
                    label: "ID",
                    sortable: true,
                },
                { name: "name", label: "Name", sortable: true },
                { name: "email", label: "Email", sortable: true },
                {
                    name: "is_present",
                    label: "Is Present ?",
                    sortable: true,
                    render: (cell, record, setHidden, revalidate) => {
                        return cell ? (
                            <Badge variant={"outline"}>Yes</Badge>
                        ) : (
                            <Badge variant={"destructive"}>No</Badge>
                        );
                    },
                },
                {
                    name: "checked_in_at",
                    label: "Checked In At",
                    sortable: true,
                },
                {
                    name: "event.title",
                    label: "Event Title",
                    render: (cell, record, setHidden, revalidate) => {
                        return (
                            record?.event_id && (
                                <Link
                                    className="hover:text-primary underline"
                                    href={route(
                                        "v1.web.protected.events.show",
                                        record?.event_id,
                                    )}
                                >
                                    {record?.event?.title}
                                </Link>
                            )
                        );
                    },
                },
                {
                    label: "Options",
                    render: (_data, record, setHidden, revalidate) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.attendees.index")}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
            filter={(params, setParams) => (
                <Filter params={params} setParams={setParams} />
            )}
        />
    );
};

const Filter = ({
    params,
    setParams,
}: {
    params: FilterParam;
    setParams: (
        value: ((prevState: FilterParam) => FilterParam) | FilterParam,
    ) => void;
}) => (
    <>
        <ApiSelect
            label={"Event"}
            api={(page, search) =>
                Http.make<Event[]>().get(
                    route("v1.web.protected.events.data"),
                    { page: page, search: search, is_active: true },
                )
            }
            getDataArray={(response) => response?.data ?? []}
            getIsLast={(data) => data?.paginate?.is_last_page ?? false}
            getTotalPages={(data) => data?.paginate?.total_pages ?? 0}
            onChange={(e) =>
                setParams((prev) => ({
                    ...prev,
                    event_id: e.target.value,
                }))
            }
            optionLabel={"title"}
            optionValue={"id"}
        />
        <Select
            data={["Is Present", "Is Not Present"]}
            label={"Present Status"}
            onChange={(v) => {
                setParams((prev) => ({
                    ...prev,
                    is_present: v == "Is Present",
                }));
            }}
            selected={
                params.is_present == true
                    ? "Is Present"
                    : params.is_present == false
                      ? "Is Not Present"
                      : undefined
            }
        />

        <Input
            type={"date"}
            name={"checked_in_at"}
            label={"Checked In At"}
            onChange={(e) => {
                setParams((prev) => ({
                    ...prev,
                    checked_in_at: e.target.value,
                }));
            }}
        />
    </>
);

export default Index;
