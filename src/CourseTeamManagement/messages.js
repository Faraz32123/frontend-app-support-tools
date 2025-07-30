import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  pageTitle: {
    id: 'courseTeamManagementPageTitle',
    defaultMessage: 'Manage Access',
    description: 'Course Team Management Page Title',
  },
  noUserSelected: {
    id: 'courseTeamManagementNoUserSelected',
    defaultMessage: 'No user selected',
    description: 'Message displayed when no user is selected in Course Team Management',
  },
  noUserSelectedDescription: {
    id: 'courseTeamManagementNoUserSelectedDescription',
    defaultMessage: 'Search by username or email to view courses and manage access.',
    description: 'Description displayed when no user is selected in Course Team Management',
  },
  searchPlaceholder: {
    id: 'courseTeamManagementSearchPlaceholder',
    defaultMessage: 'Search',
    description: 'Course Team Management search field placeholder',
  },
  allCoursesFilterLabel: {
    id: 'courseTeamManagementAllCoursesFilterLabel',
    defaultMessage: 'All Courses',
    description: 'Course Team Management All courses filter label',
  },
  activeCoursesFilterLabel: {
    id: 'courseTeamManagementActiveCoursesFilterLabel',
    defaultMessage: 'Active',
    description: 'Course Team Management Active courses filter label',
  },
  archivedCoursesFilterLabel: {
    id: 'courseTeamManagementArchivedCoursesFilterLabel',
    defaultMessage: 'Archived',
    description: 'Course Team Management Active courses filter label',
  },
  allOrgsFilterLabel: {
    id: 'courseTeamManagementAllOrgsFilterLabel',
    defaultMessage: 'All Orgs',
    description: 'Course Team Management All Organizations filter label',
  },
  actionsFilterLabel: {
    id: 'courseTeamManagementActionsFilterLabel',
    defaultMessage: 'Actions',
    description: 'Course Team Management Actions filter label',
  },
});
export default messages;
