import React, { useEffect, useState, useRef } from "react";
import { useIntl } from "@edx/frontend-platform/i18n";
import {
  Form,
  DataTable,
  Badge,
  Dropdown,
} from "@openedx/paragon";
import { ArrowDropDown } from "@openedx/paragon/icons";
import PropTypes from "prop-types";
import messages from "./messages";
import SortableHeader from './customSortableHeader';
import TableActions from './customTableActions';

export default function CoursesTable({ userEmail }) {
  const intl = useIntl();
  const exampleData = [
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "edX Demonstration Course",
      role: "staff",
      org: "edX",
      run: "2025_T1",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:MITx+6.00x+2024_Fall",
      course_name: "Introduction to Computer Science",
      role: "null",
      org: "MITx",
      run: "2024_Fall",
      number: "Test",
      status: "Archived",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science abc",
      role: "instructor",
      org: "edXX aksjnxkas",
      run: "2025_T2",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science xyz",
      role: "null",
      org: "edX",
      run: "2025_T3",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 123",
      role: "instructor",
      org: "Google",
      run: "2025_T4",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 456",
      role: "staff",
      org: "edX",
      run: "2025_T5",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 789",
      role: "null",
      org: "Google",
      run: "2025_T6",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 101",
      role: "staff",
      org: "edX",
      run: "2025_T7",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 202",
      role: "instructor",
      org: "edX",
      run: "2025_T8",
      number: "DemoX",
      status: "Active",
    },
    {
      course_id: "course-v1:edX+DemoX+2025_T1",
      course_name: "Introduction to Computer Science 101",
      role: "staff",
      org: "edX",
      run: "2025_T7",
      number: "DemoX",
      status: "Active",
    }
  ];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [org, setOrg] = useState("");
  const [sortBy, setSortBy] = useState([]);
  // Track roles for each course row, keyed by run
  const [rowRoles, setRowRoles] = useState(() =>
    exampleData.reduce((acc, row) => {
      acc[row.run] = row.role;
      return acc;
    }, {})
  );
  const searchInputRef = useRef(null);

  const sortedAndFilteredData = React.useMemo(() => {
    let data = exampleData.map((row) => ({
      ...row,
      role: rowRoles[row.run] !== undefined ? rowRoles[row.run] : "null",
    }));
  
    // Filtering
    data = data.filter(
      (row) =>
        (row.course_name.toLowerCase().includes(search.toLowerCase()) ||
          row.number.toLowerCase().includes(search.toLowerCase()) ||
          row.run.toLowerCase().includes(search.toLowerCase())) &&
        (status === "" || row.status === status) &&
        (org === "" || row.org === org)
    );
  
    // Manual sorting
    if (sortBy.length > 0) {
      const { id, desc } = sortBy[0];
      data = [...data].sort((a, b) => {
        const aValue = a[id];
        const bValue = b[id];
        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
        return 0;
      });
    }
  
    return data;
  }, [search, status, org, exampleData, rowRoles, sortBy]);
  

  // Focus the search input when the component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Generate unique orgs for org filterChoices
  const orgFilterChoices = Array.from(
    new Set(exampleData.map((row) => row.org))
  )
    .filter(Boolean)
    .map((org) => ({ name: org, value: org }));
  
  const formatStatus = ({ value }) => (
    <Badge
      className="course-team-management-course-status-badge"
      variant={value === "Active" ? "success" : "light"}
    >
      {value}
    </Badge>
  );

  const formatRole = ({ row }) => {
    const runId = row.original.run;
    let value = rowRoles[runId];
    // If role is "null", default to staff for display only
    const displayValue = value === "null" ? "staff" : value;
    let title = "Staff";
    if (displayValue === "instructor") title = "Admin";
    // Enable dropdown if checkbox is checked, otherwise disable
    const isChecked = !!checkedRows[runId];
    const isDisabled = !isChecked;
    return (
      <Dropdown>
        <Dropdown.Toggle
          as="button"
          className="course-team-management-role-col-dropdown"
          variant="outline-primary"
          disabled={isDisabled}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "2px 8px",
            width: "95px",
            borderRadius: "6px",
          }}
        >
          <span>{title}</span>
          <ArrowDropDown className="ml-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu placement="top">
          <Dropdown.Item
            eventKey="staff"
            active={displayValue === "staff"}
            onClick={() =>
              setRowRoles((prev) => ({ ...prev, [runId]: "staff" }))
            }
          >
            Staff
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="instructor"
            active={displayValue === "instructor"}
            onClick={() =>
              setRowRoles((prev) => ({ ...prev, [runId]: "instructor" }))
            }
          >
            Admin
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  // Custom checkbox selection state, keyed by run
  const [checkedRows, setCheckedRows] = useState(() => {
    const initial = {};
    exampleData.forEach((row) => {
      if (row.role === "staff" || row.role === "instructor") {
        initial[row.run] = true;
      }
    });
    return initial;
  });

  const handleCheckboxChange = (runId) => {
    setCheckedRows((prev) => ({ ...prev, [runId]: !prev[runId] }));
  };

  // Select all/clear all logic for header checkbox
  const headerCheckboxRef = useRef(null);
  const allRowIds = sortedAndFilteredData.map((row) => row.run);
  const numChecked = allRowIds.filter((id) => checkedRows[id]).length;
  const allChecked = numChecked === allRowIds.length && allRowIds.length > 0;
  const someChecked = numChecked > 0 && numChecked < allRowIds.length;
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [someChecked, allChecked, numChecked]);

  const handleHeaderCheckboxChange = () => {
    if (allChecked) {
      // Clear all
      setCheckedRows((prev) => {
        const updated = { ...prev };
        allRowIds.forEach((id) => {
          updated[id] = false;
        });
        return updated;
      });
    } else {
      // Select all
      setCheckedRows((prev) => {
        const updated = { ...prev };
        allRowIds.forEach((id) => {
          updated[id] = true;
        });
        return updated;
      });
    }
  };
  // Custom filter UI for tableActions
  const tableActions = (
    <TableActions
      intl={intl}
      messages={messages}
      search={search}
      setSearch={setSearch}
      searchInputRef={searchInputRef}
      status={status}
      setStatus={setStatus}
      org={org}
      setOrg={setOrg}
      orgFilterChoices={orgFilterChoices}
      setRowRoles={setRowRoles}
      sortedAndFilteredData={sortedAndFilteredData}
      checkedRows={checkedRows}
      exampleData={exampleData}
    />
  );

  return (
    <div className="course-team-management-courses-table">
      <DataTable
        isSortable
        manualSortBy
        sortBy={sortBy}
        onSortByChange={setSortBy}
        isFilterable
        itemCount={exampleData.length}
        tableActions={[tableActions]}
        data={sortedAndFilteredData}
        columns={[
          {
            Header: () => (
              <Form.Check
                ref={headerCheckboxRef}
                type="checkbox"
                checked={allChecked}
                onChange={handleHeaderCheckboxChange}
                aria-label="Select all rows"
                style={{ marginLeft: 8 }}
              />
            ),
            accessor: "checkbox",
            disableFilters: true,
            disableSortBy: true,
            id: "checkbox",
            Cell: ({ row }) => (
              <Form.Check
                type="checkbox"
                checked={!!checkedRows[row.original.run]}
                onChange={() => handleCheckboxChange(row.original.run)}
                aria-label={`Select row for ${row.original.course_name}`}
                style={{ marginLeft: 8 }}
              />
            ),
          },
          {
            Header: () => (
              <SortableHeader
                id="course_name"
                label="Name"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ),
            accessor: "course_name",
            id: "course_name",
            disableFilters: true,
            className: "test_table_width",
          },
          {
            Header: () => (
              <SortableHeader
                id="number"
                label="Number"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ),
            accessor: "number",
            id: "number",
            disableFilters: true,
          },
          {
            Header: () => (
              <SortableHeader
                id="run"
                label="Run"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ),
            accessor: "run",
            id: "run",
            disableFilters: true,
          },
          {
            Header: () => (
              <SortableHeader
                id="status"
                label="All Courses"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ),
            accessor: "status",
            id: "status",
            Cell: formatStatus,
            disableFilters: true,
          },
          {
            Header: () => (
              <SortableHeader
                id="role"
                label="Role"
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            ),
            accessor: "role",
            id: "role",
            Cell: formatRole,
            disableFilters: true,
          },
        ]}
        getRowId={(row) => row.run}
      >
        <DataTable.TableControlBar />
        <div style={{ height: 520, overflow: 'auto' }}>
        <DataTable.Table />
        </div>
        <DataTable.EmptyTable content="No results found" />
        {sortedAndFilteredData.length > 0 && <DataTable.TableFooter />}
      </DataTable>
    </div>
  );
}
CoursesTable.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
