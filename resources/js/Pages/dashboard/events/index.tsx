import ActionsButtons from "@/Components/Datatable/ActionsButtons";
import DataTable from "@/Components/Datatable/DataTable";
import Event from "@/Models/Event";
import Http from "@/Modules/Http/Http";

const Index = ({ exportables }: { exportables: string[] }) => {
    return (
        <DataTable
            title="Event Table"
            createUrl={route("v1.web.protected.events.create")}
            importRoute={route("v1.web.protected.events.import")}
            exportRoute={route("v1.web.protected.events.export")}
            importExampleRoute={route("v1.web.protected.events.import.example")}
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
                Http.make<Event[]>().get(
                    route("v1.web.protected.events.data"),
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
                { name: "title", label: "Title", sortable: true },
                { name: "start_time", label: "Start Time", sortable: true },
                { name: "end_time", label: "End Time", sortable: true },
                {
                    label: "Options",
                    render: (_data, record, setHidden, _revalidate) => (
                        <ActionsButtons
                            buttons={["delete", "edit", "show"]}
                            baseUrl={route("v1.web.protected.events.index")}
                            id={record?.id ?? 0}
                            setHidden={setHidden}
                        />
                    ),
                },
            ]}
        />
    );
};

export default Index;
