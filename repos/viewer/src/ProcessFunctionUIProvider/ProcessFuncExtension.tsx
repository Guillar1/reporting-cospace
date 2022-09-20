import { LoadingSpinner } from "@itwin/core-react";
import { GroupingCustomUIProps } from "@itwin/grouping-mapping-widget";
import { Button, LabeledTextarea } from "@itwin/itwinui-react";
import React from "react";

const ProcessFuncUIProvider = ({
    updateQuery,
    isUpdating,
    resetView,
}: GroupingCustomUIProps) => {
    const [searchInput, setSearchInput] = React.useState("");

    const generateSearchQuery = (keyword: string) => {
        if (keyword.length === 0) {
            updateQuery("");
            return;
        }

        // a query to get all elements from process functional class with similar keyword
        let generatedSearchQuery = `SELECT sourceEle.Ecinstanceid FROM pfunc.Plant_Base_Object sourceEle WHERE ec_classname(sourceEle.ecclassid) LIKE '%${keyword}%'`;
        updateQuery(generatedSearchQuery);
    };

    return (
        <div className='gmw-search-form'>
            <LabeledTextarea
                label='Process Function Keywords'
                required
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                disabled={isUpdating}
                placeholder={`E.g. valve`}
            />
            <div className='gmw-search-actions'>
                {isUpdating && <LoadingSpinner />}
                <Button
                    disabled={isUpdating}
                    onClick={() => generateSearchQuery(searchInput)}
                >
                    Apply
                </Button>
                <Button
                    disabled={isUpdating}
                    onClick={async () => {
                        updateQuery("");
                        setSearchInput("");
                        if (resetView) {
                            await resetView();
                        }
                    }}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
};

export default ProcessFuncUIProvider;
