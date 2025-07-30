// TableActions.jsx
import React from 'react';
import { Form, Icon } from '@openedx/paragon';
import { Search, ArrowDropDown } from "@openedx/paragon/icons";

const TableActions = ({
  intl,
  messages,
  search,
  setSearch,
  searchInputRef,
  status,
  setStatus,
  org,
  setOrg,
  orgFilterChoices,
  setRowRoles,
  sortedAndFilteredData,
  checkedRows,
  exampleData,
}) => {
  return (
    <div className="custom-table-actions-container">
      <div className="custom-table-filter-actions">
        {/* Search input */}
        <Form.Control
          ref={searchInputRef}
          type="text"
          placeholder={intl.formatMessage(messages.searchPlaceholder)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          trailingElement={<Icon src={Search} />}
        />

        {/* Status Dropdown */}
        <Form.Group controlId="formGridStatus" style={{ marginBottom: 0 }}>
          <div style={{ position: 'relative', minWidth: 150 }}>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ backgroundImage: 'none', paddingLeft: 24 }}
            >
              <option value="">{intl.formatMessage(messages.allCoursesFilterLabel)}</option>
              <option value="Active">{intl.formatMessage(messages.activeCoursesFilterLabel)}</option>
              <option value="Archived">{intl.formatMessage(messages.archivedCoursesFilterLabel)}</option>
            </Form.Control>
            <ArrowDropDown
              className="ml-2"
              style={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </Form.Group>

        {/* Org Dropdown */}
        <Form.Group controlId="formGridOrg" style={{ minWidth: 120, marginBottom: 0 }}>
          <div style={{ position: 'relative', minWidth: 150 }}>
            <Form.Control
              as="select"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              style={{
                backgroundImage: 'none',
                paddingLeft: 24,
                width: 142,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <option value="">{intl.formatMessage(messages.allOrgsFilterLabel)}</option>
              {orgFilterChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.name}
                </option>
              ))}
            </Form.Control>
            <ArrowDropDown
              className="ml-2"
              style={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </Form.Group>

        {/* Role Dropdown */}
        <Form.Group controlId="formGridRole" style={{ minWidth: 120, marginBottom: 0 }}>
          <div style={{ position: 'relative', minWidth: 150 }}>
            <Form.Control
              as="select"
              value=""
              onChange={(e) => {
                const newRole = e.target.value;
                if (newRole === 'staff' || newRole === 'instructor') {
                  const filteredRunIds = new Set(sortedAndFilteredData.map(row => row.run));
                  setRowRoles((prev) => {
                    const updated = { ...prev };
                    Object.keys(checkedRows).forEach((runId) => {
                      if (checkedRows[runId] && filteredRunIds.has(runId)) {
                        updated[runId] = newRole;
                      }
                    });
                    return updated;
                  });
                }
              }}
              style={{ backgroundImage: 'none', paddingLeft: 24 }}
            >
              <option value="">{intl.formatMessage(messages.actionsFilterLabel)}</option>
              <option value="staff">Staff</option>
              <option value="instructor">Admin</option>
            </Form.Control>
            <ArrowDropDown
              className="ml-2"
              style={{
                position: 'absolute',
                right: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </Form.Group>
      </div>

      <div className="pgn__data-table-footer custom-table-data-actions">
        <p>
          Showing 1 - {sortedAndFilteredData.length} of {exampleData.length}.
        </p>
      </div>
    </div>
  );
};

export default TableActions;
